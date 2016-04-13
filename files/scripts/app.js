(function () {
    var headerCanvas,
        footerCanvas,
        waveCanvas,
        canvasWidth = $('#flow-canvas').parent().innerWidth(),
        headerHeight = $('#flow-canvas').parent().innerHeight(),
        footerHeight = $('#footer-canvas').parent().innerHeight();

    $(document).ready(function () {

        $('[data-toggle="popover"]').popover({
            trigger: 'hover',
            html: true,
            template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><p class ="align-right">- University of Waterloo</p><div class="popover-footer"></div></div>'
        });

        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
        });

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
        headerCanvas.setCanvasID('flow-canvas');
        headerCanvas.setCanvasSize(canvasWidth, headerHeight);
        headerCanvas.setObjNum(20, 15, 5);
        headerCanvas.init();

        waveCanvas = new WaveDrawer();
        waveCanvas.setCanvasID('wave-canvas');
        waveCanvas.setCanvasSize(canvasWidth, headerHeight);
        waveCanvas.setWavePosition(450);
        waveCanvas.init();
        
        footerCanvas = new FlowDrawer();
        footerCanvas.setCanvasID('footer-canvas');
        footerCanvas.setCanvasSize(canvasWidth,footerHeight);
        footerCanvas.setStrokeStyle('#616161');
        footerCanvas.setObjNum(5,3,2);
        footerCanvas.init();
    });


    $(window).resize(function () {
        canvasWidth = $('#flow-canvas').parent().innerWidth();
        headerHeight = $('#flow-canvas').parent().innerHeight();
        footerHeight = $('#footer-canvas').parent().innerHeight();
        headerCanvas.resize(canvasWidth, headerHeight);
        waveCanvas.resize(canvasWidth, headerHeight);
        footerCanvas.resize(canvasWidth,footerHeight);
    });
}());