/**
 *  Created By Zaynex 2016.7.11
 */

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isFunction(fn) {
    return Object.prototype.toString.call(fn) === "[object Function]";
}
function isStr(str) {
    return Object.prototype.toString.call(str) === "[object String]";
}
function isBool(bool) {
    return Object.prototype.toString.call(bool) === "[object Boolean]";
}
function isNum(num) {
    return Object.prototype.toString.call(num) === "[object Number]";
}

function isFunction(fn) {
    // your implement
    return typeof fn == 'function';
}

// 深复制
function cloneObj(src){
	let newObj = Object.prototype.toString.call(src) === '[object Array]' ? [] : {};
	for(let i in src) {
		if(src.hasOwnProperty(i)) {
			newObj[i] = typeof src[i] === 'object' ? cloneObj(src[i]): src[i];
		}
	}
	return newObj;
}
// var srcObj = {
//     a: 1,
//     b: {
//         b1: ["hello", "hi"],
//         b2: "JavaScript"
//     }
// };
// var abObj = srcObj;
// var tarObj = cloneObj(srcObj);


function cloneObject2(src) {
	var s = JSON.Stringfy(src);
	var o =JSON.parse(s);
}


function uniqArray(arr) {
    var newArr = []; //创建空数组
    for (var i in arr) { //遍历旧数组
        if (newArr.indexOf(arr[i]) == -1) { //如果新数组中不存在当前元素
            newArr.push(arr[i]); //新数组中加入当前元素
        }
    }
    return newArr;
}


function simpleTrim(str) {
    var i;
    var j;
    for (i = 0; i < str.length; i++) { //从头遍历字符串
        if (str.charAt(i) != " " && str.charAt(i) != "\t") { //当不为空的时候
            break; //跳出循环
        }
    }
    for (j = str.length - 1; j >= 0; j--) {
        if (str.charAt(j) != " " && str.charAt(j) != "\t") { //当不为空的时候
            break; //跳出循环
        }
    }
    return str.slice(i, j + 1); //返回子字符串
}


function trim(str){
	return str.replace(/^\s+|\s+$/g,'');
}
// var str = '   hi!  ';
// str = trim(str);
// console.log(str); // 'hi!'


//对数组进行去除空字符串
function deleteBlank(arr) {
    var arr2 = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i].match(/\s+/) || arr[i] === "") {
            continue;
        } else {
            arr2.push(arr[i]);
        }
    }
    return arr2;
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn){
	if(fn) {
		// for in 循环索引容易乱
		for(var i in arr){
			fn(arr[i], i)
		}
	}
}
// var arr = ['java', 'c', 'php', 'html'];
// function output(item) {
//     console.log(item)
// }
// each(arr, output);  // java, c, php, html


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	return Object.keys(obj).length;
}
// var obj = {
//     a: 1,
//     b: 2,
//     c: {
//         c1: 3,
//         c2: 4
//     }
// };
// console.log(getObjectLength(obj)); // 3


function isEmail (email) {
	// * 出现 0 次或多次 
	// ? 0次或一次
	// . 任意单个字符串 换行符除外
	// \d 数字
	// \w 字母数字字符，还包括下划线
	// \s 空白字符 包括空格、制表符、换页符、换行符和其他 Unicode 空格
	var re = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
	return re.test(email);
}


function isPhone(tel) {
	var re = /[1-9]\d{10}/;
	return re.test(tel);
}


function hasClass(element, className) {
	var classNames = element.className;
	if(!classNames) {
		return false;
	}
	classNames = classNames.split(/\s+/); //从空白部分开始分割字符串,保存到数组
	for(var i=0; i < classNames.length; i++) {
		if(classNames[i] == className) {
			return true;
		}else {
			return false;
		}
	}
}


function addClass(ele, newCls){
	if(ele.className === '') {
		ele.className = newCls;
	}
	if(ele.className.indexOf(newCls) > -1) {
		return
	}else {
		ele.className += " " + newCls;
	}
}

function removeClass (element, oldClassName) {
	var originName = element.className;
	var re = new RegExp("\\b" + originName + "\\b");
	element.className = oldClassName.replace(re, "");
}


function removeClassName2 (element, oldClassName) {
	var classNames= element.className;
	classNames = classNames.split(/\s+/);
	for(var i=0; i < classNames.length; i++) {
		if(classNames[i] == oldClassName) {
			classNames.splice(i,1);
			break;
		}
	}
}


function isSiblingNode (element, sibilingNode) {
	return element.parentNode == sibilingNode.parentNode;
}


function getPosition (element) {
	var pos = {};
	pos.x = element.getBoundClientRect() + Math.max(element.documentElement.scrollLeft,element.body.scrollLeft);
	pos.y = element.getBoundClientRect() + Math.max(element.documentElement.scrollTop, element.body.scrollTop);
	return pos;
}



