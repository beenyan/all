<?php
  $db = mysqli_connect("localhost","admin","1234","2018c01");
  mysqli_query($db,"SET NAMES UTF8");
  $c = $_GET["c"];
  if ($c == 0){
    $js = $_POST["js"];
    mysqli_query($db,"INSERT INTO `results`(`time`, `lines`, `score`, `difficult`) VALUES ([value-2],[value-3],[value-4],[value-5])")
  }