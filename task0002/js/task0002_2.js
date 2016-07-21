var oBtn =$("#btn");
var timer = null;
var disP = $("#display");
$.click(oBtn,function(){
	var inp = $("#date").value;
	//console.log(inp);
	var patter = /^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|(3[0-1]))$/ ;
	if(patter.test(inp)){
		FutureTime = inp.split("-");
	} else {
		$("#display").innerHTML = "<p>" + "请输入正确格式" + "</p>";
		return;
	}
	timer = setInterval(countDown, 1000);
});


function countDown(){
	var Current = new Date();
	var CurrentTime = Current.getTime(); //获取当前时间的毫秒数
	var FutureTimeSeconds = Date.parse(FutureTime[0] + "/" + FutureTime[1] + "/" + FutureTime[2] ); // 返回输入时间的毫秒数
	var gap = FutureTimeSeconds - CurrentTime; // 取得毫秒数

	if (gap < 0) {
		clearInterval(timer);
		disP.innerHTML = FutureTime[0] + "年" + FutureTime[1] + "月" + FutureTime[2] + "日已经过去了！";
	} else if(gap === 0){
		clearInterval(timer);
		disP.innerHTML = FutureTime[0] + "年" +　FutureTime[1] + "月" + FutureTime[2] + "日到了！";
	} else {
		var second = 1000;
		var minutes =60*1000;
		var hours = 60*60*1000;
		var days = 1000*60*60*24;
		var years = 365*24*60*60*1000;
		var y = parseInt(gap / years,10);
		var day = parseInt(gap % years / days,10);
		var h = parseInt(gap % years % days / hours,10);
		var m = parseInt(gap % years % days % hours / minutes,10);
		var s = parseInt(gap % years % days % hours % minutes / second,10);
		disP.innerHTML = "距离" + FutureTime[0] + "年" + FutureTime[1] + "月" + FutureTime[2] + "日还有"+ y + "年" + day + "天" + h + "小时" + m + "分钟" + s + "秒";
	}
}

