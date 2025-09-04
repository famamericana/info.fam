<?php
/* ============================================================
   DISC – 1 página, auto-scroll, 24 grupos (textos exatos)
   Gráficos: 3 painéis em Chart.js (-12..+12), Roda DISC (canvas),
   Tabela de valores DISC + Tabela de Comportamento na Função.
   ============================================================ */
$groups = [
  ['numero' => 1,  'opcoes' => [
    'Facilidade em Relacionamento, Simpático, Agradável',
    'Acredita, confia nos outros',
    'Não tem medo de correr riscos',
    'Tolerante, Respeitoso',
  ]],
  ['numero' => 2,  'opcoes' => [
    'Tanqüilo, fala devagar, reservado',
    'Desbravador, Otimista, Visionário',
    'Centro das atenções, sociável',
    'Pacificador, Harmonioso',
  ]],
  ['numero' => 3,  'opcoes' => [
    'Tem facilidade em escutar os outros',
    'Perfeccionista',
    'Faz parte da equipe',
    'Gosta de estabelecer metas',
  ]],
  ['numero' => 4,  'opcoes' => [
    'Se as coisas dão errado, fica triste',
    'Se estou triste, guardo meus sentimentos comigo',
    'Em conflitos, digo meu lado da história',
    'Se ninguém concorda e apoia, enfrento a oposição',
  ]],
  ['numero' => 5,  'opcoes' => [
    'Bricalhão, Animado, Falante',
    'Decidido, Dinâmico, Determinado',
    'Tenta manter o equilíbrio no ambiente',
    'Busca qualidade e é exigente consigo',
  ]],
  ['numero' => 6,  'opcoes' => [
    'Gosta de liderança e de dirigir',
    'Gosta de análise e coisas técnicas',
    'Gosta de estar com as pessoas',
    'Gosta demais de rotina e estabilidade',
  ]],
  ['numero' => 7,  'opcoes' => [
    'Não gosta de mudanças de última hora',
    'Costuma fazer promessas',
    'Em conflitos, prefere argumentar tecnicamente',
    'Se for o caso, não tem medo de lutar',
  ]],
  ['numero' => 8,  'opcoes' => [
    'Gosto de estar com meus amigos, prefiro andar em grupo',
    'Gosto de ter o controle e de dirigir',
    'Gosto de aprender em silêncio para não me desconcentrar',
    'Gosto de estar de acordo com as regras',
  ]],
  ['numero' => 9,  'opcoes' => [
    'Se alguém muda a rota do trabalho, aceito e me ajusto',
    'Se alguém muda a rota do trabalho, confronto e questiono',
    'Se alguém muda a rota do trabalho, perco a confiança',
    'Se alguém muda a rota do trabalho, analiso e me adequo',
  ]],
  ['numero' => 10, 'opcoes' => [
    'Em um time, sou o que questiona prazos e padrões',
    'Em um time, sou o que anima e engaja o grupo',
    'Em um time, sou o que mantém o ritmo e o clima',
    'Em um time, sou o que define metas e resultados',
  ]],
  ['numero' => 11, 'opcoes' => [
    'Se alguém me pressiona, fico na defensiva',
    'Se alguém me pressiona, sou mais objetivo e direto',
    'Se alguém me pressiona, tento apaziguar o conflito',
    'Se alguém me pressiona, falo e escuto para chegar a um acordo',
  ]],
  ['numero' => 12, 'opcoes' => [
    'Quando recebo um novo projeto, planejo e defino o padrão de qualidade',
    'Quando recebo um novo projeto, penso nas pessoas e no ambiente',
    'Quando recebo um novo projeto, penso no cronograma e no resultado',
    'Quando recebo um novo projeto, penso em manter a consistência',
  ]],
  ['numero' => 13, 'opcoes' => [
    'Tenho facilidade em me apresentar e falar em público',
    'Tenho prazer em atingir objetivos e metas',
    'Tenho facilidade em trabalhar em rotina',
    'Tenho preocupação com detalhes e padrões',
  ]],
  ['numero' => 14, 'opcoes' => [
    'Se algo dá errado, tento animar as pessoas',
    'Se algo dá errado, assumo o controle e proponho solução',
    'Se algo dá errado, mantenho a calma e sigo o plano',
    'Se algo dá errado, reviso o processo e os critérios',
  ]],
  ['numero' => 15, 'opcoes' => [
    'Sou visto como alguém carismático e encorajador',
    'Sou visto como alguém assertivo e competitivo',
    'Sou visto como alguém leal e constante',
    'Sou visto como alguém minucioso e metódico',
  ]],
  ['numero' => 16, 'opcoes' => [
    'Prefiro trabalhar onde tenha networking e visibilidade',
    'Prefiro trabalhar com desafios e mudanças frequentes',
    'Prefiro trabalhar com segurança e ritmo linear',
    'Prefiro trabalhar com normas e medições claras',
  ]],
  ['numero' => 17, 'opcoes' => [
    'Dizem que sou persuasivo e agregador',
    'Dizem que sou direto e objetivo',
    'Dizem que sou calmo e tolerante',
    'Dizem que sou analítico e formal',
  ]],
  ['numero' => 18, 'opcoes' => [
    'Costumo empolgar e mobilizar as pessoas',
    'Costumo tomar a frente e assumir riscos',
    'Costumo manter estabilidade emocional',
    'Costumo conferir a qualidade e a conformidade',
  ]],
  ['numero' => 19, 'opcoes' => [
    'Aproximo pessoas e crio conexões',
    'Resolvo rápido e enfrento barreiras',
    'Evito conflitos e mantenho o ritmo',
    'Sigo padrões e confiro detalhes',
  ]],
  ['numero' => 20, 'opcoes' => [
    'Falo bem em público e gosto de apresentar',
    'Sou focado em metas e performance',
    'Sou sereno e previsível',
    'Sou estruturado e cuidadoso',
  ]],
  ['numero' => 21, 'opcoes' => [
    'Sou estimulante e positivo',
    'Sou firme e decidido',
    'Sou constante e colaborativo',
    'Sou rigoroso e preciso',
  ]],
  ['numero' => 22, 'opcoes' => [
    'Agrada os outros, amigável',
    'Ri alto, animado',
    'Corajoso, ousado',
    'Quieto, reservado',
  ]],
  ['numero' => 23, 'opcoes' => [
    'Quer mais autoridade',
    'Quer ter seus argumentos ouvidos',
    'Quer evitar conflitos pessoais',
    'Quer orientações claras',
  ]],
  ['numero' => 24, 'opcoes' => [
    'Apoiador, confiável',
    'Criativo, inovador',
    'Voltado para resultados',
    'Mantém alto padrão de precisão',
  ]],
];
?>
<!doctype html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8">
  <title>DISC – Inventário</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="style.css">
