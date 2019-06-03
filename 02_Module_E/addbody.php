<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i1=$_POST["name"];
	mysqli_query($db,"INSERT INTO `train_body`(`trainbody`) VALUES ('$i1')");
	echo "新增成功";
?>