<?php
	$db = mysqli_connect("localhost","admin","1234","2017D01");
	$number = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `d` ORDER BY `d`.`id` DESC"));
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<script src="js/jquery-3.4.1.js"></script>
<link rel="stylesheet" href="js/jquery-ui.css">
<script src="js/jquery-ui.js"></script>
<link rel="stylesheet" src="js/jquery-ui.min.css">
<script src="js/jquery-ui.min.js"></script>
<link rel="stylesheet" href="main.css">
<title>無標題文件</title>
</head>

<body>
	<div id="background">
		<div id="dialog0" style="display: none;text-align:left">
			綽號：<input value="機器人<?php echo $number[0]+1;?>號" type="text" id="name" maxlength="8" class="in"><br><br>
			難度：<input type="number" value="3" min="3" max="5" id="difficult" class="in"><br><br>
			<img src="avatar/temp.png" width="60" height="60" id="avatar" draggable="false"><br><br>
			<form id="ff" enctype="multipart/form-data">
				<input type="file" name="up" id="file" accept="image/png">
			</form>	
			<input type="button" value="上傳" id="up"><br><br>
			<input type="button" value="開始遊戲" id="start">
		</div>
		<canvas id="canvas3" style="z-index:8; display:none" class="canvas" width="800" height="600" ></canvas>
		<canvas id="canvas2" style="z-index:8" class="canvas" width="800" height="600"></canvas>
		<canvas id="canvas1" style="z-index:4" class="canvas" width="800" height="600"></canvas>
		<canvas id="canvas0" class="canvas" width="800" height="600"></canvas>
		<img src="" id="temp" style="position: absolute;left:0">
		<div id="dialog1" style="display: none">
			<h1>排行榜</h1><hr>
			<div class="win">
				<div class="list">
					<div class="number">名次</div>
					<div class="name">綽號</div>
					<div class="img">圖片</div>
					<div class="step">步數</div>
				</div>
			</div>
			<input type="button" value="確定" class="new">
		</div>
		<input type="button" value="回放" id="review" onclick="review()">
		<input type="button" value="快速回放" id="speedreview" onclick="speedreview()">
</div>
</body>
<script>
	$("#dialog1").dialog({
		width:900,
		height:700,
		modal:true,
		autoOpen:false,
		resizable:false,
	});
	var difficult = $("#difficult").val();
	$("html").contextmenu(function(){
		return false;
	})
	$("#dialog0").dialog({
		width:350,
		height:350,
		modal:true,
		autoOpen:false,
	});
	$(".ui-dialog-titlebar").hide();
	$("#difficult").keydown(function(){return false;});
	$("#up").mousedown(function(){
		if ($("#file")[0].files[0].name){
			let reader = new FileReader();
			reader.readAsDataURL($("#file")[0].files[0]);
			reader.onload = function (e){
				$.post({
					url:"image.php",
					processData:false,
					contentType:false,
					data:new FormData($("#ff")[0]),
					success:function(e){
						if (e=="Please select image .png"){alert (e);return false;};
						$("#avatar")[0].src=e;
					},
				});
			};
		};
	});
	$("#start").click(function(){
		if ($("#name").val()==""){
			$("#name").css("border-color","red");
		}
		else{
			$("#name").css("border-color","black");
			$("#dialog0").dialog("close");
			difficult = $("#difficult").val();
			canvas();
			setInterval(function(){
				retime = retime + parseInt(1000/60);
			},1000/60);
			saveall[0] = [];
			saveall[0][0] = first();
			saveall[0][1] = [0,0,0,0,0];
			saveall[0][2] = [0,0,0,0,0];
			saveall[0][3] = 1;
		};
	});
</script>
<script src="js/main.js"></script>
<script src="js/function.js"></script>
</html>