$(document).ready(function(){
	/* map */

	$('.map-list li').on('click', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('.map-select').removeClass('active')
			.text($(this).find('.map-title_text').text());
		$('.map-mobile_info .map-info').html($(this).find('.map-info').html());
		if(!$('.map-mobile_info').hasClass('active')) $('.map-mobile_info').addClass('active')
	});

});

	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
				center: [55.751574, 67.573856],
				controls: [], // отключим навигацию
				zoom: 4
			}, {
				suppressMapOpenBlock: true // уберем "открыть в яндекс картах"
			}),

			// Создаём макет содержимого.
			MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
				'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
			);

			$('.map-list li').each(function(){
				var coordinates = $(this).data('map').split(',');
				//myPlacemark = new ymaps.Placemark([55.661574, 37.573856], {
				var myPlacemark = new ymaps.Placemark([coordinates[0], coordinates[1]], {
					/*hintContent: 'Собственный значок метки',
					balloonContent: 'Это красивая метка'*/
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'css/imgs/balun.png',
					iconImageSize: [60, 68],
					iconImageOffset: [-30, -68]
				});

				myMap.geoObjects
					.add(myPlacemark);
			});

			myMap.behaviors.disable('scrollZoom');


		$('.map-list li').on('click', function(){
			var coordinates = $(this).data('map').split(',');
			myMap.setCenter([coordinates[0], coordinates[1]], 14, {
				checkZoomRange: true
			});
		});

	});
