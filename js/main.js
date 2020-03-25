$(document).ready(function(){

	/* modal popup */

	$('.element-features_item').on('click', function(){
		var popup = $(this).parent().find('.element-features_popup');
		$.fancybox.open({
			src  : popup,
			type : 'inline',
			attr: {
				scrolling: "none"
			},
			scrolling : 'visible'
		});
	});

	$('.open-login_js').on('click', function(){
		$('.login-tab_js').click();
		$.fancybox.open({
			src  : '#login',
			type : 'inline',
			attr: {
				scrolling: "none"
			},
			scrolling : 'visible'
		});
	});

	$('.open-reg_js').on('click', function(){
		$('.reg-tab_js').click();
		$.fancybox.open({
			src  : '#login',
			type : 'inline',
			attr: {
				scrolling: "none"
			},
			scrolling : 'visible'
		});
	});

	$('.open-getpass_js').on('click', function(){
		$.fancybox.open({
			src  : '#getpassword',
			type : 'inline',
			attr: {
				scrolling: "none"
			},
			scrolling : 'visible'
		});
	});

	$('.open-success_js').on('click', function(){
		$.fancybox.open({
			src  : '#success',
			type : 'inline',
			attr: {
				scrolling: "none"
			},
			scrolling : 'visible'
		});
	});

	$('.open-order_js').on('click', function(){
		$.fancybox.open({
			src  : '#modal-order',
			type : 'inline',
			attr: {
				scrolling: "none"
			},
			scrolling : 'visible'
		});
	});

	/* shop */

	$('.count-minus').on('click', function(){
		console.log('minus');
		var item = $(this).closest('.section-item_count').find('input');
		var value = +item.val();
		if(value > 1) item.val(value - 1);
	});

	$('.count-plus').on('click', function(){
		console.log('plus');
		var item = $(this).closest('.section-item_count').find('input');
		var value = +item.val();
		item.val(value + 1);
	});

	$('.element-options_more').on('click', function(){
		$('.element-options_hidden').slideDown(300);
		$(this).slideUp(300);
	});

	/* map-select */

	$('.map-select').on('click', function(){
		$(this).toggleClass('active');
	});

	/* menu */

	$('.menu-open').on('click', function(){
		$(this).toggleClass('active');
		$('.header-nav').toggleClass('active');
		$('body').toggleClass('menu-opened');
	});

	var menuStart = $('header').height();
	$(window).scroll(function(){
		if ($(window).scrollTop() >= menuStart) {
			if ($('.header-top').hasClass()==false) $('.header-top').addClass('fixed');
		}
		else $('.header-top').removeClass('fixed');
	});

	/* number animation */

	var target_block = $(".advantage-content"); // Ищем блок
	var blockStatus = true;

	if(target_block.width() > 0){
		$(window).scroll(function() {
			var scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
			if(scrollEvent && blockStatus) {
				blockStatus = false;

				$('.advantage-item_num').each(function () {
					$(this).prop('Counter',0).animate({
						Counter: $(this).text()
					}, {
						duration: 800,
						easing: 'linear',
						step: function (now) {
							$(this).text(Math.ceil(now));
						}
					});
				});
			}
		});
	}

	/* filters */

	$(document).on('click', '.filter-content_clear', function() {
		$(this).closest('.filter-content').find('input[type=checkbox]').each(function(){
			$(this).prop('checked', false);
		});
		filterSelect();
	});

	$(document).on('click', '.filter-select,.filter-overlay', function(){ // выпадающий список
		var parent = $(this).closest('.filter-item');
		parent.toggleClass('active');
		parent.find('.filter-select,.filter-overlay').toggleClass('active');
	});

	$(document).on('click', '.filter-content_system input', function(){ // переключение дюймы \ мм
		var value = $(this).val();
		$(this).closest('.filter-item').removeClass('in mm').addClass(value);
	});

	$(document).on('click', '.input-checkbox', function(){
		filterSelect();
	});

	filterSelect();
	function filterSelect() {
		$('.filter-item').each(function(){

			var content = '';
			var count   = 0;
			$(this).find('.input-checkbox').each(function(){
				var prop = $(this).find('input').prop("checked"),
					s_in = $(this).find('.in').text(),
					s_mm = $(this).find('.mm').text();
					span = $(this).find('span').text();
				if(prop) {
					if(s_in || s_mm) content += '<div>' +
								'<span class="in">'+s_in+'</span><span class="mm">'+s_mm+'</span>' +
							'</div>';
					else  content += '<div>' +
						'<span>'+span+'</span>' +
						'</div>';
					count = count + 1;
				}
			});

			if(content != '') {
				$(this).find('.filter-select').html(content);
				$(this).find('.filter-item_title span').html('<i>'+count+'</i>');
			}
			else {
				$(this).find('.filter-item_title i').remove();
				$(this).find('.filter-select').html('<span>Все</span>');
			}

		});
	}

	$('.filter-content_list').jScrollPane({ // прокрутка
		showArrows: false,
		arrowScrollOnHover: false,
		enableKeyboardNavigation: false,
		hideFocus: true
	});

	/* sliders */


	var news = $('.home-news_enum');
	$(window).on('resize', function(){
		if($(window).width() <= 767) {
			$('.home-news_enum').addClass('owl-carousel');
			news.owlCarousel({
				loop: false,
				margin: 30,
				dots: true,
				dotsClass: "dots-blue",
				//autoWidth:true,
				//navContainerClass: "nav-blue",
				items: 1
			});
		}
		else {
			news.trigger('destroy.owl.carousel');
		}
	});


	$('.page-brand_carousel').owlCarousel({
		loop: false,
		margin: 0,
		dots: true,
		dotsClass: "dots-main dots-blue",
		nav: false,
		items: 1
	});

	$('.catalog-main_slider').owlCarousel({
		loop: false,
		margin: 0,
		dots: true,
		dotsClass: "dots-main container",
		navContainerClass: "nav-main",
		items: 1,
		autoplay: true,
		autoplayTimeout: 15000,
		onInitialized: carouselInitialized,
		responsive : {
			0 : {
				nav: false,
			},
			768 : {
				nav: true,
			}
		}
	});

	var mainSlider = $('.main-slider');
	mainSlider.owlCarousel({
		loop: false,
		margin: 0,
		dots: true,
		dotsClass: "dots-main",
		navContainerClass: "nav-main",
		items: 1,
		autoplay: true,
		autoplayTimeout: 15000,
		onInitialized: carouselInitialized,
		responsive : {
			0 : {
				nav: false,
			},
			768 : {
				nav: true,
			}
		}
	});
	function carouselInitialized(event){
		mainSlider.append(
			'<div class="container">' +
				'<div class="main-slider_counter">' +
					'<span>1</span>/'+event.item.count+'' +
				'</div>' +
			'</div>'
		);
	}
	mainSlider.on('changed.owl.carousel', function(event) {
		$('.main-slider_counter span').text(event.item.index + 1);
	})

	$('.about-cert').owlCarousel({
		loop: false,
		margin: 30,
		nav: true,
		dots: true,
		dotsClass: "dots-blue",
		navContainerClass: "nav-blue",
		responsive : {
			0 : {
				items: 1
			},
			768 : {
				items: 3
			},
			992 : {
				items: 4
			}
		}
	});

	$('.catalog-new_js').owlCarousel({
		loop: false,
		margin: 30,
		nav: true,
		dots: false,
		dotsClass: "dots-blue",
		navContainerClass: "nav-blue",
		responsive : {
			0 : {
				items: 1,
				nav: false,
				dots: false
			},
			768 : {
				items: 2
			},
			992 : {
				items: 3
			},
			1200 : {
				items: 4
			}
		}
	});

	var mainCompareCarousel = $('.catalog-compare_main_js');
	mainCompareCarousel.owlCarousel({
		loop: false,
		margin: 30,
		nav: true,
		dots: false,
		dotsClass: "dots-blue",
		navContainerClass: "nav-blue",
		responsive : {
			0 : {
				items: 2,
				margin: 6,
			},
			768 : {
				items: 3
			},
			992 : {
				items: 4
			}
		}
	});
	mainCompareCarousel.on('changed.owl.carousel', function(event) {
		console.log(event.item.index);
		propertyCompareCarousel.trigger('to.owl.carousel', event.item.index);
	});

	var propertyCompareCarousel = $('.compare-carousel');
	propertyCompareCarousel.owlCarousel({
		loop: false,
		margin: 30,
		nav: false,
		dots: false,
		responsive : {
			0 : {
				items: 2
			},
			768 : {
				items: 3
			},
			992 : {
				items: 4
			}
		}
	});

	/* tabs */

	tabs({
		titles : ".about-title",
		activeClass : "active",
		content : ".about-content",
		parent : ".about"
	});

	tabs({
		titles : ".modal-tab_title",
		activeClass : "active",
		content : ".modal-tab_content",
		parent : ".modal-tab"
	});

});

function tabs(params){

	$(params.titles).on('click', function(){

		$(this).siblings().removeClass(params.activeClass);
		$(this).addClass(params.activeClass);

		var index = $(this).index();
		$(this).closest(params.parent).find(params.content).each(function(){
			$(this).removeClass('active');
		});
		$(this).closest(params.parent).find(params.content).eq(index).addClass('active');

	});

}