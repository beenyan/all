//<script>
  let sele = "";
  let stop = 1;
  let z_index = 0;
  for (let i = 0 ; i < $(".img").length ; i++){
    $(`.img:eq(${i})`).data("id",i);
  };
  $("img").attr("draggable","false");
  $(".icon").mousedown(function(){
    $(`.ll:not(:eq(${$(this).index()-1})):visible`).hide(1500);
    $(`.ll:eq(${$(this).index()-1})`).toggle(1500);
  });
  $(":file").mouseenter(function(){
    $(".up div:eq(0)").css("background","gray");
  });
  $(":file").mouseleave(function(){
    $(".up div:eq(0)").css("background","white");
  });
  let canvas = document.createElement('canvas');
  canvas = $("#canvas0")[0];
  canvas.width = 600;
  canvas.height = 800;
  let ctx = canvas.getContext('2d');
  let canvas0 = document.createElement('canvas');
  let ctx0 = canvas0.getContext('2d');
  let canvas1 = document.createElement('canvas');
  let ctx1 = canvas1.getContext('2d');
  let canvas2 = document.createElement('canvas');
  let ctx2 = canvas2.getContext('2d');
  let div = document.createElement('div');
  div.className = "shell";
  let imglist = {
    0 : ["img",0,0,0,0,0],//[圖片,起始X,起始Y,寬度,高度]
    1 : ["img",0,0,0,0,0],//[圖片,起始X,起始Y,寬度,高度]
    2 : ["img",0,0,0,0,0],//[圖片,起始X,起始Y,寬度,高度]
  };
  $(".canvasbox").append(`${div.outerHTML}`);
  $("div.shell:eq(0)").append(canvas0);
  $(".canvasbox").append(`${div.outerHTML}`);
  $("div.shell:eq(1)").append(canvas1);
  $(".canvasbox").append(`${div.outerHTML}`);
  $("div.shell:eq(2)").append(canvas2);
  $(canvas0).data("id",1);
  $(canvas1).data("id",2);
  $(canvas2).data("id",3);
  $(".img").mousedown(function(e){
    z_index+=2;
    let img = $(`.img:eq(${$(this).data("id")})`);
    if ($(this).attr("src")[4] == "c"){
      imglist[0] = [img,0,0,img.width(),img.height(),0];
      $(canvas0).css("z-index",z_index);
      canvas0.width = img.width();
      canvas0.height = img.height();
      $(canvas0).resizable({
        containment : $(".canvasbox"),
      });
    }
    else if ($(this).attr("src")[4] == "g"){
      imglist[1] = [img,0,0,img.width(),img.height(),0];
      $(canvas1).css("z-index",z_index);
      canvas1.width = img.width();
      canvas1.height = img.height();
      $(canvas1).resizable({
        containment : $(".canvasbox"),
      });
    }
    else if ($(this).attr("src")[4] == "b"){
      imglist[2] = [img,0,0,img.width(),img.height(),0];
      $(canvas2).css("z-index",z_index);
      canvas2.width = img.width();
      canvas2.height = img.height();
      $(canvas2).resizable({
        containment : $(".canvasbox"),
      });
    };
  });
  let ctxl = [ctx,ctx0,ctx1,ctx2];
  let canl =  [canvas,canvas0,canvas1,canvas2];
  setInterval(() => {
    if (stop) return false;
    for (let i = 0 ; i < 3 ; i++){
      if (!(imglist[i][0] == "img")){
        ctxl[i + 1].clearRect(0,0,imglist[i][3],imglist[i][4]);
        ctxl[i + 1].drawImage(imglist[i][0][0],0,0,imglist[i][3],imglist[i][4]);
      };
    };
  }, 1);
  $("div.shell").draggable({
    containment : "parent",
    start : function(e){
      z_index += 2;
      $(this).css("z-index",z_index);
    },
  });
  $("div.shell").click(function(){
    if ($(this).css("border-style") == "solid"){
      $("div.shell").css({
        "border-style" : "",
      });
      sele = "";
    }
    else{
      $("div.shell").css({
        "border-style" : "",
      });
      $(this).css({
        "border-style" : "solid",
      });
      sele = $(this);
    };
  });
  $("html").keydown(function(e){
    let key = {
      up : 38,
      down : 40,
      left : 37,
      right : 39,
      R : 82,
      L : 76,
    };
    if (e.keyCode == key.down && sele != ""){
      if (parseInt($(sele).css("top")) < $(sele).parent().height() - $(sele).height()){
        $(sele).css("top",parseInt($(sele).css("top")) + 1);
      };
    }
    else if (e.keyCode == key.up && sele != ""){
      if (parseInt($(sele).css("top")) > 0){
        $(sele).css("top",parseInt($(sele).css("top")) - 1);
      };
    }
    else if (e.keyCode == key.left && sele != ""){
      if (parseInt($(sele).css("left")) > 0) {
        $(sele).css("left",parseInt($(sele).css("left")) - 1);
      };
    }
    else if (e.keyCode == key.right && sele != ""){
      if (parseInt($(sele).css("left")) < $(sele).parent().width() - $(sele).width()){
        $(sele).css("left",parseInt($(sele).css("left")) + 1);
      };
    };
    if (e.keyCode == key.R && sele != ""){
      ctxl[($(sele).children().children(":eq(0)").data("id"))].rotate(Math.PI/180 * 90);
      ctxl[($(sele).children().children(":eq(0)").data("id"))].translate(0,-canvas2.width);
    }
    else if  (e.keyCode == key.L && sele != ""){
      ctxl[($(sele).children().children(":eq(0)").data("id"))].rotate(Math.PI/180 * -90);
      ctxl[($(sele).children().children(":eq(0)").data("id"))].translate(-canvas2.width,0);
    };
    if (e.keyCode == key.up || e.keyCode == key.down || e.keyCode == key.left || e.keyCode == key.right){
      return false;
    };
  });
  $("#download").click(function(){
    let a = $("<a>");
    a.html("下載");
    let allcanvas = document.createElement('canvas');
    allcanvas.width = canvas.width;
    allcanvas.height = canvas.height;
    let allctx = allcanvas.getContext('2d');
    allctx.drawImage(canvas,0,0);
    allctx.drawImage(canvas0,parseInt($(canvas0).parent().parent().css("left")),parseInt($(canvas0).parent().parent().css("top")),$(canvas0).parent().parent().width(),$(canvas0).parent().parent().height());
    allctx.drawImage(canvas1,parseInt($(canvas1).parent().parent().css("left")),parseInt($(canvas1).parent().parent().css("top")),$(canvas0).parent().parent().width(),$(canvas0).parent().parent().height());
    allctx.drawImage(canvas2,parseInt($(canvas2).parent().parent().css("left")),parseInt($(canvas2).parent().parent().css("top")),$(canvas0).parent().parent().width(),$(canvas0).parent().parent().height());
    a.attr("download",+new Date());
    a.attr("href" , allcanvas.toDataURL());
    a[0].click();
  });
//</script>