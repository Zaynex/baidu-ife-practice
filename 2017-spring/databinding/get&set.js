var p = {
	x: 1.0,
	y: 1.0,

	get r() {return Math.sqrt(this.x * this.x + this.y * this.y)},
	set r(newValue) {
		var oldValue = Math.sqrt(this.x * this.x + this.y * this.y);
		var ratio = newValue/oldValue;
		this.x *= ratio;
		this.y *= ratio;
	},
	get theta() {return Math.atan2(this.y, this.x)}
}

console.log(p.r); // 1.414...
console.log(p.x); // 1
console.log(p.y); // 1
console.log(p.theta) // 0.78..
console.log(p.r = "11"); // 11
console.log(p.x); // 7.78
console.log(p.y); // 7.78