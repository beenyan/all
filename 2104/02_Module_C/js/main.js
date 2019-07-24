//<script>
  $("html").contextmenu(function () {
    return false;
  })
  $(".pen_color").mousedown(function () {
    $(".pen_color").css("border-color", "");
    $(this).css("border-color", "rgb(50,50,50)");
    pen_color = $(this).css("background-color");
  });
  $(".pen_size").mousedown(function () {
    $(".pen_size").css("border-color", "");
    $(this).css("border-color", "rgb(0,0,0)");
    pen_size = $(this).children().width();
  });
  $(".tool").mousedown(function () {//選擇工具
    for (let i = 0; i < $(".tool").length; i++) {
      $(`.tool:eq(${i})`).css("background", `url(image/${$(`.tool:eq(${i})`).data("tool")}0.png)`);
    };
    if (tool == $(this).data("tool")) {
      $(this).css("background", `url(image/${tool}0.png)`);
      tool = "";
    }
    else {
      tool = $(this).data("tool");
      $(this).css("background", `url(image/${tool}1.png)`);
    }
  });
  let ckdown = 1;
  let tool = "";
  let pen_color = "";
  let pen_size = "";
  let point0 = [];
  let point1 = [];
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext("2d");
  canvas.width = $("#all_canvas").width();
  canvas.height = $("#all_canvas").height();
  $("#all_canvas").append(canvas);
  let canvas_img;
  let time0 = "";
  let canpos = {
    x : $("canvas")[0].getBoundingClientRect().x,
    y : $("canvas")[0].getBoundingClientRect().y,
  };
  $("#all_canvas").resizable({
    start : function(){
      canvas_img = ctx.getImageData(0,0,canvas.width,canvas.height);
    },
    resize : function () {
      canvas.width = $("#all_canvas").width();
      canvas.height = $("#all_canvas").height();
      ctx.putImageData(canvas_img,0,0);
    },
  });
  //開始畫畫
  $("html").mousedown(function(e){
    point0 = [e.pageX - canpos.x,e.pageY - canpos.y]
    ckdown = 0;
    draw(e);
  });
  $("html").mousemove(function(e){
    draw(e);
  });
  $("html").mouseup(function(e){
    point1 = [e.pageX - canpos.x,e.pageY - canpos.y]
    draw(e);
    ckdown = 1;
    point1 = [];
    point0 = [];
  });
  function draw(e){
    if (pen_color == "" || pen_size == "" || ckdown){
      return false;
    };
    if (tool == ""){
      ctx.fillStyle = pen_color;
      ctx.fillRect(e.pageX - canpos.x - pen_size / 2, e.pageY - canpos.y - pen_size / 2,pen_size,pen_size);
    }
    else if (tool == "line"){
      if (point1.length == 2){
        ctx.strokeStyle = pen_color;
        ctx.lineWidth = pen_size;
        ctx.beginPath();
        ctx.moveTo(point0[0],point0[1]);
        ctx.lineTo(point1[0],point1[1]);
        ctx.stroke();
        ctx.closePath();
      };
    }
    else if (tool == "square"){
      if (point1.length == 2){
        ctx.fillStyle = pen_color;
        ctx.fillRect(point0[0],point0[1],point1[0] - point0[0],point1[1] - point0[1]);
      };
    }
    else if (tool == "round"){
      if (point1.length == 2){
        ctx.beginPath();
        ctx.fillStyle = pen_color;
        ctx.ellipse(point0[0],point0[1],Math.max(point1[0],point0[0]) - Math.min(point1[0],point0[0]),Math.max(point1[1],point0[1]) - Math.min(point1[1],point0[1]),0,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      };
    };
  };
//</script>