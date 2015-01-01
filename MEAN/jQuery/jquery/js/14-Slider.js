(function ($) { // so that $ refers to jQuery inside the function scope
	// when using multiple libraries $ might refer to mootools or prototype or etc


	var sliderUL = $('div.slider').css('overflow', 'hidden').children('ul'), // better to create multiple variables together
		images = sliderUL.find('img'),
		imgWidth = images.width(), // returns width of first element - 600
		imgsLen = images.length, // 4
		current = 1,
		totalImgsWidth = imgsLen * imgWidth; // 2400

	$('.slider-nav').show().find('button').on('click', function() {
		var direction = $(this).data('direction'),
			loc = imgWidth;

		// update current value
		if (direction === 'next') {
			current += 1;
		} else {
			current -= 1;
		}

		if (current === 0) {
			current = imgsLen;
			direction = 'next';
			loc = totalImgsWidth - imgWidth;
		} else if (current -1 == imgsLen) {
			current = 1;
			loc = 0;
		}

		transition(sliderUL, loc, direction);

	});

	function transition(container, loc, direction) {

		var unit; // -= +=

		if (direction && loc !==0) {
			unit = (direction === 'next') ? '-=' : '+=';
		}

		container.animate({
			'margin-left': unit ? (unit + loc) : loc
		});

	}

})(jQuery);