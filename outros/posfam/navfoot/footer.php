
<footer>
    <div class="footer">
        <div class="footer_design">
            <div class="primeiro">
                <img src="../images/logo_fam.svg">
            </div>
            <div class="segundo">
                <div class="titulos_footer">Links</div>
                <ul>
                    <li><a href="https://www.fam.br/">FAM</a></li>
                    <li><a href="https://info.fam.br">Info.FAM</a></li>
                    <li><a href="https://info.fam.br/calendario-academico">Calendário Acadêmico</a></li>
                    <li><a href="https://info.fam.br/calendario-de-eventos">Calendário de Eventos</a></li>
                </ul>

            </div>
            <div class="terceiro">
                <div class="titulos_footer" style="margin-bottom: 15px;">Contato</div>
                <div class="footer-info">
                    <p>
                        <i class="fas fa-map-marker-alt"></i> Av. Joaquim Bôer, 733 - Jardim Luciane, Americana - SP
                    </p>
                    <p style="display: flex;flex-wrap: wrap;">
                        <span style="margin-right: 15px;">
                            <i class="fa fa-phone"></i> 19 3465.8100
                        </span>
                        <span>
                            <i style="font-size: 16px;" class="fa-brands fa-whatsapp"></i> <a class="whatsapplink"
                                target="_blank" href="https://wa.me/+5519996348297">19
                                99634.8297</a>
                        </span>
                    </p>
                    <div class="footer-info-icons">
                        <a target="_blank" href="https://www.facebook.com/famamericana/"><i
                                class="fa-brands fa-square-facebook"></i></a>
                        <a target="_blank" href="https://www.youtube.com/@famamericana"><i
                                class="fa-brands fa-youtube"></i></a>
                        <a target="_blank" href="https://www.linkedin.com/school/famamericana/"><i
                                class="fa-brands fa-linkedin"></i></a>

                        <a target="_blank" href="https://www.instagram.com/famamericana/"><i
                                class="fa-brands fa-instagram "></i></a>
                    </div>
                </div>
            </div>

        </div>
        <div class="quatro">
            <div class="footer-c">
                <p class="créditos"> © 2024 - anoatual | FAM - Faculdade de Americana. Todos os direitos
                    reservados. </p>
                <span class="créditos_eu">
                    <p style="color: rgb(182, 203, 230);">Feito por </p>
                    <a target="_blank" href="https://www.nikkoin.art">
                        <img src="footer/Marca_NH.svg">
                    </a>
                </span>
            </div>
        </div>
    </div>
    </div>
</footer>

<script>
    // Atualiza o ano no elemento com a classe "créditos"
    document.querySelector('.créditos').innerHTML =
        document.querySelector('.créditos').innerHTML.replace(
            'anoatual',
            new Date().getFullYear()
        );
</script>