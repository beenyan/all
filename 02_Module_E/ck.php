<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$i0=$_POST["number"];
	$i1=$_POST["phone"];
	$ck="false";
	if ($row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_time` WHERE `number` LIKE '$i0'"))){
		$i2=mb_split(",",$row["phone"]);
		for ($i=1;$i<count($i2);$i++){
			if ($i2[$i]==$i1){
				$ck="true";
				break;
			}
		}
		if ($ck=="true"){
			$tra2=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` =$row[13]"));
			$r1=$tra2[1];
			$tra3=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` =$row[14]"));
			$r2=$tra3[1];
			echo "$i0,$row[15],$row[3],1234,$r1/$r2,$row[8],$i1";
		}
		else echo "錯誤";
	}
	else echo "錯誤";
?>