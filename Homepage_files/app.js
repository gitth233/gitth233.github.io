var main = function ( ) {
	$('.nav a').click(function(){
		$('.nav').find('.active').removeClass('active');
		$(this).parent().addClass('active');
	});
    $('.dropdown-button').click(function(){
        $('.dropdown-button').toggleClass('active');
        $('#about').slideToggle('700');
    });
};

$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var offset = $(target).offset().top;

	    $('html, body').stop().animate({
	        'scrollTop': offset
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});

$(document).ready(main);