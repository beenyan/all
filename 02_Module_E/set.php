<?php
	session_start();
	if (empty($_SESSION["myaccount"])){
		header("location:index.php");
	}
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$all=mysqli_query($db,"SELECT * FROM `train_time`");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>火車內部系統</title>
<link rel="icon" href="../image/train.png">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link type="text/css" href="../css.css" rel="stylesheet">
<link type="text/css" href="animation.css" rel="stylesheet">
<link type="text/css" href="newcss.css" rel="stylesheet">
<script src="../jQueryAssets/jquery.ui-1.10.4.dialog.min.js"></script>
<link href="../jQueryAssets/jquery.ui.core.min.css" rel="stylesheet" type="text/css">
<link href="jquery/jquery-ui.theme.min.css" rel="stylesheet" type="text/css">
<link href="../jQueryAssets/jquery.ui.dialog.min.css" rel="stylesheet" type="text/css">
<link href="../jQueryAssets/jquery.ui.resizable.min.css" rel="stylesheet" type="text/css">
<script src="jquery/jquery-3.4.1.min.js"></script>
<script src="jquery/jquery-ui.js"></script>
<script src="jquery/dialog.js"></script>
<script>
	$(function(){
		$("#d8b").mousedown(function(){
			$("#e10").find(".mush").each(function(){
				$(this).remove()
			})
			$.post({
				url:"adsearch.php",
				data:{number:$("#number").val()},
				success:function(e){
					if (e!="查無此班車"){
						console.log(e)
						var arr=e.split(",");
						$("#T10").append("<tr style='background:white' class='add mush'><td>"+arr[0]+"</td><td>"+arr[1]+"</td><td>"+arr[2]+"</td><td>"+arr[3]+"</td><td>"+arr[4]+"</td><td>"+arr[5]+"</td><td>"+arr[6]+"</td><td>"+arr[7]+"</td><td>"+arr[8]+"</td><td>"+arr[9]+"</td><td>"+arr[10]+"</td><td>"+arr[11]+"</td><td>"+arr[12]+"</td></tr>");
					}
					else alert(e)
				}
			})
		})
	})
</script>
<style type="text/css">
	.a123{
		position: relative;
		left: 40%;
		top: 20%;
	}
</style>
</head>

<body style="user-select: none">
	<div class="stage">
		<!--裝飾-->
		<div class="adorn"></div>
		<!--火車系統-->
		<div id="d1" class="instage" style="display">
			<a href="trainbody.php" class="addh">新增 /刪除 /編輯</a> <div class="addh">車種</div><br>
			<a href="trainstop.php" class="addh">新增 /刪除 /編輯</a> <div class="addh">車站</div><br>
			<a href="timetrain.php" class="addh">新增 /刪除 /編輯</a> <div class="addh">列車</div><br>
		</div>
		<!--查詢系統-->
		<div id="d2" class="instage" style="display:none">
			<input type="text" id="number" class="a123" placeholder="列車代碼"> <input class="a123" id="d8b" type="button" value="查詢">
			<table border="1" id="e10">
				<tbody id="T10">
					<tr>
						<td>列車代碼</td>
						<td>行車時間</td>
						<td>發車時間</td>
						<td>到達時間</td>
						<td>行經車站</td>
						<td>單一車廂的載客數量</td>
						<td>車廂數量</td>
						<td>總載客數</td>
						<td>車種</td>
						<td>出發</td>
						<td>到達</td>
						<td>日期</td>
						<td>票價</td>
					</tr>
					<?php
						$i=0;
						while ($row=mysqli_fetch_array($all)){
							$row[9]=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_body` WHERE `id` ='$row[9]'"))[1];
							$row[13]=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` ='$row[13]'"))[1];
							$row[14]=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `train_stop` WHERE `id` ='$row[14]'"))[1];
							if ($i%2==0) $color="#0BFBFB";
							else $color="gold";
							echo "
								<tr class='mush' style='background:$color'>
									<td>$row[1]</td>
									<td>$row[2]</td>
									<td>$row[3]</td>
									<td>$row[4]</td>
									<td>無(都是直達車)</td>
									<td>$row[6]</td>
									<td>$row[7]</td>
									<td>$row[11]</td>
									<td>$row[9]</td>
									<td>$row[13]</td>
									<td>$row[14]</td>
									<td>$row[15]</td>
									<td>$row[16]</td>
								</tr>
							";
							$i++;
						}
					?>
				</tbody>
			</table>
		</div>
		<!--大標題-->
		<div class="title">
			<img src="../image/train.png" id="icon">
			<div class="titletext"><strong>火車管理系統</strong></div>
		</div>
		<!--左列-->
		<div class="l1 ll">火車系統</div>
		<div class="l2 ll">查詢系統</div>
		<div class="ll" onClick="location.href='index.php'">返回</div>
	</div>
</body>
</html>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 