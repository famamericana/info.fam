<!DOCTYPE html>

<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vestibular FAM</title>
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
            <h2><span style="color: #f9e20f">○●</span> Vestibular 2026 <span style="color: #f9e20f">●○</span></h2>
            <img src="images/estudenafam.svg">
            <p>A FAM – Faculdade de Americana tem a melhor estrutura da região para impulsionar sua carreira.

                Aqui você escolhe a forma de ingresso que mais combina com você. </p>
</br>
            <div class="titulo-subtitulo">Seu futuro começa agora!</div>
        </div>
        <div class="container-button">
            <a href="#tipodeinscricao" class="button">Inscreva-se</a>
            <a target="_blank" href="https://www.fam.br/cursos/" class="button">Veja todos os cursos</a>
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

        <div class="conteudo desconto-section">
            <div class="desconto-container">
                <h2 class="desconto-titulo">
                    <span style="color: #f9e20f">🎁</span> Descontos Progressivos na Matrícula
                </h2>
                <p class="desconto-subtitulo">Quanto antes se inscrever, mais você economiza!</p>
                
                <div class="timeline-descontos">
                    <div class="timeline-linha"></div>
                    
                    <div class="desconto-card ativo" data-desconto="50">
                        <div class="card-badge">MELHOR OFERTA</div>
                        <div class="card-content">
                            <div class="desconto-numero">50<span>%</span></div>
                            <div class="desconto-titulo-card">Super Desconto</div>
                            <div class="desconto-periodo">Até 20 de Dezembro</div>
                            <div class="desconto-cupom-container">
                                <span class="cupom-label">Use o cupom:</span>
                                <code class="desconto-cupom">FAM50</code>
                            </div>
                        </div>
                    </div>
                    
                    <div class="desconto-card" data-desconto="40">
                        <div class="card-content">
                            <div class="desconto-numero">40<span>%</span></div>
                            <div class="desconto-titulo-card">Ótimo Desconto</div>
                            <div class="desconto-periodo">21/12 até 30/01</div>
                            <div class="desconto-cupom-container">
                                <span class="cupom-label">Use o cupom:</span>
                                <code class="desconto-cupom">FAM40</code>
                            </div>
                        </div>
                    </div>
                    
                    <div class="desconto-card" data-desconto="30">
                        <div class="card-content">
                            <div class="desconto-numero">30<span>%</span></div>
                            <div class="desconto-titulo-card">Bom Desconto</div>
                            <div class="desconto-periodo">A partir de 01/02</div>
                            <div class="desconto-cupom-container">
                                <span class="cupom-label">Use o cupom:</span>
                                <code class="desconto-cupom">FAM30</code>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="desconto-cta">
                    <p class="desconto-destaque">⏰ Não perca tempo! Garante já o seu desconto</p>
                    <div class="countdown-info">
                        <span class="countdown-label">Tempo restante para 50% OFF:</span>
                        <div id="countdown" class="countdown-timer"></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="tipodeinscricao" class="conteudo">
            <div class="inscricao-container">
                <h2 class="inscricao-titulo">Escolha seu Tipo de Inscrição</h2>
                <div>
                    <select id="tipoInscricaoSelect" class="inscricao-select">
                        <option value="" selected disabled>Clique e selecione uma opção...</option>
                        <option value="vestibular">Vestibular</option>
                        <option value="enem">ENEM</option>
                        <option value="segunda-graduacao">2ª Graduação</option>
                        <option value="transferencia">Transferência</option>
                        <option value="pos-graduacao">Pós-Graduação</option>
                        <option value="reabertura">Reabertura de Matrícula</option>
                    </select>
                </div>
                <div id="inscricaoDetalhe" style="display:none;"></div>
            </div>
        </div>

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