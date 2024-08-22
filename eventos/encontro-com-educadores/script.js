$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

