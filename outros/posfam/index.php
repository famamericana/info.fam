<!DOCTYPE html>

<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pós-Graduação FAM</title>
    <link rel="stylesheet" href="style.css?v=1.13">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="script.js" defer></script>
    <link rel="icon" href="images/famlogo.png" type="image/x-icon">
</head>

<body>

    <?php include_once "navfoot/navbar.php"; ?>

    <a href="https://api.whatsapp.com/send?phone=5519996348297" target="_blank" class="whatsapp-float">
        <i class="fa-brands fa-whatsapp"></i>
    </a>

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
        <div class="bola bola-9"></div>
        <div class="bola bola-10"></div>
    </div>

    <header>
        <div class="titulo">
            <h2><span style="color: #45b7e5">▪</span> Matrículas Abertas <span style="color: #45b7e5">▪</span></h2>
            <h1>Pós-Graduação é na FAM</h1>
            <p>Aprimore sua carreira com professores atuantes no mercado de trabalho e em uma instituição de alta
                qualidade de ensino com responsabilidade social!</p>
        </div>
        <div class="container-button">
            <a href="https://fam.inscricao.crmeducacional.com/login/57" class="button">Inscreva-se</a>
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
                    <!-- Curso 8 -->
                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Biologia da Conservação</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas mensais (sextas, sábados e
                                domingos)</span>
                        </div>
                        <p class="descricao">Especialização em preservação e manejo sustentável da biodiversidade.</p>
                        <div class="tags">
                            <span class="tag">saúde</span>
                            <span class="tag">ecologia</span>
                            <span class="tag">sustentabilidade</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/biologia-da-conservacao/" class="btn-saiba-mais"
                                target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/57" class="btn-inscricao"
                                target="_blank">Inscreva-se</a>
                        </div>
                    </div>

                    <!-- Curso 1 -->
                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Estratégia Fiscal e Tributária</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas semanais - 18 Meses</span>
                        </div>
                        <p class="descricao">Especialização em finanças e legislação fiscal.</p>
                        <div class="tags">
                            <span class="tag">exatas</span>
                            <span class="tag">direito</span>
                            <span class="tag">contábil</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/estrategia-fiscal-e-tributaria/" class="btn-saiba-mais"
                                target="_blank">Saiba mais</a>
                            <a href="" class="btn-inscricao"
                                target="_blank">Em breve | 2026</a>
                        </div>
                    </div>

                    <!-- Curso 2 -->
                    <div class="card-curso">
                        <span class="modalidade">Semipresencial</span>
                        <h3>MBA em Finanças, Investimentos e Banking</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas quinzenais (sextas e
                                sábados)</span>
                        </div>
                        <p class="descricao">Especialização em finanças corporativas e investimentos.</p>
                        <div class="tags">
                            <span class="tag">exatas</span>
                            <span class="tag">mercado</span>
                            <span class="tag">gestão</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/mba-em-financas-investimentos-e-banking/"
                                class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/57" class="btn-inscricao"
                                target="_blank">Inscreva-se</a>
                        </div>
                    </div>

                    <!-- Curso 3 -->
                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Marketing e Negócios</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas duas vezes por semana
                                (terças e quintas)</span>
                        </div>
                        <p class="descricao">Foco em gestão de marketing e desenvolvimento de negócios.</p>
                        <div class="tags">
                            <span class="tag">humanas</span>
                            <span class="tag">vendas</span>
                            <span class="tag">branding</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/marketing-e-negocios/" class="btn-saiba-mais"
                                target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/57" class="btn-inscricao"
                                target="_blank">Inscreva-se</a>
                        </div>
                    </div>

                    <!-- Curso 4 -->
                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Medicina Equina</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas mensais (sextas, sábados e
                                domingos) </span>
                        </div>
                        <p class="descricao">Especialização no cuidado e tratamento de equinos.</p>
                        <div class="tags">
                            <span class="tag">saúde</span>
                            <span class="tag">cirurgia</span>
                            <span class="tag">reprodução</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/medicina-equina/" class="btn-saiba-mais"
                                target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/57" class="btn-inscricao"
                                target="_blank">Inscreva-se</a>
                        </div>
                    </div>

                    <!-- Curso 5 -->
                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Medicina de Animais Silvestres e Exóticos</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas mensais (sextas, sábados e
                                domingos) </span>
                        </div>
                        <p class="descricao">Cuidado e estudo de espécies nacionais e exóticas.</p>
                        <div class="tags">
                            <span class="tag">saúde</span>
                            <span class="tag">biodiversidade</span>
                            <span class="tag">manejo</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/medicina-de-animais-silvestres-e-exoticos/"
                                class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="" class="btn-inscricao"
                                target="_blank">Em breve | 2026</a>
                        </div>
                    </div>

                        <!-- Curso 6 -->
                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Neuropsicopedagogia Clínica</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas duas vezes por semana
                                (terças e quintas)</span>
                        </div>
                        <p class="descricao">Preparando você para transformar a aprendizagem e superar desafios cognitivos.</p>
                        <div class="tags">
                            <span class="tag">saúde</span>
                            <span class="tag">reabilitação</span>
                            <span class="tag">desenvolvimento</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/neuropsicopedagogia-clinica"
                                class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/57" class="btn-inscricao"
                                target="_blank">Inscreva-se</a>
                        </div>
                    </div>

                    <!-- Curso 6 -->
                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Neuropsicopedagogia e Psicomotricidade</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas duas vezes por semana
                                (terças e quintas)</span>
                        </div>
                        <p class="descricao">Programa inovador para excelência em Neuropsicopedagogia e Psicomotricidade.</p>
                        <div class="tags">
                            <span class="tag">saúde</span>
                            <span class="tag">cuidados</span>
                            <span class="tag">desenvolvimento</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/neuropsicopedagogia-clinica-e-psicomotricidade/"
                                class="btn-saiba-mais" target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/57" class="btn-inscricao"
                                target="_blank">Inscreva-se</a>
                        </div>
                    </div>

                    <!-- Curso 7 -->
                    <div class="card-curso">
                        <span class="modalidade">Presencial</span>
                        <h3>Psicologia Escolar e Educacional</h3>
                        <div class="info-curso">
                            <span class="duracao"><i class="fa-regular fa-clock"></i> Aulas aos sábados quinzenalmente
                            </span>
                        </div>
                        <p class="descricao">Foco em desenvolvimento educacional e psicológico.</p>
                        <div class="tags">
                            <span class="tag">humanas</span>
                            <span class="tag">aprendizagem</span>
                            <span class="tag">inclusão</span>
                        </div>
                        <div class="botoes-curso">
                            <a href="https://www.fam.br/curso/psicologia-escolar-e-educacional/" class="btn-saiba-mais"
                                target="_blank">Saiba mais</a>
                            <a href="https://fam.inscricao.crmeducacional.com/login/57" class="btn-inscricao"
                                target="_blank">Inscreva-se</a>
                        </div>
                    </div>


                </div>
            </div>
        </section>

        <div class="conteudo" style="margin-top: 50px;">
            <div class="mecimg">
                <img src="images/selo-e-mec.png">
            </div>
        </div>
    </main>
    <?php 
include_once "navfoot/footer.php"

?>
</body>

</html>