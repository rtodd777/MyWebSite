(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

$('[title]').qtip({
    position: {
        my: 'top center',  // Position my top left...
        at: 'bottom center', // at the bottom right of...
    }
}); // Grab all elements with a title attribute, and apply qTip!

$('[title!=""]').qtip({}); // A bit better. Grab elements with a title attribute that isn't blank.

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 50
		})

		$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
		});

		$('a[href*=#]').bind("click", function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		/* ---------------------------------------------- /*
		 * Background images
		/* 

		$('#intro').backstretch([
			'assets/images/bg1.jpg'
		], {duration: 3000, fade: 750});

		 /*
 		 * Navbar
		/* ---------------------------------------------- */



		var navbar = $('.navbar');
		var navHeight = navbar.height();

		$(window).scroll(function() {
			if($(this).scrollTop() >= navHeight) {
				navbar.addClass('navbar-color');
			}
			else {
				navbar.removeClass('navbar-color');
			}
		});

		if($(window).width() <= 767) {
			navbar.addClass('custom-collapse');
		}

		$(window).resize(function() {
			if($(this).width() <= 767) {
				navbar.addClass('custom-collapse');
			}
			else {
				navbar.removeClass('custom-collapse');
			}
		});

		/* ---------------------------------------------- /*
		 * Count to
		/* ---------------------------------------------- */

		$('#stats').waypoint(function() {
			$('.timer').each(function() {
				counter = $(this).attr('data-count'),
				$(this).delay(6000).countTo({
					from: 0,
					to: counter,
					speed: 3000,// Stats Counter Speed
					refreshInterval: 50,
				});
			});
		 }, { offset: '70%', triggerOnce: true });

		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */

		wow = new WOW({
			mobile: false
		});
		wow.init();

		/* ---------------------------------------------- /*
		 * Owl slider
		/* ---------------------------------------------- */

		$("#owl-clients").owlCarousel({
			items : 4,
			slideSpeed : 300,
			paginationSpeed : 400,
			autoPlay: 5000
		});

		/* ---------------------------------------------- /*
		 * Rotate
		/* ---------------------------------------------- */

		$(".rotate").textrotator({
			animation: "dissolve",
			separator: "|",
			speed: 3000
		});

		/* ---------------------------------------------- /*
		 * Portfolio pop up
		/* ---------------------------------------------- */

		$('#portfolio').magnificPopup({
			delegate: 'a.pop-up',
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		$('.video-pop-up').magnificPopup({
			type: 'iframe'
		});

		/* ---------------------------------------------- /*
		 * A jQuery plugin for fluid width video embeds
		/* ---------------------------------------------- */

		$(".video").fitVids();

		/* ---------------------------------------------- /*
		 * E-mail validation
		/* ---------------------------------------------- */

		function isValidEmailAddress(emailAddress) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return pattern.test(emailAddress);
		};

		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$("#contact-form").submit(function(e) {

			e.preventDefault();

			var c_name = $("#c_name").val();
			var c_email = $("#c_email").val();
			var c_message = $("#c_message ").val();
			var responseMessage = $('.ajax-response');

			if (( c_name== "" || c_email == "" || c_message == "") || (!isValidEmailAddress(c_email) )) {
				responseMessage.fadeIn(500);
				responseMessage.html('<i class="fa fa-warning"></i> Check all fields.');
			}

			else {
				$.ajax({
					type: "POST",
					url: "assets/php/contactForm.php",
					dataType: 'json',
					data: {
						c_email: c_email,
						c_name: c_name,
						c_message: c_message
					},
					beforeSend: function(result) {
						$('#contact-form button').empty();
						$('#contact-form button').append('<i class="fa fa-cog fa-spin"></i> Wait...');
					},
					success: function(result) {
						if(result.sendstatus == 1) {
							responseMessage.html(result.message);
							responseMessage.fadeIn(500);
							$('#contact-form').fadeOut(500);
						} else {
							$('#contact-form button').empty();
							$('#contact-form button').append('<i class="fa fa-retweet"></i> Try again.');
							responseMessage.html(result.message);
							responseMessage.fadeIn(1000);
						}
					}
				});
			}

			return false;

		});


		/* ---------------------------------------------- /*
		 * Twitter
		/* ---------------------------------------------- */

		var twitterConfig = {
			id: '311809901846466563',
			domId: '',
			maxTweets: 3,
			enableLinks: true,
			showUser: false,
			customCallback: handleTweets
		};

		twitterFetcher.fetch(twitterConfig);

		function handleTweets(tweets) {
			var x = tweets.length;
			var n = 0;
			var html = '';
			while(n < x) {
				html += '<div class="owl-item">' + tweets[n] + '</div>';
				n++;
			}
			$('.testimonials').html(html);

			$('.twitter_retweet_icon').html('<i class="fa fa-retweet"></i>');
			$('.twitter_reply_icon').html('<i class="fa fa-reply"></i>');
			$('.twitter_fav_icon').html('<i class="fa fa-star"></i>');

			$('.testimonials').owlCarousel({
				singleItem: true,
				navigation: false,
				pagination: false,
				slideSpeed : 300,
				paginationSpeed : 400,
				autoPlay: 5000,
				navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
			});
		}


    var y=$(window).height();

    if (y>1000) {
        var x = parseInt(y*(.08));
        $("#intro").css('height', y);
        $("#profile-contact").css('top', x);    
        }
    if (y<800) {
        $("#intro").css('height', y);
        $("#profile-contact").css('display', 'none');    
    }
    if (y<1000 && y>800) {
        var x = parseInt(y*(.04));
        $("#intro").css('height', y);
        $("#profile-contact").css('top', x);    
    }

   

	});

})(jQuery);
