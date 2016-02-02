var main = function(){
	$('.nav a').click(function(){
		$('.nav').find('.active').removeClass('active');
		$(this).parent().addClass('active');
	});
};

$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});

$(document).ready(main);