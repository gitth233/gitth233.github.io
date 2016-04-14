$(document).ready(function () {
    var headerCanvas,
        footerCanvas,
        waveCanvas,
        canvasWidth = $('#flow-canvas').parent().innerWidth(),
        headerHeight = $('#flow-canvas').parent().innerHeight(),
        footerHeight = $('#footer-canvas').parent().innerHeight(),
        mobileCheck = ($('.navbar-toggle.collapsed').css('display') == 'none');

    // Bootstrap popover
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        html: true,
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><p class ="align-right">- University of Waterloo</p><div class="popover-footer"></div></div>'
    });

    // Bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    });

    // Scroll to the targeted location smoothly
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

    // Change navbar background color and style
    if (mobileCheck) {
        // Bind an event handler to the window object
        $(window).scroll(function () {
            if ($(window).scrollTop() > (headerHeight - 30)) {
                $('.navbar-inverse').addClass('solid');
            } else if ($(window).scrollTop() <= (headerHeight - 30)) {
                $('.navbar-inverse.solid').removeClass('solid');
            }
        });
    } else {
        // If the navbar collapse toggle is shown, give navbar a solid-color background and border 
        $('.navbar-inverse').addClass('mobile').addClass('solid');
    }

    // Navigate to the top when nav-icon is clicked
    $('.nav-icon').click(function () {
        $('html, body').stop().animate({
            scrollTop: '0px'
        }, 900);
    });

    var slide = function () {
        $('.dropdown-button').toggleClass('active');
        $('#about').slideToggle('700');
    };

    // Bind an event handler to the two elements
    $('.dropdown-button').click(slide);
    $('.close-bar span').click(slide);


    // Initialize header animation
    headerCanvas = new FlowDrawer();
    headerCanvas.setCanvasID('flow-canvas');
    headerCanvas.setCanvasSize(canvasWidth, headerHeight);
    headerCanvas.setObjNum(20, 15, 5);
    headerCanvas.init();

    // Initialize header animation
    waveCanvas = new WaveDrawer();
    waveCanvas.setCanvasID('wave-canvas');
    waveCanvas.setCanvasSize(canvasWidth, headerHeight);
    waveCanvas.setWavePosition(450);
    waveCanvas.init();

    // Initialize footer animation
    footerCanvas = new FlowDrawer();
    footerCanvas.setCanvasID('footer-canvas');
    footerCanvas.setCanvasSize(canvasWidth, footerHeight);
    footerCanvas.setStrokeStyle('#616161');
    footerCanvas.setObjNum(5, 3, 2);
    footerCanvas.init();

    // Bind an event handler to the window
    $(window).resize(function () {
        canvasWidth = $('#flow-canvas').parent().innerWidth();
        headerHeight = $('#flow-canvas').parent().innerHeight();
        footerHeight = $('#footer-canvas').parent().innerHeight();
        headerCanvas.resize(canvasWidth, headerHeight);
        waveCanvas.resize(canvasWidth, headerHeight);
        footerCanvas.resize(canvasWidth, footerHeight);
    });
});