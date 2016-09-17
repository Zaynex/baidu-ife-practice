window.onload = function(){
	waterfall('main', 'box');
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	

	window.onscroll = function(){
		if(checkScrollSlide()) {
			//将数据块渲染到页面底部
			var oParent = document.getElementById("main");
			for(var i = 0, l = dataInt.data.length; i < l; i++) {
				var oBox = document.createElement('div');
				oBox.className = "box";
				oParent.appendChild(oBox);
				var oPic = document.createElement("div");
				oPic.className = "pic";
				oBox.appendChild(oPic);
				var oImg = document.createElement("img");
				oImg.src='./images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main', 'box');//将json导入的图片也定好位
		}
	};
};

function waterfall(parent, box){
	//将main下所有为class为box的元素取出来
	var oParent = document.getElementById(parent),
		oBoxs = getByClass(oParent, box);

	//计算页面列数，每个页面宽/box宽度
	
	var oBoxW = oBoxs[0].offsetWidth;//数值型
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	console.log(cols);
	oParent.style.cssText = "width:" + cols * oBoxW + "px;margin:auto";

	var hArr= [];//存放每一列高度
	for(var i = 0, l = oBoxs.length; i< l; i++) {
		if(i < cols) {
			hArr.push(oBoxs[i].offsetHeight);
		}else {
			var minH = Math.min.apply(null, hArr);
			var index = getMinhIndex(hArr, minH);
			oBoxs[i].style.position = "absolute";
			oBoxs[i].style.top = minH + "px";
			//oBoxs[i].style.left = oBoxW * index + "px";
			
			//core
			oBoxs[i].style.left = oBoxs[index].offsetLeft + "px";
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);

	//第二行的图片加载在第一行高度最小的图片中
	
}

function getByClass(parent, className) {
	var boxArr = [],//存储所有class为box的元素
		oElements = parent.getElementsByTagName("*");

	for(var i = 0,l = oElements.length; i < l; i++) {
		if(oElements[i].className == className) {
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}


function getMinhIndex(arr, value){
	for(var i in arr) {
		if(arr[i] === value){
			return i;
		}
	}
}

function checkScrollSlide() {
	var oParent = document.getElementById("main");
	var oBoxs = getByClass(oParent, "box");
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight / 2);
	//标准模式和混杂模式
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//滚动距离
	var documentH = document.body.clientHeight || document.documentElement.clientHeight;//浏览器窗口可视区高度

	//当最后一个图片距离页面的高度+自身的高度一半小于滚动距离加上可视区的高度时
	 return (lastBoxH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}




































