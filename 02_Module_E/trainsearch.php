<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i0=$_GET["fromdoc"];
	$i1=$_GET["todoc"];
	$i2=$_GET["body"];
	$i3=$_GET["date"];
	if ($row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_time` WHERE `fromdoc` = '$i0' AND `todoc` ='$i1' AND `date` LIKE '$i3' AND `body` ='$i2'"))){
		$all=mysqli_query($db,"SELECT * FROM `train_time` WHERE `fromdoc` = '$i0' AND `todoc` ='$i1'");
		while ($row=mysqli_fetch_array($all)){
			$r1=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` ='$row[13]'"))[1];
			$r2=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` ='$row[14]'"))[1];
			$ht=($row[4][0].$row[4][1])-($row[3][0].$row[3][1]);
			$mt=($row[4][3].$row[4][4])-($row[3][3].$row[3][4]);
			if ($mt<0){
				$ht--;
				$mt=$mt+60;
			}
			$ht=$ht+$mt/60;
			echo "$r0,$row[1],$r1,$r2,$row[3],$row[4],$ht 小時,$row[16],$row[13],$row[14],$row[15],$row[1];";
		}
	}
	else echo "查無此班車";
?>