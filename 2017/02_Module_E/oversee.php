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
  <h1 style="color: red">警告！離開本頁將停止考試</h1>
  試卷ID：<label id="textid"><?php echo $id; ?></label><br>
</body>
<script>
  $("html").contextmenu(function(){return false});
  let id = $("#textid").text();
  let mean;
  let textparpe = 0;
  let arr;
  $.post({
    async:false,
    url : "fun.php?call=21",
    data : {id:id},
    success : function(e){
      arr = JSON.parse(e);
      if (arr[3] != "考試中"){
        location.href = "tc.php";
        return false;
      }
      $("body").append(`
        <label>顯示答案：${arr[0]}</label><br>
        <label>隨機題目：${arr[1]}</label><br>
        <label>答題時間：${arr[4]}秒</label><br>
      `);
      mean = JSON.parse(arr[2]);
      textparpe = 1;
    },
  });
  /*$(function(){
    window.onbeforeunload = function(){
      if (textparpe) {
        $.post({
          url : "fun.php?call=22",
          data : {id:id},
        });
        return "";
      };
    };
  });*/
  function rand(nn,mm){
    return parseInt(Math.random()*(mm-nn+1)+nn);
  };
  function starttext(){
    if (mean.length){
      if (arr[1] == "true"){

      }
      else if (arr[1] == "false"){
        topic(mean.shift());
        setTimeout(starttext,arr[4]*1000);
      }
    }
    else { //清空
      $.post({
        url : "fun.php?call=25",
        data : {id : id,now : ""},
      });
    }
  };
  setTimeout(starttext,100);
  function topic(nn){ //傳送現在題目
    $.post({
      url : "fun.php?call=25",
      data : {id : id,now : nn},
    });
  };
</script>
</html>