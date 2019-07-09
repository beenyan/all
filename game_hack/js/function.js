//<script>
function make_all(size){
	toparr.length = size;
	leftarr.length = size;
	$(".top").width(size * 15);
	$(".left").height(size * 15);
	canvas.width = size * 15;
	canvas.height = size * 15;
	ctx.scale(15,15);
	//放可輸入文字框架
	for (let i = 0 ; i < size ; i++){
		$(".top").append(`<div class="beeline"></div>`);
		$(".left").append(`<div class="line"></div>`);
	};
	//背景陣列
	for (let i = 0 ; i < size ; i++){
		let list = [];
		for (let j = 0 ; j < size ; j++){
			list.push(0);
		};
		bg.push(list);
	};
	$(".background").append(canvas);
	stop = 0;
	cookie();
};
function cookie(){
	if (document.cookie == "") return false;
	let cookie = document.cookie.split(";");
	let ckob = {};
	for (let i = 0 ; i < cookie.length ; i++){
		let temp = cookie[i].split("=");
		ckob[temp[0].trim()] = temp[1];
	};
	if (ckob["size"] != parseInt($("#num").val())){
		return false;
	}
	toparr = JSON.parse(ckob["toparr"]);
	leftarr = JSON.parse(ckob["leftarr"]);
	for (let i = 0 ; i < toparr.length ; i++){
		if (toparr[i] != null){
			for (j = 0 ; j < toparr[i].length ; j++){
				$(`.beeline:eq(${i})`).text($(`.beeline:eq(${i})`).text() + toparr[i][j] + " ");
			};
		};
		if (leftarr[i] != null){
			for (j = 0 ; j < leftarr[i].length ; j++){
				$(`.line:eq(${i})`).text($(`.line:eq(${i})`).text() + leftarr[i][j] + " ");
			};
		};
	};
};
function haveY(x){
	let object = {
		y : [],
		pos : [],
		light : [],
	};
	let havey = 0;
	let light = 0;
	let arrpos = [];
	for (y = 0 ; y < size ; y++){
		if (bg[y][x] == 0){//空位
			havey++;
			arrpos.push([y,x]);
		}
		else if (bg[y][x] == 1){//以填色
			havey++;
			light++;
			arrpos.push([y,x]);
		}
		else if (bg[y][x] == 2 && havey > 0){//阻擋物
			object.y.push(havey);
			object.pos.push(JSON.parse(JSON.stringify(arrpos)));
			object.light.push(light);
			havey = 0;
			light = 0;
			arrpos.length = 0;
		}
	};
	if (havey != 0){//結束後還有殘值
		object.y.push(havey);
		object.pos.push(JSON.parse(JSON.stringify(arrpos)));
		object.light.push(light);
	};
	return object;
};
function haveX(y){
	let object = {
		x : [],
		pos : [],
		light : [],
	};
	let havex = 0;
	let light = 0;
	let arrpos = [];
	for (x = 0 ; x < size ; x++){
		if (bg[y][x] == 0){//空位
			havex++;
			arrpos.push([y,x]);
		}
		else if (bg[y][x] == 1){//以填色
			havex++;
			light++;
			arrpos.push([y,x]);
		}
		else if (bg[y][x] == 2 && havex > 0){//阻擋物
			object.x.push(havex);
			object.pos.push(JSON.parse(JSON.stringify(arrpos)));
			object.light.push(light);
			havex = 0;
			light = 0;
			arrpos.length = 0;
		}
	};
	if (havex != 0){//結束後還有殘值
		object.x.push(havex);
		object.pos.push(JSON.parse(JSON.stringify(arrpos)));
		object.light.push(light);
	};
	return object;
};
function fillbg(pos,num){
	for (let i = 0 ; i < pos.length ; i++){
		bg[pos[i][0]][pos[i][1]] = num;
	};
};
function halfX(y,num){
	num = parseInt(num);
	let pos = [];
	let arr = JSON.parse(JSON.stringify(bg[y]));
	let first = 0;
	let second = size - 1;
	for (let i = arr.length - 1 ; i >= 0 ; i--){//獲取結尾
		if (arr[i] == 0 || arr[i] == 1){
			second = i;
			break;
		};
	};
	for (let i = 0 ; i < arr.length ; i++){//獲取開頭
		if (arr[i] == 0 || arr[i] == 1){
			first = i;
			break;
		};
	};
	//製造重疊部分
	for (let i = first ; i < first + num ; i++){
		arr[i] += 5;
	};
	for (let i = second ; i > second - num ; i--){
		arr[i] += 5;
	};
	//取得重疊部分
	for (let x = 0 ; x < arr.length ; x++){
		if (arr[x] >= 10){
			pos.push([y,x]);
		};
	};
	return pos;
};
//</script>