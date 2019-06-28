let difftime = 0;
let allstop = 0;
let downspeed = 1000;//下降速度
let BK = new Image();
let imgZ = new Image();
let imgO = new Image();
let imgT = new Image();
let imgL = new Image();
let imgI = new Image();
let imgBZ = new Image();
let imgBL = new Image();
let imgstone = new Image();
imgZ.src = "image/Z.png";
imgO.src = "image/O.png";
imgT.src = "image/T.png";
imgL.src = "image/L.png";
imgI.src = "image/I.png";
imgBZ.src = "image/BZ.png";
imgBL.src = "image/BL.png";
BK.src = "image/BK0.png";
imgstone.src = "image/stone.png"
let alltime =0;
//dialog
$("#dialog0").dialog({
  width : 800,
  height : 600,
  resizable : false,
  open : function(){
    $("#dialog0").empty();
    $("#dialog0").append(`
      <div id="heightline">最高行數：</div>
      <div id="MVP" onclick="lookcon()">查看排行版</div>
      <div id="title">俄羅斯方塊</div>
      <div id="difficult">難度：</div>
      <select onchange="showline()">
        <option value="0">一般</option>
        <option value="1">困難</option>
      </select>
      <div id="start">開始遊戲</div>
    `);
  },
});
showline();
$("#start").mousedown(function(){
  $("#dialog0").dialog("close");
  start();
  $("#number label:eq(0)").text("難度：" + $("select :selected").text());
  if ($("select :selected").val() == 1){
    downspeed = 250;
  };
  setInterval(function(){
    if (allstop) return false;
    alltime++;
    $("#number label:eq(2)").text("時間：" + parseInt(alltime / 60) + ":" + alltime % 60);
  },1000);
});
$("#dialog1").dialog({
  width : 800,
  height : 600,
  autoOpen : false,
  resizable : false,
  open : function(){
    $("#dialog1").empty();
    $("#dialog1").append(`
      <div class="title">匿名：</div>
      <input type="text" maxlength="7"><br><br>
      <input type="button" value="送出" class="button" style="font-size:300%">
    `);
  },
});
$("#dialog1").on("mousedown",".button",function(){
  if ($("#dialog1 :text").val() == "") {
    alert("請輸入名稱");
    return false;
  };
  name = $("#dialog1 :text").val(),
  $.post({
    async : false,
    url : "fun.php?c=0",
    data : {
      name : name,
      time : alltime,
      line : parseInt($("#number label:eq(1)").text().substr(3)),
      difficult : $("#dialog0 :selected").val(),
    },
    success : function(e){
      $("#dialog1").empty();
      if ($("#dialog0 :selected").val() == 0){
        d0();
      }
      else {
        d1();
      }
    },
  });
});
$(".ui-dialog-titlebar").hide();
$("#dialog2").dialog({
  width : 800,
  height : 600,
  autoOpen : false,
  resizable : false,
});
setInterval(function(){
  if (allstop) $("#BGM")[0].pause();
  else $("#BGM")[0].play();
},1000/60)
