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
<script>
	$(function(){
		$("#dialog0").dialog({
			width:350,
			height:350,
		});
		$(".ui-dialog-titlebar").hide();+++
		$("#difficult").keydown(function(){return false;});
		$("#up").mousedown(function(){
			if ($("#file")[0].files[0].name){
				let reader = new FileReader();
				reader.readAsDataURL($("#file")[0].files[0]);
				reader.onload = function (e){
					console.log(e.currentTarget.result)
				};
				$("#file")[0].files[0].name="";
				$.post({
					url:"image.php",
					data:{
						
					}
				});
			}
		});
	});
</script>
<title>無標題文件</title>
</head>

<body>
	<div id="dialog0" style="display: none;">
		姓名：<input type="text" id="name"><br><br>
		難度：<input type="number" value="3" min="3" max="5" id="difficult"><br><br>
		<img src="../02_Module_C/stamp3.png" width="60" height="60" id="avatar"><br><br>
		<input type="file" id="file">
		<input type="button" value="上傳" id="up">
	</div>
</body>
</html>