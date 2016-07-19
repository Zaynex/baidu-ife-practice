var Calculator = function (decimalDigits, tax){
	this.decimalDigits = decimalDigits;
	this.tax = tax;
};

通过给Calculator对象给prototype属性赋值对象字面量来设定Calculator对象的原型

Calculator.prototype = function() {
	add: function(x, y) {
		return x + y;
	},
	substract: function (x, y) {
		return x - y;
	}
};

//alert((new Calculator).add(1,3))


Calculator.prototype = function(){} ();

Calculator.prototype = function(){
	add = function (x, y) {
		return x + y;
	},
	substract = function(x ,y) {
		return x -y;
	}
	return {
		add: add,
		substract, substract
	}
}();