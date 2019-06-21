$(function(){
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = 160;
  canvas.height = 100;
  $("#cg").append(canvas);
  ctx.font = "40px 微軟正黑體";
  ctx.fillText("購物交換",0,65);
  ctx.globalCompositeOperation = "source-in";
  let gar = ctx.createLinearGradient(0,65,120,100);
  gar.addColorStop(0,"red");
  gar.addColorStop(0.25,"gold");
  gar.addColorStop(0.5,"green");
  gar.addColorStop(0.75,"blue");
  gar.addColorStop(1,"purple");
  ctx.fillStyle = gar;
  ctx.fillRect(0,25,canvas.width,canvas.height - 55);
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.font = "40px 微軟正黑體";
  ctx.fillText("購物交換",3,68);
});
$("#cg").dblclick(function(e){
  if ($(".water").length) return false;
  let times = 5;
  setTimeout(createwater,1);
  function createwater(){
    console.log(e.offsetY)
    if (times--){
      $("#cg").prepend(`<div class="water"></div>`)
      setTimeout(function(){
        $(".water:last").remove();
      },1500);
      console.log($("#cg").height() - $(".water").height());
      $(".water:first").css({
        top : $("#cg").height() - $(".water").height() + e.offsetY - 20,
        left : e.offsetX - $(".water").width() / 2,
      })
      setTimeout(createwater,300);
    }
    else {
      $(".img").click();
      cgtext();
    }
  };
});
$(".h1").mousedown(function(){
  cgtext();
});
let downup0 = 1;
let time0;
$(".h1:eq(1)").mousedown(function(){
  downup0 =  downup0 % 2;
  clearTimeout(time0);
  if (downup0){
    time0 = setTimeout(down,10);
  }
  else {
    time0 = setTimeout(up,10);
  }
  function down(){
    $(".curtain:eq(1) h1").fadeIn(1000);
    if ($(".curtain:eq(1)").height() < 615){
      $(".curtain:eq(1)").height($(".curtain:eq(1)").height()+10)
      time0 = setTimeout(down,10);
    }
  }
  function up(){
    $(".curtain:eq(1) h1").fadeOut(1000);
    if ($(".curtain:eq(1)").height() > 0){
      $(".curtain:eq(1)").height($(".curtain:eq(1)").height()-10)
      time0 = setTimeout(up,10);
    }
  }
  downup0++;
});
let downup1 = 1;
let time1;
$(".h1:eq(0)").mousedown(function(){
  downup1 =  downup1 % 2;
  clearTimeout(time1);
  if (downup1){
    time1 = setTimeout(down,10);
  }
  else {
    time1 = setTimeout(up,10);
  }
  function down(){
    $(".curtain:eq(0) h1").fadeIn(1000);
    if ($(".curtain:eq(0)").height() < 615){
      $(".curtain:eq(0)").height($(".curtain:eq(0)").height()+10)
      time1 = setTimeout(down,10);
    }
  }
  function up(){
    $(".curtain:eq(0) h1").fadeOut(1000);
    if ($(".curtain:eq(0)").height() > 0){
      $(".curtain:eq(0)").height($(".curtain:eq(0)").height()-10)
      time1 = setTimeout(up,10);
    }
  }
  downup1++;
});
function cgtext(){
  let right = {
    1 : 0,
    2 : 0,
    3 : 0,
    4 : 0,
  };
  let left = {
    1 : 0,
    2 : 0,
    3 : 0,
    4 : 0,
  };
  $("#right .img").each(function(){
    right[$(this).data("kind")]++;
  });
  for (let i = 1 ; i <= 4 ; i++){
    $(".curtain:eq(1) h1:eq(" + (i - 1) + ")").text($(".curtain:eq(1) h1:eq(" + (i - 1) + ")").text().substr(0,4) + right[i]);
  };
  $("#left .img").each(function(){
    left[$(this).data("kind")]++;
  });
  for (let i = 1 ; i <= 4 ; i++){
    $(".curtain:eq(0) h1:eq(" + (i - 1) + ")").text($(".curtain:eq(0) h1:eq(" + (i - 1) + ")").text().substr(0,4) + left[i]);
  };
};