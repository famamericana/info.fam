<?php
// Vocational Test based on DISC (D, I, S, C)
// One-file PHP app with Chart.js visualizations
// Now with: accordion (pergunta abre ao clicar), auto-avança, e tema claro/escuro.

$questions = [
  // Dominância (D)
  ["text" => "Gosto de assumir o comando em projetos.", "dim" => "D"],
  ["text" => "Tomo decisões rapidamente, mesmo sob pressão.", "dim" => "D"],
  ["text" => "Busco resultados ambiciosos e metas desafiadoras.", "dim" => "D"],
  ["text" => "Sinto-me confortável em ambientes competitivos.", "dim" => "D"],
  ["text" => "Prefiro resolver conflitos de forma direta.", "dim" => "D"],
  ["text" => "Tenho iniciativa para começar coisas novas.", "dim" => "D"],

  // Influência (I)
  ["text" => "Faço amizades e crio conexões com facilidade.", "dim" => "I"],
  ["text" => "Gosto de apresentar ideias para públicos.", "dim" => "I"],
  ["text" => "Sou otimista e motivo o time naturalmente.", "dim" => "I"],
  ["text" => "Prefiro trabalhos que envolvam pessoas e networking.", "dim" => "I"],
  ["text" => "Sinto-me à vontade improvisando quando necessário.", "dim" => "I"],
  ["text" => "Gosto de persuadir e influenciar decisões.", "dim" => "I"],

  // Estabilidade (S)
  ["text" => "Valorizo estabilidade e rotina no dia a dia.", "dim" => "S"],
  ["text" => "Tenho paciência para ouvir e apoiar colegas.", "dim" => "S"],
  ["text" => "Prefiro colaborar do que competir.", "dim" => "S"],
  ["text" => "Mantenho a calma em situações tensas.", "dim" => "S"],
  ["text" => "Preocupo-me com o bem-estar do grupo.", "dim" => "S"],
  ["text" => "Gosto de tarefas que exigem constância e acompanhamento.", "dim" => "S"],

  // Cautela / Conformidade (C)
  ["text" => "Sou detalhista e atento à qualidade.", "dim" => "C"],
  ["text" => "Gosto de seguir normas e processos bem definidos.", "dim" => "C"],
  ["text" => "Baseio minhas decisões em dados e análise.", "dim" => "C"],
  ["text" => "Revisar e checar informações é natural para mim.", "dim" => "C"],
  ["text" => "Prefiro planejar antes de agir.", "dim" => "C"],
  ["text" => "Tenho facilidade com números, lógica ou sistemas.", "dim" => "C"],
];

$totalPerDim = ["D" => 6, "I" => 6, "S" => 6, "C" => 6];

$isResult = ($_SERVER['REQUEST_METHOD'] === 'POST');
$scores = ["D" => 0, "I" => 0, "S" => 0, "C" => 0];
$answers = [];

if ($isResult) {
  foreach ($questions as $idx => $q) {
    $name = 'q' . ($idx + 1);
    if (!isset($_POST[$name])) {
      $isResult = false;
      break;
    }
    $val = (int) $_POST[$name];
    $answers[$name] = $val;
    $scores[$q['dim']] += $val;
  }
}

