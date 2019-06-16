<?php
  $db = mysqli_connect("localhost","admin","1234","2017e01");
  mysqli_query($db,"SET NAMES UTF8");
  $all = mysqli_query($db, "SELECT * FROM `select`");
  while($row = mysqli_fetch_array($all)){
    echo json_encode($row)."(+{8&^$})";
  };