function addEvent(element, event, listener) {
	if(element.addEventListener) {
		element.addEventListener(event, listener, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event,listener);
	} else {
		element["on" + event] = listener;
	}
}


function removeEvent(element, event, listener) {
	if(element.removeEventListener) {
		element.removeEventListener(event, listener, false);
	} else if (element.detachEvent) {
		element.detachEvent(event, listener);
	} else {
		element["on" + event ] = null;
	}
}


function addClickEvent(element, listener) {
	addEvent(element, "click", listener);
}

function addEnterEvent(element, listener) {
	addEvent(element, "keydown", function(event){
		event = event || window.event;
		if(event.keyCode == 13) {
			listener();
		}
	});
}


function delegateEvent(element, tag, eventName, listener) {
	addEvent(element, eventName, function(event){
		var target = event.target || event.srcElement;
		if(target.tagName.toLowerCase() == tag.toLowerCase()){
			listener.call(target, event);
		}
	});
}

$.delegate = function(selector, tag, event, listener){
	delegateEvent($(selector), tag, event, listener);
};


$.on = function(element, event, listener) {
    addEvent(element, event, listener);
};

$.un = function(element, event, listener) {
    removeEvent(element, event, listener);
};

$.click = function(element, listener) {
    $.on(element, 'click', listener);
};

$.enter = function(element, listener) {
    addEnterEvent(element, listener);
};



function setCookie (name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		if(expires instanceof Date) {
			cookieText += "; expires=" + expires.toGMTString();
		}

		if(path) {
			cookieText += "; path= " + path;
		}

		if(domain) {
			cookieText +="; domain=" + domain;
		}

		if (secure) {
			cookieText += "; secure";
		}

		document.cookie = cookieText;
}

function getCookie(name) {
    var cookieName = encodeURIComponent(name) + "=",
		cookieStart = document.cookie.indexOf(cookieName),
		cookieValue = null;

		if(cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(";",cookieStart);
			if(cookieEnd == -1){
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart +　cookieName.length, cookieEnd));
	}

	return cookieValue;
}



function ajax(url, options){
	var result;

	if(typeof (options.data) == 'object') {
		var str = '';
		for(var k in options.data) {
			str += k + "=" + options.data[k] + "&";
		}
		result = str.substring(0, -1);
	}

	options.type = options.type || "GET";

	if(options.type == "GET" && options.data) {
		url += (url.indexOf("?") == -1 ? '?' : '&') + options.data;
		options.data = null;
	}

	var xhr = window.XMLHttpRequest? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

	xhr.open(options.type, url, true);
		
	if(options.type == "GET"){
		xhr.send(options.data);
	}else {
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState ==4) {
			if(xhr.status == 200) {
				if(options.onsuccess) {
					options.onsuccess(xhr.responseText, xhr.responseXML);
				}
			}else {
				if(options.onfail) {
					options.onfail();
				}
			}
		}
	};
}


/**
使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);　
**/

function $(selector,parentNode){
    var dom =parentNode || document;
    var first = selector.charAt(0);
//找到的对象
    var target;
    var domAll;
    var i;
    var attr;
    var attrValue;
    if(selector.indexOf(" ")!= -1){
        var arrClass = selector.split(" ");
        var pNode = this.$(arrClass[0]);
        for(i=1;i<arrClass.length;i++){
            target = this.$(arrClass[i],pNode);
            pNode = target;
        }
        return target;
    }
    //dom.getElementsByClassName() 这个方法貌似只有火狐支持
    switch (first){
        case "#": target = dom.getElementById(selector.substring(1));break;
        case ".": domAll = dom.getElementsByTagName("*");
            for( i =0;i<domAll.length;i++){
                if(domAll[i].getAttribute("class") == selector.substring(1)){
                    target = domAll[i];
                    break;
                }
            }break;
        case "[" :
            var flags = selector.indexOf("=");
            domAll = dom.getElementsByTagName("*");
            if( flags== -1){
                attr = selector.substring(1,selector.length-1);
                for( i =0;i<domAll.length;i++){
                    if(domAll[i].getAttribute(attr)){
                        target = domAll[i];
                        break;
                    }
                }

            }
            else{
                attr = selector.substring(1,flags);
                attrValue = selector.substring(flags+1,selector.length-1);
                for( i =0;i<domAll.length;i++){
                    if(domAll[i].getAttribute(attr) == attrValue){
                        target = domAll[i];
                        break;
                    }
                }
            }break;
        //通过标签返回的是第一个匹配的tag值
        default:target = dom.getElementsByTagName(selector)[0];

    }
    return target;

}