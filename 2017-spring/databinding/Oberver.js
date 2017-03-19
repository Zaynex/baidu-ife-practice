function Observer(data) {
	this.data = data;
	this.walk(data);
}

let p = Observer.prototype;
p.walk = function(obj){
	let val;
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			val = obj[key];

			// 目前仅做到判断对象
			if(typeof val === 'object') {
				// 如果属性还是对象，那么继续创建Observer
				new Observer(val);
			}
			this.convert(key, val);
		}
	}
}

p.convert = function(key, val) {
	Object.defineProperty(this.data, key, {
		enumerable: true,
		configurable: true,
		get: function(){
			console.log('你访问了' + key);
			return val
		},
		set: function(newVal){
			console.log('你读取了' + key);
			if(newVal === val) return;
			val = newVal
		}
	})
}

let data = {
	user: {
		name: "zaynex",
		age: 23
	},
	address: {
		city: "hangzhou"
	}
}
let app = new  Observer(data);