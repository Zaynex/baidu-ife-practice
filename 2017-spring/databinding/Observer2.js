function Observer (data) {
  //暂不考虑数组
  this.data = data;
  this.makeObserver(data);
}
Observer.prototype.setterAndGetter = function (key, val) {
  //此为问题一的要点
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function(){
      console.log('你访问了' + key);
      return val;
    },
    set: function(newVal){
      if(typeof newVal === 'object') {
      	new Observer(newVal)
      }
      console.log('你设置了' + key);
      console.log('新的' + key + '=' + newVal);
      val = newVal;
    }
  })
}
Observer.prototype.makeObserver = function (obj) {
  let val;
  //此为问题二的要点
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      val = obj[key];
      //深度遍历
      if(typeof val === 'object'){
        new Observer(val);
      }
    }
    this.setterAndGetter(key, val);
  }
}

//测试
let app = new Observer({
basicInfo: {
    name: 'liujianhuan',
    age: 25
},
company: 'Qihoo 360',
address: 'Chaoyang, Beijing'
})


//实现一个事件
function Event(){
  this.events = {};
}

Event.prototype.on = function(attr, callback){
  if(this.events[attr]){
    this.events[attr].push(callback);
  }else{
    this.events[attr] = [callback];
  }
}

Event.prototype.off = function(attr){
  for(let key in this.events){
    if(this.events.hasOwnProperty(key) && key === attr){
      delete this.events[key];
    }
  }
}

Event.prototype.emit = function(attr, ...arg){
  this.events[attr] && this.events[attr].forEach(function(item){
    item(...arg);
  })
}





function Observer (data) {
  //暂不考虑数组
  this.data = data;
  this.makeObserver(data);
  this.eventsBus = new Event();
}

Observer.prototype.setterAndGetter = function (key, val) {
  let _this = this;
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function(){
      console.log('你访问了' + key);
      return val;
    },
    set: function(newVal){
      console.log('你设置了' + key);
      console.log('新的' + key + '=' + newVal);
      //触发$watch函数
      _this.eventsBus.emit(key, val, newVal);
      val = newVal;
      //如果newval是对象的话
      if(typeof newVal === 'object'){
        new Observer(val);
      }
    }
  })
}

Observer.prototype.makeObserver = function (obj) {
  let val;
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      val = obj[key];
      //深度遍历
      if(typeof val === 'object'){
        new Observer(val);
      }
    }
    this.setterAndGetter(key, val);
  }
}

Observer.prototype.$watch = function(attr, callback){
  this.eventsBus.on(attr, callback);
}

let app = new Observer({
    name: 'liujianhuan',
    age: 25,
    company: 'Qihoo 360',
    address: 'Chaoyang, Beijing'
})

app.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄变了，原来是: ${oldVal}岁，现在是：${newVal}岁了`)
})

app.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄真的变了诶，竟然年轻了${oldVal - newVal}岁`)
})










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
	var that = this;
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
	console.log(`我的年龄变了，原来是: ${old}岁，现在是：${newVal}岁了`)
})



/**
 * 增加事件监听触发回调函数
 */
var Event = (function(){
	var clientList = {},
		listen,
		trigger,
		remove;

	listen = function(key, fn) {
		if(!clientList[key]) {
			clientList[key] = [];
		}
		clientList[key].push(fn);
	};


	trigger = function() {
		var key = Array.prototype.shift.call(arguments);
		fns = clientList[key];
		if(!fns || fns.length === 0) {
			return false
		}
		for(var i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments);
		}
	};

	remove = function(key, fn){
		var fns = clientList[key];
		if(!fns) {
			return false
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
	};

	return {
		listen: listen,
		trigger: trigger,
		remove: remove
	}
})()