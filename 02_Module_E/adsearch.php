<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i0=$_POST["number"];
	if ($row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_time` WHERE `number` LIKE '$i0'"))){
		$row[9]=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_body` WHERE `id` =$row[9]"))[1];
		$row[13]=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` ='$row[13]'"))[1];
		$row[14]=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` ='$row[14]'"))[1];
		echo "$row[1],$row[2],$row[3],$row[4],無(都是直達車),$row[6],$row[7],$row[11],$row[9],$row[13],$row[14],$row[15],$row[16],$row[16]";
	}
	else echo "查無此班車";
?>