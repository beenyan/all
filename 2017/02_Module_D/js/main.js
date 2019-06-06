var canvas0=document.getElementById("canvas0");
var ctx0=canvas0.getContext('2d');
var canvas1=document.getElementById("canvas1");
var ctx1=canvas1.getContext('2d');
var canvas2=document.getElementById("canvas2");
var ctx2=canvas2.getContext('2d');
var img = new Image();
var step=0;
var time=0;
var lineA=[0,0,0,0,0];
var lineB=[0,0,0,0,0];
var lineC=[0,0,0,0,0];
var templine=[0,0,0,0,0];
var temp="";
var back=0;
var answer=1;
var allline=[];
var backstep=-1;
var backarr=new Array();
var tm;
$("#canvas1").mousemove(function(e){
  //顯示ABC
  var bound=canvas1.getBoundingClientRect();
  var lx=e.clientX-bound.left;
  var ly=e.clientY-bound.top;
  if (lx<180&&ly<400&&ly>240&&back){//返回鍵
    $("#canvas1").css("cursor","pointer");
  }
  else if (lx<180&&ly<500&&ly>430&&answer){//答案
    $("#canvas1").css("cursor","pointer");
  }
  else{
    $("#canvas1").css("cursor","auto");
  }
  if (lx>195&&lx<390&&ly>230){//A
    ctx0.fillStyle="white";
    ctx0.font="40px 微軟正黑體";
    ctx0.fillText("C",680,595);
    ctx0.fillText("B",480,595);
    ctx0.fillText("A",278,595);
    $("#canvas1").css("cursor","pointer");
    ctx0.fillStyle="blue";
    ctx0.font="40px 微軟正黑體";
    ctx0.fillText("A",278,595);
  }
  else if (lx>390&&lx<589&&ly>230){//B
    ctx0.fillStyle="white";
    ctx0.font="40px 微軟正黑體";
    ctx0.fillText("C",680,595);
    ctx0.fillText("B",480,595);
    ctx0.fillText("A",278,595);
    $("#canvas1").css("cursor","pointer");
    ctx0.fillStyle="blue";
    ctx0.font="40px 微軟正黑體";
    ctx0.fillText("B",480,595);
  }
  else if (lx>593&&lx<790&&ly>230){//C
    ctx0.fillStyle="white";
    ctx0.font="40px 微軟正黑體";
    ctx0.fillText("C",680,595);
    ctx0.fillText("B",480,595);
    ctx0.fillText("A",278,595);
    $("#canvas1").css("cursor","pointer");
    ctx0.fillStyle="blue";
    ctx0.font="40px 微軟正黑體";
    ctx0.fillText("C",680,595);
  }
  else {
    ctx0.fillStyle="white";
    ctx0.font="40px 微軟正黑體";
    ctx0.fillText("C",680,595);
    ctx0.fillText("B",480,595);
    ctx0.fillText("A",278,595);
  }
  //顯示正在移動的盤子
  if (temp!=""){
    thisplate(lx,ly,45+20*temp);
  }
});
$("#canvas1").mousedown(function(e){//搬移河內塔的盤子
  var bound=canvas1.getBoundingClientRect();
  var lx=e.clientX-bound.left;
  var ly=e.clientY-bound.top;
  var img = new Image();
  if (lx>195&&lx<390&&ly>230){//A
    if (temp!=""){
      var count = 1;
      if (lineA[lineA.length-1]==0){
        count=lineA.length;
      }
      else {
        while (lineA[count]==0){
          count++;
        }; 
      };
      if (temp<lineA[count]||lineA[lineA.length-1]==0){
        ctx2.clearRect(0,0,canvas2.width,canvas2.height);
        lineA[count-1]=temp;
        temp="";
        var plan=4;
        while (plan>=0){//盤子放入陣列
          whplan(lineA[plan],lineA.length-1-plan,0);
          plan--;
        };
        ck();
      };
      return false;
    };
    select(lineA,0);
  }
  else if (lx>390&&lx<589&&ly>230){//B
    if (temp!=""){
      var count = 1;
      if (lineB[lineB.length-1]==0){
        count=lineB.length;
      }
      else {
        while (lineB[count]==0){
          count++;
        };
      };
      if (temp<lineB[count]||lineB[lineB.length-1]==0){
        ctx2.clearRect(0,0,canvas2.width,canvas2.height);
        lineB[count-1]=temp;
        temp="";
        var plan=4;
        while (plan>=0){//盤子放入陣列
          whplan(lineB[plan],lineB.length-1-plan,1);
          plan--;
        };
        ck();
      };
      return false;
    };
    select(lineB,1);
  }
  else if (lx>593&&lx<790&&ly>230){//C
    if (temp!=""){
      var count = 1;
      if (lineC[lineC.length-1]==0){
        count=lineC.length;
      }
      else {
        while (lineC[count]==0){
          count++;
        };
      }
      if (temp<lineC[count]||lineC[lineC.length-1]==0){
        ctx2.clearRect(0,0,canvas2.width,canvas2.height);
        lineC[count-1]=temp;
        temp="";
        var plan=4
        while (plan>=0){//盤子放入陣列
          whplan(lineC[plan],lineC.length-1-plan,2);
          plan--;
        };
        ck();
      };
      return false;
    };
    select(lineC,2);
  };
  //顯示正在移動的盤子
  if (temp!=""){
    thisplate(lx,ly,45+20*temp);
  };
  if (lx<180&&ly<400&&ly>240&&back&&temp==""){
    backc();
  };
});