function canvas(){
  var img=new Image();
  img.src="image/background.jpg";
  img.onload = function(){ctx0.drawImage(img,0,0);};
  drawcan1();
};
function drawcan1(){
  //黑底
  ctx1.fillStyle="rgba(0,0,0,0.5)";
  ctx1.fillRect(5,5,80+52.5*$("#name").val().length,80);
  ctx1.drawImage($("#avatar")[0],15,15);//大頭貼
  ctx1.font="50px 微軟正黑體";//字體大小
  ctx1.fillStyle="rgb(255,255,255)";//字體顏色
  ctx1.fillText($("#name").val(),90,60);//文字
  ctx1.fillStyle="rgba(166,49,26,1)";//難度背景
  ctx1.arc(140+52.5*$("#name").val().length,45,35,0,Math.PI*2);
  ctx1.fill();
  ctx1.fillStyle="rgb(135,212,218)";//字體顏色
  ctx1.fillText($("#difficult").val(),126+52.5*$("#name").val().length,62);//難度文字
  ctx1.fillStyle="rgba(142,36,23,0.5)";//時間背景
  ctx1.fillRect(615,5,180,80);
  ctx1.fillStyle="rgba(229,194,78,1)";//時間文字顏色
  ctx1.font="40px 微軟正黑體";//字體大小
  ctx1.fillText("0：0",640,60);
  ctx1.fillStyle="rgba(255,0,0,0.2)";
  ctx1.fillRect(5,90,180,505);
  //步數
  ctx1.fillStyle="rgb(127,208,191)";
  ctx1.font="80px 微軟正黑體";//字體大小
  ctx1.fillText("0",50,200)
  //返回鍵
  var img = new Image();
  img.src="image/back.png";
  img.onload = function (){
    ctx1.drawImage(img,25,250);
  }
  //解答
  ctx1.fillStyle="rgba(255,255,255,1)";
  ctx1.font="80px 微軟正黑體";//字體大小
  ctx1.fillText("Ans",25,500);

  clearInterval(tm);
  tm=setInterval(function(){
    ++time;
    ctx1.clearRect(615,5,180,80);
    ctx1.fillStyle="rgba(142,36,23,0.5)";//時間背景
    ctx1.fillRect(615,5,180,80);
    ctx1.fillStyle="rgba(229,194,78,1)";//時間文字顏色
    ctx1.font="40px 微軟正黑體";//字體大小
    ctx1.fillText(parseInt(time/60)+"："+time%60,640,60);
  },1000);
}