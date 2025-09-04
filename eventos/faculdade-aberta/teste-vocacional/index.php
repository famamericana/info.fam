<?php
/* ============================================================
   DISC – 1 página, auto-scroll, 24 grupos (textos exatos)
   NOVO: Resultados mapeados corretamente para D/I/S/C,
   3 gráficos Chart.js (formas diferentes), Roda DISC,
   Predominante + Cursos & Profissões recomendados.
   ============================================================ */
$groups = [
  ['numero' => 1,  'opcoes' => [
    'Facilidade em Relacionamento, Simpático, Agradável',     // I
    'Acredita, confia nos outros',                            // S
    'Não tem medo de correr riscos',                          // D
    'Tolerante, Respeitoso',                                  // C
  ]],
  ['numero' => 2,  'opcoes' => [
    'Tanqüilo, fala devagar, reservado',                      // S
    'Desbravador, Otimista, Visionário',                      // D
    'Centro das atenções, sociável',                          // I
    'Pacificador, Harmonioso',                                // C (poderia ser S; aqui mantemos C=concilia/regras)
  ]],
  ['numero' => 3,  'opcoes' => [
    'Tem facilidade em escutar os outros',                    // S
    'Perfeccionista',                                         // C
    'Faz parte da equipe',                                    // I
    'Gosta de estabelecer metas',                             // D
  ]],
  ['numero' => 4,  'opcoes' => [
    'Se as coisas dão errado, fica triste',                   // S
    'Se estou triste, guardo meus sentimentos comigo',        // C
    'Em conflitos, digo meu lado da história',                // D
    'Se ninguém concorda e apoia, enfrento a oposição',       // I (influencia/apoio) 
  ]],
  ['numero' => 5,  'opcoes' => [
    'Bricalhão, Animado, Falante',                            // I
    'Decidido, Dinâmico, Determinado',                        // D
    'Tenta manter o equilíbrio no ambiente',                  // S
    'Busca qualidade e é exigente consigo',                   // C
  ]],
  ['numero' => 6,  'opcoes' => [
    'Gosta de liderança e de dirigir',                        // D
    'Gosta de análise e coisas técnicas',                     // C
    'Gosta de estar com as pessoas',                          // I
    'Gosta demais de rotina e estabilidade',                  // S
  ]],
  ['numero' => 7,  'opcoes' => [
    'Não gosta de mudanças de última hora',                   // S
    'Costuma fazer promessas',                                // I
    'Em conflitos, prefere argumentar tecnicamente',          // C
    'Se for o caso, não tem medo de lutar',                   // D
  ]],
  ['numero' => 8,  'opcoes' => [
    'Gosto de estar com meus amigos, prefiro andar em grupo', // I
    'Gosto de ter o controle e de dirigir',                   // D
    'Gosto de aprender em silêncio para não me desconcentrar', // C
    'Gosto de estar de acordo com as regras',                 // S
  ]],
  ['numero' => 9,  'opcoes' => [
    'Se alguém muda a rota do trabalho, aceito e me ajusto',  // S
    'Se alguém muda a rota do trabalho, confronto e questiono', // D
    'Se alguém muda a rota do trabalho, perco a confiança',   // I
    'Se alguém muda a rota do trabalho, analiso e me adequo', // C
  ]],
  ['numero' => 10, 'opcoes' => [
    'Em um time, sou o que questiona prazos e padrões',       // C
    'Em um time, sou o que anima e engaja o grupo',           // I
    'Em um time, sou o que mantém o ritmo e o clima',         // S
    'Em um time, sou o que define metas e resultados',        // D
  ]],
  ['numero' => 11, 'opcoes' => [
    'Se alguém me pressiona, fico na defensiva',              // S
    'Se alguém me pressiona, sou mais objetivo e direto',     // D
    'Se alguém me pressiona, tento apaziguar o conflito',     // I
    'Se alguém me pressiona, falo e escuto para chegar a um acordo', // C
  ]],
  ['numero' => 12, 'opcoes' => [
    'Quando recebo um novo projeto, planejo e defino o padrão de qualidade', // C
    'Quando recebo um novo projeto, penso nas pessoas e no ambiente',        // I
    'Quando recebo um novo projeto, penso no cronograma e no resultado',     // D
    'Quando recebo um novo projeto, penso em manter a consistência',         // S
  ]],
  ['numero' => 13, 'opcoes' => [
    'Tenho facilidade em me apresentar e falar em público',   // I
    'Tenho prazer em atingir objetivos e metas',              // D
    'Tenho facilidade em trabalhar em rotina',                // S
    'Tenho preocupação com detalhes e padrões',               // C
  ]],
  ['numero' => 14, 'opcoes' => [
    'Se algo dá errado, tento animar as pessoas',             // I
    'Se algo dá errado, assumo o controle e proponho solução', // D
    'Se algo dá errado, mantenho a calma e sigo o plano',     // S
    'Se algo dá errado, reviso o processo e os critérios',    // C
  ]],
  ['numero' => 15, 'opcoes' => [
    'Sou visto como alguém carismático e encorajador',        // I
    'Sou visto como alguém assertivo e competitivo',          // D
    'Sou visto como alguém leal e constante',                 // S
    'Sou visto como alguém minucioso e metódico',             // C
  ]],
  ['numero' => 16, 'opcoes' => [
    'Prefiro trabalhar onde tenha networking e visibilidade', // I
    'Prefiro trabalhar com desafios e mudanças frequentes',   // D
    'Prefiro trabalhar com segurança e ritmo linear',         // S
    'Prefiro trabalhar com normas e medições claras',         // C
  ]],
  ['numero' => 17, 'opcoes' => [
    'Dizem que sou persuasivo e agregador',                   // I
    'Dizem que sou direto e objetivo',                        // D
    'Dizem que sou calmo e tolerante',                        // S
    'Dizem que sou analítico e formal',                       // C
  ]],
  ['numero' => 18, 'opcoes' => [
    'Costumo empolgar e mobilizar as pessoas',                // I
    'Costumo tomar a frente e assumir riscos',                // D
    'Costumo manter estabilidade emocional',                  // S
    'Costumo conferir a qualidade e a conformidade',          // C
  ]],
  ['numero' => 19, 'opcoes' => [
    'Aproximo pessoas e crio conexões',                       // I
    'Resolvo rápido e enfrento barreiras',                    // D
    'Evito conflitos e mantenho o ritmo',                     // S
    'Sigo padrões e confiro detalhes',                        // C
  ]],
  ['numero' => 20, 'opcoes' => [
    'Falo bem em público e gosto de apresentar',              // I
    'Sou focado em metas e performance',                      // D
    'Sou sereno e previsível',                                // S
    'Sou estruturado e cuidadoso',                            // C
  ]],
  ['numero' => 21, 'opcoes' => [
    'Sou estimulante e positivo',                             // I
    'Sou firme e decidido',                                   // D
    'Sou constante e colaborativo',                           // S
    'Sou rigoroso e preciso',                                 // C
  ]],
  ['numero' => 22, 'opcoes' => [
    'Agrada os outros, amigável',                             // I
    'Ri alto, animado',                                       // I (mantemos I para coerência de sociabilidade)
    'Corajoso, ousado',                                       // D
    'Quieto, reservado',                                      // S/C (optamos S pela tranquilidade)
  ]],
  ['numero' => 23, 'opcoes' => [
    'Quer mais autoridade',                                   // D
    'Quer ter seus argumentos ouvidos',                       // I
    'Quer evitar conflitos pessoais',                         // S
    'Quer orientações claras',                                // C
  ]],
  ['numero' => 24, 'opcoes' => [
    'Apoiador, confiável',                                    // S
    'Criativo, inovador',                                     // I
    'Voltado para resultados',                                 // D
    'Mantém alto padrão de precisão',                         // C
  ]],
];

