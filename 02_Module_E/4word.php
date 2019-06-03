<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$number=rand(1,8);
	$row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `4words` WHERE `id` = $number"));
	echo $row[1].";";
	echo $row[2];
?>