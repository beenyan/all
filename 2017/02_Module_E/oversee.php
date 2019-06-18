<?php
  $id = $_GET["id"];
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="js/jquery-3.4.1.js"></script>
  <link rel="stylesheet" href="js/jquery-ui.css">
  <script src="js/jquery-ui.js"></script>
  <link rel="stylesheet" src="js/jquery-ui.min.css">
  <script src="js/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="main.css">
  <title>後臺監視系統</title>
</head>
<body style="text-align: center">
  <canvas width="200px" height="200px" id="canvas0"></canvas><br>
  <canvas width="100px" height="100px" class="canvas"></canvas>
  <canvas width="100px" height="100px" class="canvas"></canvas>
  <canvas width="100px" height="100px" class="canvas"></canvas><br>
  <h1 style="color: red">警告！離開本頁將停止考試</h1>
  試卷ID：<label id="textid"><?php echo $id; ?></label><br>
</body>
<script>
  $(function(){
    let canvas = $(".canvas:eq(0)")[0];
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.font= "30px 微軟正黑體";
    ctx.fillRect(0,0,100,100);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("未回答",5,60);
    //
    canvas = $(".canvas:eq(1)")[0];
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(0,255,0)";
    ctx.font= "23px 微軟正黑體";
    ctx.fillRect(0,0,100,100);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("回答正確",5,60);
    //
    canvas = $(".canvas:eq(2)")[0];
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.font= "23px 微軟正黑體";
    ctx.fillRect(0,0,100,100);
    ctx.fillStyle = "gold";
    ctx.fillText("回答錯誤",5,60);
  });
</script>
<script>
  $("html").contextmenu(function(){return false});
  let arrans = "";
  let id = $("#textid").text();
  let mean;
  let textparpe = 0;
  let arry;
  let time;
  let none = 1;
  $.post({
    async:false,
    url : "fun.php?call=21",
    data : {id:id},
    success : function(e){
      arry = JSON.parse(e);
      if (arry[3] != "考試中"){
        location.href = "tc.php";
        return false;
      }
      time = parseInt(arry[4]);
      $("body").append(`
        <label>顯示答案：${arry[0]}</label><br>
        <label>隨機題目：${arry[1]}</label><br>
        <label>答題時間：${arry[4]}秒</label><br>
      `);
      mean = JSON.parse(arry[2]);
      textparpe = 1;
    },
  });
  $(function(){
    window.onbeforeunload = function(){
      if (textparpe) {
        $.post({
          url : "fun.php?call=22",
          data : {id:id,ansall : arrans},
        });
      };
    };
  });
  function starttext0(){
    if (mean.length){
      if (arry[1] == "true"){
        let temp = mean[rand(0,mean.length-1)];
        mean.splice(mean.indexOf(temp),1)
        topic(temp);
      }
      else if (arry[1] == "false"){
        topic(mean.shift());
      };
      setTimeout(starttext0,(parseInt(arry[4]) + 10) * 1000);
    }
    else { //清空
      setTimeout(function(){
        $.post({
          url : "fun.php?call=25",
          data : {id : id,now : "",ansall : arrans},
        });
      },1000);
    };
  };
  setTimeout(starttext0,100);
  function topic(nn){ //傳送現在題目
    $.post({
      async : false,
      url : "fun.php?call=25",
      data : {id : id,now : nn},
    });
    if (none){
      setTimeout(function(){
        $.post({
          async:false,
          url : "fun.php?call=30",
          data : {id:id},
        });
        none = 0;
      },1000);
    }
    else {
      setTimeout(function(){
        let send;
        $.post({
          async:false,
          url : "fun.php?call=29",
          data : {id,id},
          success : function(e){
            send = e;
            arrans = arrans + e + ",";
            drawarc(arrans);
          },
        });
      },1000);
    }
    time = parseInt(arry[4]);
    clearInterval(time0);
    time0 = setInterval(lesstime,1000);
  };
  function lesstime(){
    time -- ;
    $.post({
      url : "fun.php?call=28",
      data : {id : id , time ,time},
    });
    if (time <= 0){
      clearInterval(time0);
    };
  };
  let time0 = setInterval(lesstime,1000);
  function drawarc(nn){
    let canvas0 = $("#canvas0")[0];
    let ctx = canvas0.getContext('2d');
    canvas0.width = canvas0.width
    let list = nn.split(",");
    list.pop();
    let a0 = 0;
    let a1 = 0;
    let a2 = 0;
    for (let i= 0 ; i< list[list.length-1].length ; i++){
      if (list[list.length-1][i] == 0){
        a0++;
      }
      else if (list[list.length-1][i] == 1){
        a1++;
      }
      else {
        a2++;
      }
    };
    let count = a0 + a1 + a2;
    let b0 = a0 , b1 = a1 ,b2 = a2;
    if (a0 != 0){
      ctx.beginPath();
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.moveTo(100,100);
      ctx.arc(100,100,100,Math.PI*2/360*-90,Math.PI*2/count*a0 - Math.PI*2/360*90);
      ctx.closePath();
      ctx.fill();
      a0 = Math.PI*2/count*a0 - Math.PI*2/360*90;
    }
    else {
      a0 = Math.PI*2/360*-90;
    }
    if (b1 != 0){
      ctx.beginPath();
      ctx.fillStyle = "rgb(0,255,0)";
      ctx.moveTo(100,100);
      ctx.arc(100,100,100,a0,Math.PI*2/count*a1 + a0);
      ctx.closePath();
      ctx.fill();
      a1 = Math.PI*2/count*a1 + a0;
    }
    else {
      if (b0 == 0){
        a1 = Math.PI*2/360*-90;
      }
      else {
        a1 = a0;
      }
    }
    if ( b0 == 0 && b1 ==0){
      ctx.beginPath();
      ctx.fillStyle = "rgb(0,0,255)";
      ctx.arc(100,100,100,0,Math.PI*2);
      ctx.closePath();
      ctx.fill();
    }
    else if (a2 != 0){
      ctx.beginPath();
      ctx.fillStyle = "rgb(0,0,255)";
      ctx.moveTo(100,100);
      ctx.arc(100,100,100,a1,Math.PI*2/360*-90);
      ctx.closePath();
      ctx.fill();
    }
  }
</script>
<script src="js/function.js"></script>
</html>