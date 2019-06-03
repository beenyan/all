<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$_SESSION["myaccount"]="";
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>火車訂票系統</title>
<link rel="icon" href="../image/train.png">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link type="text/css" href="../css.css" rel="stylesheet">
<link type="text/css" href="animation.css" rel="stylesheet">
<script src="../jQueryAssets/jquery.ui-1.10.4.dialog.min.js"></script>
<link href="../jQueryAssets/jquery.ui.core.min.css" rel="stylesheet" type="text/css">
<link href="jquery/jquery-ui.theme.min.css" rel="stylesheet" type="text/css">
<link href="../jQueryAssets/jquery.ui.dialog.min.css" rel="stylesheet" type="text/css">
<link href="../jQueryAssets/jquery.ui.resizable.min.css" rel="stylesheet" type="text/css">
<script src="jquery/jquery-3.4.1.min.js"></script>
<script src="jquery/jquery-ui.js"></script>
<script src="jquery/dialog.js"></script>
</head>

<body style="user-select: none">
	<div class="stage">
		<!--裝飾-->
		<div class="adorn"></div>
		<!--首頁-->
		<div id="d1" class="instage" style="display:;">
			<table id="e0" border="1" style="display:none ">
				<tbody id="tbody">
					<tr style="background: #BEBEBE">
						<td><h3>⾞種</h3></td>
						<td><h3>列⾞編號</h3></td>
						<td><h3>發⾞/終點站</h3></td>
						<td><h3>開⾞時間</h3></td>
						<td><h3>到達時間</h3></td>
						<td><h3>行駛時間</h3></td>
						<td><h3>票價</h3></td>
						<td><h3>訂票</h3></td
					</tr>
				</tbody>
			</table>
			<fieldset id="d1form" style="display: ">
				<legend style="font-size:20px;">列車查詢</legend>
					<div class="d2text"><strong>起程站</strong></div> 
					<select class="d2select" id="s1">
						<?php
							$train_stop=mysqli_query($db,"SELECT * FROM `train_stop`");
							while ($row=mysqli_fetch_array($train_stop)){
								echo"<option value='$row[0]'>$row[1]</option>";
							}
						?>
					</select><br>
					<div class="d2text"><strong>到達站</strong></div> 
					<select class="d2select" id="s2">
						<?php
							$train_stop=mysqli_query($db,"SELECT * FROM `train_stop`");
							while ($row=mysqli_fetch_array($train_stop)){
								echo"<option value='$row[0]'>$row[1]</option>";
							}
						?>
					</select><br>
					<div class="d2text"><strong>車種</strong></div> 
					<select class="d2select" id="s3">
						<?php
							$train_stop=mysqli_query($db,"SELECT * FROM `train_body`");
							while ($row=mysqli_fetch_array($train_stop)){
								echo"<option value='$row[0]'>$row[1]</option>";
							}
						?>
					</select><br>
					<div class="d2text"><strong>搭乘日期</strong></div> 
					<input id="d10" type="text" class="d2write" id="n3" placeholder="yyyy/mm/dd" size="7" maxlength="10"><br>
					<input type="button" value="送出" class="d2button" id="d1b">
			</fieldset>
		</div>
		<!--預訂車票-->
		<div id="d2" class="instage" style="display:none">
			<div class="ok" id="o1" style="display: none">訂票成功</div>
			<div class="miss" id="m1" style="display: none">該區間位置不足</div>
			<fieldset id="d2form">
				<legend style="font-size: 20px;">預訂車票</legend>
				<form id="f2">
				  <div class="d2text"><strong>手機</strong></div> 
					<input name="n0" type="text" class="d2write" id="n20" size="12" maxlength="14"><br>
					
				  <div class="d2text"><strong>起程站</strong></div> 
					<select class="d2select" name="s1" id="s20">
						<?php
							$train_stop=mysqli_query($db,"SELECT * FROM `train_stop`");
							while ($row=mysqli_fetch_array($train_stop)){
								echo"<option value='$row[0]'>$row[1]</option>";
							}
						?>
					</select><br>
				  <div class="d2text"><strong>到達站</strong></div> 
					<select class="d2select" name="s2"id="s21">
						<?php
							$train_stop=mysqli_query($db,"SELECT * FROM `train_stop`");
							while ($row=mysqli_fetch_array($train_stop)){
								echo"<option value='$row[0]'>$row[1]</option>";
							}
						?>
					</select><br>
				  <div class="d2text"><strong>搭乘日期</strong></div> 
					<input name="n3" type="text" class="d2write" id="n21" placeholder="yyyy/mm/dd" size="7" maxlength="10"><br>
					
				  <div class="d2text"><strong>車次代碼</strong></div> 
					<input name="n4" type="text" class="d2write" id="n22" size="15" maxlength="15"><br>
					
				  <div class="d2text"><strong>車票張數</strong></div> 
					<input name="n5" type="text" class="d2write" id="n23" size="1" maxlength="3"><br>
					<input type="text" id="n24" style="display: none"><br>
					
					<input type="button" value="回答驗證碼" class="d2button" id="d2CK"> <input type="button" value="送出" id="bookticket" class="d2button">
			  </form>
			</fieldset>
		</div>
		<!--訂票查詢-->
		<div id="d3" class="instage" style="display:none">
			<div id="f3">
				<div class="miss" id="m2" style="display: none">查無指定條件的紀錄，請更換條件再查詢</div>
				<div class="d3text"><strong>編號</strong></div> 
				<input name="n0" type="text" class="d3write" size="13" maxlength="15" id="n30">
				<div class="d3text"><strong>手機</strong></div> 
				<input name="n1" type="text" class="d3write" size="12" maxlength="14" id="n31">
				<input type="button" value="查詢" class="d3button" id="d3b">
			</div>
			<table id="e1" border="1" style="display:none">
				<tbody id="tbody1">
					<tr style="background: #BEBEBE">
						<td><h3>編號</h3></td>
						<td><h3>訂票時間</h3></td>
						<td><h3>開⾞時間</h3></td>
						<td><h3>車次</h3></td>
						<td><h3>起訖站</h3></td>
						<td><h3>張數</h3></td>
						<td><h3></h3></td
					</tr>
				</tbody>
			</table>
		</div>
		<!--列車資訊-->
		<div id="d4" class="instage" style="display: none">
			<div id="f4">
				<div class="d3text"><strong>編號</strong></div> 
				<input name="n0" type="text" class="d3write" size="13" maxlength="15" id="n40">
				<input type="button" value="查詢" class="d3button" id="d4b">
			</div>
			<table id="e2" border="1" style="display:none">
				<tbody id="tbody2">
					<tr style="background: #BEBEBE">
						<td>星期日</td>
						<td>星期一</td>
						<td>星期二</td>
						<td>星期三</td>
						<td>星期四</td>
						<td>星期五</td>
						<td>星期六</td>
					</tr>
				</tbody>
			</table>
			<table id="e3" border="1" style="display:none">
				<tbody id="tbody3">
					<tr style="background: #BEBEBE">
						<td>車站名稱</td>
						<td>發車時間</td>
						<td>抵達時間</td>
					</tr>
				</tbody>
			</table>
			<iframe  id="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1107003.8221515403!2d120.88983128740362!3d24.289745793086198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1557294199433!5m2!1szh-TW!2stw" frameborder="0" style="border:0;display: none" allowfullscreen></iframe>
		</div>
		<!--登入後台-->
		<div id="d5" class="instage" style="display:none">
			<fieldset id="d5form">
				<legend style="font-size:20px">登入系統</legend>
				<form id="f5">
					<div class="d5text"><strong>帳號</strong></div> 
					<input id="d50" type="text" class="d5write" size="12" maxlength="14"><br>
					<div class="d5text"><strong>密碼</strong></div> 
					<input id="d51" name="n1" type="text" class="d5write" size="12" maxlength="14"><br>
					<input type="button" value="送出" class="d5button" id="d5b">
				</form>
			</fieldset>
		</div>
		<!--大標題-->
		<div class="title">
			<img src="../image/train.png" id="icon">
			<div class="titletext"><strong>火車資訊系統</strong></div>
		</div>
		<!--左列-->
		<div class="l1 ll">首頁</div>
		<div class="l2 ll">預訂車票</div>
		<div class="l3 ll">訂票查詢</div>
		<div class="l4 ll">列車資訊</div>
		<div class="l5 ll">登入後台</div>
	</div>
<!--彈出物-->
<div id="Dialog" style="display:none">
	<div class="Dt">請依序選字，組出符合以下釋義的成語：</div>
	<div class="Dt" style="color:red;" id="Dtitle">隨機產生</div>
	<input id="di1" type="button" class="ckp" style="font-size:250%">
	<input id="di2" type="button" class="ckp" style="font-size:250%">
	<input id="di3" type="button" class="ckp" style="font-size:250%"><br>
	<input id="di4" type="button" class="ckp" style="font-size:250%">
	<input id="di5" type="button" class="ckp" style="font-size:250%">
	<input id="di6" type="button" class="ckp" style="font-size:250%"><br>
	<input type="button" value="提交" class="d2button" id="ck">
</div>
<script type="text/javascript">
$(function() {
	$( "#Dialog" ).dialog({
		modal:true,
		minWidth:500,
		minHeight:550,
		hide:{effect: "scale"},
		show:{effect: "scale"},
		title:"驗證碼",
		resizable:false,
		autoOpen:false
	});
});
  </script>
</body>
</html>