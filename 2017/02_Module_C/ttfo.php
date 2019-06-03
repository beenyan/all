<?php
	$name=$_POST["name"];
	$fo=fopen("text/".$name,"r");
	$fgo=fread($fo,filesize("text/".$name));
	echo $fgo;
?>