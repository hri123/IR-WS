(function ($) { // basics of how prototypal inheritance works

	var ClassThis= function() {

		var var1 = 10;
		this.var2 = 20;
		console.log(this);
	};

	ClassThis(); // this will refer to the window object

	var inst1 = new ClassThis(); // now the function behaves like a constructor and this refers to the inst1 object

	console.log(inst1.var1); // undefined
	console.log(inst1.var2); // 20

	var inst2 = new ClassThis();
	inst2.var2 = 22;

	console.log(inst2.var2 === inst1.var2); // two copies of var2 variable - one each for inst1 and inst2

	// what if you need both instances to refer to the same variable
	ClassThis.prototype.var3 = 30;
	console.log(inst1.var3);
	console.log(inst1.hasOwnProperty('var3')); // false
	inst1.var3 = 33;
	console.log(inst1.var3);
	console.log(inst1.hasOwnProperty('var3')); // true
	delete inst1.var3;
	console.log(inst1.var3);
	console.log(inst1.hasOwnProperty('var3')); // false


})(jQuery);

function Slider(container, nav) {
	this.container= container;
	this.nav = nav;

	this.imgs = this.container.find('img');
	this.imgWidth = this.imgs[0].width; // 600
	this.imgsLen = this.imgs.length;

	this.current = 0;
}

Slider.prototype.transition = function(coords) {
	this.container.animate({
		'margin-left': coords || -(this.current * this.imgWidth)
	});
};

Slider.prototype.setCoordinates = function(direction) {

		this.current += ~~(direction === 'next') || -1; // ~~ will cast true to 1 and false to 0

		this.current = (this.current < 0 ) ? this.imgsLen - 1 : this.current % this.imgsLen;
};

(function ($) {

})();

