let canvas = document.getElementById("canvas0");
let ctx = canvas.getContext('2d');
let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext('2d');
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext('2d');
let canvas3 = document.getElementById("canvas3");
let ctx3 = canvas3.getContext('2d');
let canvas4 = document.getElementById("tc");
let ctx4 = canvas4.getContext('2d');
let downcanvas = document.getElementById("downcanvas");
let dcx = downcanvas.getContext('2d');
let addbutton=new Array();
let thiscanvas=0;
let thisimg="c0";
let keydown;
let cs=$("#canvas0")
let ctxlist= new Array();
ctxlist[0]=canvas.getContext('2d');
let temp0;
let temp1;
let temp2;
let temp3;
let stamp;
let nx;
let ny;
let select;
let linefx=0;
let linefy=0;
let linesx=0;
let img=new Array();
let newimg=0;
let linesy=0;
let tool="pen";
let buttonscreen;
let color=[0,0,0,255]
let count=0;
let draw;
ctx3.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
ctx3.arc(25,25,25, 0, 2*Math.PI);
ctx3.fill();
ctx3.strokeStyle="rgb("+255+","+255+","+255+")";
ctx3.stroke();
$(".ll").data('yp', 1)
let i=0,j=0;
function rainbow(three){
	for (i=0;i<=255;i++){
		for (j=0;j<=255;j++){
			ctx1.fillStyle="rgb("+i+","+j+","+three+")";
			ctx1.fillRect(j,i,1,1);
		};
	};
};
rainbow(0);
for (i=0;i<=255;i++){
	for (j=0;j<=30;j++){
		ctx2.fillStyle="rgb("+0+","+0+","+i+")";
		ctx2.fillRect(i,j,1,1);
	};
};
let conz;
function cgtool(tool,move,url){
	$("body").find(".cana").each(function(){
		if (url=="url"){
			$(this).css("cursor","url("+tool+")"+" "+move+" "+move+",auto")
		}
		else{
			$(this).css("cursor",tool);
		};
	})
};
function cgimg(){
	$("#"+thisimg)[0].src=cs[0].toDataURL();
};
//按鍵
$("html").keydown(function(e){
	z=e.key
	if (e.key == "Control"){
		clearInterval(conz);
		conz=setInterval(function(){
			if (z=="z"||z=="Z"){
				if (newimg-1<0){
					return false;
				};
				newimg--;
				ctxlist[thiscanvas].putImageData(img[newimg],0,0);
				z="";
				cgimg()
			};
			if (z=="y"||z=="Y"){
				if (newimg+1==img.length){
					return false;
				};
				newimg++;
				ctxlist[thiscanvas].putImageData(img[newimg],0,0)
				z="";
				cgimg()
			};
		},1000/60);
	};
	keydown=e.key;
});
$("html").keyup(function(e){
	if (e.key == "Control"){
		clearInterval(conz);
	};
	keydown="";
});
//切換作畫滑鼠
function pen(){
	ctx3.clearRect(0,0,canvas3.width,canvas3.height);
	if (canvas3.width!=$("#slider").slider("value")/2){
		canvas3.width=$("#slider").slider("value")/2;
		canvas3.height=$("#slider").slider("value")/2;
	};
	ctx3.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
	ctx3.arc($("#slider").slider("value")/2/2, $("#slider").slider("value")/2/2, $("#slider").slider("value")/2/2, 0, 2*Math.PI);
	ctx3.fill();
	if (color[0]<=100&&color[1]<=100&&color[2]<=100){
		ctx3.strokeStyle="rgb("+255+","+255+","+255+")";
		ctx3.stroke();
	}
	else {
		ctx3.strokeStyle="rgb("+0+","+0+","+0+")";
		ctx3.stroke();
	};
}
let color255
//選取顏色
$("#canvas1").mousedown(function(e){
	color255=255;
	color = ctx1.getImageData(e.offsetX,e.offsetY,1,1).data;
	$("#point").css({
		left:e.offsetX-7,
		top:e.offsetY-7,
	})
	$("#t2").val(color[0])
	$("#t3").val(color[1])
})
$("#canvas1").mousemove(function(e){
	if (color255==255){
		$("#point").css({
			left:e.offsetX-7,
			top:e.offsetY-7,
		})
		color = ctx1.getImageData(e.offsetX,e.offsetY,1,1).data;
	}
	$("#t2").val(color[0])
	$("#t3").val(color[1])
})
let color256;
//調整色階
$("#canvas2").mousedown(function(e){
	let setcolor = ctx2.getImageData(e.offsetX,e.offsetY,1,1).data
	color[2]=setcolor[2]
	color256=256;
	rainbow(setcolor[2])
	$("#l255").css("left",e.offsetX+7)
	$("#t4").val(color[2])
})
$("#canvas2").mousemove(function(e){
	if (color256==256){
		let setcolor = ctx2.getImageData(e.offsetX,e.offsetY,1,1).data;
		color[2]=setcolor[2]
		rainbow(setcolor[2])
		$("#l255").css("left",e.offsetX+7)
	}
	$("#t4").val(color[2])
})
//常用顏色選擇
$(".basiccolor").mousedown(function(){
	let l,r,temp="";
	for (i=0;i<$(this).css("background").length;i++){
		if ($(this).css("background")[i]=="("){
			l=i;
		}
		if ($(this).css("background")[i]==")"){
			r=i;
		}
	}
	for (i=l+1;i<r;i++){
		temp=temp+$(this).css("background")[i];
	}
	color=temp.split(",");
	color[3]=255
	$("#point").css({
		top:parseFloat(color[0])-7,
		left:parseFloat(color[1]-7),
	})
	rainbow(color[2])
	$("#l255").css("left",parseFloat(color[2])+7)
	$("#t2").val(color[0])
	$("#t3").val(color[1])
	$("#t4").val(color[2])
})