function topTwoDims(array $scores): array
{
  arsort($scores);
  $k = array_keys($scores);
  return [$k[0], $k[1]];
}
function suggestionsByDim(): array
{
  // Mapeamento para cursos da FAM (Graduação e Tecnólogos)
  return [
    'D' => [
      'Administração',
      'Gestão de Recursos Humanos',
      'Gestão Financeira',
      'Engenharia de Produção',
      'Arquitetura e Urbanismo'
    ],
    'I' => [
      'Comunicação Social – Publicidade e Propaganda',
      'Marketing',
      'Relações Públicas (áreas de comunicação)'
    ],
    'S' => [
      'Pedagogia',
      'Psicologia',
      'Enfermagem',
      'Fisioterapia',
      'Nutrição',
      'Fonoaudiologia'
    ],
    'C' => [
      'Engenharia Civil',
      'Engenharia Elétrica',
      'Engenharia Mecânica',
      'Ciência da Computação',
      'Sistemas de Informação',
      'Direito',
      'Arquitetura e Urbanismo'
    ],
  ];
}
function suggestionsByPair(string $a, string $b): array
{
  // Combinações direcionadas para cursos FAM relacionados
  $map = [
    'DI' => ['Administração', '  Gestão de Recursos Humanos', '  Marketing'],
    'ID' => ['Comunicação Social – Publicidade e Propaganda', '  Marketing', 'Administração'],
    'DS' => ['Pedagogia', 'Psicologia', 'Serviço na área de Saúde (Enfermagem)'],
    'SD' => ['Enfermagem', 'Fisioterapia', 'Nutrição'],
    'DC' => ['Engenharia de Produção', 'Engenharia Civil', 'Ciência da Computação', 'Arquitetura e Urbanismo'],
    'CD' => ['Engenharia (diversas habilitações)', 'Sistemas de Informação', 'Ciência da Computação', 'Arquitetura e Urbanismo'],
    'IS' => ['Recursos Humanos (Tecnólogo)', 'Pedagogia', 'Psicologia', 'Fonoaudiologia'],
    'SI' => ['Pedagogia', 'Educação Física – Licenciatura', 'Psicologia'],
    'IC' => ['Ciência da Computação', 'Sistemas de Informação', '  Design Gráfico'],
    'CI' => ['Comunicação Social – Publicidade e Propaganda', '  Design Gráfico', 'Marketing'],
    'SC' => ['Engenharia Civil', 'Engenharia de Produção', '  Logística'],
    'CS' => ['Contábeis (Ciências Contábeis)', 'Administração', '  Gestão Financeira']
  ];
  return $map[$a . $b] ?? [];
}
function careersByDim(): array
{
  // Mapeamento para carreiras/profissões por dimensão
  return [
    'D' => ['Gestor/Líder', 'Empreendedor', 'Diretor Executivo', 'Consultor Estratégico', 'Coordenador de Projetos', 'Arquiteto'],
    'I' => ['Publicitário', 'Vendedor', 'Apresentador', 'Relações Públicas', 'Coach/Palestrante', 'Marketing Digital'],
    'S' => ['Psicólogo', 'Enfermeiro', 'Professor', 'Assistente Social', 'Terapeuta', 'Fonoaudiólogo'],
    'C' => ['Engenheiro', 'Analista de Sistemas', 'Contador', 'Advogado', 'Cientista de Dados', 'Auditor', 'Arquiteto/Urbanista']
  ];
}
function dimDescriptions(): array
{
  return [
    'D' => 'Dominância (D): foco em resultados, decisão e assertividade.',
    'I' => 'Influência (I): foco em comunicação, persuasão e relacionamento.',
    'S' => 'Estabilidade (S): foco em cooperação, harmonia e constância.',
    'C' => 'Cautela/Conformidade (C): foco em qualidade, análise e precisão.'
  ];
}
?>
<!doctype html>
<html lang="pt-br" data-theme="dark">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Teste Vocacional – DISC</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="stylesheet" href="style.css" />
</head>

