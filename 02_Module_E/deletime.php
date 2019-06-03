<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i0=$_POST["id"];
	mysqli_query($db,"DELETE FROM `train_time` WHERE `id`= '$i0'");
	echo "刪除成功";
?>