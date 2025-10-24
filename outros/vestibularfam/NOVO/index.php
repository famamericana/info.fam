<?php
$versao = "1.3.12";
?>

<!DOCTYPE html>

<html lang="pt-BR">

<head>


    <!-- Google Tag Manager -->
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-WLSCSLRW');
    </script>
    <!-- End Google Tag Manager -->

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HQ3PT7C9XJ"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-HQ3PT7C9XJ');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vestibular FAM</title>
    <link rel="stylesheet" href="style.css?<?php echo $versao; ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="script.js?<?php echo $versao; ?>" defer></script>
    <link rel="icon" href="images/famlogo.png" type="image/x-icon">


    <!-- HTTP Preconnect -->
    <link rel="preconnect" href="https://pageview-notify.rdstation.com.br" />
    <link rel="preconnect" href="https://w-cdn.pzw.io" />
    <link rel="preconnect" href="https://rec.smartlook.com" />
    <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
    <link rel="preconnect" href="https://staticxx.facebook.com" />
    <link rel="preconnect" href="https://connect.facebook.net" />
    <link rel="preconnect" href="https://www.googleadservices.com" />
    <link rel="preconnect" href="https://www.google-analytics.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />

    <!-- Tags Header -->
    <script type="text/javascript" src="//code.jquery.com/jquery-3.6.1.min.js"></script>

    <!-- Meta Pixel Code -->
    <script>
        ! function(f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function() {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '851996656923172');
        fbq('track', 'PageView');
    </script>

    <!-- Facebook Pixel Code -->
    <script>
        ! function(f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function() {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '851996656923172');
        fbq('track', 'PageView');
    </script>

</head>

<body>

    <noscript>
        <img height="1" width="1" src="https://www.facebook.com/tr?id=851996656923172&ev=PageView
    &noscript=1" />
    </noscript>
    <!-- End Facebook Pixel Code -->

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WLSCSLRW" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

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
            <img src="images/estudenafam.svg?v=1.3.10" alt="Estude na FAM" class="estude-na-fam" />
            <p class="titulo_p">A FAM – Faculdade de Americana tem a melhor estrutura da região para impulsionar sua carreira.

                Aqui você escolhe a forma de ingresso que mais combina com você. </p>
            </br>
            <div class="titulo-subtitulo typewriter" data-text='["Seu futuro começa agora!", "Faculdade é FAM"]'></div>
        </div>
        <div class="container-button">
            <a href="#tipodeinscricao" class="button">Inscreva-se</a>
            <a target="_blank" href="https://www.fam.br/cursos/" class="button">Veja todos os cursos</a>
        </div>
    </header>

    <main>
        <div class="conteudo espaco-bottom">
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

        <div class="conteudo desconto-section espaco">
            <div class="desconto-container">
                <h2 class="desconto-titulo">
                    Antecipe sua matrícula
                </h2>
                <p class="titulo_p">Quanto antes se inscrever, mais você economiza na sua primeira parcela de janeiro!</p>
                <div class="timeline-descontos">
                    <div class="timeline-linha"></div>

                    <div class="desconto-card ativo" data-desconto="50">

                        <div class="card-content">
                            <div class="desconto-numero">50<span>%</span></div>
                            <div class="desconto-periodo">Até 20 de Dezembro</div>
                            <div class="desconto-cupom-container">
                                <span class="cupom-label">Use o cupom:</span>
                                <code class="desconto-cupom" data-cupom="FAM50">
                                    <span class="cupom-text">FAM50</span>
                                    <i class="fas fa-copy copy-icon"></i>
                                    <i class="fas fa-check check-icon"></i>
                                </code>
                            </div>
                        </div>
                    </div>

                    <div class="desconto-card" data-desconto="40">
                        <div class="card-content">
                            <div class="desconto-numero">40<span>%</span></div>
                            <div class="desconto-periodo">21/12 até 31/01</div>
                            <div class="desconto-cupom-container">
                                <span class="cupom-label">Use o cupom:</span>
                                <code class="desconto-cupom" data-cupom="FAM40">
                                    <span class="cupom-text">FAM40</span>
                                    <i class="fas fa-copy copy-icon"></i>
                                    <i class="fas fa-check check-icon"></i>
                                </code>
                            </div>
                        </div>
                    </div>

                    <div class="desconto-card" data-desconto="30">
                        <div class="card-content">
                            <div class="desconto-numero">30<span>%</span></div>
                            <div class="desconto-periodo">A partir de 01/02</div>
                            <div class="desconto-cupom-container">
                                <span class="cupom-label">Use o cupom:</span>
                                <code class="desconto-cupom" data-cupom="FAM30">
                                    <span class="cupom-text">FAM30</span>
                                    <i class="fas fa-copy copy-icon"></i>
                                    <i class="fas fa-check check-icon"></i>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="desconto-cta">
                    <p class="desconto-destaque" id="desconto-destaque">Garante já o seu desconto!</p>
                    <div class="countdown-info">
                        <div id="countdown" class="countdown-timer"></div>
                    </div>
                </div>

            </div>
            <a target="_blank" href="https://www.fam.br/bolsas-e-descontos/" class="desconto-todos">Veja todas as bolsas e descontos</a>

        </div>


        <div class="conteudo provadebolsas espaco">
            <img src="images/logoprovadebolsasPC.svg" alt="Logo Prova de Bolsas" />
            <div>
                <div class="badge"> <i class="fa-solid fa-eye"></i> Fique de olho! </div>
                <p> A FAM realizará a Prova de Bolsas, uma avaliação com 20 perguntas de conhecimento gerais e uma redação com chances de ganhar até 100% de desconto nas mensalidades. Prepare-se e garanta sua chance!
                </p>
                <a href="https://info.fam.br/prova-de-bolsas/" target="_blank" rel="noopener noreferrer" class="botao-prova-de-bolsas">7 de dezembro</a>

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

        <div class="conteudo">
            <div class="meceinfo">
                <div class="informacoes">

                    <a target="_blank"
                        href="https://www.fam.br/wp-content/uploads/2025/09/Edital-05-25_VESTIBULAR-FAM-2026.pdf">
                        <p>Edital 2026</p>
                    </a>
                    <a target="_blank" href="https://www.fam.br/bolsas-e-descontos/">
                        <p>Bolsas e descontos</p>
                    </a>
                    <a target="_blank" href="https://www.famportal.com.br/fam/">
                        <p>Portal Acadêmico FAM</p>
                    </a>

                    <a target="_blank" href="https://info.fam.br">
                        <p>Centro de Informações para Alunos </p>
                    </a>
                </div>
                <a target="_blank"
                    href="https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MTMxMA=="><img
                        class="mec" src="images/selo-e-mec.png"></a>
            </div>
        </div>


    </main>
    <?php
    include_once "navfoot/footer.php"

    ?>

    <!-- Facebook Connect -->
    <script>
        window.fbAsyncInit = function() {
            FB.init({
                appId: '1395394967220729',
                xfbml: true,
                version: 'v2.9'
            });
            FB.AppEvents.logPageView();
        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/pt_BR/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>


</body>

</html>