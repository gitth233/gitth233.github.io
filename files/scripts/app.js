var main = function(){
    $('.dropdown-button').click(slide);
    $('.close-bar span').click(slide);
};

var slide = function(){
        $('.dropdown-button').toggleClass('active')
        $('#about').slideToggle('700');
    }

$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

        if(target=="#about"&& ! $(".dropdown-button").hasClass('active'))
            $('.dropdown-button').click();
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});

$(document).ready(main);