//右鍵點滴
cs.contextmenu(function(e){
	color = ctxlist[thiscanvas].getImageData(e.offsetX,e.offsetY,1,1).data;
	rainbow(color[2]);
	$("#point").css({
		top:parseFloat(color[0])-7,
		left:parseFloat(color[1])-7,
	});
	$("#l255").css("left",parseFloat(color[2])+7)
	e.preventDefault();
	pen();
})

//滑鼠作畫
let st=0;
$("body").mousedown(function(e){
	if (xd){
		xd=0;
		return false;
	}
	if (tool=="stamp"){
		st=1
		ctxlist[thiscanvas].drawImage(stamp,e.pageX-cs[0].getClientRects()[0].x-265/2,e.pageY-cs[0].getClientRects()[0].y-265/2)
	}
	if (e.originalEvent.which==1){
		linefx=e.pageX-cs[0].getClientRects()[0].x;
		linefy=e.pageY-cs[0].getClientRects()[0].y;
		ctxlist[thiscanvas].lineWidth=$("#slider").slider("value")/2; // 線條寬度
		ctxlist[thiscanvas].lineCap = 'round'; // 線條兩端圓弧
		ctxlist[thiscanvas].lineJoin = 'round';  // 線條折角圓弧
		if (tool=="pen"){
			ctxlist[thiscanvas].strokeStyle="rgba("+color[0]+","+color[1]+","+color[2]+")"
			ctxlist[thiscanvas].beginPath();
			linefx=e.pageX-cs[0].getClientRects()[0].x;
			linefy=e.pageY-cs[0].getClientRects()[0].y;
			ctxlist[thiscanvas].moveTo(linefx,linefy);
			ctxlist[thiscanvas].lineTo(linefx,linefy);
			ctxlist[thiscanvas].stroke();
		}
		else if (tool=="eraser"){
			if (e.pageX-cs[0].getBoundingClientRect().x<0||e.pageX-cs[0].getBoundingClientRect().x>cs[0].width){
				return false;
			}
			if (e.pageY-cs[0].getBoundingClientRect().y<0||e.pageY-cs[0].getBoundingClientRect().y>cs[0].height){
				return false;
			}
			ctxlist[thiscanvas].clearRect(e.pageX-cs[0].getBoundingClientRect().x-$("#slider").slider("value")/2/2,e.pageY-cs[0].getBoundingClientRect().y-$("#slider").slider("value")/2/2,$("#slider").slider("value")/2,$("#slider").slider("value")/2);
		}
		else if (tool=="button"){
			button(e.pageX-cs[0].getBoundingClientRect().x,e.pageY-cs[0].getBoundingClientRect().y);
		}
		else if (tool=="square"||tool=="round"||tool=="star"||tool=="angle"){
			nx=e.pageX-cs[0].getBoundingClientRect().x;
			ny=e.pageY-cs[0].getBoundingClientRect().y;
		}
		if (e.pageX-cs[0].getBoundingClientRect().x<0||e.pageX-cs[0].getBoundingClientRect().x>cs[0].width||e.pageY-cs[0].getBoundingClientRect().y<0||e.pageY-cs[0].getBoundingClientRect().y>cs[0].height){
			
		}
		else{
			count=1;
		}
	}
	if ($("#dialog0").dialog("isOpen")){
		count=0;
	}
})
$("html").mousemove(function(e){
	if (allcanmove){
		all(e.pageX,e.pageY,allcanmove);
	}
	if (tool=="move"){
		move(e.pageX,e.pageY)
	}
	if (tool=="stamp"){
		$("#canvas0").css("cursor","none")
		cgtool("none",0,"")
		ds(e.pageX-cs[0].getClientRects()[0].x,e.pageY-cs[0].getClientRects()[0].y)
		if (st){
			ctxlist[thiscanvas].drawImage(stamp,e.pageX-cs[0].getClientRects()[0].x-265/2,e.pageY-cs[0].getClientRects()[0].y-265/2)
		}
	}
	if (count==1){
		if (tool=="pen"){
			linesx=e.pageX-cs[0].getClientRects()[0].x;
			linesy=e.pageY-cs[0].getClientRects()[0].y;
			ctxlist[thiscanvas].beginPath();
			ctxlist[thiscanvas].moveTo(linefx,linefy);
			ctxlist[thiscanvas].lineTo(linesx,linesy);
			ctxlist[thiscanvas].stroke();
			linefx=linesx;
			linefy=linesy;
			ctxlist[thiscanvas].closePath();
		}
		else if (tool=="eraser"){
			if (e.pageX-cs[0].getBoundingClientRect().x<0||e.pageX-cs[0].getBoundingClientRect().x>cs[0].width){
				return false;
			}
			if (e.pageY-cs[0].getBoundingClientRect().y<0||e.pageY-cs[0].getBoundingClientRect().y>cs[0].height){
				return false;
			}
			ctxlist[thiscanvas].clearRect(e.offsetX-$("#slider").slider("value")/2/2,e.offsetY-$("#slider").slider("value")/2/2,$("#slider").slider("value")/2,$("#slider").slider("value")/2);
		}
		else if (tool=="square"){
			$("#canvas0").css("cursor","auto")
			cgtool("auto",0,"")
			square(e.pageX-cs[0].getClientRects()[0].x,e.pageY-cs[0].getClientRects()[0].y)
		}
		else if (tool=="round"){
			$("#canvas0").css("cursor","auto")
			cgtool("auto",0,"")
			round(e.pageX-cs[0].getClientRects()[0].x,e.pageY-cs[0].getClientRects()[0].y)
		}
		else if (tool=="star"){
			$("#canvas0").css("cursor","auto")
			cgtool("auto",0,"")
			star(e.pageX-cs[0].getClientRects()[0].x,e.pageY-cs[0].getClientRects()[0].y)
		}
		else if (tool=="angle"){
			$("#canvas0").css("cursor","auto")
			cgtool("auto",0,"")
			angle(e.pageX-cs[0].getClientRects()[0].x,e.pageY-cs[0].getClientRects()[0].y)
		}
	}
})

