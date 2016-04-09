var headerCanvas,
    footerCanvas,
    waveCanvas;

$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        if (target == '#about' && !$('.dropdown-button').hasClass('active')) {
            $('.dropdown-button').click();
        }
        $('html, body').stop().animate({
            scrollTop: $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    var slide = function () {
        $('.dropdown-button').toggleClass('active');
        $('#about').slideToggle('700');
    };

    $(window).scroll(function () {
        if ($(window).scrollTop() > 506) {
            $('.navbar-inverse').addClass('solid');
        } else if ($(window).scrollTop() <= 506) {
            $('.navbar-inverse.solid').removeClass('solid');
        }
    });

    $('.nav-icon').click(function () {
        $('html, body').stop().animate({
            scrollTop: '0px'
        }, 900);
    });

    $('.dropdown-button').click(slide);
    $('.close-bar span').click(slide);

    headerCanvas = new FlowDrawer();
    var width = $('#flow-canvas').parent().innerWidth();
    var height = $('#flow-canvas').parent().innerHeight();
    headerCanvas.setCanvasID('flow-canvas');
    headerCanvas.setCanvasSize(width, height);
    headerCanvas.setObjNum(20,15,5);
    headerCanvas.init();
    
    waveCanvas =new WaveDrawer();
    waveCanvas.setCanvasID('wave-canvas');
    waveCanvas.setCanvasSize(width,height);
    waveCanvas.setWavePosition(450);
    waveCanvas.init();
});


$(window).resize(function () {
    var width = $('#flow-canvas').parent().innerWidth();
    var height = $('#flow-canvas').parent().innerHeight();
    headerCanvas.resize(width, height);
    waveCanvas.resize(width,height);
});
