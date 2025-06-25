/**
 * Particle Animation for Header Background
 * Adapted from CodePen by Alex Andrix
 */

var ParticleApp = {};

ParticleApp.setup = function () {
  var canvas = document.createElement('canvas');
  canvas.className = 'particle-canvas';

  var header = document.querySelector('header');
  header.insertBefore(canvas, header.firstChild);

  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.resize();

  this.ctx.imageSmoothingEnabled = false;
  this.ctx.webkitImageSmoothingEnabled = false;
  this.ctx.msImageSmoothingEnabled = false;

  this.xC = this.width / 2;
  this.yC = this.height / 2;
  this.stepCount = 0;
  this.particles = [];
  this.lifespan = 200;
  this.popPerBirth = 1;
  this.maxPop = 80; // Increased for more movement
  this.birthFreq = 2;
  this.dataToImageRatio = 1;
  // Build grid
  this.gridSize = 12;
  this.gridStepsX = Math.floor(this.width / this.gridSize);
  this.gridSteps = Math.floor(this.height / this.gridSize);
  this.grid = [];
  var i = 0;
  for (var ix = 0; ix < this.gridStepsX; ix++) {
    for (var iy = 0; iy < this.gridSteps; iy++) {
      var xx = -this.width / 2 + ix * this.gridSize;
      var yy = -this.height / 2 + iy * this.gridSize;
      var field = Math.random() * 255;
      var isEdge = (ix === 0 ? 'left' :
        ix === this.gridStepsX - 1 ? 'right' :
          iy === 0 ? 'top' :
            iy === this.gridSteps - 1 ? 'bottom' : false);
      this.grid.push({
        x: xx,
        y: yy,
        busyAge: 0,
        spotIndex: i,
        isEdge: isEdge,
        field: field
      });
      i++;
    }
  }
  this.gridMaxIndex = i;

  this.deathCount = 0;
  this.initDraw();

  // Handle window resize
  window.addEventListener('resize', () => {
    this.resize();
  });
};

ParticleApp.resize = function () {
  var header = document.querySelector('header');
  this.canvas.width = header.offsetWidth;
  this.canvas.height = header.offsetHeight;
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.xC = this.width / 2;
  this.yC = this.height / 2;
};

ParticleApp.evolve = function () {
  this.stepCount++;

  this.grid.forEach(function (e) {
    if (e.busyAge > 0) e.busyAge++;
  });

  if (this.stepCount % this.birthFreq == 0 && (this.particles.length + this.popPerBirth) < this.maxPop) {
    this.birth();
  }
  this.move();
  this.draw();
};

ParticleApp.birth = function () {
  var gridSpotIndex = Math.floor(Math.random() * this.gridMaxIndex),
    gridSpot = this.grid[gridSpotIndex],
    x = gridSpot.x, y = gridSpot.y;
  // Use only 3 specific colors instead of random colors
  var colorSet = [
    { hue: 210, sat: 80, lum: 40 },  
    { hue: 197, sat: 75, lum: 58 }, 
    { hue: 186, sat: 74, lum: 39 }  
  ];

  var selectedColor = colorSet[Math.floor(Math.random() * 3)];

  var particle = {
    hue: selectedColor.hue,
    sat: selectedColor.sat + Math.floor(10 * Math.random()), // Small variation in saturation
    lum: selectedColor.lum + Math.floor(10 * Math.random()), // Small variation in luminosity
    x: x, y: y,
    xLast: x, yLast: y,
    xSpeed: 0, ySpeed: 0,
    age: 0,
    ageSinceStuck: 0,
    attractor: {
      oldIndex: gridSpotIndex,
      gridSpotIndex: gridSpotIndex,
    },
    name: 'particle-' + Math.ceil(10000000 * Math.random())
  };
  this.particles.push(particle);
};

ParticleApp.kill = function (particleName) {
  this.particles = this.particles.filter(particle => particle.name !== particleName);
};