//滑鼠進入畫布
$("body").mouseenter(function(e){
	linefx=e.pageX-cs[0].getClientRects()[0].x;
	linefy=e.pageY-cs[0].getClientRects()[0].y;
})

$("html").mouseup(function(){
	if (tool=="move"){
		tool="pen";
	}
	st=0;
	ctx4.clearRect(-10000,-10000,canvas4.width*100,canvas4.height*100)
	if (count==1){
		ctxlist[thiscanvas].lineCap = 'butt'; 
		ctxlist[thiscanvas].lineJoin = 'miter';
		if (tool=="square"){
			if (style=="fill"){
				ctxlist[thiscanvas].fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
				ctxlist[thiscanvas].fillRect(temp0,temp1,temp2,temp3);
			}
			else {
				ctxlist[thiscanvas].lineWidth=stroke;
				ctxlist[thiscanvas].strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
				ctxlist[thiscanvas].strokeRect(temp0,temp1,temp2,temp3);
			}
		}
		if (tool=="round"){
			if (temp3=="round"){
				ctx4.clearRect(0,0,canvas4.width,canvas4.height)
				ctxlist[thiscanvas].beginPath()
				ctxlist[thiscanvas].arc(temp0,temp1,temp2,0,Math.PI*2);
				if (style=="fill"){
					ctxlist[thiscanvas].fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
					ctxlist[thiscanvas].fill();
				}
				else {
					ctxlist[thiscanvas].lineWidth=stroke;
					ctxlist[thiscanvas].strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
					ctxlist[thiscanvas].stroke()
				}
				ctxlist[thiscanvas].closePath()
			}
			else{
				ctx4.clearRect(0,0,canvas4.width,canvas4.height)
				ctxlist[thiscanvas].beginPath()
				ctxlist[thiscanvas].ellipse(temp0,temp1,temp2,temp3,0,0,Math.PI*2);
				if (style=="fill"){
					ctxlist[thiscanvas].fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
					ctxlist[thiscanvas].fill();
				}
				else {
					ctxlist[thiscanvas].lineWidth=stroke;
					ctxlist[thiscanvas].strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
					ctxlist[thiscanvas].stroke()
				}
				ctxlist[thiscanvas].closePath()
			}
		}
		if (tool=="star"){
			if (keydown=="Shift"){
				ctxlist[thiscanvas].fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
				ctxlist[thiscanvas].translate(nx, ny);
				ctxlist[thiscanvas].beginPath()
				ctxlist[thiscanvas].rotate((Math.PI * 1 / 10));
				for (var i = 5; i--;) {
					ctxlist[thiscanvas].lineTo(0, length);
					ctxlist[thiscanvas].translate(0, length);
					ctxlist[thiscanvas].rotate((Math.PI /5)); // 36度
					ctxlist[thiscanvas].lineTo(0, -length);
					ctxlist[thiscanvas].translate(0, -length);
					ctxlist[thiscanvas].rotate(-(Math.PI * 6 / 10)); // 108度
				}
				ctxlist[thiscanvas].lineTo(0, length);
				ctxlist[thiscanvas].closePath();
				ctxlist[thiscanvas].fill();
				//畫布矯正
				ctxlist[thiscanvas].rotate(-(Math.PI * 1 / 10));
				ctxlist[thiscanvas].translate(-nx, -ny);
			}
			else{
				ctxlist[thiscanvas].fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
				ctxlist[thiscanvas].translate(nx, ny);
				ctxlist[thiscanvas].beginPath()
				ctxlist[thiscanvas].rotate((Math.PI * 1 / 10));
				for (var i = 5; i--;) {
					ctxlist[thiscanvas].lineTo(0, length);
					ctxlist[thiscanvas].translate(0, length);
					ctxlist[thiscanvas].rotate((Math.PI /5)); // 36度
					ctxlist[thiscanvas].lineTo(0, -length);
					ctxlist[thiscanvas].translate(0, -length);
					ctxlist[thiscanvas].rotate(-(Math.PI * 6 / 10)); // 108度
				}
				ctxlist[thiscanvas].lineTo(0, length);
				ctxlist[thiscanvas].closePath();
				ctxlist[thiscanvas].fill();
				//畫布矯正
				ctxlist[thiscanvas].rotate(-(Math.PI * 1 / 10));
				ctxlist[thiscanvas].translate(-nx, -ny);
			}
		}
		if (tool=="angle"){
			ctxlist[thiscanvas].lineCap = 'butt'; 
			ctxlist[thiscanvas].lineJoin = 'miter';
			if (style=="fill"){
				ctxlist[thiscanvas].fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			}
			else{
				ctxlist[thiscanvas].lineWidth=stroke;
				ctxlist[thiscanvas].strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
			}
			ctxlist[thiscanvas].beginPath()
			ctxlist[thiscanvas].translate(nx, ny);
			ctxlist[thiscanvas].lineTo(0,0)
			if (temp0){
				for (i=0;i<anglecount-1;i++){
					ctxlist[thiscanvas].lineTo(0,length);
					ctxlist[thiscanvas].translate(0,length);
					ctxlist[thiscanvas].rotate((Math.PI/anglecount*2));
				}
			}
			else {
				for (i=0;i<anglecount-1;i++){
					ctxlist[thiscanvas].lineTo(0,length);
					ctxlist[thiscanvas].translate(0,length);
					ctxlist[thiscanvas].rotate(-(Math.PI/anglecount*2));
				}
			}
			ctxlist[thiscanvas].closePath();
			if (style=="fill"){
				ctxlist[thiscanvas].fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
				ctxlist[thiscanvas].fill();
			}
			else{
				ctxlist[thiscanvas].lineWidth=stroke;
				ctxlist[thiscanvas].strokeStyle="rgb("+color[0]+","+color[1]+","+color[2]+")";
				ctxlist[thiscanvas].stroke();
			}
			if (temp0){
				for (i=0;i<anglecount-1;i++){
					ctxlist[thiscanvas].rotate(-(Math.PI/anglecount*2));
					ctxlist[thiscanvas].translate(0,-length);
				}
			}
			else {
				for (i=0;i<anglecount-1;i++){
					ctxlist[thiscanvas].rotate((Math.PI/anglecount*2));
					ctxlist[thiscanvas].translate(0,-length);
				}
			}
			ctxlist[thiscanvas].translate(-nx, -ny);
		}
		if (newimg+1!=img.length){
			img.length=newimg+1
		}
		img.push(ctxlist[thiscanvas].getImageData(0,0,cs[0].width,cs[0].height));
		newimg=img.length-1;
	}
	pen()
	if (tool=="pen"){
		let temp=canvas3.toDataURL();
		let pos=$("#slider").slider("value")/2/2;
		$("#canvas0").css("cursor","url("+temp+")"+" "+pos+" "+pos+",auto");
		cgtool(temp,pos,"url");
	}
	if (allcanmove){
		$($canvas)[0].getContext('2d').putImageData(tempphoto,0,0)
	}
	cgimg();
	count=0;
	color255=0;
	color256=0;
	length=0;
	allcanmove=0;
})

