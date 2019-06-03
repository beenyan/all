// JSON Document
$(function(){
	function remove(){
		$("#round").remove()
		$("#bread").remove()
		$("#searchend").remove()
		$("#searchtext").remove()
		$("#st0").remove()
		$("#st1").remove()
		$("#st2").remove()
		$("#b0").remove()
		$("#b1").remove()
		$("#b2").remove()
	}
	$("html").contextmenu(function(e){ 
		remove()
		var x=e.pageX;
		var y=e.pageY;
		if (x<30||y<30){
			x=$(window).width()/2;
			y=$(window).height()/2;
		}
		e.preventDefault();//禁止右鍵
		//生成中心點
		$("body").append("<input type='button' value='+' id='round'>")
		$("body").find("#round").css({
			left:x-parseFloat($("#round").css("width"))/2,
			top:y-parseFloat($("#round").css("height"))/2,
		})
		$("#round").mousedown(function(){
			remove();
		})
		//麵包屑導覽
		$("body").append("<div id='bread'><strong><a href='index.html'>首頁</a> -> <a href=''>房屋查詢結果</a></strong></div>")
		$("body").find("#bread").css({
			left:x-parseFloat($("#bread").css("width"))/2,
			top:y-parseFloat($("#bread").css("height"))*2,
		})
		//搜尋結果區
		$("#right").append("<div class='bb' id='searchend'><strong>搜尋結果</strong></div>")
		$("#right").find("#searchend").css({
			left:x-parseFloat($("#searchend").css("width"))/2-50,
			top:y+parseFloat($("#searchend").css("height")),
		})
		$("#searchend").click(function(){
			$("#icon").css("display","none")
			$("#se").css("display","")
			remove();
		})
		//篩選條件設定區
		$("#right").append("<div class='bb' id='b0'><strong>篩選條件</strong></div>")
		$("#right").find("#b0").css({
			left:x-parseFloat($("#b0").css("width"))*2+20,
			top:y-parseFloat($("#b0").css("height"))/2+80,
		})
		//頁尾資訊
		$("#right").append("<div class='bb' id='b1'><strong>頁尾資訊</strong></div>")
		$("#right").find("#b1").css({
			left:x-parseFloat($("#b1").css("width"))/2+50,
			top:y+parseFloat($("#b1").css("height")),
		})
		//其他項目
		$("#right").append("<div class='bb' id='b2'><strong>其他項目</strong></div>")
		$("#right").find("#b2").css({
			left:x-parseFloat($("#b2").css("width"))+180,
			top:y-parseFloat($("#b2").css("height"))/2+80,
		})
	})
})