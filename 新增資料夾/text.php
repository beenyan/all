<?php
	$db=mysqli_connect("localhost","admin","1234","text");
	mysqli_query($db,"SET NAMES UTF8");
	echo $_POST["password"];
