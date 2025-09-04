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
        'Pacificador, Harmonioso',                                // C
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
        'Se ninguém concorda e apoia, enfrento a oposição',       // I
    ]],
    ['numero' => 5,  'opcoes' => [
        'Bricalhão, Animado, Falante',                            // I
        'Decidido, Dinâmico, Determinado',                        // D
        'Tenta manter o equilíbrio no ambiente',                  // S
        'Tenta sempre seguir as regras',                          // C
    ]],
    ['numero' => 6,  'opcoes' => [
        'Administra o tempo com eficiência',                      // C
        'Sempre apressado, sente-se pressionado',                 // D
        'Eventos Sociais e coletivos são necessários',            // I
        'Gosta de terminar o que começou',                        // S
    ]],
    ['numero' => 7,  'opcoes' => [
        'Não gosta de mudanças de última hora',                   // S
        'Costuma fazer promessas',                                // I
        'Em conflitos, prefere argumentar tecnicamente',          // C
        'Se for o caso, não tem medo de lutar',                   // D
    ]],
    ['numero' => 8,  'opcoes' => [
        'Incentivador',                                           // I
        'Ouvinte',                                                // S
        'Analisa os fatos',                                       // C
        'Delegador',                                              // D
    ]],
    ['numero' => 9,  'opcoes' => [
        'Os resultados são o mais importante',                    // D
        'Fazer do jeito certo, exatidão e perfeição',             // C
        'Faz com que fique sempre organizado',                    // S
        'É melhor se um ajudar o outro',                          // I
    ]],
    ['numero' => 10, 'opcoes' => [
        'Não me faz falta, tenho autocontrole',                   // S
        'As vezes compra por impulso',                            // I
        'Irá aguardar tranquilamente, sem pressão',               // C
        'Gastarei naquilo que desejo, sem problemas',             // D
    ]],
    ['numero' => 11, 'opcoes' => [
        'Amigo, agradável, gosta de conversar',                   // I
        'Independente, não gosta de rotina',                      // D
        'Prefere amigos estáveis',                                // S
        'Quer exatidão das pessoas',                              // C
    ]],
    ['numero' => 12, 'opcoes' => [
        'Não bate de frente, flexível',                           // S
        'Detalhista',                                             // C
        'Se for necessário, muda o ponto de vista',               // I
        'Exigente, direto',                                       // D
    ]],
    ['numero' => 13, 'opcoes' => [
        'Deseja crescer rapidamente',                             // D
        'Satisfeito, contente com as coisas',                     // S
        'Expressa seus sentimentos abertamente',                  // I
        'Humilde, modesto',                                       // C
    ]],
    ['numero' => 14, 'opcoes' => [
        'Calmo, reservado',                                       // S
        'Feliz, tranqüilo',                                       // I
        'Amável, gentil',                                         // S
        'Ousado, audacioso',                                      // D
    ]],
    ['numero' => 15, 'opcoes' => [
        'Dedica tempo às outras pessoas',                         // I
        'Planeja o futuro, prepara-se',                           // C
        'Vai em busca de novas aventuras',                        // D
        'Reconhecido pela sua precisão',                          // C
    ]],
    ['numero' => 16, 'opcoes' => [
        'As regras devem ser desafiadas',                         // D
        'As regras deve ser justas',                              // C
        'As regras são chatas',                                   // I
        'As regras trazem segurança',                             // S
    ]],
    ['numero' => 17, 'opcoes' => [
        'Educação, cultura',                                      // C
        'Conquista, prêmios',                                     // D
        'Proteção, segurança',                                    // S
        'Reuniões sociais, grupo',                                // I
    ]],
    ['numero' => 18, 'opcoes' => [
        'Assume o comando de forma direta',                       // D
        'Sociável, alegre',                                       // I
        'Previsível, consistente',                                // S
        'Atencioso, cuidadoso',                                   // C
    ]],
    ['numero' => 19, 'opcoes' => [
        'Não é derrotado facilmente',                             // D
        'Fará como foi dito, tem facilidade em seguir o líder',   // S
        'Animado, divertido',                                     // I
        'Quer as coisas organizadas, ordeiro',                    // C
    ]],
    ['numero' => 20, 'opcoes' => [
        'Eu serei o líder',                                       // D
        'Eu serei organizado',                                    // C
        'Eu os influenciarei e convencerei',                      // I
        'Eu analisarei os fatos',                                 // C
    ]],
    ['numero' => 21, 'opcoes' => [
        'Penso nas outras pessoas primeiro',                      // S
        'Competitivo, gosto de desafios',                         // D
        'Otimista, positivo',                                     // I
        'Lógico, sistemático',                                    // C
    ]],
    ['numero' => 22, 'opcoes' => [
        'Agrada os outros, amigável',                             // I
        'Ri alto, animado',                                       // I
        'Corajoso, ousado',                                       // D
        'Quieto, reservado',                                      // S
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
        'Voltado para resultados',                                // D
        'Mantém alto padrão de precisão',                         // C
    ]],
];

