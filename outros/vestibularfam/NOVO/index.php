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