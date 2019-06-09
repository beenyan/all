<?php
  $db=mysqli_connect("localhost","admin","1234","2017D01");
  mysqli_query($db,"SET NAMES UTF8");
  $name=$_POST["name"];
  $step=$_POST["step"];
  $img=$_POST["img"];
  $difficult=$_POST["difficult"];
  mysqli_query($db,"INSERT INTO `D`(`name`, `step`, `img`, `difficult`) VALUES ('$name','$step','$img','$difficult')");