<!doctype html>
<html>
<head>
<meta charset="utf-8">
<script src="js/jquery-3.4.1.js"></script>
<link rel="stylesheet" href="js/jquery-ui.css"></script>
<script src="js/jquery-ui.js"></script>
<link rel="stylesheet" src="js/jquery-ui.min.css"></script>
<script src="js/jquery-ui.min.js"></script>
<link rel="stylesheet" href="main.css">
<title>無標題文件</title>
</head>

<body>
	<div id="dialog0" style="display: none;text-align:left">
		綽號：<input value="機器人1號" type="text" id="name" maxlength="8" class="in"><br><br>
		難度：<input type="number" value="3" min="3" max="5" id="difficult" class="in"><br><br>
		<img src="avatar/temp.png" width="60" height="60" id="avatar" draggable="false"><br><br>
		<form id="ff" enctype="multipart/form-data">
			<input type="file" name="up" id="file" accept="image/png">
		</form>	
		<input type="button" value="上傳" id="up"><br><br>
		<input type="button" value="開始遊戲" id="start">
	</div>
	<canvas id="canvas1" style="z-index:4" class="canvas" width="800" height="600"></canvas>
	<canvas id="canvas0" class="canvas" width="800" height="600"></canvas>
</body>
<script>
	$("html").contextmenu(function(){
		return false;
	})
	$("#dialog0").dialog({
		width:350,
		height:350,
		modal:true,
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
			canvas();
		}
	});
</script>
<script src="js/main.js"></script>
<script src="js/function.js"></script>
</html>