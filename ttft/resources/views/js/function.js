//<script>
function txt(){
	$.post({
		url : "fun.php?c=1",
		data : {name : $(":file")[0].files[0].name},
		success : function(e){
			let list = e.split("$()");
			document.cookie="leftarr=" + list[0];
			document.cookie="toparr=" + list[1];
			document.cookie="size=" + size;
			history.go(0);
		},
	});
};
function JS(nn){
	return JSON.parse(JSON.stringify(nn));
};
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
	$(canvas).mousedown(function(e){
		if (e.button == 0){//左鍵
			if (bg[parseInt(e.offsetY / 15)][parseInt(e.offsetX / 15)] == 0){
				bg[parseInt(e.offsetY / 15)][parseInt(e.offsetX / 15)] = 1;
			}
			else {
				bg[parseInt(e.offsetY / 15)][parseInt(e.offsetX / 15)] = 0;
			}
		}
		else if (e.button == 1){//中鍵
			if (bg[parseInt(e.offsetY / 15)][parseInt(e.offsetX / 15)] == 0){
				bg[parseInt(e.offsetY / 15)][parseInt(e.offsetX / 15)] = 2;
			}
			else {
				bg[parseInt(e.offsetY / 15)][parseInt(e.offsetX / 15)] = 0;
			}
		}
	});
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
		bklight : [],
		miss : 0,
	};
	let havey = 0;
	let light = 0;
	let bklight = 0;
	let arrpos = [];
	for (y = 0 ; y < size ; y++){
		if (bg[y][x] == 0){//空位
			if (bklight != 0){
				object.bklight.push(bklight)
				bklight = 0;
			};
			havey++;
			arrpos.push([y,x]);
		}
		else if (bg[y][x] == 1){//以填色
			havey++;
			light++;
			arrpos.push([y,x]);
			bklight++;
		}
		else if (bg[y][x] == 2 && havey > 0){//阻擋物
			if (bklight != 0){
				object.bklight.push(bklight)
				bklight = 0;
			};
			object.y.push(havey);
			object.pos.push(JSON.parse(JSON.stringify(arrpos)));
			object.light.push(light);
			havey = 0;
			light = 0;
			arrpos.length = 0;
		};
		if (bg[y][x] == 2){
			object.miss++;
		};
	};
	if (havey != 0){//結束後還有殘值
		object.y.push(havey);
		object.pos.push(JSON.parse(JSON.stringify(arrpos)));
		object.light.push(light);
	};
	if (bklight != 0){
		object.bklight.push(bklight)
		bklight = 0;
	};
	return object;
};
function haveX(y){
	let object = {
		x : [],
		pos : [],
		light : [],
		bklight : [],
		miss : 0,
	};
	let havex = 0;
	let light = 0;
	let bklight = 0;
	let arrpos = [];
	for (x = 0 ; x < size ; x++){
		if (bg[y][x] == 0){//空位
			if (bklight != 0){
				object.bklight.push(bklight)
				bklight = 0;
			};
			havex++;
			arrpos.push([y,x]);
		}
		else if (bg[y][x] == 1){//以填色
			bklight++;
			havex++;
			light++;
			arrpos.push([y,x]);
		}
		else if (bg[y][x] == 2 && havex > 0){//阻擋物
			if (bklight != 0){
				object.bklight.push(bklight)
				bklight = 0;
			};
			object.x.push(havex);
			object.pos.push(JSON.parse(JSON.stringify(arrpos)));
			object.light.push(light);
			havex = 0;
			light = 0;
			arrpos.length = 0;
		};
		if (bg[y][x] == 2){
			object.miss++;
		};
	};
	if (bklight != 0){
		object.bklight.push(bklight)
		bklight = 0;
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
function halfX(y,num,line){
	num = parseInt(num);
	let pos = [];
	let arr = JSON.parse(JSON.stringify(line));
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
function halfY(x,num){
	num = parseInt(num);
	let pos = [];
	let arr = [];
	for (let y = 0 ; y < size ; y++){
		arr.push(bg[y][x]);
	};
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
	for (let y = 0 ; y < arr.length ; y++){
		if (arr[y] >= 10){
			pos.push([y,x]);
		};
	};
	return pos;
};
function arrlistlength(arr){
	let num = 0;
	for (let i = 0 ; i < arr.length ; i++){
		num = num + parseInt(arr[i]);
	};
	num = num + arr.length - 1;
	return num;
};
function canfillX(y){
	let arr = bg[y];
	let pos = [];
	let line = JSON.parse(JSON.stringify(leftarr[y]));
	let num = line.shift();
	let count = 0;
	let miss = [];
	for (let x = 0 ; x < size ; x++){
		if (arr[x] != 2){//可以填色
			count++;
			pos.push([y,x]);
		};
		if (count == num){
			num = line.shift();
			count = 0;
			x++;
			if (x >= size)break;
			miss.push([y,x]);
		};
	};
	fillbg(miss,2);
	return pos;
};
function canfillY(x){
	let arr = [];
	for (let y = 0 ; y < size ; y++){
		arr.push(bg[y][x]);
	};
	let pos = [];
	let line = JSON.parse(JSON.stringify(toparr[x]));
	let num = line.shift();
	let count = 0;
	let miss = [];
	for (let y = 0 ; y < size ; y++){
		if (arr[y] != 2){//可以填色
			count++;
			pos.push([y,x]);
		};
		if (count == num){
			num = line.shift();
			count = 0;
			y++;
			if (y >= size) break;
			miss.push([y,x]);
		};
	};
	fillbg(miss,2);
	return pos;
};
function ghostX(y){
	let arr = JSON.parse(JSON.stringify(bg[y]));
	let line = JSON.parse(JSON.stringify(leftarr[y]));
	let num = line.shift();
	let count = 0;
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
	for (let x = first ; x <= second ; x++){
		if (line.length > 0){
			arr[x] = 2;
			if (count != num){
				count++;
			}
			else {
				x++;
				count = 0;
				num = line.shift();
			};
		}
		else {
			fillbg(halfX(y,num,arr),1);
			break;
		}
	};
	arr = JSON.parse(JSON.stringify(bg[y]));
	line = JSON.parse(JSON.stringify(leftarr[y]));
	num = line.pop();
	count = 0;
	first = 0;
	second = size - 1;
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
	for (let x = second ; x >= first ; x--){
		if (line.length > 0){
			arr[x] = 2;
			if (count != num){
				count++;
			}
			else {
				count = 0;
				num = line.pop();
			};
		}
		else {
			fillbg(halfX(y,num,arr),1);
			break;
		}
	};
};
function ghostY(x){
	let arr = [];
	for (let y = 0 ; y < size ; y++){
		arr.push(bg[y][x]);
	};
	let line = JSON.parse(JSON.stringify(toparr[x]));
	let num = line.shift();
	let count = 0;
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
	for (let y = first ; y <= second ; y++){
		if (line.length > 0){
			arr[y] = 2;
			if (count != num){
				count++;
			}
			else {
				y++;
				count = 0;
				num = line.shift();
			};
		}
		else {
			fillbg(ghostYfix(x,num,arr),1);
			break;
		}
	};
	arr = [];
	for (let y = 0 ; y < size ; y++){
		arr.push(bg[y][x]);
	};
	line = JSON.parse(JSON.stringify(toparr[x]));
	num = line.pop();
	count = 0;
	first = 0;
	second = size - 1;
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
	for (let y = second ; y >= first ; y--){
		if (line.length > 0){
			arr[y] = 2;
			if (count != num){
				count++;
			}
			else {
				count = 0;
				num = line.pop();
			};
		}
		else {
			fillbg(ghostYfix(x,num,arr),1);
			break;
		}
	};
};
function ghostYfix(x,num,line){
	num = parseInt(num);
	let pos = [];
	let arr = JSON.parse(JSON.stringify(line));
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
	for (let y = 0 ; y < arr.length ; y++){
		if (arr[y] >= 10){
			pos.push([y,x]);
		};
	};
	return pos;
}
function lookmissX(y){
	let pos = [];
	let arr = JS(bg[y]);
	let first = 0;
	/*let second = size - 1;
	for (let i = arr.length - 1 ; i >= 0 ; i--){//獲取結尾
		if (arr[i] == 1){
			second = i;
			break;
		};
	};*/
	for (let i = 0 ; i < arr.length ; i++){//獲取開頭
		if (arr[i] == 1){
			first = i;
			break;
		};
	};
	if (first - parseInt(leftarr[y][0]) > 0){
		for (let x = first - parseInt(leftarr[y][0]) ; x >= 0 ; x--){
			pos.push([y,x]);
		};
	};
	if (first + parseInt(leftarr[y][0]) < size){
		for (let x = first + parseInt(leftarr[y][0]) ; x < size ; x++){
			pos.push([y,x]);
		};
	};
	/*if (second + parseInt(leftarr[y][0]) < size){
		for (let x = second + parseInt(leftarr[y][0]) ; x < size ; x++){
			pos.push([y,x]);
		};
	};*/
	fillbg(pos,2);
};
function lookmissY(x){
	let pos = [];
	let arr = [];
	for (let y = 0 ; y < size ; y++){
		arr.push(bg[y][x]);
	};
	let first = 0;
	for (let i = 0 ; i < arr.length ; i++){//獲取開頭
		if (arr[i] == 1){
			first = i;
			break;
		};
	};
	if (first - parseInt(toparr[x][0]) > 0){
		for (let y = first - parseInt(toparr[x][0]) ; y >= 0 ; y--){
			pos.push([y,x]);
		};
	};
	if (first + parseInt(toparr[x][0]) < size){
		for (let y = first + parseInt(toparr[x][0]) ; y < size ; y++){
			pos.push([y,x]);
		};
	};
	fillbg(pos,2);
};
function sideX(y){
	let pos = [];
	let miss = [];
	let arr = bg[y];
	let first = 0;
	let second = 0;
	let line = JS(leftarr[y]);
	let ck = line.shift();
	let num = ck;
	let set = 0 ;
	for (let x = 0 ; x < size ; x++){
		if (set == 0){
			if (arr[x] == 0){
				set = 1;
				ck--;
			}
			else if (arr[x] == 1){
				for (var i = x ; i < x + parseInt(ck) ; i++){
					pos.push([y,i]);
				};
				x += ck;
				ck = line.shift();
				num = ck;
			};
		}
		else if (set == 1 && ck > 0){
			if (arr[x] == 1){
				for (var i = x ; i < x + parseInt(ck) ; i++){
					pos.push([y,i]);
				};
				x += ck;
				ck = line.shift();
				num = ck;
			}
			else if (arr[x] == 0){
				ck--;
			};
		}
	};
	fillbg(pos,1);
	fillbg(miss,2);
};
//</script>