ParticleApp.move = function () {
  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];

    p.xLast = p.x;
    p.yLast = p.y;

    var index = p.attractor.gridSpotIndex,
      gridSpot = this.grid[index];

    if (Math.random() < 0.6) { // Increased probability for more movement
      if (!gridSpot.isEdge) {
        var topIndex = index - 1,
          bottomIndex = index + 1,
          leftIndex = index - this.gridSteps,
          rightIndex = index + this.gridSteps;
        var neighbors = [
          this.grid[topIndex],
          this.grid[bottomIndex],
          this.grid[leftIndex],
          this.grid[rightIndex]
        ].filter(spot => spot);

        // More random movement - just pick a random neighbor
        var randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

        if (randomNeighbor && (randomNeighbor.busyAge == 0 || randomNeighbor.busyAge > 12)) {
          p.ageSinceStuck = 0;
          p.attractor.oldIndex = index;
          p.attractor.gridSpotIndex = randomNeighbor.spotIndex;
          gridSpot = randomNeighbor;
          gridSpot.busyAge = 1;
        } else {
          p.ageSinceStuck++;
        }
      } else {
        p.ageSinceStuck++;
      }

      if (p.ageSinceStuck == 8) this.kill(p.name);
    }

    var k = 6, visc = 0.5;
    var dx = p.x - gridSpot.x,
      dy = p.y - gridSpot.y;

    var xAcc = -k * dx,
      yAcc = -k * dy;

    p.xSpeed += xAcc;
    p.ySpeed += yAcc;

    p.xSpeed *= visc;
    p.ySpeed *= visc;

    p.speed = Math.sqrt(p.xSpeed * p.xSpeed + p.ySpeed * p.ySpeed);
    p.dist = Math.sqrt(dx * dx + dy * dy);

    p.x += 0.1 * p.xSpeed;
    p.y += 0.1 * p.ySpeed;

    p.age++;

    if (p.age > this.lifespan) {
      this.kill(p.name);
      this.deathCount++;
    }
  }
};

ParticleApp.initDraw = function () {
  this.ctx.beginPath();
  this.ctx.rect(0, 0, this.width, this.height);
  this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  this.ctx.fill();
  this.ctx.closePath();
};

ParticleApp.draw = function () {
  if (!this.particles.length) return false;

  // Clear trails more effectively
  this.ctx.beginPath();
  this.ctx.rect(0, 0, this.width, this.height);
  this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // darker clear
  this.ctx.fill();
  this.ctx.closePath();

  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];

    var h = p.hue; // Fixed color, no change over time
    var s = p.sat;
    var l = p.lum;
    var a = Math.max(0.3, 1 - p.age / this.lifespan);

    var last = this.dataXYtoCanvasXY(p.xLast, p.yLast),
      now = this.dataXYtoCanvasXY(p.x, p.y);

    var attracSpot = this.grid[p.attractor.gridSpotIndex],
      attracXY = this.dataXYtoCanvasXY(attracSpot.x, attracSpot.y);
    var oldAttracSpot = this.grid[p.attractor.oldIndex],
      oldAttracXY = this.dataXYtoCanvasXY(oldAttracSpot.x, oldAttracSpot.y);

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')';

    // Particle trail
    this.ctx.moveTo(last.x, last.y);
    this.ctx.lineTo(now.x, now.y);
    this.ctx.lineWidth = 1.5 * this.dataToImageRatio;
    this.ctx.stroke();
    this.ctx.closePath();

    // Attractor lines and points
    this.ctx.beginPath();
    this.ctx.lineWidth = 1 * this.dataToImageRatio;
    this.ctx.moveTo(oldAttracXY.x, oldAttracXY.y);
    this.ctx.lineTo(attracXY.x, attracXY.y);
    this.ctx.arc(attracXY.x, attracXY.y, 1.5 * this.dataToImageRatio, 0, 2 * Math.PI, false);

    this.ctx.strokeStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + (a * 0.6) + ')';
    this.ctx.fillStyle = 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + (a * 0.8) + ')';
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }
};

ParticleApp.dataXYtoCanvasXY = function (x, y) {
  var zoom = 1.2;
  var xx = this.xC + x * zoom * this.dataToImageRatio,
    yy = this.yC + y * zoom * this.dataToImageRatio;

  return { x: xx, y: yy };
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Small delay to ensure header is properly sized
  setTimeout(() => {
    ParticleApp.setup();
    ParticleApp.draw();

    var frame = function () {
      ParticleApp.evolve();
      requestAnimationFrame(frame);
    };
    frame();
  }, 100);
});