$discKey = [
    ['I', 'S', 'D', 'C'], // Grupo 1
    ['S', 'D', 'I', 'C'], // Grupo 2
    ['S', 'C', 'I', 'D'], // Grupo 3
    ['S', 'C', 'D', 'I'], // Grupo 4
    ['I', 'D', 'S', 'C'], // Grupo 5
    ['C', 'D', 'I', 'S'], // Grupo 6
    ['S', 'I', 'C', 'D'], // Grupo 7
    ['I', 'S', 'C', 'D'], // Grupo 8
    ['D', 'C', 'S', 'I'], // Grupo 9
    ['S', 'I', 'C', 'D'], // Grupo 10
    ['I', 'D', 'S', 'C'], // Grupo 11
    ['S', 'C', 'I', 'D'], // Grupo 12
    ['D', 'S', 'I', 'C'], // Grupo 13
    ['S', 'I', 'S', 'D'], // Grupo 14 (Nota: 2 opções S)
    ['I', 'C', 'D', 'C'], // Grupo 15 (Nota: 2 opções C)
    ['D', 'C', 'I', 'S'], // Grupo 16
    ['C', 'D', 'S', 'I'], // Grupo 17
    ['D', 'I', 'S', 'C'], // Grupo 18
    ['D', 'S', 'I', 'C'], // Grupo 19
    ['D', 'C', 'I', 'C'], // Grupo 20 (Nota: 2 opções C)
    ['S', 'D', 'I', 'C'], // Grupo 21
    ['I', 'I', 'D', 'S'], // Grupo 22 (Nota: 2 opções I)
    ['D', 'I', 'S', 'C'], // Grupo 23
    ['S', 'I', 'D', 'C'], // Grupo 24
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
    <div id="stickyHeader">
      <div class="topRow">
        <div class="header"><h1 style="margin:0">DISC</h1></div>
        <div style="display:flex;align-items:center;gap:8px">
          <label title="Tema claro/escuro"><input id="themeToggle" class="toggle" type="checkbox" /></label>
        </div>
      </div>
      <div class="metaRow">
        <div class="progress"><span id="progressBar"></span></div>
        <small id="progressText">0/24</small>
        <div id="badgeInfo" class="badge">1 em MAIS e 1 em MENOS</div>
        
        <small class="warning" id="validationMsg" style="display:none;margin-left:12px">Preencha 1 MAIS e 1 MENOS em cada grupo.</small>
      </div>
    </div>

    <!-- Questionário -->
    <div id="groups"></div>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin:8px 0 16px">
      <button id="btnFinish" disabled>Ver resultados</button>
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
          <div class="row" style="font-weight:600">
            <div><h3 style="margin:0">Grupo ${g.numero}</h3></div><div style="text-align:center">MAIS</div><div style="text-align:center">MENOS</div>
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
      // Prevent selecting same option for MAIS and MENOS in the same group
      const currently = selections[gi];
      if (type === 'mais' && currently.menos === itemIdx) {
        // invalid: same as 'menos'
        // revert radio change and show validation
        input.checked = false;
        showValidation(`Escolha uma opção diferente para MAIS no Grupo ${gi + 1}.`);
        return;
      }
      if (type === 'menos' && currently.mais === itemIdx) {
        input.checked = false;
        showValidation(`Escolha uma opção diferente para MENOS no Grupo ${gi + 1}.`);
        return;
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

    // Small validation message helper (shows temporary message)
    function showValidation(msg) {
      const el = document.getElementById('validationMsg');
      el.textContent = msg;
      el.style.display = 'inline';
      clearTimeout(showValidation._t);
      showValidation._t = setTimeout(() => {
        el.style.display = 'none';
        el.textContent = 'Preencha 1 MAIS e 1 MENOS em cada grupo.';
      }, 2500);
    }

    function updateProgress() {
      const done = selections.filter(g => g.mais !== null && g.menos !== null).length;
      const pct = Math.round((done / GROUPS.length) * 100);
      document.getElementById('progressBar').style.width = pct + '%';
      document.getElementById('progressText').textContent = `${done}/${GROUPS.length}`;
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
          'Administração', 'Engenharia de Produção', 'Engenharia Civil', 'Engenharia Elétrica',
          'Engenharia Mecânica', 'Engenharia Química', 'Sistemas de Informação', 'Ciência da Computação',
          'Direito', 'Gestão Financeira', 'Marketing', 'Arquitetura e Urbanismo'
        ],
        profs: [
          'CEO/Diretor Executivo', 'Gerente de Projetos', 'Empreendedor(a)', 'Consultor Empresarial',
          'Engenheiro de Projetos', 'Advogado Empresarial', 'Coordenador de Operações', 'Gestor Comercial',
          'Product Manager', 'Líder de Equipe', 'Diretor de Vendas', 'Analista de Negócios Sênior',
          'Gerente de Desenvolvimento', 'Coordenador de Engenharia', 'Gestor de Marketing Estratégico'
        ],
        frases: [
          'Perfil orientado para resultados, com rapidez na tomada de decisões e gosto por desafios complexos.',
          'Ambientes competitivos e dinâmicos, com autonomia para liderar e inovar, potencializam a performance.'
        ]
      },
      I: {
        cursos: [
          'Comunicação Social – Publicidade e Propaganda', 'Marketing', 'Administração',
          'Design Gráfico', 'Gestão de Recursos Humanos', 'Psicologia',
          'Letras – Português e Inglês', 'Pedagogia (com ênfase em Educação Infantil)', 'Educação Física – Licenciatura'
        ],
        profs: [
          'Publicitário(a)', 'Social Media Manager', 'Coordenador de Marketing', 'Designer Gráfico',
          'Analista de RH', 'Relações Públicas', 'Apresentador(a)/Locutor(a)', 'Professor(a)',
          'Vendedor Consultivo', 'Coordenador de Eventos', 'Jornalista', 'Instrutor de Treinamentos',
          'Analista de Comunicação', 'Community Manager', 'Coordenador Pedagógico', 'Coach/Mentor'
        ],
        frases: [
          'Comunicação persuasiva, carisma natural e facilidade para networking e relacionamentos.',
          'Ambientes colaborativos, criativos e sociais favorecem o desenvolvimento e entrega de resultados.'
        ]
      },
      S: {
        cursos: [
          'Enfermagem', 'Fisioterapia', 'Fonoaudiologia', 'Nutrição', 'Psicologia',
          'Medicina Veterinária', 'Farmácia', 'Estética e Cosmética', 'Pedagogia (com ênfase em Educação Infantil)',
          'Ciências Contábeis', 'Logística', 'Gestão de Recursos Humanos', 'Educação Física – Bacharelado'
        ],
        profs: [
          'Enfermeiro(a)', 'Fisioterapeuta', 'Fonoaudiólogo(a)', 'Nutricionista', 'Psicólogo(a) Clínico',
          'Veterinário(a)', 'Farmacêutico(a)', 'Esteticista', 'Professor(a) de Educação Infantil',
          'Contador(a)', 'Analista de Logística', 'Analista de RH', 'Personal Trainer',
          'Terapeuta Ocupacional', 'Cuidador(a)', 'Assistente Social', 'Coordenador de Equipe de Saúde'
        ],
        frases: [
          'Perfil voltado ao cuidado, escuta ativa e construção de relações de confiança duradouras.',
          'Ambientes estáveis, com processos bem definidos e foco no bem-estar das pessoas maximizam resultados.'
        ]
      },
      C: {
        cursos: [
          'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia Mecânica', 'Engenharia Química',
          'Ciência da Computação', 'Sistemas de Informação', 'Arquitetura e Urbanismo', 'Biomedicina (Bacharelado)',
          'Farmácia', 'Ciências Contábeis', 'Direito', 'Gestão Financeira', 'Logística'
        ],
        profs: [
          'Engenheiro(a) de Projetos', 'Arquiteto(a)', 'Analista de Sistemas', 'Desenvolvedor(a) de Software',
          'Biomédico(a)', 'Farmacêutico(a) Industrial', 'Contador(a)', 'Auditor(a)', 'Advogado(a) Especialista',
          'Analista Financeiro', 'Coordenador de Qualidade', 'Analista de Logística', 'Perito Técnico',
          'Consultor em Compliance', 'Especialista em Dados/BI', 'Analista de Processos', 'Gerente de Qualidade'
        ],
        frases: [
          'Atenção meticulosa aos detalhes, padrão elevado de qualidade e decisões baseadas em dados concretos.',
          'Ambientes estruturados, com normas claras, métricas precisas e foco na excelência técnica sustentam a performance.'
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