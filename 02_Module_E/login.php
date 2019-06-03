<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i0=$_POST["account"];
	$i1=$_POST["password"];
	if ($row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `login` WHERE `account` LIKE '$i0'"))){
		if ($row[2]==$i1){
			echo "set.php";
			$_SESSION["myaccount"]=$row[1];
		}
		else{
			echo "密碼錯誤";
		}
	}
	else{
		echo "帳號錯誤";
	}
?>