<body>
  <div class="wrap">
    <div class="card">
      <header class="hero">
        <div>
          <div class="title">Teste Vocacional – Perfil DISC</div>
          <div class="subtitle">Todas as perguntas aparecem na página. Clique em cada uma para <strong>ver as respostas</strong> e, ao responder, a próxima abre automaticamente.</div>
        </div>
        <div class="toolbar">
          <button class="toggle" id="themeToggle" type="button" aria-pressed="false">🌗 Tema</button>
        </div>
      </header>

      <?php if (!$isResult): ?>
        <form method="post" autocomplete="off" novalidate id="quizForm">
          <div class="inline-help">Escala: 1 (Discordo totalmente) • 5 (Concordo totalmente)</div>
          <?php foreach ($questions as $i => $q): $n = $i + 1; ?>
            <details class="q" id="q<?php echo $n; ?>">
              <summary>
                <span class="q-num"><?php echo $n; ?></span>
                <span class="q-text"><?php echo htmlspecialchars($q['text']); ?></span>
                <span class="q-dim">Fator: <?php echo htmlspecialchars($q['dim']); ?></span>
              </summary>
              <div class="q-body">
                <div class="likert">
                  <label class="muted">1</label>
                  <div class="opts">
                    <?php for ($val = 1; $val <= 5; $val++): ?>
                      <label>
                        <input type="radio" name="q<?php echo $n; ?>" value="<?php echo $val; ?>" required>
                        <div class="opt"><?php echo $val; ?></div>
                      </label>
                    <?php endfor; ?>
                  </div>
                  <label class="muted">5</label>
                </div>
              </div>
            </details>
          <?php endforeach; ?>
          <div class="actions">
            <button class="btn" type="submit">Ver meu perfil</button>
            <button class="btn secondary" type="reset" id="resetBtn">Limpar respostas</button>
          </div>
        </form>
      <?php else: ?>
        <?php
        $maxPerDim = $totalPerDim['D'] * 5; // 30
        $percent = [
          'D' => round(($scores['D'] / $maxPerDim) * 100),
          'I' => round(($scores['I'] / $maxPerDim) * 100),
          'S' => round(($scores['S'] / $maxPerDim) * 100),
          'C' => round(($scores['C'] / $maxPerDim) * 100)
        ];
        $descriptions = dimDescriptions();
        [$top1, $top2] = topTwoDims($scores);
        $pairSugs = suggestionsByPair($top1, $top2);
        $dimSugs = suggestionsByDim();
        $careerSugs = careersByDim();
        ?>

        <div class="result">
          <div class="grid">
            <div>
              <div class="callout" style="margin-bottom:12px;">
                <span class="pill">Seu destaque</span>
                <div style="margin-top:8px;font-weight:700;font-size:20px;letter-spacing:-.01em;">
                  <?php echo $top1; ?> + <?php echo $top2; ?>
                </div>
                <div class="muted" style="margin-top:6px;">
                  <?php echo htmlspecialchars($descriptions[$top1]); ?><br>
                  <?php echo htmlspecialchars($descriptions[$top2]); ?>
                </div>
              </div>
              <canvas id="barChart" height="210"></canvas>
              <div class="muted" style="margin-top:10px;font-size:12px;">Pontuações por fator (0–<?php echo $maxPerDim; ?>) e percentual.</div>
            </div>
            <div>
              <canvas id="radarChart" height="220"></canvas>
             
            </div>
      
          </div>
                 <div style="margin-top:12px;">
                <div style="font-weight:700;margin-bottom:6px;">Sugestões de carreiras</div>
                <div class="muted" style="margin:6px 0 4px;">Perfis profissionais baseados em seus fatores principais:</div>
                
                <!-- Carreiras do fator 1 -->
                <div style="margin-bottom:8px;">
                  <div style="font-weight:600;font-size:14px;margin-bottom:4px;"><?php echo $top1; ?> - <?php echo explode(':', $descriptions[$top1])[0]; ?></div>
                  <?php foreach ($careerSugs[$top1] as $career): ?><span class="tag"><?php echo htmlspecialchars($career); ?></span><?php endforeach; ?>
                </div>
                
                <!-- Carreiras do fator 2 -->
                <div style="margin-bottom:8px;">
                  <div style="font-weight:600;font-size:14px;margin-bottom:4px;"><?php echo $top2; ?> - <?php echo explode(':', $descriptions[$top2])[0]; ?></div>
                  <?php foreach ($careerSugs[$top2] as $career): ?><span class="tag"><?php echo htmlspecialchars($career); ?></span><?php endforeach; ?>
                </div>
              </div>
          <div class="callout">
            <div style="font-weight:700;margin-bottom:6px;">Como interpretar</div>
            <div class="muted">Este teste é um ponto de partida. Combine o resultado com conversas, trilhas de estudo e experiências reais (estágio, projetos, voluntariado).</div>
            <div style="margin-top:8px;">
              <div style="font-weight:700;">Cursos FAM recomendados</div>
              
              <!-- Cursos combinados se houver par específico -->
              <?php if (!empty($pairSugs)): ?>
                <div class="muted" style="margin:6px 0 4px;">Combinando seus dois principais fatores (<strong><?php echo $top1 . $top2; ?></strong>), observe estes cursos:</div>
                <?php foreach ($pairSugs as $c): ?><span class="tag"><?php echo htmlspecialchars($c); ?></span><?php endforeach; ?>
                <br><br>
              <?php endif; ?>
              
              <!-- Cursos por fator individual -->
              <div style="margin-bottom:8px;">
                <div style="font-weight:600;font-size:14px;margin-bottom:4px;">Cursos relacionados ao fator <?php echo $top1; ?>:</div>
                <?php foreach ($dimSugs[$top1] as $c): ?><span class="tag"><?php echo htmlspecialchars($c); ?></span><?php endforeach; ?>
              </div>
              
              <div style="margin-bottom:8px;">
                <div style="font-weight:600;font-size:14px;margin-bottom:4px;">Cursos relacionados ao fator <?php echo $top2; ?>:</div>
                <?php foreach (($dimSugs[$top2] ?? []) as $c): ?><span class="tag"><?php echo htmlspecialchars($c); ?></span><?php endforeach; ?>
              </div>
            </div>
          </div>
          <div class="actions">
            <a class="btn" href="?">Refazer</a>
            <button class="btn secondary" onclick="window.print()" type="button">Salvar/Imprimir</button>
          </div>
        </div>

        <script>
          const rawScores = <?php echo json_encode($scores); ?>;
          const perc = <?php echo json_encode($percent); ?>;
          const labels = ['D', 'I', 'S', 'C'];
          const dataScores = labels.map(k => rawScores[k]);
          const dataPerc = labels.map(k => perc[k]);
          const ctxBar = document.getElementById('barChart').getContext('2d');
          new Chart(ctxBar, {
            type: 'bar',
            data: {
              labels,
              datasets: [{
                label: 'Pontuação',
                data: dataScores,
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (item) => {
                      const k = labels[item.dataIndex];
                      return `Pontuação: ${item.raw} ( ${perc[k]}% )`;
                    }
                  }
                },
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          const ctxRadar = document.getElementById('radarChart').getContext('2d');
          new Chart(ctxRadar, {
            type: 'radar',
            data: {
              labels,
              datasets: [{
                label: 'Percentual por fator',
                data: dataPerc,
                pointRadius: 3,
                borderWidth: 2,
                fill: true
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }
          });
        </script>
      <?php endif; ?>

      <div class="foot">© <?php echo date('Y'); ?> • Teste vocacional baseado no modelo DISC (uso educacional) | FAM 2025</div>
    </div>
  </div>

  <script>
    // Preferência de Tema (light/dark)
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('disc_theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
      if (themeToggle) themeToggle.setAttribute('aria-pressed', saved === 'dark' ? 'false' : 'true');
    }
    themeToggle?.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('disc_theme', next);
      themeToggle.setAttribute('aria-pressed', next === 'dark' ? 'false' : 'true');
    });

    // UX: abre próxima pergunta automaticamente após marcar uma opção
    document.querySelectorAll('details.q').forEach((det, idx, arr) => {
      det.addEventListener('change', (e) => {
        if (e.target.matches('input[type="radio"]')) {
          // fecha a atual e abre a próxima
          setTimeout(() => {
            det.open = false;
            const next = arr[idx + 1];
            if (next) {
              next.open = true;
              next.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 80);
        }
      });
    });

    // Reset: recolhe todas e abre a primeira
    const resetBtn = document.getElementById('resetBtn');
    resetBtn?.addEventListener('click', () => {
      requestAnimationFrame(() => {
        document.querySelectorAll('details.q').forEach((d, i) => d.open = (i === 0));
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });

    // Ao carregar (modo quiz), inicia só a primeira aberta
    (function initAccordions() {
      const qs = document.querySelectorAll('details.q');
      if (!qs.length) return;
      qs.forEach((d, i) => d.open = (i === 0));

      // UX: desabilitar submit até responder todas as perguntas
      const form = document.getElementById('quizForm');
      const submit = form?.querySelector('button[type="submit"]');
      const totalQs = qs.length;
      const statusMsg = document.createElement('div');
      statusMsg.className = 'inline-help';
      statusMsg.style.marginTop = '10px';
      statusMsg.textContent = `Responda todas as ${totalQs} perguntas para habilitar o envio`;
      form?.insertBefore(statusMsg, form.querySelector('.actions'));

      const radioSelector = 'input[type="radio"]';
      function countAnswered() {
        const answered = new Set();
        form.querySelectorAll(radioSelector).forEach(r => {
          if (r.checked) {
            // name like q1, q2
            answered.add(r.name);
          }
        });
        return answered.size;
      }

      function updateSubmitState() {
        const answered = countAnswered();
        if (submit) submit.disabled = (answered < totalQs);
        if (answered < totalQs) {
          statusMsg.textContent = `Responda todas as ${totalQs} perguntas para habilitar o envio (${answered}/${totalQs})`;
          statusMsg.style.color = 'var(--muted)';
        } else {
          statusMsg.textContent = 'Pronto — todas as perguntas respondidas. Você pode enviar agora.';
          statusMsg.style.color = 'var(--text)';
        }
      }

      // inicialmente desabilita
      if (submit) submit.disabled = true;

      // acompanhar mudanças
      form.querySelectorAll(radioSelector).forEach(r => r.addEventListener('change', (e) => {
        updateSubmitState();
        // auto-avança: abre próxima pergunta
        const currentDetails = e.target.closest('details.q');
        if (currentDetails) {
          const list = Array.from(qs);
          const idx = list.indexOf(currentDetails);
          setTimeout(() => {
            currentDetails.open = false;
            const next = list[idx + 1];
            if (next) {
              next.open = true;
              next.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 80);
        }
      }));

      // impedir envio por enter se não preenchido
      form.addEventListener('submit', (ev) => {
        if (countAnswered() < totalQs) {
          ev.preventDefault();
          statusMsg.textContent = `Por favor responda todas as ${totalQs} perguntas antes de enviar.`;
          statusMsg.style.color = '#f59e0b';
          // abrir a primeira pergunta não respondida
          const answered = new Set();
          form.querySelectorAll(radioSelector).forEach(r => { if (r.checked) answered.add(r.name); });
          for (let i = 0; i < totalQs; i++) {
            const name = 'q' + (i + 1);
            if (!answered.has(name)) {
              const det = document.getElementById(name);
              if (det) {
                document.querySelectorAll('details.q').forEach(d => d.open = false);
                det.open = true;
                det.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
              break;
            }
          }
        }
      });

      // reset: restaura estado inicial
      const resetBtn = document.getElementById('resetBtn');
      resetBtn?.addEventListener('click', () => {
        requestAnimationFrame(() => {
          document.querySelectorAll('details.q').forEach((d, i) => d.open = (i === 0));
          if (submit) submit.disabled = true;
          updateSubmitState();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    })();
  </script>
</body>

</html>