//切換滑鼠
window.onload = function(){
		let temp=canvas3.toDataURL();
		let pos=$("#slider").slider("value")/2/2;
		$("#canvas0").css("cursor","url("+temp+")"+" "+pos+" "+pos+",auto");
		cgtool(temp,pos,"url");
}
//換工具
$("#pen").mousedown(function(){
	tool="pen";
	let temp=canvas3.toDataURL();
	let pos=$("#slider").slider("value")/2/2;
	$("#canvas0").css("cursor","url("+temp+")"+" "+pos+" "+pos+",auto");
	cgtool(temp,pos,"url");
})
$("#eraser").mousedown(function(){
	tool="eraser";
	$("#canvas0").css("cursor","url(eraser.png)"+36/2+" "+36/2+",auto");
	cgtool("eraser.png",36/2,"url");
})
$("#button").mousedown(function(){
	tool="button";
	$("#canvas0").css("cursor","auto")
	cgtool("auto",0,"");
})
$("#square").mousedown(function(){
	tool="square0";
	$("#canvas0").css("cursor","auto")
	cgtool("auto",0,"");
	if (!$("#dialog").dialog("isOpen")){
		$("#dialog1").dialog("open")
	}
})
$("#round").mousedown(function(){
	tool="round0";
	$("#canvas0").css("cursor","auto")
	cgtool("auto",0,"");
	if (!$("#dialog").dialog("isOpen")){
		$("#dialog1").dialog("open")
	}
})
$("#star").mousedown(function(){
	tool="star";
	$("#canvas0").css("cursor","auto")
	cgtool("auto",0,"");
})
$(".move").mousedown(function(e){
	tempback=ctxlist[thiscanvas].getImageData(0,0,cs[0].width,cs[0].height)
	tool="move";
	nx=e.pageX;
	ny=e.pageY;
})
var t
$("#stamp").mousedown(function(){
	xd=1
	tool="stamp";
	clearInterval(t)
	t=setInterval(function(){
		if (tool!="stamp"){
			$("#stlist").css("transform","scale(0,1)");
			clearInterval(t);
		}
	},1000/60)
	$("#canvas0").css("cursor","auto");
})
$("#angle").mousedown(function(){
	tool="angle0";
	$("#canvas0").css("cursor","auto")
	if (!$("#dialog").dialog("isOpen")){
		$("#dialog0").dialog("open");
	}
})

