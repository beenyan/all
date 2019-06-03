<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$all=mysqli_query($db,"SELECT * FROM `train_body`");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>無標題文件</title>
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
<script>
	function a(x){
		var a0=$("#n"+x).val()
		$.post({
			url:"fixbody.php",
			data:{id:x,name:a0},
			success:function(e){
				alert(e)
			}
		})
	}
	function b(x){
		$.post({
			url:"delebody.php",
			data:{id:x},
			success:function(e){
				alert(e)
			}
		})
		location.href="";
	}
	function c(){
		var a0=$("#add").val()
		$.post({
			url:"addbody.php",
			data:{name:a0},
			success:function(e){
				alert(e)
			}
		})
		location.href="";
	}
</script>
</head>

<body style="text-align: center;font-size: 140%;user-select: none" >
	<a href="set.php">返回</a>
	<table border="1" align="center" style="background:radial-gradient(#0BFBFB,gold)">
		<tbody>
			<tr>
				<td width="400px">車種名稱</td>
				<td width="120px">編輯</td>
				<td width="120px">刪除</td>
			</tr>
			<?php
				$i=0;
				while ($row=mysqli_fetch_array($all)){
					if ($i%2==0) $color="#0BFBFB";
					else $color="gold";
					echo "
						<tr style='background:$color'>
							<td><input type='text' value='$row[1]' id='n$row[0]' style='font-size:120%;text-align:center;background:$color' ></td>
							<td><input type='button' value='確認修改' onclick=a('$row[0]')></td>
							<td><input type='button' value='刪除' onclick=b('$row[0]')></td>
						</tr>
					";
					$i++;
				}
				if ($i%2==0) $color="#0BFBFB";
					else $color="gold";
				echo "
					<tr style='background:$color'>
						<td><input type='text' id='add' style='font-size:120%;background:$color'></td>
						<td colspan='2'><input type='button' value='新增' onclick='c()'></td>
					</tr>
				";
			?>
		</tbody>
	</table>
</body>
</html>