/* MAPA DISC por índice de opção (0..3) de cada grupo:
   Para cada grupo, um array de 4 letras correspondendo às opções.
*/
$discKey = [
  // 1..24 (cada subarray: [opção 0,1,2,3] => 'D'/'I'/'S'/'C')
  ['I', 'S', 'D', 'C'],
  ['S', 'D', 'I', 'C'],
  ['S', 'C', 'I', 'D'],
  ['S', 'C', 'D', 'I'],
  ['I', 'D', 'S', 'C'],
  ['D', 'C', 'I', 'S'],
  ['S', 'I', 'C', 'D'],
  ['I', 'D', 'C', 'S'],
  ['S', 'D', 'I', 'C'],
  ['C', 'I', 'S', 'D'],
  ['S', 'D', 'I', 'C'],
  ['C', 'I', 'D', 'S'],
  ['I', 'D', 'S', 'C'],
  ['I', 'D', 'S', 'C'],
  ['I', 'D', 'S', 'C'],
  ['I', 'D', 'S', 'C'],
  ['I', 'D', 'S', 'C'],
  ['I', 'D', 'S', 'C'],
  ['I', 'D', 'S', 'C'],
  ['I', 'D', 'S', 'C'],
  ['I', 'D', 'S', 'C'],
  ['I', 'I', 'D', 'S'],
  ['D', 'I', 'S', 'C'],
  ['S', 'I', 'D', 'C'],
];
?>
<!doctype html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8">
  <title>DISC </title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="stylesheet" href="style.css">
