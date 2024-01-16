$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});

// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});


// GALERIA --------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function() {

    $("[unique-script-id='w-w-dm-id'] .list").click(function() {
      const value = $(this).attr('data-filter');
      if (value == 'all') {
        $("[unique-script-id='w-w-dm-id'] .squareImg").show('1000');
      } else {
        $("[unique-script-id='w-w-dm-id'] .squareImg").not('.' + value).hide('1000');
        $("[unique-script-id='w-w-dm-id'] .squareImg").filter('.' + value).show('1000');
      }
    })
    $("[unique-script-id='w-w-dm-id'] .list").click(function() {
      $(this).addClass('active').siblings().removeClass('active');
    })
  })