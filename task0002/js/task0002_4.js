/*实现一个类似百度搜索框的输入提示的功能。
要求如下：
允许使用鼠标点击选中提示栏中的某个选项
允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
选中后，提示内容变更到输入框中*/


var suggestData = ["a", "abandon", "abdomen", "abide", "ability", "able", "abnormal", "aborad", "abolish","abound", "about", "above"];

var oUl = $("div ul");
var inputArea = $("input");

inputChange(); // input监听事件
clickLi();  // 点击li 
keyDownLi(); // 键盘事件


/*
输入框监听事件，兼容处理
 */

function inputChange(){
	if(inputArea.addEventListener) {
		inputArea.addEventListener("input", OnInput, false);
	}else if(inputArea.attachEvent){
		inputArea.attachEvent("onpropertyChange",OnPropChanged);
	}

	// Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
	function OnInput(event){
		var inputValue = event.target.value;
		handleInput(inputValue);
	}

	// Internet Explorer
	function OnPropChanged(event){
		if (event.propertyName.toLowerCase()=== "value") {
			var inputValue = event.srcElement.value;
			handleInput(inputValue);
		}
	}
}


/**
 * 处理input数据
 * @param  {String} value 实时输入的字符串
 */
function handleInput(Value) {
	var liString = "";

	var reg = new RegExp("^" + Value, "i");  // 获取开头相同的字符串

	if(Value === "") {
		oUl.style.display = "none";
	}
	else {
			for (var i = 0; i < suggestData.length; i++) {
				if (suggestData[i].match(reg)) {
					liString += "<li><span>" + Value + "</span>" + suggestData[i].substr(Value.length) + "</li>";
					// span标签里的字体即匹配中的字体（红色） + 字符串后面的字体
				}
			}
			oUl.innerHTML = liString;
			oUl.style.display = "block";
	}
}


function clickLi() {
	delegateEvent(oUl, "li", "mouseover", function(){
		removeLiClass();
		addClass(this, "active");
	});
	delegateEvent(oUl, "li", "mouseout", function(){
		removeClass(this, "active");
	});
	delegateEvent(oUl, "li", "click", function(){
		inputArea.value = deleteSpan(this.innerHTML);
		oUl.style.display = "none";
	});
}

function keyDownLi(){
	addEvent(inputArea, "keydown", function(event){
		var heightLi = $(".active");
		//up

		if(event.keyCode === 38){
			if (heightLi) {
				var previousLi = heightLi.previousSibling;
				if (previousLi) {
					removeLiClass();
					addClass(previousLi, "active");
				}
			} else {
				addClass($("div li"), "active");
			}
		}

		//down
		if(event.keyCode === 40) {
			if(heightLi) {
				var nextLi = heightLi.nextSibling;
				if(nextLi) {
					removeLiClass();
					addClass(nextLi, "active");
				}
			}else {
				addClass($("div li"), "active");
			}
		}

		//enter
		if(event.keyCode === 13) {
			if(heightLi){
				inputArea.value = deleteSpan(heightLi.innerHTML);
				oUl.style.display = "none";
			}
		}
	});
}


/**
 * 删除span标签，获取字符串
 * @param  {String} stringHTML 带有span标签的字符串
 * @return {Sting}            去掉span标签的字符串
 */
function deleteSpan(stringHTML) {
	var reg = /^<span>(\w+)<\/span>(\w+)$/;
	var stringArr = stringHTML.match(reg);
	if (stringArr) {
		return stringArr[1] + stringArr[2];
	} else {
		return "";
	}
}


/**
 * 移除所有className，在鼠标移入和上下移动防止active冲突
 */
function removeLiClass() {
    var oLi = oUl.getElementsByTagName("li");
    for (var i = 0, len = oLi.length; i < len; i++) {
        oLi[i].className = "";
    }
}