</head>

<body class="dark">
  <div class="container">
    <div class="header">
      <h1>Inventário DISC</h1>
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
      <!-- 0) Resumo -->
      <div class="card" id="summaryCard">
        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
          <strong style="font-size:15px">Resumo:</strong>
          <span class="pill">Predominante: <b id="predLabel"></b></span>
          <span class="pill">SELF (D/I/S/C): <b id="pillSelf"></b></span>
          <span class="pill">PERSONA (D/I/S/C): <b id="pillPersona"></b></span>
          <span class="pill">STRESS (D/I/S/C): <b id="pillStress"></b></span>
        </div>
      </div>

      <!-- 1) Três painéis (Chart.js em formatos diferentes) -->
      <div class="card">
        <div class="canvasWrap">
          <div class="canvasBox">
            <canvas id="cvSelf"></canvas>
            <div class="canvasTitle">SELF (Barra Horizontal)</div>
          </div>
          <div class="canvasBox">
            <canvas id="cvPersona"></canvas>
            <div class="canvasTitle">PERSONA (Radar)</div>
          </div>
          <div class="canvasBox">
            <canvas id="cvStress"></canvas>
            <div class="canvasTitle">STRESS (Linha)</div>
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

      <!-- 3) Recomendações -->
      <div class="card">
        <h3 style="margin:0 0 10px">Cursos & Profissões recomendados</h3>
        <div class="recommend" id="recommendBox"></div>
        <small style="display:block;margin-top:8px">⚠️ O DISC não determina talento nem limita escolhas; serve como <i>insight</i> para alinhar ambiente e estilo de trabalho.</small>
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
    const DISC_KEY = <?php echo json_encode($discKey, JSON_UNESCAPED_UNICODE); ?>;
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
              <div><strong>${['A','B','C','D'][idx]}.</strong> ${txt} <small style="margin-left:8px;opacity:.65">(${DISC_KEY[i][idx]})</small></div>
              <div style="text-align:center">${makeRadio('mais', idx, i, 'mais', idx)}</div>
              <div style="text-align:center">${makeRadio('menos', idx, i, 'menos', idx)}</div>
            </div>
          `).join('')}
        `;
        groupsWrap.appendChild(card);
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

    // ===== Cálculo dos Perfis =====
    function computeProfiles() {
      const score = {
        D: {
          M: 0,
          L: 0
        },
        I: {
          M: 0,
          L: 0
        },
        S: {
          M: 0,
          L: 0
        },
        C: {
          M: 0,
          L: 0
        }
      };
      selections.forEach((sel, gi) => {
        const key = DISC_KEY[gi];
        const traitMais = key[sel.mais]; // letra do traço escolhido em MAIS
        const traitMenos = key[sel.menos]; // letra do traço escolhido em MENOS
        score[traitMais].M += 1; // contagem Mais
        score[traitMenos].L += 1; // contagem Menos
      });
      // SELF = (Mais - Menos), PERSONA = Mais, STRESS = Menos (negativo para visual)
      const SELF = ['D', 'I', 'S', 'C'].map(k => score[k].M - score[k].L); // -12..+12
      const PERSONA = ['D', 'I', 'S', 'C'].map(k => score[k].M); // 0..12
      const STRESS = ['D', 'I', 'S', 'C'].map(k => -score[k].L); // 0..-12 (negativo)
      return {
        SELF,
        PERSONA,
        STRESS,
        raw: score
      };
    }

    // ===== Gráficos =====
    let chSelf, chPersona, chStress;
    const labelsDISC = ['D', 'I', 'S', 'C'];

    function buildBarH(ctx, data) {
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labelsDISC,
          datasets: [{
            label: 'SELF',
            data,
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              min: -12,
              max: 12,
              ticks: {
                stepSize: 3
              }
            },
            y: {
              grid: {
                display: false
              }
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

    function buildRadar(ctx, data) {
      return new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labelsDISC,
          datasets: [{
            label: 'PERSONA',
            data,
            borderWidth: 1,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 12,
              ticks: {
                stepSize: 2
              }
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

    function buildLine(ctx, data) {
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: labelsDISC,
          datasets: [{
            label: 'STRESS',
            data,
            borderWidth: 2,
            tension: .3,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: -12,
              max: 0,
              ticks: {
                stepSize: 3
              }
            },
            x: {
              grid: {
                display: false
              }
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

    // ===== Roda =====
    function drawWheel(canvas, arr) { // arr = SELF (D,I,S,C)
      const ctx = canvas.getContext('2d');
      const w = canvas.width,
        h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      // base
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 1;
      // grid
      const cx = w / 2,
        cy = h / 2,
        R = Math.min(w, h) * 0.42;
      for (let r = R; r > 0; r -= R / 4) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      // eixos
      const angs = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // D,I,S,C
      angs.forEach(a => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        ctx.stroke();
      });
      // rótulos
      ctx.fillStyle = '#111';
      ctx.font = '14px system-ui';
      const labs = ['D', 'I', 'S', 'C'];
      angs.forEach((a, i) => {
        const tx = cx + (R + 18) * Math.cos(a);
        const ty = cy + (R + 18) * Math.sin(a) + 5;
        ctx.fillText(labs[i], tx - 5, ty);
      });
      // polígono SELF
      ctx.beginPath();
      arr.forEach((v, i) => {
        const a = angs[i];
        const r = R * ((v + 12) / 24); // normaliza -12..+12 => 0..1
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(59,130,246,0.25)';
      ctx.fill();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // ===== Recomendações por Predominante =====
    const RECO = {
      D: {
        cursos: [
          'Administração', 'Engenharia de Produção', 'Engenharia Civil',
          'Sistemas de Informação / Ciência da Computação', 'Direito', 'Gestão Comercial'
        ],
        profs: [
          'Gestão/Coordenação', 'Empreendedor(a)', 'Liderança de Operações/Projetos',
          'Vendas/Negócios (Hunter/Key Account)', 'Consultoria Estratégica', 'Product Manager'
        ],
        frases: [
          'Foco em resultados, rapidez na decisão, gosto por desafios e metas agressivas.',
          'Ambientes competitivos e com autonomia tendem a potencializar a performance.'
        ]
      },
      I: {
        cursos: [
          'Publicidade e Propaganda', 'Marketing', 'Relações Públicas',
          'Administração', 'Design/UX', 'Eventos'
        ],
        profs: [
          'Marketing Digital/Social Media', 'Vendas e Atendimento',
          'Comunicação/Branding', 'RH/Employer Branding', 'Apresentador(a)/Conteúdo',
          'Desenvolvimento de Negócios (BDR/SDR)'
        ],
        frases: [
          'Comunicação persuasiva, energia social e facilidade de networking.',
          'Ambientes colaborativos e criativos favorecem a entrega.'
        ]
      },
      S: {
        cursos: [
          'Psicologia', 'Fisioterapia', 'Enfermagem', 'Nutrição',
          'Contábeis', 'Logística'
        ],
        profs: [
          'Suporte/Customer Success', 'Operações/Backoffice', 'Recursos Humanos',
          'Educação/Docência', 'Qualidade de Atendimento', 'Gestão de Rotinas/PMO'
        ],
        frases: [
          'Constância, escuta ativa e construção de relações de confiança.',
          'Ambientes estáveis e com processos claros maximizam resultados.'
        ]
      },
      C: {
        cursos: [
          'Engenharia (Elétrica/Civil/Mecânica)', 'Ciência da Computação',
          'Sistemas de Informação', 'Direito', 'Arquitetura e Urbanismo'
        ],
        profs: [
          'Qualidade/Compliance', 'Dados/BI', 'Desenvolvimento de Software',
          'Engenharia/Projetos', 'Jurídico/Perícia', 'Arquitetura/Planejamento'
        ],
        frases: [
          'Atenção a detalhes, padrão elevado e tomada de decisão baseada em evidências.',
          'Ambientes com normas, métricas e precisão sustentam a performance.'
        ]
      }
    };

    function renderRecommendations(pred) {
      const box = document.getElementById('recommendBox');
      const r = RECO[pred];
      box.innerHTML = `
        <div>
          <strong>Por que ${pred}?</strong>
          <p style="margin:.5rem 0 0.75rem">${r.frases.join(' ')}</p>
          <div><span class="pill">Estilo: <b>${pred}</b></span></div>
        </div>
        <div>
          <strong>Cursos indicados</strong>
          <p style="margin:.5rem 0">${r.cursos.join(' · ')}</p>
          <strong>Profissões alinhadas</strong>
          <p style="margin:.5rem 0">${r.profs.join(' · ')}</p>
        </div>
      `;
    }

    // ===== Botão de resultados =====
    document.getElementById('btnFinish').addEventListener('click', () => {
      if (selections.some(g => g.mais === null || g.menos === null)) {
        document.getElementById('validationMsg').style.display = 'inline';
        return;
      }
      document.getElementById('validationMsg').style.display = 'none';
      const P = computeProfiles();

      // Mini tabela (SELF)
      const [d, i, s, c] = P.SELF.map(v => Math.round(v));
      document.getElementById('miniD').textContent = d;
      document.getElementById('miniI').textContent = i;
      document.getElementById('miniS').textContent = s;
      document.getElementById('miniC').textContent = c;

      // Resumo (pill)
      const pill = arr => arr.map(v => String(v)).join('/');
      document.getElementById('pillSelf').textContent = pill([d, i, s, c]);
      document.getElementById('pillPersona').textContent = pill(P.PERSONA.map(v => Math.round(v)));
      document.getElementById('pillStress').textContent = pill(P.STRESS.map(v => Math.round(v)));

      // Predominante (maior SELF)
      const idxMax = [d, i, s, c].reduce((best, cur, idx, arr) => cur > arr[best] ? idx : best, 0);
      const pred = ['D', 'I', 'S', 'C'][idxMax];
      document.getElementById('predLabel').textContent = pred;

      // Gráficos
      const ctxSelf = document.getElementById('cvSelf').getContext('2d');
      const ctxPersona = document.getElementById('cvPersona').getContext('2d');
      const ctxStress = document.getElementById('cvStress').getContext('2d');
      if (chSelf) chSelf.destroy();
      if (chPersona) chPersona.destroy();
      if (chStress) chStress.destroy();
      chSelf = buildBarH(ctxSelf, P.SELF);
      chPersona = buildRadar(ctxPersona, P.PERSONA);
      chStress = buildLine(ctxStress, P.STRESS);

      // Roda (usa SELF)
      drawWheel(document.getElementById('cvWheel'), P.SELF);

      // Recomendações
      renderRecommendations(pred);

      document.getElementById('results').style.display = '';
      document.getElementById('results').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  </script>
</body>

</html>