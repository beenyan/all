// JavaScript Document
//使用填桶
function button(x,y){
	x=parseInt(x);
	y=parseInt(y)
	if (x<0||x>canvas.width||y<0||y>canvas.height){
		return false;
	}
	buttonscreen=ctxlist[thiscanvas].getImageData(0,0,canvas.width,canvas.height);
	let FC = [
		buttonscreen.data[y*canvas.width*4+x*4],
		buttonscreen.data[y*canvas.width*4+x*4+1],
		buttonscreen.data[y*canvas.width*4+x*4+2],
		buttonscreen.data[y*canvas.width*4+x*4+3]
	], TC = color;
	TC[0]=parseInt(TC[0]);
	TC[1]=parseInt(TC[1]);
	TC[2]=parseInt(TC[2]);
	TC[3]=parseInt(TC[3]);
	if (FC[0]==TC[0]&&FC[1]==TC[1]&&FC[2]==TC[2]&&FC[3]==TC[3]){
		return false;
	}
	let stk = [{x, y}],xy;
	while(stk.length) {
		xy = stk.pop();
		x = xy.x;
		y = xy.y;
		buttonscreen.data[y*canvas.width*4+x*4]=TC[0];
		buttonscreen.data[y*canvas.width*4+x*4+1]=TC[1];
		buttonscreen.data[y*canvas.width*4+x*4+2]=TC[2];
		buttonscreen.data[y*canvas.width*4+x*4+3]=TC[3];
		
		if (buttonscreen.data[(y-1)*canvas.width*4+x*4] === FC[0] && buttonscreen.data[(y-1)*canvas.width*4+x*4 + 1] === FC[1] && buttonscreen.data[(y-1)*canvas.width*4+x*4 + 2] === FC[2] && buttonscreen.data[(y-1)*canvas.width*4+x*4 + 3] === FC[3]) {
			buttonscreen.data[(y-1)*canvas.width*4+x*4] = TC[0]
			buttonscreen.data[(y-1)*canvas.width*4+x*4+1] = TC[1]
			buttonscreen.data[(y-1)*canvas.width*4+x*4+2] = TC[2]
			buttonscreen.data[(y-1)*canvas.width*4+x*4+3] = TC[3]
			stk.push({x, y: y - 1});
		}
		
		if (buttonscreen.data[(y+1)*canvas.width*4+x*4] === FC[0] && buttonscreen.data[(y+1)*canvas.width*4+x*4 + 1] === FC[1] && buttonscreen.data[(y+1)*canvas.width*4+x*4 + 2] === FC[2] && buttonscreen.data[(y+1)*canvas.width*4+x*4 + 3] === FC[3]) {
			buttonscreen.data[(y+1)*canvas.width*4+x*4] = TC[0]
			buttonscreen.data[(y+1)*canvas.width*4+x*4+1] = TC[1]
			buttonscreen.data[(y+1)*canvas.width*4+x*4+2] = TC[2]
			buttonscreen.data[(y+1)*canvas.width*4+x*4+3] = TC[3]
			stk.push({x, y: y + 1});
		}
		
		if (buttonscreen.data[y*canvas.width*4+(x+1)*4] === FC[0] && buttonscreen.data[y*canvas.width*4+(x+1)*4 + 1] === FC[1] && buttonscreen.data[y*canvas.width*4+(x + 1)*4 + 2] === FC[2] && buttonscreen.data[y*canvas.width*4+(x + 1)*4 + 3] === FC[3] && x+1<=canvas.width) {
			buttonscreen.data[y*canvas.width*4+(x+1)*4] = TC[0]
			buttonscreen.data[y*canvas.width*4+(x+1)*4+1] = TC[1]
			buttonscreen.data[y*canvas.width*4+(x+1)*4+2] = TC[2]
			buttonscreen.data[y*canvas.width*4+(x+1)*4+3] = TC[3]
			stk.push({x: x + 1, y});
		}
		
		if (buttonscreen.data[y*canvas.width*4+(x-1)*4] === FC[0] && buttonscreen.data[y*canvas.width*4+(x-1)*4 + 1] === FC[1] && buttonscreen.data[y*canvas.width*4+(x-1)*4 + 2] === FC[2] && buttonscreen.data[y*canvas.width*4+(x-1)*4 + 3] === FC[3] && x-1>=0) {
			buttonscreen.data[y*canvas.width*4+(x-1)*4] = TC[0]
			buttonscreen.data[y*canvas.width*4+(x-1)*4+1] = TC[1]
			buttonscreen.data[y*canvas.width*4+(x-1)*4+2] = TC[2]
			buttonscreen.data[y*canvas.width*4+(x-1)*4+3] = TC[3]
			stk.push({x: x - 1, y});
		}
	}
	ctxlist[thiscanvas].putImageData(buttonscreen,0,0)
}
//正方形
function square(x,y){
	ctx4.clearRect(0,0,canvas4.width,canvas4.height)
	if (keydown=="Shift"){
		if (style=="fill"){
			ctx4.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			ctx4.fillRect(min(nx,x),min(y,ny),max(max(nx,x)-min(nx,x),max(ny,y)-min(ny,y)),max(max(nx,x)-min(nx,x),max(ny,y)-min(ny,y)));
		}
		else {
			ctx4.lineWidth=stroke;
			ctx4.strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			ctx4.strokeRect(min(nx,x),min(y,ny),max(max(nx,x)-min(nx,x),max(ny,y)-min(ny,y)),max(max(nx,x)-min(nx,x),max(ny,y)-min(ny,y)));
		};
		temp0=min(nx,x);
		temp1=min(y,ny);
		temp2=max(max(nx,x)-min(nx,x),max(ny,y)-min(ny,y));
		temp3=max(max(nx,x)-min(nx,x),max(ny,y)-min(ny,y));
	}
	else{
		if (style=="fill"){
			ctx4.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			ctx4.fillRect(min(nx,x),min(y,ny),max(nx,x)-min(nx,x),max(ny,y)-min(ny,y));
		}
		else {
			ctx4.lineWidth=stroke;
			ctx4.strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			ctx4.strokeRect(min(nx,x),min(y,ny),max(nx,x)-min(nx,x),max(ny,y)-min(ny,y));
		};
		temp0=min(nx,x);
		temp1=min(y,ny);
		temp2=max(nx,x)-min(nx,x);
		temp3=max(ny,y)-min(ny,y);
	};
};
//圓形
function round(x,y){
	ctx4.clearRect(0,0,canvas4.width,canvas4.height)
	if (keydown=="Shift"){
		ctx4.beginPath()
		ctx4.arc(min(nx,x),min(y,ny),max((max(nx,x)-min(nx,x)),(max(ny,y)-min(ny,y))),0,Math.PI*2)
		temp0=min(nx,x);
		temp1=min(y,ny);
		temp2=max((max(nx,x)-min(nx,x)),(max(ny,y)-min(ny,y)));
		temp3="round";
		if (style=="fill"){
			ctx4.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			ctx4.fill();
		}
		else {
			ctx4.lineWidth=stroke;
			ctx4.strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			ctx4.stroke()
		}
		ctx4.closePath()
	}
	else{
		ctx4.beginPath()
		ctx4.ellipse(min(nx,x),min(y,ny),(max(nx,x)-min(nx,x)),(max(ny,y)-min(ny,y)),0,0,Math.PI*2);
		temp0=min(nx,x);
		temp1=min(y,ny);
		temp2=(max(nx,x)-min(nx,x));
		temp3=(max(ny,y)-min(ny,y));
		if (style=="fill"){
			ctx4.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			ctx4.fill();
		}
		else {
			ctx4.lineWidth=stroke;
			ctx4.strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			ctx4.stroke()
		}
		ctx4.closePath()
	}
}
let style;
let anglecount;
let stroke;
var length;
let tra=0;
//星星
let cccc=5;
function star(x,y){
	ctx4.clearRect(-10000,-10000,canvas4.width*1000,canvas4.height*1000)
	ctx4.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
	length=max((max(nx,x)-min(nx,x))/2,max(ny,y)-min(ny,y))
	ctx4.translate(nx, ny);
	ctx4.beginPath()
	ctx4.rotate((Math.PI * 1 / 10));
	for (var i = 0;i<cccc;i++) {
		ctx4.lineTo(0, length);
		ctx4.translate(0, length);
		ctx4.rotate((Math.PI /5)); // 36度
		ctx4.lineTo(0, -length);
		ctx4.translate(0, -length);
		ctx4.rotate(-(Math.PI * 6 / 10)); // 108度
	}
	ctx4.lineTo(0, length);
	ctx4.closePath();
	ctx4.fill();
	//畫布矯正
	ctx4.rotate(-(Math.PI * 1 / 10));
	ctx4.translate(-nx, -ny);
}
//多邊形
function angle(x,y){
	ctx4.clearRect(-10000,-10000,canvas4.width*1000,canvas4.height*1000)
	length=max(max(nx,x)-min(nx,x),max(ny,y)-min(ny,y))
	if (style=="fill"){
		ctx4.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
	}
	else{
		ctx4.lineWidth=stroke;
		ctx4.strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
	}
	ctx4.beginPath()
	ctx4.translate(nx, ny);
	ctx4.lineTo(0,0)
	if (nx>x){
		for (i=0;i<anglecount-1;i++){
			ctx4.lineTo(0,length);
			ctx4.translate(0,length);
			ctx4.rotate((Math.PI/anglecount*2));
		}
	}
	else {
		for (i=0;i<anglecount-1;i++){
			ctx4.lineTo(0,length);
			ctx4.translate(0,length);
			ctx4.rotate(-(Math.PI/anglecount*2));
		}
	}
	ctx4.closePath();
	if (style=="fill"){
		ctx4.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
		ctx4.fill();
	}
	else{
		ctx4.lineWidth=stroke;
		ctx4.strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
		ctx4.stroke();
	}
	if (nx>x){
		for (i=0;i<anglecount-1;i++){
			ctx4.rotate(-(Math.PI/anglecount*2));
			ctx4.translate(0,-length);
		}
	}
	else {
		for (i=0;i<anglecount-1;i++){
			ctx4.rotate((Math.PI/anglecount*2));
			ctx4.translate(0,-length);
		}
	}
	temp0=nx>x;
	ctx4.translate(-nx, -ny);
}
function ds(x,y){
	if (stamp==undefined){
		return false;
	}
	ctx4.clearRect(0,0,canvas4.width,canvas4.height)
	x=x-265/2
	y=y-265/2
	ctx4.drawImage(stamp,x,y)
}
//移動背景
let tempback
function move (x,y){
	var ret=0;
	if (canvas.width+nx-x<=1||canvas.height+y-ny<=1){
		return false;
	};
	$("body").find(".cana:not(.can)").each(function(){
		if ($("#canvas0")[0].width-parseInt($(this).css("right"))<(x-nx)+1&&nx-x<0){
			ret=1;
			return false;
		};
		if ($("#canvas0")[0].height-parseInt($(this).css("top"))<(ny-y)+1&&y-ny<0){
			ret=1;
			return false;
		};
	});
	if (ret){
		return false;
	}
	canvas.width=canvas.width+nx-x;
	canvas.height=canvas.height+y-ny;
	canvas4.width=canvas.width;
	canvas4.height=canvas.height;
	ctxlist[thiscanvas].fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
	ctxlist[thiscanvas].fillRect(0,0,canvas.width,canvas.height);
	ctxlist[thiscanvas].putImageData(tempback,0,0);
	nx=x;
	ny=y;
	$("body").find(".cana:not(.can)").each(function(){
		if ($(this)[0].width+parseInt($(this).css("right"))>$("#canvas0")[0].width){
			let tempctx=$(this)[0].getContext('2d').getImageData(0,0,$(this)[0].width,$(this)[0].height);
			$(this)[0].width=$("#canvas0")[0].width-parseInt($(this).css("right"));
			$(this)[0].getContext('2d').putImageData(tempctx,0,0)
		}
		if ($(this)[0].height+parseInt($(this).css("top"))>$("#canvas0")[0].height){
			let tempctx=$(this)[0].getContext('2d').getImageData(0,0,$(this)[0].width,$(this)[0].height);
			$(this)[0].height=$("#canvas0")[0].height-parseInt($(this).css("top"));
			$(this)[0].getContext('2d').putImageData(tempctx,0,0)
		}
	});
};
//垃圾桶
function trash(id){
	if (thisimg=="c"+id){
		$("#ccanvas0")[0].checked=true;
		thiscanvas=0;
		thisimg="c0";
		cs=$("#canvas0");
	}
	$("#l"+id).remove();
	$("#canvas"+id).remove();
	$("#tl"+id).remove();
	$("#rt"+id).remove();
	$("#bl"+id).remove();
	$("#lb"+id).remove();
}
//選擇圖層
function radio(e){
	thiscanvas=e.target.id.substr(7,e.target.id.length-1);
	thisimg="c"+e.target.id.substr(7,e.target.id.length-1);
	cs=$("#"+e.target.id.substr(1,e.target.id.length-1));
	canvas4.width=cs[0].width;
	canvas4.height=cs[0].height;
	$("#tc").css("top",parseFloat(cs.css("top")));
	$("#tc").css("right",parseFloat(cs.css("right")));
}
