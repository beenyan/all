$("html").contextmenu(function(){
  return false;
});
$("#add").mousedown(function(){
  $("#setselect").hide();
  $("#addcild").show();
});
$('input[type=number]').keydown(function(){
  return false;
});
$(".add:eq(0)").mousedown(function(){//基本設定
  $("#dialog4").dialog("open");
});
$(".add:eq(1)").mousedown(function(){//選擇題目選項
  $(".dialog5").remove();
  $("#dialog5").dialog("open");
  $("#ui-id-6").append(`
    <input type="button" class="button dialog5 mid" value="選擇題">
    <input type="button" class="button dialog5 mid" value="配對題">
    <input type="button" class="button dialog5 mid" value="拖拉題">
    <input type="button" class="button dialog5 mid" value="尋寶題">
  `);
  $(".dialog5:eq(0)").mousedown(function(){//選擇題
    $.post({
      async:false,
      url : "fun.php?call=10",
      data:{wh:"select"},
      success:function(e){
        $(".li").remove();
        let list = e.split("(+{8&^$})");
        list.pop();
        let arr=[];
        for (let i = 0 ; i < list.length ; i++){
          arr[i] = JSON.parse(list[i]);
          let ans = "";
          if (arr[i][11]==0)ans = "第一題";
          else if (arr[i][11]==1)ans = "第二題";
          else if (arr[i][11]==2)ans = "第三題";
          else if (arr[i][11]==3)ans = "第四題";
          $("#dialog5").append(`
            <div class="li">
              <div class="ui">
                <div class="title"><strong>題目</strong></div>
                <label>${arr[i][1]}</label>
              </div>
              <div class="ui">
                <div class="title"><strong>第一題</strong></div>
                <label>${arr[i][2]}</label><br>
                <img class="nimg" id="simg0${arr[i][0]}" src="${arr[i][3]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>第二題</strong></div>
                <label>${arr[i][4]}</label><br>
                <img class="nimg" id="simg1${arr[i][0]}" src="${arr[i][5]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>第三題</strong></div>
                <label>${arr[i][6]}</label><br>
                <img class="nimg" id="simg2${arr[i][0]}" src="${arr[i][7]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>第四題</strong></div>
                <label>${arr[i][8]}</label><br>
                <img class="nimg" id="simg3${arr[i][0]}" src="${arr[i][9]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>解析</strong></div>
                <label>${arr[i][12]}</label>
              </div>
              <label style="font-size:300%">答案：${ans}</label>
              <input type="button" id="s${arr[i][0]}" style="font-size:300%" class="button" value="選擇" onclick="textpaper('s${arr[i][0]}')">
            </div>
          `);
        };
        blv();
      },
    });
  });
  $(".dialog5:eq(1)").mousedown(function(){//配對題
    $.post({
      async:false,
      url : "fun.php?call=10",
      data:{wh:"pair"},
      success:function(e){
        $(".li").remove();
        let list = e.split("(+{8&^$})");
        list.pop();
        let arr=[];
        for (let i = 0 ; i < list.length ; i++){
          let ans = "";
          arr[i] = JSON.parse(list[i]);
          if (arr[i][6]==1) ans="第一題";
          else if (arr[i][6]==2) ans="第二題";
          else if (arr[i][6]==3) ans="第三題";
          $("#dialog5").append(`
            <div class="li" id="lif">
              <div class="ui">
                <div class="title"><strong>題目</strong></div>
                <label>${arr[i][1]}</label>
              </div>
              <div class="ui">
                <div class="title"><strong>第一題</strong></div>
                <label>${arr[i][2]}</label>
              </div>
              <div class="ui">
                <div class="title"><strong>第二題</strong></div>
                <label>${arr[i][3]}</label>
              </div>
              <div class="ui">
                <div class="title"><strong>第三題</strong></div>
                <label>${arr[i][4]}</label>
              </div>
              <div class="ui">
                <div class="title"><strong>解析</strong></div>
                <label>${arr[i][7]}</label>
              </div>
              <label style="font-size:300%">答案：${ans}</label>
              <input type="button" id="p${arr[i][0]}" class="button" onclick="textpaper('p${arr[i][0]}')" style="position: relative;font-size:300%;" value="選擇">
            </div>
          `);
        };
        blv();
      },
    })
  });
  $(".dialog5:eq(2)").mousedown(function(){//拖拉題
    $.post({
      async:false,
      url : "fun.php?call=10",
      data:{wh:"drag"},
      success:function(e){
        $(".li").remove();
        let list = e.split("(+{8&^$})");
        list.pop();
        let arr=[];
        for (let i = 0 ; i < list.length ; i++){
          arr[i] = JSON.parse(list[i]);
          $("#dialog5").append(`
            <div class="li" id="lif">
              <div class="ui">
                <div class="title"><strong>物品</strong></div>
                <img src=image/dr${arr[i][1]}.png id="imgsd0${arr[i][0]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>背景</strong></div>
              </div>
              <img src=image/dra${arr[i][2]}.png id="imgsdbk0${arr[i][0]}" style="position: relative;top:-50px;" draggable="false">
              <input type="button" class="button" id="d${arr[i][0]}" onclick="textpaper('d${arr[i][0]}')" style="position: relative;font-size:300%;top:-120px;" value="選擇">
            </div>
          `);
        };
        blv();
      },
    });
  });
  $(".dialog5:eq(3)").mousedown(function(){//尋寶題
    $.post({
      async:false,
      url : "fun.php?call=10",
      data:{wh:"box"},
      success:function(e){
        $(".li").remove();
        let list = e.split("(+{8&^$})");
        list.pop();
        let arr=[];
        for (let i = 0 ; i < list.length ; i++){
          arr = JSON.parse(list[i]);
          $("#dialog5").append(`
            <div class="li" id="lif">
              <div class="ui">
                <img id="imgbs${arr[0]}" src="image/box1.png" draggable="false">
              </div>
              <div class="boxbk" id="boxbk${arr[0]}" style="pointer-events: none;">
                <input id="ar0${arr[0]}" class="ckbutton" type="button">
                <input id="ar1${arr[0]}" class="ckbutton" type="button">
                <input id="ar2${arr[0]}" class="ckbutton" type="button">
                <input id="ar3${arr[0]}" class="ckbutton" type="button"><br><br>
                <input id="ar4${arr[0]}" class="ckbutton" type="button">
                <input id="ar5${arr[0]}" class="ckbutton" type="button">
                <input id="ar6${arr[0]}" class="ckbutton" type="button">
                <input id="ar7${arr[0]}" class="ckbutton" type="button">
              </div>
              <input type="button" id="b${arr[0]}" class="button" onclick="textpaper('b${arr[0]}')" style="position: relative;font-size:300%;" value="選擇">
            </div>
          `);
          $("#bs"+arr[0]).val(arr[1]);
          $("#imgbs"+arr[0])[0].src="image/box"+arr[1]+".png";
          let pos = arr[2].split(",");
          for (let i = 0 ;i < pos.length ; i++){
            $("#ar"+pos[i]+arr[0]).css("background-color","red");
          };
        };
        blv();
      },
    });
  });
});
$(".add:eq(2)").mousedown(function(){//預染
  $(".li").remove();
  $("#ui-id-7").text("");
  $("#dialog6").dialog("open");
  $("#ui-id-7").append(`
    <label style="margin: 0 80px 0 0;">考卷名稱：${$(".dialog4:eq(0)").val()}</label>
    <label style="margin: 0 80px 0 0;">每題作答時間：${$(".dialog4:eq(1)").val()}</label>
    <label style="margin: 0 80px 0 0;">是否顯示答案：${$(".dialog4:eq(2) :selected").text()}</label>
    <label>是否隨機顯示：${$(".dialog4:eq(3) :selected").text()}</label>
  `);
  for (let i = 0 ; i < sele.length ; i++ ){
    let nn = "";
    if (sele[i].substr(0,1) == "p") nn = "pair";
    else if (sele[i].substr(0,1) == "b") nn = "box";
    else if (sele[i].substr(0,1) == "d") nn = "drag";
    else if (sele[i].substr(0,1) == "s") nn = "select";
    fs(nn,sele[i].substr(1));
  };
  $("#dialog6").sortable({
    axis : "y",
    start: function(){
      sele.length = 0;
    },
    deactivate:function(e,ui){
      $("#dialog6").find(".li").each(function(){
        sele.push($(this)[0].id);
      });
    }
  })
});
function blv(){
  for (let i = 0 ; i < sele.length ; i++){
    $("#"+sele[i]).val("以選擇")
  };
};
$(".add:eq(3)").mousedown(function(){//送出
  if ($(".dialog4:eq(0)").val() == "" || sele.length == 0){
    if ($(".dialog4:eq(0)").val() == "") alert ("請填寫名稱");
    else alert("請選擇題目");
    return false;
  }
  $.post({
    async:false,
    url:"fun.php?call=12",
    data:{
      name : $(".dialog4:eq(0)").val(),
      time : $(".dialog4:eq(1)").val(),
      showans : $(".dialog4:eq(2)").val(),
      rand : $(".dialog4:eq(3)").val(),
      mean : JSON.stringify(sele),
    },
    success:function(e){
      $("#addcild").hide();
      sele.length = 0;
      $("#setselect").show();
    },
  })
});
$("#set").mousedown(function(){//管理
  $.post({
    async : false,
    url : "fun.php?call=13",
    success : function(e){
      $("#dialog7").dialog("open");
      $(".tr").remove();
      let list = e.split("(+{8&^$})");
      list.pop();
      let arr=[];
      for (let i = 0 ; i < list.length ; i++){
        arr = JSON.parse(list[i]);
        $(".dialog7:eq(0)").append(`
          <tr class="tr">
            <td>${arr[0]}</td>
            <td>${arr[1]}</td>
            <td><input type="number" min="10" max="60" class="tr${i}" value="${arr[2]}"></td>
            <td><select class="tr${i}"><option value="true">是</option><option value="false">否</option></select></td>
            <td><select class="tr${i}"><option value="true">是</option><option value="false">否</option></select></td>
            <td><input type="button" value="修改" onclick="fixtext('tr${i}','${arr[0]}')"></td>
            <td><input type="button" value="刪除" onclick="deletext(this.parentElement.parentElement,'${arr[0]}')"></td>
            <td><input type="button" value="複製" onclick="copytext('${arr[0]}')"></td>
            <td><input type="button" value="開始考試" onclick="starttext('${arr[0]}')"></td>
          </tr>
        `)
        $(".tr" + i + ":eq(1)").val(arr[4]);
        $(".tr" + i + ":eq(2)").val(arr[5]);
      };
      $('input[type=number]').keydown(function(){
        return false;
      });
    },
  });
});
