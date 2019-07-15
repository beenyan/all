//<script>
$("html").contextmenu(function(){
	if ($("#dialog").dialog("isOpen")) return false;
	if (confirm("是否開始判斷,取消儲存cookie")){
		start = 0;
	}
	else {
		document.cookie="toparr=" + JSON.stringify(toparr);
		document.cookie="leftarr=" + JSON.stringify(leftarr);
		document.cookie="size=" + parseInt($("#num").val());
	}
	return false;
});
$(".txt:eq(0)").click(function(){
	$.post({
		url : "fun.php?c=0",
		data : {
			mean : JSON.stringify(leftarr) + "$()" + JSON.stringify(toparr) + "$()" + size,
			name : +new Date(),
		},
	});
});
let size = 0;
let start = 1;
let stop = 1;
//畫布生成
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let bg = [];
let toparr = [];
let leftarr = [];
//dialog
$("#dialog").dialog({
	autoOpen : false,
	resizable : false,
	width : 500,
	height : 300,
	buttons : {
		"確認" : function(){
			if (parseInt($("#num").val()) >= 10 && parseInt($("#num").val()) <= 50){
				$("#dialog").dialog("close");
				make_all(parseInt($("#num").val()));
				size = parseInt($("#num").val());
			}
			else {
				confirm("請輸入 10 ~ 50");
			};
		},
	},
});
$(".ui-dialog-titlebar").hide();
$("#dialog0").dialog({
	autoOpen : false,
	resizable : false,
	width : 350,
	height : 200,
});
$("#dialog1").dialog({
	autoOpen : false,
	resizable : false,
	width : 420,
	height : 700,
});
//圖片處理
let bgimg = new Image();
bgimg.src = "img/bk.png";
bgimg.onload = function(){
	$("#dialog").dialog("open");
	if (document.cookie == "") return false;
	let cookie = document.cookie.split(";");
	let ckob = {};
	for (let i = 0 ; i < cookie.length ; i++){
		let temp = cookie[i].split("=");
		ckob[temp[0].trim()] = temp[1];
	};
	$("#num").val(ckob["size"]);
};
let drawimg = new Image();
drawimg.src = "img/draw.png";
let missimg = new Image();
missimg.src = "img/miss.png";
let fiveimg = new Image();
fiveimg.src = "img/five.png";
//畫畫
setInterval(() => {
	if (stop) return false;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for (let y = 0 ; y < bg.length ; y++){
		for (let x = 0 ; x < bg[y].length ; x++){
			if (bg[y][x] == 0){
				ctx.drawImage(bgimg,x,y,1,1);
			}
			else if (bg[y][x] == 1){
				ctx.drawImage(drawimg,x,y,1,1);
			}
			else if (bg[y][x] == 2){
				ctx.drawImage(missimg,x,y,1,1);
			};
			if (x % 5 == 0 && y % 5 == 0){
				ctx.drawImage(fiveimg,x,y,5,5);
			}
		};
	};
	for (let y = 0 ; y < bg.length ; y++){
		for (let x = 0 ; x < bg[y].length ; x++){
			if (x % 5 == 0 && y % 5 == 0){
				ctx.drawImage(fiveimg,x,y,5,5);
			}
		};
	};
}, 1);
//輸入數值
$(".down").click(function(){
	$("#dialog1").dialog("open");
	$("#dialog1").empty();
	for (let i = 0 ; i < $(".line").length ; i++){
		$("#dialog1").append(`<label>${i + 1}：</label><input type="text" class="enter"><br><br>`);
		let arr = $(`.line:eq(${i})`).text().split(" ");
		for (let j = 0 ; j < arr.length - 1 ; j++){
			$("#dialog1 :text:last").val($("#dialog1 :text:last").val() + arr[j] + ",");
		};
	};
	$("#dialog1").append(`<input type="button" value="確定">`);
	$("#dialog1 :button").mousedown(function(){
		for (let i = 0 ; i < $("#dialog1 :text").length ; i++){
			if ($(`#dialog1 :text:eq(${i})`).val() != ""){
				let arr = $(`#dialog1 :text:eq(${i})`).val().split(",");
				if (arr[arr.length - 1] == "")arr.pop();
				leftarr[i] = [];
				$(`.line:eq(${i})`).text("");
				for (let j = 0 ; j < arr.length ; j++){
					if (arr[j] != ""){
						leftarr[i].push(arr[j]);
						$(`.line:eq(${i})`).text($(`.line:eq(${i})`).text() + arr[j] + " ");
					};
				};
			};
		};
		$("#dialog1").dialog("close");
	});
});
$("body").on("keydown",".enter",function(e){
	if (e.keyCode == 13 && $(this).val() != "" && $(this).val()[$(this).val().length - 1] != ","){
		$(this).val($(this).val() + ",");
	};
});
$(".right").click(function(){
	$("#dialog1").dialog("open");
	$("#dialog1").empty();
	for (let i = 0 ; i < $(".beeline").length ; i++){
		$("#dialog1").append(`<label>${i + 1}：</label><input type="text" class="enter"><br><br>`);
		let arr = $(`.beeline:eq(${i})`).text().split(" ");
		for (let j = 0 ; j < arr.length - 1 ; j++){
			$("#dialog1 :text:last").val($("#dialog1 :text:last").val() + arr[j] + ",");
		};
	};
	$("#dialog1").append(`<input type="button" value="確定">`);
	$("#dialog1 :button").mousedown(function(){
		for (let i = 0 ; i < $("#dialog1 :text").length ; i++){
			if ($(`#dialog1 :text:eq(${i})`).val() != ""){
				let arr = $(`#dialog1 :text:eq(${i})`).val().split(",");
				if (arr[arr.length - 1] == "")arr.pop();
				toparr[i] = [];
				$(`.beeline:eq(${i})`).text("");
				for (let j = 0 ; j < arr.length ; j++){
					if (arr[j] != ""){
						toparr[i].push(arr[j]);
						$(`.beeline:eq(${i})`).text($(`.beeline:eq(${i})`).text() + arr[j] + " ");
					};
				};
			};
		};
		$("#dialog1").dialog("close");
	});
});
//判斷
setInterval(() => {
	if (start) return false;
	if (toparr.length == 0 || leftarr.length == 0){
		alert("資料填寫不完整");
		start = 1;
		return false;
	}
	for (let i = 0 ; i < toparr.length ; i++){
		if (toparr[i] === null || leftarr[i] === null){
			alert("資料填寫不完整");
			start = 1;
			return false;
		};
	};
	//開始判斷
	for (let i = 0 ; i < size ; i++){//基本一個判斷
		if (leftarr[i].length == 1){//左
			let object = haveX(i);
			for (let j = 0 ; j < object.x.length ; j++){
				while (object.x[j] < parseInt(leftarr[i][0])){//有的格數小於要填格數
					fillbg(object.pos[j],2);
					object = haveX(i);
				};
				if (object.x[j] < leftarr[i][0] * 2){//大於螢幕的一半可以填色
					fillbg(halfX(i,leftarr[i][0],bg[i]),1);
				};
			};
			if (haveX(i).light[0] != 0){
				lookmissX(i);
			};
		};
		if (toparr[i].length == 1){//右
			let object = haveY(i);
			for (let j = 0 ; j < object.y.length ; j++){
				while (object.y[j] < parseInt(toparr[i][0])){//有的格數小於要填格數
					fillbg(object.pos[j],2);
					object = haveY(i);
				};
				if (object.y[j] < toparr[i][0] * 2){//大於螢幕的一半可以填色
					fillbg(halfY(i,toparr[i][0]),1);
				};
			};
			if (haveY(i).light[0] != 0){
				lookmissY(i);
			};
		};
	};
	for (let i = 0 ; i < size ; i++){//一行可以填滿
		if (arrlistlength(leftarr[i]) == arrlistlength(haveX(i).x)){//左
			for (let j = 0 ; j < haveX(i).pos.length ; j++){
				fillbg(canfillX(i),1)
			};
		};
		if (arrlistlength(toparr[i]) == arrlistlength(haveY(i).y)){//上
			for (let j = 0 ; j < haveY(i).pos.length ; j++){
				fillbg(canfillY(i),1)
			};
		};
	}
	for (let i = 0 ; i < size ; i++){//靈魂放置
		if (leftarr[i].length > 1 && haveX(i).x.length == 1){//左
			ghostX(i);
		};
		if (toparr[i].length > 1 && haveY(i).y.length == 1){//上
			ghostY(i);
		};
	};
	for (let i = 0 ; i < size ; i++){//亮度判斷
		if (leftarr[i].length != 1){//左
			for (let j = 0 ; j < size ; j++){
				sideX(j)
			};
		};
	}
},1000);
//</script>