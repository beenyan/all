var canvas0=document.getElementById("canvas0");
var ctx0=canvas0.getContext('2d');
var canvas1=document.getElementById("canvas1");
var ctx1=canvas1.getContext('2d');
var time=0;
var tm;
$("#canvas1").mousemove(function(e){
  var bound=canvas1.getBoundingClientRect();
  if (e.clientX-bound.left<180&&e.clientY-bound.top<400&&e.clientY-bound.top>240){//返回鍵
    $("#canvas1").css("cursor","pointer");
  }
  else if (e.clientX-bound.left<180&&e.clientY-bound.top<500&&e.clientY-bound.top>430){//答案
    $("#canvas1").css("cursor","pointer");
  }
  else{
    $("#canvas1").css("cursor","auto");
  }
});