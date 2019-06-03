<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i0=$_POST["phone"];
	$i1=$_POST["fromdoc"];
	$i2=$_POST["todoc"];
	$i3=$_POST["date"];
	$i4=$_POST["wnumber"];
	$i5=$_POST["ticket"];
	if ($row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_time` WHERE `fromdoc` = '$i1' AND `todoc` ='$i2' AND `date` LIKE '$i3' AND `number` LIKE '$i4'"))){
		if ($row["ticket"]-$row["allpeople"]>=$i5){
			$tra2=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` ='$row[13]'"));
			$r1=$tra2[1];
			$tra3=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` ='$row[14]'"));
			$r2=$tra3[1];
			$t0=$row["phone"];
			$t0="$t0,$i0";
			$allpeople=$row["allpeople"]+$i5;
			mysqli_query($db,"UPDATE `train_time` SET `allpeople`='$allpeople', `phone`='$t0'  WHERE `number` LIKE '$i4'");
			$fp = fopen("SMS/$i0.txt","a");
			$money=$row[16]*$i5;
			fwrite($fp,"列車訂位成功。訂票編號: $i4 日期:$i3 $r1 到 $r2 $i4 車次，$i5 張票，$row[3]開，共$money 元\n========================================\n");
			echo "訂票成功";
		}
		else echo "票數不夠";
	}
	else echo "查無此車";
?>