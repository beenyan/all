//<script>
  $("img").attr("draggable",false);
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
    $(".stamp").css("background-color","");
    stamp = "";
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
  let stamp = "";
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
    if (stamp != ""){
      ckdown = 1;
      return false;
    }
    point1 = [e.pageX - canpos.x,e.pageY - canpos.y]
    draw(e);
    ckdown = 1;
    point1 = [];
    point0 = [];
  });
  function draw(e){
    if (stamp != "" && !ckdown){
      ctx.drawImage(stamp,e.pageX - canpos.x - 75,e.pageY - canpos.y - 75);
    }
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
        ctx.ellipse((point0[0] + point1[0]) / 2,(point0[1] + point1[1]) / 2,Math.max(point1[0],point0[0]) - Math.min(point1[0],point0[0]),Math.max(point1[1],point0[1]) - Math.min(point1[1],point0[1]),0,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      };
    }
    else if (tool == "polygon"){
      if (point1.length == 2){
        ctx.save();
        ctx.beginPath();
        ctx.translate(point0[0] + Math.max(Math.abs(point0[1] - point1[1]),Math.abs(point0[0] - point1[0])),point0[1]);
        for (let i = 0 ; i < 6 ; i++){
          ctx.lineTo(0,Math.max(Math.abs(point0[1] - point1[1]),Math.abs(point0[0] - point1[0])));
          ctx.translate(0,Math.max(Math.abs(point0[1] - point1[1]),Math.abs(point0[0] - point1[0])));
          ctx.rotate(Math.PI / 180 * 60);
        };
        ctx.closePath();
        ctx.fillStyle = pen_color;
        ctx.fill();
        ctx.restore();
      };
    }
    else if (tool == "triangle"){
      if (point1.length == 2){
        ctx.save();
        ctx.beginPath();
        ctx.translate(point0[0] + Math.max(Math.abs(point0[1] - point1[1]),Math.abs(point0[0] - point1[0])),point0[1]);
        for (let i = 0 ; i < 3 ; i++){
          ctx.lineTo(0,Math.max(Math.abs(point0[1] - point1[1]),Math.abs(point0[0] - point1[0])));
          ctx.translate(0,Math.max(Math.abs(point0[1] - point1[1]),Math.abs(point0[0] - point1[0])));
          ctx.rotate(Math.PI / 180 * 120);
        };
        ctx.closePath();
        ctx.fillStyle = pen_color;
        ctx.fill();
        ctx.restore();
      };
    }
    else if (tool == "star"){
      if (point1.length == 2){
        ctx.save();
        ctx.beginPath();
        ctx.translate(point0[0] + Math.max(Math.abs(point0[1] - point1[1]),Math.abs(point0[0] - point1[0])),point0[1]);
        for (let i = 0 ; i < 5 ; i++){
          ctx.lineTo(0,Math.max(Math.abs(point0[1] - point1[1]),Math.abs(point0[0] - point1[0])));
          ctx.translate(0,Math.max(Math.abs(point0[1] - point1[1]),Math.abs(point0[0] - point1[0])));
          ctx.rotate(Math.PI / 180 * 144);
        };
        ctx.closePath();
        ctx.fillStyle = pen_color;
        ctx.fill();
        ctx.restore();
      };
    }
  };
  $(".stamp").mousedown(function(){
    if ($(this).css("background-color") == "rgba(128, 128, 128, 0.4)"){
      tool = "";
      stamp = "";
      $(this).css("background-color","");
    }
    else {
      $(".stamp").css("background-color","");
      $(this).css("background-color","rgba(128 , 128, 128, 0.4)");
      let img = new Image();
      img.src = $(this)[0].src;
      img.onload = function(){
        stamp = img;
      };
      tool = "stamp";
    }
  });
  $(".over:eq(0)").mousedown(function(){
    let a = $("<a>");
    $(a).attr("download",+new Date());
    $(a).attr("href",canvas.toDataURL());
    $(a)[0].click();
  });
  $(".over:eq(1)").mousedown(function(){
    $.post({
      url : "fun.php",
      async : false,
      data : {name : +new Date() , val : canvas.toDataURL()},
      success : function(e){
        alert ("儲存成功")
      },
    });
  });
  function txt(){
    let reader = new FileReader();
    reader.readAsText($(":file")[0].files[0]);
    reader.onload = function(e){
      let img = new Image();
      img.src = e.target.result;
      img.onload = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
      };
    }
  }
//</script>