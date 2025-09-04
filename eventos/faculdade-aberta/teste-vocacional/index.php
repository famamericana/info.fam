<?php
/* ============================================================
   DISC – 1 página (24 grupos embutidos) + 3 gráficos Chart.js
   - Marque 1 "MAIS" e 1 "MENOS" por grupo.
   - Auto-scroll para o próximo grupo quando completar um grupo.
   - Resultados só aparecem ao clicar "Ver resultados".
   ============================================================ */

// >>> TEXTO EXATO DOS 24 GRUPOS (extraído do seu CSV) <<<
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
  <title>DISC – Inventário (24 grupos, uma página)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root {
      --bg: #0b1020;
      --fg: #e8ecf1;
      --muted: #9aa7b1;
      --card: #121a34;
      --accent: #5aa9fa;
      --ok: #22c55e;
      --warn: #fbbf24;
      --border: #243056;
    }

    .light {
      --bg: #f7f9fc;
      --fg: #0d1323;
      --muted: #4b5563;
      --card: #ffffff;
      --accent: #2563eb;
      --ok: #16a34a;
      --warn: #d97706;
      --border: #e5e7eb;
    }

    * {
      box-sizing: border-box
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--fg);
      font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, "Helvetica Neue", Arial
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 24px
    }

    .header {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px
    }

    h1 {
      margin: 0;
      font-size: 22px
    }

    small {
      color: var(--muted)
    }

    .toggle {
      appearance: none;
      width: 46px;
      height: 28px;
      border-radius: 20px;
      background: var(--border);
      position: relative;
      cursor: pointer;
      border: 1px solid var(--border)
    }

    .toggle:checked {
      background: var(--accent)
    }

    .toggle::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #fff;
      transition: .2s
    }

    .toggle:checked::after {
      left: 21px
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px;
      box-shadow: 0 10px 30px #00000018;
      margin-bottom: 14px
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 90px 90px;
      gap: 12px;
      align-items: center;
      padding: 10px;
      border: 1px dashed var(--border);
      border-radius: 12px;
      margin: 10px 0
    }

    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 999px;
      border: 1px solid var(--border);
      color: var(--muted);
      font-size: 12px
    }

    .kbd {
      font: 12px/1.2 ui-monospace;
      background: var(--border);
      padding: 2px 6px;
      border-radius: 6px
    }

    .progress {
      height: 8px;
      background: var(--border);
      border-radius: 999px;
      overflow: hidden;
      margin: 8px 0 14px
    }

    .progress>span {
      display: block;
      height: 100%;
      background: var(--ok);
      width: 0%
    }

    .controls {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin: 10px 0
    }

    button {
      background: var(--accent);
      color: white;
      border: 0;
      border-radius: 12px;
      padding: 10px 14px;
      font-weight: 600;
      cursor: pointer
    }

    button:disabled {
      opacity: .6;
      cursor: not-allowed
    }

    .warning {
      color: var(--warn)
    }

    .table-like {
      display: grid;
      grid-template-columns: 80px 1fr 1fr 1fr;
      gap: 8px;
      margin-top: 10px
    }

    .table-like div {
      padding: 6px 8px;
      border: 1px solid var(--border);
      border-radius: 10px
    }

    .anchor {
      scroll-margin-top: 16px
    }
  </style>
</head>

