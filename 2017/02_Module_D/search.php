<?php
  $db=mysqli_connect("localhost","admin","1234","2017D01");
  mysqli_query($db,"SET NAMES UTF8");
  $difficult=$_POST["difficult"];
  $i=0;
  $step=0;
  $all=mysqli_query($db,"SELECT * FROM `d` WHERE `difficult` = $difficult ORDER BY `step` ASC");
  while ($row=mysqli_fetch_array($all)){
    if ($step!=$row[2]){
      $step=$row[2];
      $i++;
    }
    echo "$i,$row[1],$row[3],$row[2];";
  };