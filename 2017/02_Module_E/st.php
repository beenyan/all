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
  <title>互動考試</title>
</head>
<style>
  .trash{
    top: 5%;
    left: 5%;
    position: absolute;
    width: 90%;
    height: 90%;
    background: rgba(128,128,128,0.2);
    border-radius: 20px;
    box-shadow: 5px 5px 5px;
    text-align: center;
    overflow: auto;
  }
  hr{
    border-color: rebeccapurple;
    margin: 0 50px 0 50px;
    box-shadow: 3px 3px 3px;
  }
  .ui{
    border:0px outset rgb(255, 0, 0);
    cursor: pointer;
    display: inline-block;
    width: 23%;
    height: 70%;
    background: rgba(0,0,255,0.1);
    border-radius: 20px;
    box-shadow: 3px 5px 5px;
    margin: 0 10px 0 10px;
    vertical-align: top;
    overflow: auto;
  }
  h1{
    display: inline-block;
    text-shadow: 5px 5px 3px rgba(50, 0, 0, 0.5);
  }
  h2{
    text-shadow: 3px 4px 3px rgba(50, 0, 0, 0.6);
  }
  h3{
    text-shadow: 3px 3px 1px rgba(255, 128, 128, 1);
    word-wrap:break-word;
  }
  .img{
    border:2px outset rgb(183, 0, 255,1);
  }
  #boxbk{
    position: relative;
    display: inline-block;
    width: 640px;
    height: 360px;
    background: url(image/boxbk.jpg);
    transform: translateY(30%);
  }
  .ckbutton{
    border-radius: 10%;
    width: 130px;
    height: 130px;
    margin: 30px 13px 0 13px;
    background-color: gray;
    border-style: hidden;
    cursor: pointer;
  }
  #d2{
    position: absolute;
  }
  #d1{
    cursor: pointer;
    position: absolute;
  }
  #time{
    display: inline-block;
    margin: 21.44px 0 21.44px 100px;
    font-size: 32px;
    font-family: "微軟正黑體";
    text-shadow: 5px 5px 3px rgba(50, 0, 0, 0.7);
  }
  #ans{
    display: none;
  }
</style>
<body>
  <div class="temp">
    考卷ID：<label id="textid"><?php echo $id; ?></label><br>
  </div>
</body>
<script src="js/st.js"></script>
<script src="js/function.js"></script>
</html>