//上一步
$("#back").mousedown(function(){
	if (newimg-1<0){
		return false;
	}
	newimg--;
	ctxlist[thiscanvas].putImageData(img[newimg],0,0);
})

//下一步
$("#next").mousedown(function(){
	if (newimg+1==img.length){
		return false;
	}
	newimg++;
	ctxlist[thiscanvas].putImageData(img[newimg],0,0);
})
function allcan(){
	let arr= new Array()
	downcs[0].width=cs[0].width;
	downcs[0].height=cs[0].height;
	$('.ll').find(".radio").each(function(){
		let id=$(this)[0].id.substr(1,$(this)[0].id.length-1);
		arr.push(id);
	})
	while (arr.length){
		let pp=arr.pop();
		dcx.drawImage($("#"+pp)[0],cs[0].width-$("#"+pp)[0].width-parseInt($("#"+pp).css("right")),parseInt($("#"+pp).css("top")))
	}
}
$("#download").mousedown(function(){
	allcan()
	var today=new Date();
	var year=today.getFullYear();
	var month=today.getMonth()+1;
	month=addz(month)
	var date=today.getDate();
	date=addz(date)
	var hour=today.getHours();
	hour=addz(hour)
	var min=today.getMinutes();
	min=addz(min)
	var sec=today.getSeconds();
	sec=addz(sec)
	var td=year+""+month+""+date+""+"_"+hour+""+min+""+sec;
	$(this)[0].download=td;
	$(this)[0].href=downcanvas.toDataURL("image/jpeg",1)
})
function addz(nn){
	if (nn<10){
		nn="0"+nn;
		return nn;
	}
	else {
		return nn;
	}
}
function max(nn,mm){
	if (nn>mm){
		return nn;
	}
	else {
		return mm;
	}
}
function min(nn,mm){
	if (nn>mm){
		return mm;
	}
	else {
		return nn;
	}
}
var cc=0;
$("#b0").click(function(){
	$("#dialog").find(".it").each(function(){
		if ($("#t0").val()<0||$("#t0").val()==""||isNaN($("#t0").val())){
			$("#t0").css("border-color","red")
		}
		else{
			$("#t0").css("border-color","")
		}
		if ($("#t1").val()<0||$("#t1").val()==""||isNaN($("#t1").val())){
			$("#t1").css("border-color","red")
		}
		else{
			$("#t1").css("border-color","")
		}
		if ($("#t2").val()>255||$("#t2").val()<0||$("#t2").val()==""||isNaN($("#t2").val())){
			$("#t2").css("border-color","red")
		}
		else{
			$("#t2").css("border-color","")
		}
		if ($("#t3").val()>255||$("#t3").val()<0||$("#t3").val()==""||isNaN($("#t3").val())){
			$("#t3").css("border-color","red")
		}
		else{
			$("#t3").css("border-color","")
		}
		if ($("#t4").val()>255||$("#t4").val()<0||$("#t4").val()==""||isNaN($("#t4").val())){
			$("#t4").css("border-color","red")
		}
		else{
			$("#t4").css("border-color","")
		}
		if ($(this).css("border-color")=="rgb(0, 0, 0)"){
			cc++;
		}
		if (cc==5){
			let tc = document.getElementById("tc");
			let canvas = document.getElementById("canvas0");
			tc.width=$("#t0").val();
			tc.height=$("#t1").val();
			cs[0].width=$("#t0").val();
			cs[0].height=$("#t1").val();
			let ctx = canvas.getContext('2d');
			ctx.fillStyle="rgb("+$("#t2").val()+","+$("#t3").val()+","+$("#t4").val()+")";
			ctx.fillRect(0,0,cs[0].width,cs[0].height);
			img.push(ctx.getImageData(0,0,cs[0].width,cs[0].height));
			$("#dialog").dialog("close");
		}
	})
	cc=0;
	cgimg()
})
$("#close").click(function(){
	if (tool=="angle0"){
		tool="angle";
	}
	style=$("#style").val();
	anglecount=$(".anglecount").val();
	stroke=$("#stroke").val();
	$("#dialog0").dialog("close")
})
$("#close0").click(function(){
	if (tool=="square0"){
		tool="square";
	}
	else if (tool=="round0"){
		tool="round";
	}
	style=$("#style0").val();
	stroke=$(".stroke").val();
	$("#dialog1").dialog("close")
})
$("#dialog0").dialog({
	autoOpen:false,
	modal:true,
	width:500,
	height:300,
})
$("#dialog1").dialog({
	autoOpen:false,
	modal:true,
	width:500,
	height:300,
})
let xd=0
$(".img").mousedown(function(){
	stamp=$(this)[0];
	st=0;
	xd=1;
})
let upimage="";
setInterval(function(){
	if ($("#dialog").dialog("isOpen")){
		return false;
	}
	if ($("#up")[0].files[0]!=undefined&&$("#up")[0].files[0].name!=upimage){
		var reader = new FileReader();
		reader.readAsDataURL($("#up")[0].files[0]);
		reader.onload = function (e){
			$("#img")[0].src=e.currentTarget.result
		}
		$("#img")[0].onload= function (){
			ctxlist[thiscanvas].drawImage($("#img")[0],0,0);
			if (newimg+1!=img.length){
				img.length=newimg+1
			}
			img.push(ctxlist[thiscanvas].getImageData(0,0,cs[0].width,cs[0].height));
			newimg=img.length-1;
			cgimg()
		}
 		upimage=$("#up")[0].files[0].name;
	}
},1000/60);
let page=5;
let height=4;
let tempphoto;
$("#addpage").click(function(){
	$("#list").prepend($(`
		<div class='ll' id='l${page}'>
			<input id="ccanvas${page}" type='radio' class='radio' name='asd'>
			<img id="c${page}" class='allimg'>
			<img class='trash' src='trash.png' id='t${page}'>
			<img class='allmove' src='allmove.png' id='a${page}'>
		</div>
	`).data('yp', ($('.ll').length)+1));
	$("#allcanvas").prepend(`
		<canvas style='z-index:${height}' class='cana' id="canvas${page}" width="${cs[0].width}" height="${cs[0].height}">
		</canvas>
	`);
	$(".trash").off();
	$(".trash").click(function(){
		trash($(this)[0].id.substr(1,$(this)[0].id.length-1));
	})
	ctxlist[page]=document.getElementById(`canvas${page}`).getContext('2d');
	page++;
	height=height+4;
	$(".radio").off();
	$(".radio").click(function(e){
		radio(e);
	});
	//出現可以move畫布
	$(".allmove").off();
	$(".allmove").mousedown(function(){
		var $this=$(this);
		let number=$(this)[0].id.substr(1,$(this)[0].id.length-1);
		let canvas="#canvas"+$(this)[0].id.substr(1,$(this)[0].id.length-1);
		if ($("body").find(".mm").length){
			$(".mm").remove();
		}
		else{
			$("body").append(`
				<div class='mm' id='tl${number}' style="top:${$(canvas).css("top")};right:${$(canvas)[0].width-30+parseFloat($(canvas).css("right"))}px" ></div>
				<div class='mm' id='lb${number}' style="top:${parseFloat($(canvas).css("top"))+$(canvas)[0].height-30}px;right:${parseFloat($(canvas).css("right"))}px" ></div>
				<div class='mm' id='rt${number}' style="top:${$(canvas).css("top")};right:${parseFloat($(canvas).css("right"))}px" ></div>
				<div class='mm' id='bl${number}' style="top:${parseFloat($(canvas).css("top"))+$(canvas)[0].height-30}px;right:${$(canvas)[0].width-30+parseFloat($(canvas).css("right"))}px" ></div>
			`);
		};
		
		$(".mm").off();
		$(".mm").mousedown(function(e){
			tool="mm";
			$canvas=$(this)[0];
			let temp=$("#canvas"+$canvas.id.substr(2,$canvas.id.length-1))[0];
			tempphoto=temp.getContext('2d').getImageData(0,0,temp.width,temp.height)
			nx=e.pageX;
			ny=e.pageY;
			$canvas=$canvas.id.substr(2,$canvas.id.length-1);
			$canvas="#canvas"+$canvas;
			allcanmove=$(this);
		});
		//四點位置
		$("#tl"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right"))+$($canvas)[0].width-30,
			top:parseFloat($($canvas).css("top")),
		});
		$("#rt"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right")),
			top:parseFloat($($canvas).css("top")),
		})
		$("#lb"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right")),
			top:parseFloat($($canvas).css("top"))+$($canvas)[0].height-30,
		});
		$("#bl"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right"))+$($canvas)[0].width-30,
			top:parseFloat($($canvas).css("top"))+$($canvas)[0].height-30,
		});
	});
	//可拖動
	$(".sortable").sortable({
		axis:"y",
		cancel:"#ll",
		deactivate:function(e,ui){
			if (e.target.lastElementChild!=$("#ll")[0]){
				return false;
			}
			var i=0;
			$('.ll').find(".radio").each(function(){
				cgcang($(this)[0].id,i++)
			})
			i=0;
		}
	});
});
function cgcang(id,count){
	id=id.substr(1,id.length-1)
	$("#"+id).css("z-index",($(".ll").length-count+1)*4)
};
let allcanmove=0;
let $canvas;
//其餘畫布移動
function all(x,y,mm){
	if (allcanmove){
		if (mm[0].id.substr(0,2)=="tl"){
			//y
			if ($($canvas)[0].height-(y-ny)>0&&$($canvas)[0].height-(y-ny)<=canvas.height&&parseFloat($($canvas).css("top"))+(y-ny)>=0){
				$($canvas).css("top",parseFloat($($canvas).css("top"))+(y-ny));
				$($canvas)[0].height=$($canvas)[0].height-(y-ny);
			}
			//x
			if ($($canvas)[0].width+(nx-x)>0&&$($canvas)[0].width+(nx-x)+parseInt($($canvas).css("right"))<=canvas.width){
				$($canvas)[0].width=$($canvas)[0].width+(nx-x);
			}
		}
		if (mm[0].id.substr(0,2)=="bl"){
			//y
			if ($($canvas)[0].height-(ny-y)>0&&$($canvas)[0].height+parseFloat($($canvas).css("top"))+(y-ny)<=canvas.height){
					$($canvas)[0].height=$($canvas)[0].height-(ny-y);
			}
			//x
			if ($($canvas)[0].width+(nx-x)>0&&$($canvas)[0].width+(nx-x)+parseInt($($canvas).css("right"))<=canvas.width){
				$($canvas)[0].width=$($canvas)[0].width+(nx-x);
			}
		}
		if (mm[0].id.substr(0,2)=="rt"){
			//y
			if ($($canvas)[0].height-(y-ny)>0&&$($canvas)[0].height-(y-ny)<=canvas.height&&parseFloat($($canvas).css("top"))+(y-ny)>=0){
				$($canvas).css("top",parseFloat($($canvas).css("top"))+(y-ny));
				$($canvas)[0].height=$($canvas)[0].height-(y-ny);
			}
			//x
			if ($($canvas)[0].width-(nx-x)>0&&$($canvas)[0].width-(nx-x)<=canvas.width&&parseInt($($canvas).css("right"))+(nx-x)>=0){
				$($canvas)[0].width=$($canvas)[0].width-(nx-x);
				$($canvas).css("right",parseInt($($canvas).css("right"))+(nx-x))
			}
		}
		if (mm[0].id.substr(0,2)=="lb"){
			//y
			if ($($canvas)[0].height-(ny-y)>0&&$($canvas)[0].height+parseFloat($($canvas).css("top"))+(y-ny)<=canvas.height){
					$($canvas)[0].height=$($canvas)[0].height-(ny-y);
			}
			//x
			if ($($canvas)[0].width-(nx-x)>0&&$($canvas)[0].width-(nx-x)<=canvas.width&&parseInt($($canvas).css("right"))+(nx-x)>=0){
				$($canvas)[0].width=$($canvas)[0].width-(nx-x);
				$($canvas).css("right",parseInt($($canvas).css("right"))+(nx-x))
			}
		}
		//四點位置
		$("#tl"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right"))+$($canvas)[0].width-30,
			top:parseFloat($($canvas).css("top")),
		});
		$("#rt"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right")),
			top:parseFloat($($canvas).css("top")),
		})
		$("#lb"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right")),
			top:parseFloat($($canvas).css("top"))+$($canvas)[0].height-30,
		});
		$("#bl"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right"))+$($canvas)[0].width-30,
			top:parseFloat($($canvas).css("top"))+$($canvas)[0].height-30,
		});
		//繪製畫布位置
		if ($("#ccanvas"+mm[0].id.substr(2))[0].checked){
			canvas4.width=$($canvas)[0].width;
			canvas4.height=$($canvas)[0].height;
			$("#tc").css("top",cs.css("top"));
			$("#tc").css("right",cs.css("right"));
		}
		
		nx=x;
		ny=y;
		$($canvas)[0].getContext('2d').putImageData(tempphoto,0,0)
	}
};
$("#textout").mousedown(function(){
	var today=new Date();
	var year=today.getFullYear();
	var month=today.getMonth()+1;
	month=addz(month);
	var date=today.getDate();
	date=addz(date);
	var hour=today.getHours();
	hour=addz(hour);
	var min=today.getMinutes();
	min=addz(min)
	var sec=today.getSeconds();
	sec=addz(sec);
	var td=year+""+month+""+date+""+"_"+hour+""+min+""+sec;
	$.post({
		url:"ttf.php",
		async:false,
		data:{
			number:$(".ll").length,
			name:td,
			allphoto:$("#list")[0].innerHTML,
			allcanvas:$("#allcanvas")[0].innerHTML,
		},
		/*success:function(e){
			console.log(e);
		},*/
	});
	alert ("檔案新建成功");
})
let textin;
$("#textin").click(function(){
	clearInterval(textin);
	textin=setInterval(function(){
		if ($("#textin").val()!=""){
			let arr=$("#textin").val().split("\\");
			$.post({
				url:"ttfo.php",
				data:{name:arr[2]},
				success:function(e){
					cgscreen(e);
				},
			});
			$("#textin").val("");
			clearInterval(textin);
		}
	},1000/60)
})
//文字檔改變螢幕
function cgscreen(input){
	$(".mm").remove();
	let arr=input.split("$&^*");
	$(".ll").remove();
	$("#list").append(arr[1]);
	$(".cana").remove();
	$("#allcanvas").append(arr[2]);
	canvas = document.getElementById("canvas0");
	ctx = canvas.getContext('2d');
	
	$(".trash").off();
	$(".trash").click(function(){
		trash($(this)[0].id.substr(1,$(this)[0].id.length-1))
	})
	ctxlist.length=0;
	let smell=arr[0].split(";")
	page=smell[0].substr(5,smell.length[0])-1+5;
	height=page*4;
	ctxlist[0]=document.getElementById(`canvas0`).getContext('2d');
	for (let i = 5;i<page;i++){
		ctxlist[i]=document.getElementById(`canvas${i}`).getContext('2d');
	}
	$(".radio").off();
	$(".radio").click(function(e){
		radio(e);
	});
	$(".sortable").sortable({
		axis:"y",
		cancel:"#ll",
		deactivate:function(e,ui){
			if (e.target.lastElementChild!=$("#ll")[0]){
				return false;
			}
			var i=0;
			$('.ll').find(".radio").each(function(){
				cgcang($(this)[0].id,i++)
			})
			i=0;
		}
	});
	thiscanvas=0;
	thisimg="c0";
	cs=$("#canvas0");
	canvas4.width=cs[0].width;
	canvas4.height=cs[0].height;
	$(".allmove").mousedown(function(){
		$canvas="#canvas"+$(this)[0].id.substr(1);
		var $this=$(this);
		let number=$(this)[0].id.substr(1,$(this)[0].id.length-1);
		let canvas="#canvas"+$(this)[0].id.substr(1,$(this)[0].id.length-1);
		if ($("body").find(".mm").length){
			$(".mm").remove();
		}
		else{
			$("body").append(`
				<div class='mm' id='tl${number}' style="top:${$(canvas).css("top")};right:${$(canvas)[0].width-30+parseFloat($(canvas).css("right"))}px" ></div>
				<div class='mm' id='lb${number}' style="top:${parseFloat($(canvas).css("top"))+$(canvas)[0].height-30}px;right:${parseFloat($(canvas).css("right"))}px" ></div>
				<div class='mm' id='rt${number}' style="top:${$(canvas).css("top")};right:${parseFloat($(canvas).css("right"))}px" ></div>
				<div class='mm' id='bl${number}' style="top:${parseFloat($(canvas).css("top"))+$(canvas)[0].height-30}px;right:${$(canvas)[0].width-30+parseFloat($(canvas).css("right"))}px" ></div>
			`);
		};
		$(".mm").mousedown(function(e){
			tool="mm";
			$canvas=$(this)[0];
			let temp=$("#canvas"+$canvas.id.substr(2,$canvas.id.length-1))[0];
			tempphoto=temp.getContext('2d').getImageData(0,0,temp.width,temp.height)
			nx=e.pageX;
			ny=e.pageY;
			$canvas=$canvas.id.substr(2,$canvas.id.length-1);
			$canvas="#canvas"+$canvas;
			allcanmove=$(this);
		});
		//四點位置
		$("#tl"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right"))+$($canvas)[0].width-30,
			top:parseFloat($($canvas).css("top")),
		});
		$("#rt"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right")),
			top:parseFloat($($canvas).css("top")),
		})
		$("#lb"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right")),
			top:parseFloat($($canvas).css("top"))+$($canvas)[0].height-30,
		});
		$("#bl"+$canvas.substr(7,$canvas.length-1)).css({
			right:parseFloat($($canvas).css("right"))+$($canvas)[0].width-30,
			top:parseFloat($($canvas).css("top"))+$($canvas)[0].height-30,
		});
	});
	setTimeout(function(){
		$(".ll").find(".allimg").each(function(){
			$("#canvas"+$(this)[0].id.substr(1,$(this)[0].id.length))[0].getContext('2d').drawImage($("#"+$(this)[0].id)[0],0,0);
		})
	},1)
}