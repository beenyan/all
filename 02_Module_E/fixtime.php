<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i0=$_POST["id"];
	$i1=$_POST["name"];
	mysqli_query($db,"UPDATE `train_time` SET `onetrainbox`='$i1' WHERE `id`= $i0");
	echo "修改成功";
?>