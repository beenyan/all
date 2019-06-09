function canvas(){
  var count = 4;
  while ($("#difficult").val()>0){//盤子放入陣列
    lineA[count]=parseInt($("#difficult").val());
    count--;
    $("#difficult").val($("#difficult").val()-1);
  };
  $("#difficult").val(difficult);
  var img = new Image();
  img.src = "image/background.jpg";
  img.onload = function(){
    ctx0.drawImage(img,0,0);
    pillar();
  };
  drawcan1();
};
function drawcan1(){
  //黑底
  ctx1.fillStyle = "rgba(0,0,0,0.5)";
  ctx1.fillRect(5,5,80+52.5*$("#name").val().length,80);
  ctx1.drawImage($("#avatar")[0],15,15);//大頭貼
  ctx1.font="50px 微軟正黑體";//字體大小
  ctx1.fillStyle = "rgb(255,255,255)";//字體顏色
  ctx1.fillText($("#name").val(),90,60);//文字
  ctx1.fillStyle = "rgba(166,49,26,1)";//難度背景
  ctx1.arc(140+52.5*$("#name").val().length,45,35,0,Math.PI*2);
  ctx1.fill();
  ctx1.fillStyle = "rgb(135,212,218)";//字體顏色
  ctx1.fillText($("#difficult").val(),126+52.5*$("#name").val().length,62);//難度文字
  ctx1.fillStyle = "rgba(142,36,23,0.5)";//時間背景
  ctx1.fillRect(615,5,180,80);
  ctx1.fillStyle = "rgba(229,194,78,1)";//時間文字顏色
  ctx1.font="40px 微軟正黑體";//字體大小
  ctx1.fillText(parseInt(time/60) + "：" + time%60,640,60);
  ctx1.fillStyle = "rgba(255,0,0,0.2)";
  ctx1.fillRect(5,90,180,505);
  //步數
  ctx1.fillStyle = "rgb(127,208,191)";
  ctx1.font = "80px 微軟正黑體";//字體大小
  ctx1.fillText(step,40,200)
  if (step == 0){
    //解答
    ctx1.fillStyle = "rgba(255,255,255,1)";
    ctx1.font = "80px 微軟正黑體";//字體大小
    ctx1.fillText("Ans",25,500);
  }
  else{
    //返回鍵
    img.src = "image/back.png";
    img.onload = function (){
      ctx1.drawImage(img,25,250);
    };
  };
  clearInterval(tm);
  tm = setInterval(function(){
    ++time;
    ctx1.clearRect(615,5,180,80);
    ctx1.fillStyle = "rgba(142,36,23,0.5)";//時間背景
    ctx1.fillRect(615,5,180,80);
    ctx1.fillStyle = "rgba(229,194,78,1)";//時間文字顏色
    ctx1.font="40px 微軟正黑體";//字體大小
    ctx1.fillText(parseInt(time/60) + "：" + time%60,640,60);
  },1000);
};
function pillar(){//柱子
  var img = new Image();
  img.src = "image/pillar.png";
  img.onload = function (){
    ctx0.drawImage(img,190,229);
    ctx0.fillStyle = "rgba(255,255,255,1)";
    ctx0.font="40px 微軟正黑體";//字體大小
    ctx0.fillText("A",278,595);
    ctx0.drawImage(img,390,229);
    ctx0.fillStyle = "rgba(255,255,255,1)";
    ctx0.font="40px 微軟正黑體";//字體大小
    ctx0.fillText("B",480,595);
    ctx0.drawImage(img,590,229);
    ctx0.fillStyle = "rgba(255,255,255,1)";
    ctx0.font="40px 微軟正黑體";//字體大小
    ctx0.fillText("C",680,595);
    plate();
  }
};
function plate(){//盤子
  ctx1.lineCap = "round";
  ctx1.lineJoin = "round";
  ctx1.lineWidth = 30;
  /*var lingrad2 = ctx1.createLinearGradient(200,400,385,400); //漸層
  lingrad2.addColorStop(0, 'rgb(100,0,0)');
  lingrad2.addColorStop(0.5, 'rgb(255,0,0)');
  lingrad2.addColorStop(1, 'rgb(100,0,0)');*/
  ctx1.strokeStyle = "red";
  var count = 4;
  while (count >= 0){//盤子放入陣列
    whplan(lineA[count],lineA.length-1-count,0);
    count--;
  };
  saveimg();
};
function whplan(nn,pos,ABC){//畫盤子
  ctx1.lineCap = "round";
  ctx1.lineJoin = "round";
  ctx1.lineWidth = 30;
  ctx1.strokeStyle = "red";
  if (nn == 0){
    return false;
  }
  else if (nn == 1){
    return ctx1.strokeRect(260+200*ABC,545-pos*31,65,0);
  }
  else if (nn == 2){
    return ctx1.strokeRect(250+200*ABC,545-pos*31,85,0);
  }
  else if (nn == 3){
    return ctx1.strokeRect(240+200*ABC,545-pos*31,105,0);
  }
  else if (nn == 4){
    return ctx1.strokeRect(230+200*ABC,545-pos*31,125,0);
  }
  else if (nn == 5){
    return ctx1.strokeRect(220+200*ABC,545-pos*31,145,0);
  };
};
function select(nn,pos){//拿河內塔的盤子
  let count = 0; 
  if (nn[nn.length-1] == 0)return false;
  while (nn[count] == 0)count++;
  if (temp == ""){
    ctx1.clearRect(193+pos*200,545-(nn.length-count-1)*31-15,200,30);//清除拿取
    temp = nn[count];//存在變數
    nn[count] = 0;//陣列刪除
  };
};
function thisplate(x,y,lengh){
  ctx2.lineCap='round';
  ctx2.lineJoin='round';
  ctx2.strokeStyle="rgb(255,0,0)";
  ctx2.lineWidth=30;
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  ctx2.strokeRect(x-lengh/2,y,lengh,0);
};
function ck(){
  savereview();
  cook();
  saveimg();
  step++;
  ctx1.clearRect(5,90,180,505);//清理畫布
  ctx1.fillStyle = "rgba(255,0,0,0.2)";
  ctx1.fillRect(5,90,180,505);
  //步數
  ctx1.fillStyle = "rgb(127,208,191)";
  ctx1.font = "80px 微軟正黑體";//字體大小
  ctx1.fillText(step,40,200)
  //返回鍵
  img.src = "image/back.png";
  img.onload = function (){
    ctx1.drawImage(img,25,250);
  };
  answer = 0;
  back = 1;
  let cc = difficult;
  for (var i = 4 ; i>=0 ; i--){
    templine[i] = cc--;
    if (cc == 0){
      break;
    };
  };
  var count = 0;
  for (var i = 0 ; i <= 4 ; i++){
    if (lineC[i] == templine[i]){
      count++;
    };
  };
  if (count == 5){
    win();
  };
};
function first(){
  let diff = parseInt(difficult);
  let arr = [];
  arr.length = 5;
  for (let i = 4 ; i >= 0 ; i--){
    if (diff>0){
      arr[i] = diff;
    }
    else{
      arr[i] = 0;
    };
    diff--;
  };
  return arr;
};
function backc(){
  if (backstep-1 < 0){
    return false;
  };
  backstep--;
  ctx1.putImageData(backarr[backstep],195,227);
  let temp = allline[backstep];
  lineA = inline(temp[0]);
  lineB = inline(temp[1]);
  lineC = inline(temp[2]);
  step++;
  ctx1.clearRect(5,90,180,505);//清理畫布
  ctx1.fillStyle="rgba(255,0,0,0.2)";
  ctx1.fillRect(5,90,180,505);
  //步數
  ctx1.fillStyle="rgb(127,208,191)";
  ctx1.font="80px 微軟正黑體";//字體大小
  ctx1.fillText(step,40,200)
  //返回鍵
  img.src="image/back.png";
  img.onload = function (){
    ctx1.drawImage(img,25,250);
  };
  answer = 0;
  back = 1;
  cook(-1);
  savereview();
  cook();
};
function saveimg(){
  ++backstep;
  allline[backstep] = [inline(lineA),inline(lineB),inline(lineC)];
  backarr[backstep] = ctx1.getImageData(195,227,canvas1.width-195,canvas1.height-227);
};
function inline(nn){
  let list = [];
  for (let i = 0 ; i < nn.length ; i++){
    list.push(nn[i]);
  };
  return list;
};
function win(){
  clearInterval(tm);
  $.post({
    async:false,
    url:"add.php",
    data:{
      name:$("#name").val(),
      step:step,
      img:$("#avatar")[0].src,
      difficult:difficult
    },
  });
  $.post({
    async:false,
    url:"search.php",
    data:{difficult:difficult},
    success:function(e){
      winlist(e);
    },
  });
  $("#dialog1").dialog("open")
};
function winlist(e){
  document.cookie = "time=";
  document.cookie = "step=";
  document.cookie = "name=";
  document.cookie = "lineA=";
  document.cookie = "lineB=";
  document.cookie = "lineC=";
  document.cookie = "img=";
  document.cookie = "difficult=";
  document.cookie = "backstep=";
  document.cookie = "allline=";
  document.cookie = "past=true";
  let arr = e.split(";");
  for (let i = 0 ; i < arr.length-1 ; i++){
    var arry=arr[i].split(",");
    $(".win").append(`
			<div class="list">
        <div class="number">${arry[0]}</div>
        <div class="name">${arry[1]}</div>
        <div class="img" style="background:url(${arry[2]});background-position: center center;background-repeat: no-repeat;z-index:5"> . </div>
        <div class="step">${arry[3]}</div>
      </div>
    `);
  }
};
function cook(num){
  if (num == undefined){
    num = 0;
  };
  document.cookie = "name="+$("#name").val();
  document.cookie = "step="+(step+1+num);
  document.cookie = "lineA="+inline(lineA);
  document.cookie = "lineB="+inline(lineB);
  document.cookie = "lineC="+inline(lineC);
  document.cookie = "difficult="+difficult;
  document.cookie = "time="+time;
  document.cookie = "past=false";
  document.cookie = "img="+$("#avatar")[0].src;
  document.cookie = "backstep="+backstep;
  let fixline = new Array();
  for (let i = 0 ; i < allline.length ; i++){
    fixline = fixline + allline[i][0] + "**" + allline[i][1] + "**" + allline[i][2] + "++";
  };
  document.cookie = "allline=" + fixline;
  let ss = "";
  for (i = 0 ; i < saveall.length ; i++){
    ss = ss + saveall[i][0] + "**" + saveall[i][1] + "**" + saveall[i][2] + "**" + parseInt(saveall[i][3]) + "++";
  };
  document.cookie = "saveall=" + ss;
};
function stringarray(nn){
  let arr=new Array();
  arr = nn.split(",");
  for (let i = 0 ; i < arr.length ; i++){
    arr[i] = parseInt(arr[i]);
  };
  return arr;
};
function resaveback(ctx,nn,pos,ABC){
  ctx3.lineCap = "round";
  ctx3.lineJoin = "round";
  ctx3.lineWidth = 30;
  ctx3.strokeStyle = "red";
  if (nn == 0){
    return false;
  }
  else if (nn == 1){
    return ctx.strokeRect(260+200*ABC,545-pos*31,65,0);
  }
  else if (nn == 2){
    return ctx.strokeRect(250+200*ABC,545-pos*31,85,0);
  }
  else if (nn == 3){
    return ctx.strokeRect(240+200*ABC,545-pos*31,105,0);
  }
  else if (nn == 4){
    return ctx.strokeRect(230+200*ABC,545-pos*31,125,0);
  }
  else if (nn == 5){
    return ctx.strokeRect(220+200*ABC,545-pos*31,145,0);
  };
};
function savereview(){
  saveall.push([inline(lineA),inline(lineB),inline(lineC),retime]);
  retime = 0;
};
setInterval(function(){
  retime = retime + 1000/60;
},1000/60);
function review(){
  if (saveall.length == 1 || re)return false;
  clearInterval(tm);
  let settime = 0;
  re = 1;
  for (let i = 0 ; i < saveall.length ; i++){
    settime = settime + saveall[i][3];
    setTimeout(function(){
      ctx1.clearRect(196,200,canvas2.width-196,canvas2.height-200);
      for (j = 4 ; j >= 0 ; j--){
        resaveback(ctx1,saveall[i][0][j],4-j,0);
        resaveback(ctx1,saveall[i][1][j],4-j,1);
        resaveback(ctx1,saveall[i][2][j],4-j,2);
      };
      if (i+1 == saveall.length){
        tm = setInterval(function(){
          ++time;
          ctx1.clearRect(615,5,180,80);
          ctx1.fillStyle = "rgba(142,36,23,0.5)";//時間背景
          ctx1.fillRect(615,5,180,80);
          ctx1.fillStyle = "rgba(229,194,78,1)";//時間文字顏色
          ctx1.font="40px 微軟正黑體";//字體大小
          ctx1.fillText(parseInt(time/60)+"："+time%60,640,60);
        },1000);
        re = 0;
      }
    },settime);
  };
};
function speedreview(){
  if (saveall.length == 1 || re)return false;
  clearInterval(tm);
  let settime = 200;
  re = 1;
  for (let i = 0 ; i < saveall.length ; i++){
    settime = settime + 200;
    setTimeout(function(){
      ctx1.clearRect(196,200,canvas2.width-196,canvas2.height-200);
      for (j = 4 ; j >= 0 ; j--){
        resaveback(ctx1,saveall[i][0][j],4-j,0);
        resaveback(ctx1,saveall[i][1][j],4-j,1);
        resaveback(ctx1,saveall[i][2][j],4-j,2);
      };
      if (i+1 == saveall.length){
        tm = setInterval(function(){
          ++time;
          ctx1.clearRect(615,5,180,80);
          ctx1.fillStyle = "rgba(142,36,23,0.5)";//時間背景
          ctx1.fillRect(615,5,180,80);
          ctx1.fillStyle = "rgba(229,194,78,1)";//時間文字顏色
          ctx1.font="40px 微軟正黑體";//字體大小
          ctx1.fillText(parseInt(time/60)+"："+time%60,640,60);
        },1000);
        re = 0;
      }
    },settime);
  };
};