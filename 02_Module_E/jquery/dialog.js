// JSON Document
$(function(){
	var i;
	var ck="false";
	var cssi=["ldowni","downi","lefti","dlefti","upi","rupi","righti","urighti"];
	var csso=["upo","lupo","lefto","dlefto","downo","rdowno","righto","urighto"];
	var $color;//暫存顏色
	var $colortime;
	//亂數	
	function rand(nn,mm){
		return parseInt(Math.random()*(mm-nn+1))+nn;
	}
	$(".ll").mousedown(function(){
		$(".stage").find(".ll").each(function(){
			$(this).css("background","linear-gradient(#2F4A74,#1D2750)")
		})
		$color="linear-gradient(#9FC5F9,#36FBDB)";
		$(this).css("background","linear-gradient(#9FC5F9,#36FBDB)")
	})
	$(".ll").mouseover(function(){
		$color=$(this).css("background");
		$(this).css("background","linear-gradient(#90C5F9,#368BDB)")
	})
	$(".ll").mouseleave(function(){
		$(this).css("background",$color)
		clearInterval($colortime)
	})
	$(".stage").find(".instage").each(function(){
		$(this).css("animation-name",cssi[rand(0,7)])
	})
	//主要內容消失出現
	$(".l1").mousedown(function(){
		$(".stage").find(".instage:not(#d1)").each(function(){
			$(this).css("animation-name",csso[rand(0,7)])
		})
		$("#d1").css("display","")
		$("#d1").css("animation-name",cssi[rand(0,7)])
	})
	$(".l2").mousedown(function(){
		$(".stage").find(".instage:not(#d2)").each(function(){
			$(this).css("animation-name",csso[rand(0,7)])
		})
		$("#d2").css("display","")
		$("#d2").css("animation-name",cssi[rand(0,7)])
	})
	$(".l3").mousedown(function(){
		$(".stage").find(".instage:not(#d3)").each(function(){
			$(this).css("animation-name",csso[rand(0,7)])
		})
		$("#d3").css("display","")
		$("#d3").css("animation-name",cssi[rand(0,7)])
	})
	$(".l4").mousedown(function(){
		$(".stage").find(".instage:not(#d4)").each(function(){
			$(this).css("animation-name",csso[rand(0,7)])
		})
		$("#d4").css("display","")
		$("#d4").css("animation-name",cssi[rand(0,7)])
	})
	$(".l5").mousedown(function(){
		$(".stage").find(".instage:not(#d5)").each(function(){
			$(this).css("animation-name",csso[rand(0,7)])
		})
		$("#d5").css("display","")
		$("#d5").css("animation-name",cssi[rand(0,7)])
	})
	$("body").contextmenu(function(e){
		e.preventDefault();
	})
	$("#d2CK").click(function(){
		if (ck=="true"){

		}
		else{
			$("#Dialog").dialog("open")
		}
	})
	var tword="";
	var fword="";
	var i=0;
	var count=1;
	//亂數	
	function rand(nn,mm){
		return parseInt(Math.random()*(mm-nn+1))+nn;
	}
	$("#d2CK").click(function(){
		if (ck=="true"){
			alert("已經驗證成功");
		}
		else{
			tword="";
			count=1;
			var position=["di1","di2","di3","di4","di5","di6"];
			$.get({
				async:false,
				url:"4word.php",
				dataType:"text",
				success:function(list){
					var arr1=list.split(';')
					var arr2=arr1[1].split(',')
					fword=arr2[0]+arr2[1]+arr2[2]+arr2[3];
					$("#Dtitle").html(arr1[0])
					for (i=0;i<4;i++){
						var temp=rand(0,position.length-1);
						$("#"+position[temp]+"").val(arr2[0]);
						position.splice(temp,1)
						arr2.splice(0,1);
					}
					for (i=0;i<2;i++){
						var temp=rand(0,position.length-1);
						var num=rand(0,arr2.length-1)
						$("#"+position[temp]+"").val(arr2[num]);
						position.splice(temp,1);
						arr2.splice(num,1);
					}
				}
			})
		}
	})
	$(".ckp").click(function(){
		if ($(this).val()[0]==count-1){
			count--
			$(this).val($(this).val()[2])
			if (count==1){
				tword="";
			}
			else if (count==2){
				tword=tword[0];
			}
			else if (count==3){
				tword=tword[0]+tword[1];
			}
			else if (count==4){
				tword=tword[0]+tword[1]+tword[2];
			}
		}
		else if ($(this).val().length>1){
			alert("請勿重複選擇")
		}
		else if (count>4){
			alert("最多選擇4個")
		}
		else{
			tword=tword+$(this).val()
			$(this).val(count+"."+$(this).val())
			count++
		}
	})
	$("#ck").mousedown(function(){
		if (tword==fword){
			$("#Dialog").dialog("close");
			alert("驗證成功")
			ck="true";
		}
		else{
			$("#Dialog").dialog("close");
			alert("驗證失敗")
		}
	})
	$("#d5b").mousedown(function(){
		var t0=$("#d50").val();
		var t1=$("#d51").val();
		$.post({
			url:"login.php",
			data:{account:t0,password:t1},
			success:function(e){
				if (e.length==4){
					alert(e)
				}
				else{
					location.href=e;
				}
			}
		})
	})
	$("#d1b").mousedown(function(){
		var t0=$("#s1").val();
		var t1=$("#s2").val();
		var t2=$("#s3").val();
		var t3=$("#d10").val();
		$.get({
			url:"trainsearch.php",
			data:{fromdoc:t0,todoc:t1,body:t2,date:t3},
			success:function(list){
				if (list=="查無此班車"){
					alert(list)
				}
				else{
					$("#d1form").css("display","none")
					$("#e0").css("display","")
					var arr=list.split(";");
					for (i=0;i<arr.length-1;i++){
						var arr1=arr[i].split(",");
						$("#tbody").append("<tr style='background:white' class='add'><td>"+arr1[0]+"</td><td>"+arr1[1]+"</td><td>"+arr1[2]+"/"+arr1[3]+"</td><td>"+arr1[4]+"</td><td>"+arr1[5]+"</td><td>"+arr1[6]+"</td><td>"+arr1[7]+"</td><td><input type='button' value='訂票' id=ss"+i+" class='addbutton'></td></tr>");
						$("#e0").find("#ss"+i+"").each(function(){
							$(this).data("mean",arr1[8]+","+arr1[9]+","+arr1[10]+","+arr1[11]);
						})
					}
					$(".addbutton").mousedown(function(){
						var arr=$(this).data("mean").split(",");
						$("#s20").val(arr[0])
						$("#s21").val(arr[1])
						$("#n21").val(arr[2])
						$("#n22").val(arr[3])
						$(".stage").find(".instage:not(#d2)").each(function(){
							$(this).css("animation-name",csso[rand(0,7)])
						})
						$("#d2").css("display","")
						$("#d2").css("animation-name",cssi[rand(0,7)])
						$(".stage").find(".ll").each(function(){
							$(this).css("background","linear-gradient(#2F4A74,#1D2750)")
						})
						$(".l2").css("background","linear-gradient(#9FC5F9,#36FBDB)")
					})
				}
				/*try {
					list=JSON.parse(list)
				}catch(e){
					$("body").append($(list))
				}*/
			}
		})
	})
	$("#bookticket").mousedown(function(){
		if ($("#n20").val()==""||$("#n21").val()==""||$("#n22").val()==""||$("#n23").val()=="") alert("Please input all text");
		else if (ck!="true") alert("請回答驗證碼")
		else{
			var a0=$("#n20").val();
			var a1=$("#s20").val();
			var a2=$("#s21").val();
			var a3=$("#n21").val();
			var a4=$("#n22").val();
			var a5=$("#n23").val();
			var a6=$("#n24").val();
			$.post({
				url:"bookticket.php",
				data:{phone:a0,fromdoc:a1,todoc:a2,date:a3,wnumber:a4,ticket:a5,number:a6},
				success:function(e){
					if (e=="訂票成功"){
						$("#o1").css("display","")
						$("#m1").css("display","none")
					}
					else if(e=="票數不夠"){
						$("#o1").css("display","none")
						$("#m1").css("display","")
					}
					else alert(e)
				}
			})
		}
	})
	$("#d3b").mousedown(function(){
		if ($("#n30").val()==""||$("#n31").val()=="")alert("Please input all text");
		else{
			var a0=$("#n30").val();
			var a1=$("#n31").val();
			$.post({
				url:"ck.php",
				data:{number:a0,phone:a1},
				success:function(e){
					if (e=="錯誤"){
						$("#m2").css("display","");
					}
					else{
						$("#e1").css("display","");
						$("#f3").css("display","none");
						var arr1=e.split(",");
						$("#tbody1").append("<tr style='background:white' class='add'><td>"+arr1[0]+"</td><td>"+arr1[1]+"</td><td>"+arr1[2]+"</td><td>"+arr1[3]+"</td><td>"+arr1[4]+"</td><td>"+arr1[5]+"</td><td><input type='button' value='取消訂票' id=sss"+i+" class='nobutton'></td></tr>");
						$("#e1").find("#sss"+i+"").each(function(){
							$(this).data("mean",arr1[0]+","+arr1[5]+","+arr1[6]);
						})
						$(".nobutton").mousedown(function(){
							var arr=$(this).data("mean").split(",");
							$.post({
								url:"fall.php",
								data:{number:arr[0],ticket:arr[1],phone:arr[2]},
								success:function(e){
									location.href="";
								}
							})
						})
					}
				}
			})
		}
	})
	$("#d4b").mousedown(function(){
		$.post({
			url:"allmean.php",
			data:{number:$("#n40").val()},
			success:function(e){
				$("#e2").css("display","")
				$("#e3").css("display","")
				$("#map").css("display","")
				if (e!="編號錯誤"){
					var arr=e.split(",");
					$("#f4").css("display","none");
					if (arr[0]=="一") var D1="V"; else D1="";
					if (arr[0]=="二") var D2="V"; else D2="";
					if (arr[0]=="三") var D3="V"; else D3="";
					if (arr[0]=="四") var D4="V"; else D4="";
					if (arr[0]=="五") var D5="V"; else D5="";
					if (arr[0]=="六") var D6="V"; else D6="";
					if (arr[0]=="日") var D7="V"; else D7="";
					$("#tbody2").append("<tr style='background:white' class='add'><td>"+D7+"</td><td>"+D1+"</td><td>"+D2+"</td><td>"+D3+"</td><td>"+D4+"</td><td>"+D5+"</td><td>"+D6+"</td></tr>");
					$("#tbody3").append("<tr style='background:white' class='add'><td>"+arr[3]+"</td><td>"+arr[1]+"</td><td></td></tr><tr style='background:white' class='add'><td>"+arr[4]+"</td><td></td><td>"+arr[2]+"</td></tr>");
				}
				else alert(e)
			}
		})
	})
})