</head>

<body class="dark">
  <div class="container">
    <div class="header">
      <div>
        <h1>Inventário DISC</h1>
      </div>
      <label title="Tema claro/escuro"><input id="themeToggle" class="toggle" type="checkbox" /></label>
    </div>

    <div class="progress"><span id="progressBar"></span></div>
    <small id="progressText">0/24 grupos concluídos</small>
    <small class="warning" id="validationMsg" style="display:none;margin-left:12px">Preencha 1 MAIS e 1 MENOS em cada grupo.</small>

    <!-- Questionário -->
    <div id="groups"></div>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin:8px 0 16px">
      <button id="btnFinish" disabled>Ver resultados ✅</button>
    </div>

    <!-- Resultados -->
    <div id="results" style="display:none">
      <!-- 1) Três painéis (Chart.js) -->
      <div class="card">
        <div class="canvasWrap">
          <div class="canvasBox">
            <canvas id="cvSelf" height="220"></canvas>
            <div class="canvasTitle">SELF</div>
          </div>
          <div class="canvasBox">
            <canvas id="cvPersona" height="220"></canvas>
            <div class="canvasTitle">PERSONA</div>
          </div>
          <div class="canvasBox">
            <canvas id="cvStress" height="220"></canvas>
            <div class="canvasTitle">STRESS</div>
          </div>
        </div>
      </div>

      <!-- 2) Roda + tabela mini -->
      <div class="card">
        <div class="flex">
          <table class="table-mini" id="miniTable">
            <thead>
              <tr>
                <th>D</th>
                <th>I</th>
                <th>S</th>
                <th>C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="miniD">0</td>
                <td id="miniI">0</td>
                <td id="miniS">0</td>
                <td id="miniC">0</td>
              </tr>
            </tbody>
          </table>
          <canvas id="cvWheel" width="520" height="520" style="background:#fff;border:1px solid #ddd;border-radius:8px"></canvas>
        </div>
      </div>

      <!-- 3) Análise de Comportamento na Função -->
      <div class="card">
        <h3 style="margin:0 0 10px">ANÁLISE DE COMPORTAMENTO NA FUNÇÃO</h3>
        <table class="table-like" id="behTable">
          <thead>
            <tr>
              <th style="width:60%">Comportamento</th>
              <th>ÍNDICE</th>
              <th>FORÇA DO COMPORTAMENTO</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    // ===== Tema =====
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('disc-theme') || 'dark';
    if (savedTheme === 'light') {
      body.classList.add('light');
      themeToggle.checked = true;
    }
    themeToggle.addEventListener('change', () => {
      body.classList.toggle('light', themeToggle.checked);
      localStorage.setItem('disc-theme', themeToggle.checked ? 'light' : 'dark');
    });

    // ===== Dados =====
    const GROUPS = <?php echo json_encode($groups, JSON_UNESCAPED_UNICODE); ?>;
    const groupsWrap = document.getElementById('groups');
    let selections = GROUPS.map(() => ({
      mais: null,
      menos: null
    }));

    function makeRadio(name, value, groupIndex, type, itemIndex) {
      const id = `${name}_${groupIndex}_${itemIndex}`;
      return `<input type="radio" id="${id}" name="${name}[${groupIndex}]" value="${value}"
    data-g="${groupIndex}" data-type="${type}" data-item="${itemIndex}" />`;
    }

    function render() {
      groupsWrap.innerHTML = '';
      GROUPS.forEach((g, i) => {
        const card = document.createElement('div');
        card.className = 'card anchor';
        card.id = `group-${i}`;
        card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px">
        <h3 style="margin:0">Grupo ${g.numero}</h3>
        <div class="badge">1 em MAIS e 1 em MENOS</div>
      </div>
      <div class="row" style="font-weight:600">
        <div></div><div style="text-align:center">MAIS</div><div style="text-align:center">MENOS</div>
      </div>
      ${g.opcoes.map((txt, idx) => `
        <div class="row">
          <div><strong>${['A','B','C','D'][idx]}.</strong> ${txt}</div>
          <div style="text-align:center">${makeRadio('mais', idx, i, 'mais', idx)}</div>
          <div style="text-align:center">${makeRadio('menos', idx, i, 'menos', idx)}</div>
        </div>
      `).join('')}
    `;
        groupsWrap.appendChild(card);
      });

      selections.forEach((sel, gi) => {
        if (sel.mais !== null) document.querySelector(`input[name="mais[${gi}]"][value="${sel.mais}"]`)?.setAttribute('checked', true);
        if (sel.menos !== null) document.querySelector(`input[name="menos[${gi}]"][value="${sel.menos}"]`)?.setAttribute('checked', true);
      });

      groupsWrap.querySelectorAll('input[type="radio"]').forEach(r => r.addEventListener('change', onSelect));
      updateProgress();
    }
    render();

    function onSelect(e) {
      const input = e.target;
      const gi = parseInt(input.dataset.g, 10);
      const type = input.dataset.type;
      const itemIdx = parseInt(input.dataset.item, 10);

      if (type === 'mais' && selections[gi].menos === itemIdx) {
        selections[gi].menos = null;
        document.querySelector(`input[name="menos[${gi}]"][value="${itemIdx}"]`)?.removeAttribute('checked');
      } else if (type === 'menos' && selections[gi].mais === itemIdx) {
        selections[gi].mais = null;
        document.querySelector(`input[name="mais[${gi}]"][value="${itemIdx}"]`)?.removeAttribute('checked');
      }

      selections[gi][type] = itemIdx;
      updateProgress();

      if (selections[gi].mais !== null && selections[gi].menos !== null) {
        document.getElementById(`group-${gi+1}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    function updateProgress() {
      const done = selections.filter(g => g.mais !== null && g.menos !== null).length;
      const pct = Math.round((done / GROUPS.length) * 100);
      document.getElementById('progressBar').style.width = pct + '%';
      document.getElementById('progressText').textContent = `${done}/${GROUPS.length} grupos concluídos`;
      document.getElementById('btnFinish').disabled = (done !== GROUPS.length);
    }

    // ===== Heurística para mapear textos → D/I/S/C (troque por gabarito se tiver) =====
    const KEYWORDS = {
      D: ['resultado', 'dinam', 'decid', 'lider', 'lutar', 'risco', 'objetivo', 'desafi', 'control', 'enfrent'],
      I: ['relacion', 'simp', 'agrad', 'fala', 'falant', 'anim', 'entusias', 'otimist', 'carism', 'engaj', 'social', 'apresent'],
      S: ['tranquil', 'calm', 'pacient', 'harmon', 'constante', 'equilibr', 'apaz', 'rotina', 'previs', 'sereno'],
      C: ['qualid', 'regras', 'padr', 'perfeccion', 'detalh', 'anal', 'técnic', 'tecnic', 'precis', 'process', 'critéri', 'exigent']
    };

    function norm(s) {
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function mapToFactor(text, fallbackIndex) {
      const t = norm(text);
      const has = (arr) => arr.some(k => t.includes(norm(k)));
      if (has(KEYWORDS.D)) return 'D';
      if (has(KEYWORDS.I)) return 'I';
      if (has(KEYWORDS.S)) return 'S';
      if (has(KEYWORDS.C)) return 'C';
      return ['D', 'I', 'S', 'C'][fallbackIndex] || 'D';
    }

    // ===== Perfis =====
    function computeProfiles() {
      const idx = {
        D: 0,
        I: 1,
        S: 2,
        C: 3
      };
      const mais = [0, 0, 0, 0],
        menos = [0, 0, 0, 0];
      selections.forEach((sel, gi) => {
        const texts = GROUPS[gi].opcoes;
        const fMais = mapToFactor(texts[sel.mais], sel.mais);
        const fMenos = mapToFactor(texts[sel.menos], sel.menos);
        mais[idx[fMais]] += 1;
        menos[idx[fMenos]] += 1;
      });

      // SELF, PERSONA, STRESS em -12..+12
      const SELF = menos.map(v => (24 - v) - 12);
      const PERSONA = mais.map(v => (v - 6));
      const STRESS = mais.map((v, i) => (v - menos[i]) / 2);

      return {
        SELF,
        PERSONA,
        STRESS,
        mais,
        menos
      };
    }

    // ===== Gráficos (Chart.js) =====
    function buildLineChart(ctx, data) {
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['D', 'I', 'S', 'C'],
          datasets: [{
            data,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 4,
            fill: false,
            tension: 0,
            borderColor: '#113cfc'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          elements: {
            line: {
              borderJoinStyle: 'round'
            }
          },
          layout: {
            padding: {
              left: 6,
              right: 6,
              top: 6,
              bottom: 2
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: true,
                color: '#000'
              },
              ticks: {
                color: '#000'
              }
            },
            y: {
              min: -12,
              max: 12,
              ticks: {
                stepSize: 2,
                color: '#000'
              },
              grid: {
                color: '#777',
                drawTicks: false
              },
              border: {
                display: true,
                color: '#000'
              }
            }
          }
        }
      });
    }

    // ===== Roda (canvas custom com “diamantes”) =====
    function drawWheel(canvas, values) { // values = [D,I,S,C] em -12..+12
      const ctx = canvas.getContext('2d');
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2,
        cy = H / 2,
        R = Math.min(W, H) / 2 - 26;

      // fundo
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, W, H);

      // círculo externo
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // “diamantes” concêntricos
      ctx.strokeStyle = '#5aa9fa55';
      ctx.lineWidth = 2;
      for (let t = R / 6; t <= R; t += R / 6) {
        ctx.beginPath();
        ctx.moveTo(cx, cy - t);
        ctx.lineTo(cx + t, cy);
        ctx.lineTo(cx, cy + t);
        ctx.lineTo(cx - t, cy);
        ctx.closePath();
        ctx.stroke();
      }

      // letras grandes
      ctx.fillStyle = '#000';
      ctx.font = 'bold 36px Arial';
      ctx.fillText('D', cx - 12, cy - R + 42);
      ctx.fillText('I', cx - 6, cy + R - 18);
      ctx.fillText('S', cx + R - 26, cy + 6);
      ctx.fillText('C', cx - R + 10, cy + 6);

      // polígono (valores SELF)
      const toR = (v) => ((v + 12) / 24) * R;
      const pts = [{
          x: cx,
          y: cy - toR(values[0])
        }, // D
        {
          x: cx,
          y: cy + toR(values[1])
        }, // I
        {
          x: cx + toR(values[2]),
          y: cy
        }, // S
        {
          x: cx - toR(values[3]),
          y: cy
        }, // C
      ];
      ctx.strokeStyle = '#113cfc';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = '#113cfc';
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // ===== Tabela de Comportamento =====
    const BEHAVIORS = [
      // D
      ['Assumir riscos maiores baseados em resultados potenciais', 'D'],
      ['Reagir aos problemas com rapidez', 'D'],
      ['Usar o poder e a autoridade para obter resultados', 'D'],
      ['Direcionar os esforços dos outros', 'D'],
      ['Assumir riscos com ideias não testadas', 'D'],
      ['Delegar responsabilidades a outros e fazer follow-up', 'D'],
      ['Agir com energia mesmo magoando outras pessoas', 'D'],
      ['Exigir resultados imediatos', 'D'],
      // I
      ['Influenciar pessoas transmitindo otimismo', 'I'],
      ['Influenciar ou inspirar outros verbalmente', 'I'],
      ['Usar o carisma e o entusiasmo pessoal', 'I'],
      ['Facilitar a interação entre as pessoas', 'I'],
      ['Verbalizar os pensamentos e sentimentos dos outros', 'I'],
      ['Reduzir a tensão no grupo por meio de interação verbal', 'I'],
      ['Resolver conflitos iniciando e promovendo análise e debate', 'I'],
      ['Encorajar verbalmente os esforços dos outros', 'I'],
      // S
      ['Manter métodos que se mostraram eficazes no passado', 'S'],
      ['Promover mudança através de processos cuidadosamente planejados', 'S'],
      ['Utilizar processos metódicos para fazer as tarefas', 'S'],
      ['Cooperar com outros para concluir as tarefas', 'S'],
      ['Solucionar problemas por meio de estudo e cooperação', 'S'],
      ['Responsabilizar-se pelo acompanhamento de detalhes', 'S'],
      ['Levar em conta os diferentes pontos de vista', 'S'],
      ['Elaborar rotinas funcionais', 'S'],
      // C
      ['Ouvir com reserva a opinião de outros', 'C'],
      ['Conferir a exatidão, especialmente do seu próprio trabalho', 'C'],
      ['Seguir cuidadosamente procedimentos e processos-chave', 'C'],
      ['Demonstrar autodisciplina trabalhando sozinho', 'C'],
      ['Analisar muitas variáveis para tomar decisão', 'C'],
      ['Conter-se quando estiver impaciente ou ansioso', 'C'],
      ['Manter-se neutro quando surgirem conflitos', 'C'],
      ['Avaliar cuidadosamente métodos e ações alternativas', 'C'],
    ];

    function buildBehaviorTable(selfScores) {
      const idx = {
        D: 0,
        I: 1,
        S: 2,
        C: 3
      };
      const tbody = document.querySelector('#behTable tbody');
      tbody.innerHTML = '';
      const txtForça = (v) => {
        const a = Math.abs(v);
        if (a >= 10) return 'Muito Alto';
        if (a >= 8) return 'Alto';
        if (a >= 4) return 'Médio';
        if (a >= 1) return 'Baixo';
        return 'Muito Baixo';
      };
      BEHAVIORS.forEach(([text, f]) => {
        const score = Math.round(selfScores[idx[f]]);
        const força = txtForça(score);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${text}</td><td style="text-align:center;font-weight:700">${score}</td><td style="text-align:center">${força}</td>`;
        tbody.appendChild(tr);
      });
    }

    // ===== Botão de resultados =====
    let chSelf, chPersona, chStress;
    document.getElementById('btnFinish').addEventListener('click', () => {
      if (selections.some(g => g.mais === null || g.menos === null)) {
        document.getElementById('validationMsg').style.display = 'inline';
        return;
      }
      document.getElementById('validationMsg').style.display = 'none';
      const P = computeProfiles();

      // Atualiza mini tabela
      document.getElementById('miniD').textContent = Math.round(P.SELF[0]);
      document.getElementById('miniI').textContent = Math.round(P.SELF[1]);
      document.getElementById('miniS').textContent = Math.round(P.SELF[2]);
      document.getElementById('miniC').textContent = Math.round(P.SELF[3]);

      // Line charts (Chart.js)
      const ctxSelf = document.getElementById('cvSelf').getContext('2d');
      const ctxPersona = document.getElementById('cvPersona').getContext('2d');
      const ctxStress = document.getElementById('cvStress').getContext('2d');
      if (chSelf) chSelf.destroy();
      if (chPersona) chPersona.destroy();
      if (chStress) chStress.destroy();
      chSelf = buildLineChart(ctxSelf, P.SELF);
      chPersona = buildLineChart(ctxPersona, P.PERSONA);
      chStress = buildLineChart(ctxStress, P.STRESS);

      // Roda (usa SELF)
      drawWheel(document.getElementById('cvWheel'), P.SELF);

      // Tabela de comportamento
      buildBehaviorTable(P.SELF);

      document.getElementById('results').style.display = '';
      document.getElementById('results').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  </script>
</body>

</html>