var canvas0 = document.getElementById("canvas0");
var ctx0 = canvas0.getContext('2d');
var canvas1 = document.getElementById("canvas1");
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext('2d');
ctx1.lineWidth = 20;
ctx2.lineWidth = 20;
var canvas3 = document.getElementById("canvas3");
var ctx3 = canvas3.getContext('2d');
var allcookie = new Object();
var img = new Image();
var step = 0;
var time = 0;
var lineA = [];
var lineB = [];
var lineC = [];
var templine = [];
var temp = "";
var back = 0;
var answer = 1;
var allline = [];
var backstep = -1;
var backarr = new Array();
var tm;
var lengthmiss = 16; //盤子長度差
//review 變數
var re = 0;
var saveall = new Array();
var retime = 0;
//解答
var ansspeed = 500;
$("#canvas1").mousemove(function(e){
  if (re)return false;
  //顯示ABC
  var bound = canvas1.getBoundingClientRect();
  var lx = e.clientX-bound.left;
  var ly = e.clientY-bound.top;
  if (lx < 180 && ly < 400 && ly > 240 && back){//返回鍵
    $("#canvas1").css("cursor","pointer");
  }
  else if (lx < 180 && ly < 500 && ly > 430 && answer){//答案
    $("#canvas1").css("cursor","pointer");
  }
  else{
    $("#canvas1").css("cursor","auto");
  }
  if (lx > 195 && lx < 390 && ly > 230){//A
    ctx0.fillStyle = "white";
    ctx0.font = "40px 微軟正黑體";
    ctx0.fillText("C",680,595);
    ctx0.fillText("B",480,595);
    ctx0.fillText("A",278,595);
    $("#canvas1").css("cursor","pointer");
    ctx0.fillStyle = "blue";
    ctx0.font = "40px 微軟正黑體";
    ctx0.fillText("A",278,595);
  }
  else if (lx > 390 && lx < 589 && ly > 230){//B
    ctx0.fillStyle = "white";
    ctx0.font = "40px 微軟正黑體";
    ctx0.fillText("C",680,595);
    ctx0.fillText("B",480,595);
    ctx0.fillText("A",278,595);
    $("#canvas1").css("cursor","pointer");
    ctx0.fillStyle = "blue";
    ctx0.font = "40px 微軟正黑體";
    ctx0.fillText("B",480,595);
  }
  else if (lx > 593 && lx < 790 && ly > 230){//C
    ctx0.fillStyle = "white";
    ctx0.font = "40px 微軟正黑體";
    ctx0.fillText("C",680,595);
    ctx0.fillText("B",480,595);
    ctx0.fillText("A",278,595);
    $("#canvas1").css("cursor","pointer");
    ctx0.fillStyle = "blue";
    ctx0.font = "40px 微軟正黑體";
    ctx0.fillText("C",680,595);
  }
  else {
    ctx0.fillStyle = "white";
    ctx0.font = "40px 微軟正黑體";
    ctx0.fillText("C",680,595);
    ctx0.fillText("B",480,595);
    ctx0.fillText("A",278,595);
  };
  //顯示正在移動的盤子
  if (temp != ""){
    thisplate(lx,ly,5 + lengthmiss * temp);
  };
});
$("#canvas1").mousedown(function(e){//搬移河內塔的盤子
  if (re)return false;
  var bound = canvas1.getBoundingClientRect();
  var lx = e.clientX-bound.left;
  var ly = e.clientY-bound.top;
  var img = new Image();
  if (lx > 195 && lx < 390 && ly > 230){//A
    if (temp != ""){
      var count = 1;
      if (lineA[lineA.length-1] == 0){
        count = lineA.length;
      }
      else {
        while (lineA[count] == 0){
          count++;
        }; 
      };
      if (temp < lineA[count] || lineA[lineA.length - 1] == 0){
        ctx2.clearRect(0,0,canvas2.width,canvas2.height);
        lineA[count-1] = temp;
        temp = "";
        for (let i = lineA.length - 1; i >= 0 ;i--){
          whplan(lineA[i],lineA.length - 1 - i,0);
        };
        ck();
      };
      return false;
    };
    select(lineA,0);
  }
  else if (lx > 390 && lx < 589 && ly > 230){//B
    if (temp != ""){
      var count = 1;
      if (lineB[lineB.length - 1] == 0){
        count = lineB.length;
      }
      else {
        while (lineB[count] == 0){
          count++;
        };
      };
      if (temp < lineB[count] || lineB[lineB.length - 1] == 0){
        ctx2.clearRect(0,0,canvas2.width,canvas2.height);
        lineB[count-1] = temp;
        temp = "";
        for (let i = lineA.length - 1; i >= 0 ;i--){
          whplan(lineB[i],lineB.length - 1 - i,1);
        };
        ck();
      };
      return false;
    };
    select(lineB,1);
  }
  else if (lx > 593 && lx < 790 && ly > 230){//C
    if (temp != ""){
      var count = 1;
      if (lineC[lineC.length-1] == 0){
        count = lineC.length;
      }
      else {
        while (lineC[count] == 0){
          count++;
        };
      }
      if (temp < lineC[count] || lineC[lineC.length-1] == 0){
        ctx2.clearRect(0,0,canvas2.width,canvas2.height);
        lineC[count-1] = temp;
        temp = "";
        for (let i = lineA.length - 1; i >= 0 ;i--){
          whplan(lineC[i],lineC.length - 1 - i,2);
        };
        ck();
      };
      return false;
    };
    select(lineC,2);
  };
  //顯示正在移動的盤子
  if (temp != ""){
    thisplate(lx , ly, 5 + lengthmiss * temp);
  };
  if (lx < 180 && ly < 500 && ly > 430 && answer && temp == ""){//答案
    answerc();
  }
  if (lx < 180 && ly < 400 && ly > 240 && back && temp == ""){
    backc();
  };
});
$(".new").click(function(){
  $("#dialog1").dialog("close");
  history.go(0);//刷新頁面
});
$(function(){
  let cookie = document.cookie;
  if (cookie == ""){ 
    $("#dialog0").dialog("open");
  }
  else{
    let i = 0;
    let arr = cookie.split(";");
    let list = new Array();
    for (i = 0 ; i < arr.length ; i++){
      list[i] = arr[i].split("=")
      if (list[i][0][0] == " "){
        let newname = "";
        for (let j = 1 ; j < list[i][0].length ; j++){
          newname = newname + list[i][0][j];
        }
        list[i].splice(0,1,newname);
      }
    };
    for (i = 0 ; i < list.length ; i++){
      allcookie[list[i][0]] = list[i][1];
    };
    if (allcookie.past == "true"){
      $("#dialog0").dialog("open");
    }
    else{
      let arr = allcookie.allline.split("++");
      for (let i = 0 ; i < arr.length-1 ; i++){
        arr[i] = arr[i].split("**");
        for (let j = 0 ; j < arr[i].length ; j++){
          arr[i][j] = stringarray(arr[i][j]);
        };
      };
      arr.pop();
      allline = arr;
      let allarr = allcookie.saveall.split("++");
      allarr.pop();
      for (let i = 0 ; i < allarr.length ; i++){
        allarr[i]=allarr[i].split("**");
        for (let j = 0 ; j < allarr[i].length ; j++){
          allarr[i][j] = stringarray(allarr[i][j]);
        };
        allarr[i][3] = parseInt(allarr[i][3]);
      };
      saveall = allarr;
      back = 1;
      answer = 0;
      backstep = allcookie.backstep++
      lineA = stringarray(allcookie.lineA);
      lineB = stringarray(allcookie.lineB);
      lineC = stringarray(allcookie.lineC);
      $("#avatar")[0].src = allcookie.img;
      step = parseInt(allcookie.step);
      difficult = allcookie.difficult;
      $("#difficult").val(difficult);
      $("#name").val(allcookie.name);
      setInterval(function(){
        retime = retime + parseInt(1000/60);
      },1000/60);
      time = allcookie.time;
      var img = new Image();
      img.src = "image/background.jpg";
      img.onload = function(){
        ctx1.drawImage($("#avatar")[0],15,15);//大頭貼
        ctx0.drawImage(img,0,0);
        pillar();
      };
      drawcan1();
      for (let i = lineA.length-1 ; i >= 0 ; i--){
        whplan(lineA[i],lineA.length - 1 - i,0);
        whplan(lineB[i],lineB.length - 1 - i,1);
        whplan(lineC[i],lineC.length - 1 - i,2);
      };
      for ( i = 0 ; i < allline.length ; i++){
        for (j = allline[i][0].length-1 ; j >= 0 ; j--){
          whplan(lineA[i],lineA.length - 1 - i,0);
          resaveback(ctx3,allline[i][0][j],allline[i][0].length - j - 1,0);
          resaveback(ctx3,allline[i][1][j],allline[i][0].length - j - 1,1);
          resaveback(ctx3,allline[i][2][j],allline[i][0].length - j - 1,2);
        };
        backarr[i] = ctx3.getImageData(195,227,canvas1.width-195,canvas1.height-227);
        ctx3.clearRect(0,0,canvas3.width,canvas3.height);
      };
    };
  };
});