<body class="dark">
  <div class="container">
    <div class="header">
      <div>
        <h1>Inventário DISC</h1>
        <small>Marque <b>1</b> em <span class="kbd">MAIS</span> e <b>1</b> em <span class="kbd">MENOS</span> por grupo. Ao completar um grupo, a página rola para o próximo automaticamente.</small>
      </div>
      <label title="Alternar tema claro/escuro"><input id="themeToggle" class="toggle" type="checkbox" /></label>
    </div>

    <div class="progress"><span id="progressBar"></span></div>
    <small id="progressText">0/24 grupos concluídos</small>
    <small class="warning" id="validationMsg" style="display:none;margin-left:12px">Preencha 1 MAIS e 1 MENOS em cada grupo.</small>

    <div id="groups"></div>

    <div class="controls">
      <button id="btnFinish" disabled>Ver resultados ✅</button>
    </div>

    <div id="results" style="display:none; margin-top:20px">
      <div class="card">
        <h3 style="margin:0 0 10px">Gráfico I – Ambiente (MAIS)</h3>
        <canvas id="chartAmbiente" height="220"></canvas>
      </div>
      <div class="card">
        <h3 style="margin:0 0 10px">Gráfico II – Diferença (MAIS − MENOS)</h3>
        <canvas id="chartDiferenca" height="220"></canvas>
      </div>
      <div class="card">
        <h3 style="margin:0 0 10px">Gráfico III – Natural (aprox.)</h3>
        <canvas id="chartNatural" height="220"></canvas>
      </div>

      <div class="card">
        <h3 style="margin:0 0 10px">Resumo numérico</h3>
        <div class="table-like">
          <div class="badge">Fator</div>
          <div class="badge">MAIS (Ambiente)</div>
          <div class="badge">MENOS</div>
          <div class="badge">Natural (24 − MENOS)</div>
          <div><b>D</b></div>
          <div id="tD1">0</div>
          <div id="tD2">0</div>
          <div id="tD3">0</div>
          <div><b>I</b></div>
          <div id="tI1">0</div>
          <div id="tI2">0</div>
          <div id="tI3">0</div>
          <div><b>S</b></div>
          <div id="tS1">0</div>
          <div id="tS2">0</div>
          <div id="tS3">0</div>
          <div><b>C</b></div>
          <div id="tC1">0</div>
          <div id="tC2">0</div>
          <div id="tC3">0</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // ===== Dados do PHP =====
    const GROUPS = <?php echo json_encode($groups, JSON_UNESCAPED_UNICODE); ?>;

    // ===== Tema claro/escuro =====
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

    // ===== Renderização (uma página) =====
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
        <div class="badge">Marque <b>1</b> em MAIS e <b>1</b> em MENOS</div>
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

      // Restaura marcações
      selections.forEach((sel, gi) => {
        if (sel.mais !== null) {
          const r = document.querySelector(`input[name="mais[${gi}]"][value="${sel.mais}"]`);
          if (r) r.checked = true;
        }
        if (sel.menos !== null) {
          const r = document.querySelector(`input[name="menos[${gi}]"][value="${sel.menos}"]`);
          if (r) r.checked = true;
        }
      });

      // Listeners
      groupsWrap.querySelectorAll('input[type="radio"]').forEach(r => r.addEventListener('change', onSelect));
      updateProgress();
    }
    render();

    function onSelect(e) {
      const input = e.target;
      const gi = parseInt(input.dataset.g, 10);
      const type = input.dataset.type;
      const itemIdx = parseInt(input.dataset.item, 10);

      // Impede MAIS e MENOS na mesma opção
      if (type === 'mais' && selections[gi].menos === itemIdx) {
        selections[gi].menos = null;
        const rm = document.querySelector(`input[name="menos[${gi}]"][value="${itemIdx}"]`);
        if (rm) rm.checked = false;
      } else if (type === 'menos' && selections[gi].mais === itemIdx) {
        selections[gi].mais = null;
        const rp = document.querySelector(`input[name="mais[${gi}]"][value="${itemIdx}"]`);
        if (rp) rp.checked = false;
      }

      selections[gi][type] = itemIdx;
      updateProgress();

      // Se completou (tem MAIS e MENOS), rola para o próximo grupo
      if (selections[gi].mais !== null && selections[gi].menos !== null) {
        const next = document.getElementById(`group-${gi+1}`);
        if (next) next.scrollIntoView({
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

    // ===== Lógica de pontuação =====
    // Se tiver gabarito, preencha por grupo/opção (A,B,C,D) para MAIS:
    const customMapping = {
      // "1": { "MAIS": ["I","D","S","C"] },
      // "2": { "MAIS": ["S","D","I","C"] },
      // ...
    };
    const KEYWORDS = {
      D: ['resultado', 'resultados', 'rápido', 'lider', 'liderar', 'decidir', 'risco', 'coraj', 'lutar', 'meta', 'objetivo', 'compet', 'dinâmico', 'determinado', 'assumir', 'dirigir', 'controle', 'questiona'],
      I: ['relacion', 'simpát', 'agrad', 'fala', 'falante', 'anim', 'incentiv', 'entusias', 'otimista', 'popular', 'amig', 'amigo', 'convers', 'persuas', 'carism', 'apresentar', 'público', 'engaja', 'anima'],
      S: ['tranquil', 'calm', 'pacient', 'escuta', 'respeit', 'tolerant', 'apoia', 'constante', 'cooper', 'harmonia', 'estável', 'rotina', 'previs', 'equilíbrio', 'apaziguar', 'consist'],
      C: ['organiza', 'detalh', 'técnic', 'tecnic', 'precis', 'analít', 'regras', 'padr', 'prazo', 'controle', 'perfeccion', 'qualidad', 'conform', 'processo', 'critéri', 'planejo', 'exigente']
    };

    function norm(s) {
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function mapToFactor(grupoNumero, itemIndex, text) {
      const g = String(grupoNumero);
      if (customMapping[g]?.MAIS?.[itemIndex]) return customMapping[g].MAIS[itemIndex].toUpperCase();
      const t = norm(text);
      const has = (arr) => arr.some(k => t.includes(norm(k)));
      if (has(KEYWORDS.D)) return 'D';
      if (has(KEYWORDS.I)) return 'I';
      if (has(KEYWORDS.S)) return 'S';
      if (has(KEYWORDS.C)) return 'C';
      // fallback por índice A,B,C,D -> D,I,S,C
      return ['D', 'I', 'S', 'C'][itemIndex] || 'D';
    }

    function computeScores() {
      const idx = {
        D: 0,
        I: 1,
        S: 2,
        C: 3
      };
      const mais = [0, 0, 0, 0];
      const menos = [0, 0, 0, 0];

      selections.forEach((sel, gi) => {
        const g = GROUPS[gi];
        const fMais = mapToFactor(g.numero, sel.mais, g.opcoes[sel.mais]);
        const fMenos = mapToFactor(g.numero, sel.menos, g.opcoes[sel.menos]);
        mais[idx[fMais]] += 1;
        menos[idx[fMenos]] += 1;
      });

      const ambiente = mais.slice(); // Graf. I
      const diferenca = mais.map((v, i) => v - menos[i]); // Graf. II
      const natural = menos.map(v => (24 - v)); // Graf. III (aprox.)

      return {
        ambiente,
        diferenca,
        natural,
        mais,
        menos
      };
    }

    // ===== Gráficos =====
    let ch1, ch2, ch3;

    function buildBar(ctx, label, data) {
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['D', 'I', 'S', 'C'],
          datasets: [{
            label,
            data,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }

    document.getElementById('btnFinish').addEventListener('click', () => {
      const allDone = selections.every(g => g.mais !== null && g.menos !== null);
      if (!allDone) {
        document.getElementById('validationMsg').style.display = 'inline';
        return;
      }
      document.getElementById('validationMsg').style.display = 'none';

      const {
        ambiente,
        diferenca,
        natural,
        mais,
        menos
      } = computeScores();
      document.getElementById('results').style.display = '';

      const ctx1 = document.getElementById('chartAmbiente').getContext('2d');
      const ctx2 = document.getElementById('chartDiferenca').getContext('2d');
      const ctx3 = document.getElementById('chartNatural').getContext('2d');
      if (ch1) ch1.destroy();
      if (ch2) ch2.destroy();
      if (ch3) ch3.destroy();
      ch1 = buildBar(ctx1, 'Ambiente (MAIS)', ambiente);
      ch2 = buildBar(ctx2, 'Diferença (MAIS − MENOS)', diferenca);
      ch3 = buildBar(ctx3, 'Natural (24 − MENOS)', natural);

      // Tabela
      const put = (id, val) => document.getElementById(id).textContent = String(val);
      put('tD1', mais[0]);
      put('tI1', mais[1]);
      put('tS1', mais[2]);
      put('tC1', mais[3]);
      put('tD2', menos[0]);
      put('tI2', menos[1]);
      put('tS2', menos[2]);
      put('tC2', menos[3]);
      put('tD3', natural[0]);
      put('tI3', natural[1]);
      put('tS3', natural[2]);
      put('tC3', natural[3]);

      // rola até os resultados
      document.getElementById('results').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  </script>
</body>

</html>