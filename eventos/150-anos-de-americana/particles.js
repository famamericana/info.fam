// Simple, lightweight particle overlay
(function(){
  const canvas = document.createElement('canvas');
  canvas.id = 'site-particles';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let DPR = Math.max(1, window.devicePixelRatio || 1);
  function resize(){
    canvas.width = Math.floor(window.innerWidth * DPR);
    canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  window.addEventListener('resize', resize);
  resize();

  function getGray(){
    const cs = getComputedStyle(document.body);
    // try CSS variable common patterns first
    const varNames = ['--gray','--cinza','--accent-color','--color','--text-color'];
    for(const v of varNames){
      const val = cs.getPropertyValue(v).trim();
      if(val) return parseToAvg(val);
    }
    // fallback to body color / background
    return parseToAvg(cs.getPropertyValue('color') || cs.getPropertyValue('background-color') || 'rgb(150,150,150)');

    function parseToAvg(input){
      const m = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if(m) return Math.round((+m[1]+(+m[2])+(+m[3]))/3);
      // try hex
      const mh = input.replace(/\s/g,'').match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/);
      if(mh){
        let hex = mh[1];
        if(hex.length===3) hex = hex.split('').map(c=>c+c).join('');
        const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
        return Math.round((r+g+b)/3);
      }
      return 170; // default gray
    }
  }

  // get base gray from CSS, then lighten slightly so 'dark gray' appears a bit lighter
  const _rawGray = getGray();
  const LIGHTEN = 0.18; // fraction toward white (0 = no change, 1 = white)
  const baseGray = Math.round(Math.min(255, _rawGray + (255 - _rawGray) * LIGHTEN));

  // particles
  let particles = [];
  const area = window.innerWidth * window.innerHeight;
  // density factor: <1 reduces particles slightly, >1 increases
  const DENSITY_FACTOR = 0.88; // tweak this to change particle count subtly
  const baseCount = Math.floor(area / 8000);
  const targetCount = Math.max(24, Math.min(160, Math.floor(baseCount * DENSITY_FACTOR)) );

  function make(){
    return {
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      vx: (Math.random()-0.5)*0.4,
      vy: (Math.random()-0.5)*0.4,
      r: Math.random()*1.8 + 0.6,
      alpha: Math.random()*0.6 + 0.08,
      life: Math.random()*800 + 200
    };
  }

  for(let i=0;i<targetCount;i++) particles.push(make());

  let mouse = {x:-9999,y:-9999};
  window.addEventListener('mousemove', e=>{ mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseout', ()=>{ mouse.x = -9999; mouse.y = -9999; });

  let last = performance.now();
  function frame(now){
    const dt = Math.min(40, now - last) / 16; last = now;
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;

      // simple mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d2 = dx*dx + dy*dy;
      if(d2 < 9000){ // within ~95px
        const f = (9000 - d2) / 9000;
        p.vx += (dx/dt) * 0.0006 * f;
        p.vy += (dy/dt) * 0.0006 * f;
      }

      // wrap or respawn
      if(p.life <= 0 || p.x < -30 || p.x > window.innerWidth + 30 || p.y < -30 || p.y > window.innerHeight + 30){
        particles[i] = make();
        particles[i].x = Math.random()*window.innerWidth;
        particles[i].y = Math.random()*window.innerHeight;
        continue;
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(${baseGray},${baseGray},${baseGray},${Math.max(0.03, Math.min(0.9, p.alpha))})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
