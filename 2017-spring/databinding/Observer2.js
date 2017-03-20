function Observer(data){
	this.data = data;
	this.walk(data);
}

let p = Observer.prototype;
p.walk = function(obj){
	let val;
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			val = obj[key];

			// 对遍历的对象的属性进行判断
			if(typeof val === 'object') {
				new Observer(val);
			}
			this.convert(key, val);
		}
	}
}

p.convert = function(key, val){
	Object.defineProperty(this.data, key, {
		enumerable: true,
   		configurable: true,
		set: function(key, newVal){
			// 如果设置的是一个对象，让设置的对象也能set和get
			if(typeof newVal === 'object') {
				new Observer(val);
			}
			Event.trigger(key, val, newVal);
			console.log("你set的 " + key + " 为 " + newVal);
			if(newVal === val) return;
			val = newVal;
		},
		get: function(){
			console.log('你get的值为 ' + val)
			return val;
		}
	})
}

p.$watch = function(key, callback) {
	Event.listen(key, callback);
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
let app = new Observer(data)
app.$watch('age', function(old,newVal){
	console.log(`我的年龄变了，原来是: ${oldVal}岁，现在是：${newVal}岁了`)
})


/**
 * 增加事件监听触发回调函数
 */

var Event = (function(){
	var eventlists = {},
		trigger,
		listen,
		remove;

	listen = function(key, callback) {
		if(!eventlists[key]) {
			//可能
			eventlists[key] = [];
		}
		eventlists[key].push(fn);
	}

	trigger = function() {
		var key = Array.prototype.shift.call(arguments);
		fns = eventlists[key];
		if(!fns || fns.length === 0) {
			return false;
		}
		for(var i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments)
		}
	}

	remove = function(key, fn){
		var fns = eventlists[key];
		if(!fns) {
			return false;
		}
		if(!fn) {
			fns && (fns.length = 0);
		}else {
			for(var l = fns.length; l >= 0; l--) {
				if(fns[i] === fn) {
					fns.splice(l, 1);
				}
			}
		}
	}
	return {
		listen: listen,
		trigger: trigger,
		remove: remove
	}
})();

