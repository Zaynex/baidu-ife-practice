var activeID = 1;
var nextID = 0;
var oUl = $("ul");
var timer = null;
var timer1 = null;
var imageWidth = $("img").offsetWidth;
var circleArr = $(".circle").getElementsByTagName("a");
for (var i=0; i <circleArr.length; i++){
	circleArr[i].index = i + 1;
}

function startMove (target) {
	clearInterval(timer);
	timer = setInterval(function(){
		var iSpeed = (target - oUl.offsetLeft)/8;
		iSpeed = iSpeed > 0? Math.ceil(iSpeed) : Math.floor(iSpeed);
		oUl.style.left  = oUl.offsetLeft + iSpeed + "px";
	},30);
}

function rotate(clickID){
	if(clickID) {
		nextID = clickID;
	}else {
		nextID = activeID <= 4 ? activeID + 1: 1;
	}

	removeClass(circleArr[activeID - 1], "active");
	addClass(circleArr[nextID - 1],"active");

	startMove("-" + (nextID -1) * imageWidth);
	activeID = nextID;
}

timer1 = setInterval(rotate, 3000);

$.delegate(".circle", "a","click", function() {
	clearInterval(timer1);
	var clickID = this.index;
	rotate(clickID);
	timer1 = setInterval(rotate, 3000);
});
