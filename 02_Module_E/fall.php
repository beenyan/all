<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i0=$_POST["number"];
	$i1=$_POST["ticket"];
	$i2=$_POST["phone"];
	$row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_time` WHERE `number` LIKE '$i0'"));
	$ticket=$row["ticket"]-$i1;
	$phone=str_repeat(",$i2","",$row["phone"]);
	mysqli_query($db,"UPDATE `train_time` SET `phone`='$phone',`allpeople`='$ticket' WHERE `number` LIKE '$i0'");
	
?>