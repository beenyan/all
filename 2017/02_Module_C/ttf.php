<?php
	$name=$_POST["name"];
	$number=$_POST["number"];
	$allphoto=$_POST["allphoto"];
	$allcanvas=$_POST["allcanvas"];
	$f=fopen("text/".$name.".txt","w");
	$mean="圖層數量:".$number.";";
	fwrite($f,$mean."\n$&^*".$allphoto."\n$&^*".$allcanvas);
	//echo "儲存成功";
	echo $allcanvas;
?>