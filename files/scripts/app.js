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

});
