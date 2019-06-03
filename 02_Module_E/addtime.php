<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$rand="0123456789asdfghjklzxcvbnmqwertyuiop";
	$rand=$rand[rand(0,35)].$rand[rand(0,35)].$rand[rand(0,35)].$rand[rand(0,35)].$rand[rand(0,35)].$rand[rand(0,35)].$rand[rand(0,35)].$rand[rand(0,35)].$rand[rand(0,35)];
	$i1=$_POST["week"];
	$i2=$_POST["fortime"];
	$i3=$_POST["totime"];
	$i4=$_POST["onetrainbox"];
	$i5=$_POST["trainbox"];
	$i6=$_POST["body"];
	$i7=$_POST["formdoc"];
	$i8=$_POST["todoc"];
	$i9=$_POST["date"];
	$i10=$_POST["ticketmoney"];
	$ticket=$i4*$i5;
	mysqli_query($db,"INSERT INTO `train_time`(`number`, `week`, `fromtime`, `totime`, `onetrainbox`, `trainbox`, `body`, `ticket`, `wnumber`, `fromdoc`, `todoc`, `date`, `ticketmoney`) VALUES ('$rand','$i1','$i2','$i3','$i4','$i5','$i6','$ticket','1234','$i7','$i8','$i9','$i10')");
	echo "新增成功";
?>