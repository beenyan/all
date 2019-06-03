<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i0=$_POST["number"];
	if ($row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_time` WHERE `number` LIKE '$i0'"))){
		$tra1=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_body` WHERE `id` =$row[9]"));
		$r0=$tra1[1];
		$tra2=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` =$row[13]"));
		$r1=$tra2[1];
		$tra3=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` =$row[14]"));
		$r2=$tra3[1];
		echo "$row[2],$row[3],$row[4],$r1,$r2";
	}
	else echo "編號錯誤"
?>