var oForm =$("#output");
var oBtn = $("#btn");
var inp = $("#txt1");
var span = $('span');

var hander = function(){
	var oTxtValue = inp.value.split(/\,|\，|\、|\n|\s+|\;/);
	var unValue = deleteBlank(uniqArray(oTxtValue));
	if(unValue.length > 10 || unValue.length < 1){
		span.style.display = 'block';
	} else {
		span.style.display = 'none';
		for(var i=0,len = unValue.length; i<len; i++) {
			oForm.innerHTML += "<label>" + "<input type='checkbox'>" + unValue[i] + "</label> " + "<br>";
		}
	}
};

var hander2 = function(){
	span.style.display = 'none';
};
addEvent(inp,'onfocus',hander2);
addEvent(oBtn, 'click', hander);