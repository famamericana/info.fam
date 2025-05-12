<?php 
include_once "navfoot/navbar.php"

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pós-Graduação FAM</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="script.js" defer></script>
</head>

<body>
    <div class="bola-container">
        <!-- Bolas decorativas de fundo distribuídas por toda a página -->
        <div class="bola bola-1"></div>
        <div class="bola bola-2"></div>
        <div class="bola bola-3"></div>
        <div class="bola bola-4"></div>
        <div class="bola bola-5"></div>
        <div class="bola bola-6"></div>
        <div class="bola bola-7"></div>
        <div class="bola bola-8"></div>
    </div>

    <header>        <div class="titulo">
            <h2><span style="color: #45b7e5">▪</span> Matrículas Abertas <span style="color: #45b7e5">▪</span></h2>
            <h1>Pós-Graduação é na FAM</h1>
            <p>Aprimore sua carreira com professores atuantes no mercado de trabalho e em uma instituição de alta qualidade de ensino com responsabilidade social!</p>
        </div>
        <div class="container-button">
            <a href="https://fam.inscricao.crmeducacional.com/login/48" class="button">Inscreva-se</a>
            <a href="#cursos" class="button">Veja os cursos</a>
        </div>
    </header>

    <main>
        <div class="conteudo">
            <div class="slider">
                <div class="progress-bar"></div>
                <div class="slide active">
                    <img id="slide1">
                </div>
                <div class="slide">
                    <img id="slide2">
                </div>
                <div class="navigation">
                    <span class="dot" onclick="moveSlide(1)"></span>
                    <span class="dot" onclick="moveSlide(2)"></span>
                </div>
            </div>
        </div>

        <!-- Seção de cursos -->
        <section id="cursos" class="cursos-section">
            <div class="container-cursos">
                <h2 class="section-title">Nossos Cursos de Pós-Graduação</h2>
                <p class="section-desc">Escolha entre diversos cursos de pós-graduação para impulsionar sua carreira</p>
                
                <div class="cards-container">
                    <!-- Curso 1 -->
                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Estratégia Fiscal e Tributária</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas semanais - 18 Meses</span>
                        </div>
                        <p class="descricao">Especialização em finanças e legislação fiscal.</p>
                        <div class="tags">
                            <span class="tag">pós-graduação</span>
                            <span class="tag">exatas</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://info.fam.br/cursos/estrategia-fiscal/" class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/48" class="btn-inscricao" target="_blank">Inscreva-se</a>
                        </div>
                    </div>
                    
                    <!-- Curso 2 -->                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>MBA em Finanças, Investiment e Banking</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas quinzenais - 18 meses</span>
                        </div>
                        <p class="descricao">Especialização em finanças corporativas e investimentos.</p>
                        <div class="tags">
                            <span class="tag">pós-graduação</span>
                            <span class="tag">exatas</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://info.fam.br/cursos/mba-financas/" class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/48" class="btn-inscricao" target="_blank">Inscreva-se</a>
                        </div>
                    </div>
                    
                    <!-- Curso 3 -->                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Marketing e Negócios</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas quinzenais ou semanais - 18 meses</span>
                        </div>
                        <p class="descricao">Foco em gestão de marketing e desenvolvimento de negócios.</p>
                        <div class="tags">
                            <span class="tag">pós-graduação</span>
                            <span class="tag">humanas</span>
                            <span class="tag">criatividade</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://info.fam.br/cursos/marketing-e-negocios/" class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/48" class="btn-inscricao" target="_blank">Inscreva-se</a>
                        </div>
                    </div>
                    
                    <!-- Curso 4 -->                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Medicina Equina</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> 20 horas de aula/mês - 20 meses</span>
                        </div>
                        <p class="descricao">Especialização no cuidado e tratamento de equinos.</p>
                        <div class="tags">
                            <span class="tag">pós-graduação</span>
                            <span class="tag">saúde</span>
                            <span class="tag">animais</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://info.fam.br/cursos/medicina-equina/" class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/48" class="btn-inscricao" target="_blank">Inscreva-se</a>
                        </div>
                    </div>
                    
                    <!-- Curso 5 -->                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Medicina de Animais Silvestres e Exóticos</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Especialização</span>
                        </div>
                        <p class="descricao">Cuidado e estudo de espécies nacionais e exóticas.</p>
                        <div class="tags">
                            <span class="tag">pós-graduação</span>
                            <span class="tag">saúde</span>
                            <span class="tag">animais</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/medicina-de-animais-silvestres-e-exoticos/" class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/48" class="btn-inscricao" target="_blank">Inscreva-se</a>
                        </div>
                    </div>
                    
                    <!-- Curso 6 -->                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Neuropsicopedagogia Clínica e Psicomotricidade</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas quinzenais - 24 Meses</span>
                        </div>
                        <p class="descricao">Foco em aprendizagem e desenvolvimento cognitivo.</p>
                        <div class="tags">
                            <span class="tag">pós-graduação</span>
                            <span class="tag">saúde</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://info.fam.br/cursos/neuropsicopedagogia/" class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/48" class="btn-inscricao" target="_blank">Inscreva-se</a>
                        </div>
                    </div>
                    
                    <!-- Curso 7 -->                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Psicologia Escolar e Educacional</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas semanais - 18 meses</span>
                        </div>
                        <p class="descricao">Foco em desenvolvimento educacional e psicológico.</p>
                        <div class="tags">
                            <span class="tag">pós-graduação</span>
                            <span class="tag">humanas</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://info.fam.br/cursos/psicologia-escolar/" class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/48" class="btn-inscricao" target="_blank">Inscreva-se</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      
    </main>

</body>

</html>