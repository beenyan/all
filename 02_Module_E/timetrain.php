<?php
	session_start();
	$db=mysqli_connect("localhost","admin","1234","49_e_01");
	mysqli_query($db,"SET NAMES UTF8");
	$all=mysqli_query($db,"SELECT * FROM `train_time`");
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
			url:"fixtime.php",
			data:{id:x,name:a0},
			success:function(e){
				alert(e)
			}
		})
	}
	function b(x){
		$.post({
			url:"deletime.php",
			data:{id:x},
			success:function(e){
				alert(e)
			}
		})
		location.href="";
	}
	function c(){
		var a0=$("#add1").val()
		var a1=$("#add2").val()
		var a2=$("#add3").val()
		var a3=$("#add4").val()
		var a4=$("#add5").val()
		var a5=$("#add6").val()
		var a6=$("#add7").val()
		var a7=$("#add8").val()
		var a8=$("#add9").val()
		var a9=$("#add10").val()
		$.post({
			url:"addtime.php",
			data:{week:a0,fortime:a1,totime:a2,onetrainbox:a3,trainbox:a4,body:a5,formdoc:a6,todoc:a7,date:a8,ticketmoney:a9},
			success:function(e){
				alert(e)
			}
		})
		location.href="";
	}
</script>
</head>
<body style="text-align: center;user-select: none" >
	<a href="set.php">返回</a>
	<table border="1" align="center" style="background:radial-gradient(#0BFBFB,gold)">
		<tbody>
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
				<td>修改</td>
				<td>刪除</td>
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
						<tr style='background:$color'>
							<td>$row[1]</td>
							<td>$row[2]</td>
							<td>$row[3]</td>
							<td>$row[4]</td>
							<td>無(都是直達車)</td>
							<td><input type='text' value='$row[6]' id='n$row[0]' style='font-size:120%;text-align:center;background:$color' ></td>
							<td>$row[7]</td>
							<td>$row[11]</td>
							<td>$row[9]</td>
							<td>$row[13]</td>
							<td>$row[14]</td>
							<td>$row[15]</td>
							<td>$row[16]</td>
							<td><input type='button' value='確認修改' onclick=a('$row[0]')></td>
							<td><input type='button' value='刪除' onclick=b('$row[0]')></td>
						</tr>
					";
					$i++;
				}
				$temp="";$ttemp="";
				$train_stop=mysqli_query($db,"SELECT * FROM `train_stop`");
				while ($row=mysqli_fetch_array($train_stop)){
					$temp=$temp."<option value='$row[0]'>$row[1]</option>";
				}
				$train_stop=mysqli_query($db,"SELECT * FROM `train_body`");
				while ($row=mysqli_fetch_array($train_stop)){
					$ttemp=$ttemp."<option value='$row[0]'>$row[1]</option>";
				}
				if ($i%2==0) $color="#0BFBFB";
					else $color="gold";
				echo "
					<tr style='background:$color'>
						<td>列車代碼</td>
						<td><input type='text' id='add1' style='background:$color' maxlength='1' size='4'></td>
						<td><input type='text' id='add2' style='background:$color' size='4'></td>
						<td><input type='text' id='add3' style='background:$color' size='4'></td>
						<td>無(都是直達車)</td>
						<td><input type='text' id='add4' style='background:$color' size='4'></td>
						<td><input type='text' id='add5' style='background:$color' size='4'></td>
						<td>不用</td>
						<td>
							<select id='add6'>
								$ttemp
							</select>
						</td>
						<td>
							<select id='add7'>
								$temp
							</select>
						</td>
						<td>
							<select id='add8'>
								$temp
							</select>
						</td>
						<td><input type='text' id='add9' style='background:$color' size='6'></td>
						<td><input type='text' id='add10' style='background:$color' size='3'></td>
						<td colspan='2'><input type='button' value='新增' onclick='c()'></td>
					</tr>
				";
			?>
		</tbody>
	</table>
</body>
</html>