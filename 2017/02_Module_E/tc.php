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
  <title>互動考試</title>
</head>
<style>
  .bigdialog{
    text-align: center;
  }
  .li{
    border-radius: 10px;
    text-align: left;
    overflow: auto;
    width: 100%;
    height: 300px;
    background: rgba(128,128,128,0.2);
    margin: 0 0 20px 0;
  }
  textarea{
    position: relative;
    resize: none;
    left: 0;
    width: 90%;
    height: 70%;
    border:1px solid rgb(169, 169, 169);
  }
  .title{
    width: 100%;
    position: relative;
    top: 1%;
    font-size: 200%;
  }
  .ui{
    overflow: auto;
    margin: 1%;
    text-align: center;
    display: inline-block;
    height: 90%;
    width: 17%;
  }
  .file{
    cursor: pointer;
    width: 90%;
    height: 60%;
  }
  .img{
    position: relative;
    pointer-events: none;
    width: 90%;
    height: 60%;
    top: -162px;
  }
  .nimg{
    position: relative;
    width: 90%;
    height: 60%;
  }
  .ckbutton{
    width: 130px;
    height: 130px;
    margin: 13px;
    background-color: gray;
    border-style: hidden;
    cursor: pointer;
  }
  .boxbk{
    display: inline-block;
    background: url(image/boxbk.jpg);
    width: 640px;
    height: 359px;
    vertical-align:top;
  }
  #ui-id-6{
    text-align: center;
  }
</style>
<body>
  <div id="dialog0" class="bigdialog" style="display: none">
    <h1>選擇題</h1>
    <h3 style="color:red;display: none" class="miss">新增成功</h3>
    <hr id="word" style="border-color: blue;">
  </div>
  <div id="dialog1" class="bigdialog" style="display: none">
    <h1>配對題</h1>
    <h3 style="color:red;display: none" class="miss">新增成功</h3>
    <hr id="word" style="border-color: blue;">
  </div>
  <div id="dialog2" class="bigdialog" style="display: none">
    <h1>拖拉題</h1>
    <h3 style="color:red;display: none" class="miss">新增成功</h3>
    <hr id="word" style="border-color: blue;">
  </div>
  <div id="dialog3" class="bigdialog" style="display: none">
    <h1>尋寶題</h1>
    <h3 style="color:red;display: none" class="miss">新增成功</h3>
    <hr id="word" style="border-color: blue;">
  </div>
  <div id="tcall">
    <input type="button" id="setall" class="button tclogin" value="管理題庫">
    <input type="button" id="settext" class="button tclogin" value="管理試卷">
    <input type="button" class="button tclogin" value="登出" onclick="location.href='index.php'">
    <div id="select" style="display:none">
      <input type="button" id="sele" class="button se" value="選擇題">
      <input type="button" id="pair" class="button se" value="配對題"> <br><br>
      <input type="button" id="drag" class="button se" value="拖拉題">
      <input type="button" id="box" class="button se" value="尋寶題">
    </div>
    <div id="setselect" style="display:none">
      <input type="button" id="add" class="button se" value="新增">
      <input type="button" id="set" class="button se" value="管理">
    </div>
    <div id="dialog4" class="bigdialog" style="display: none">
      試卷名稱：<input type="text" class="dialog4" maxlength="20"><br><br>
      每題作答時間：<input type="number" class="dialog4" min="10" value="30" max="60"><br><br>
      是否顯示答案：<select class="dialog4"><option value="true">是</option><option value="false">否</option></select><br><br>
      選項是否隨機：<select class="dialog4"><option value="true">是</option><option value="false">否</option></select><br><br>
    </div>
    <div id="dialog5" class="bigdialog" style="display: none"></div>
    <div id="dialog6" class="bigdialog" style="display: none"></div>
    <div id="dialog7" class="bigdialog" style="display: none">
      <table align="center" border="1">
        <tbody class="dialog7">
          <tr>
            <td>ID</td>
            <td>名稱</td>
            <td>回答時間</td>
            <td>顯示答案</td>
            <td>隨機顯示</td>
            <td>修改</td>
            <td>刪除</td>
            <td>複製</td>
            <td>開始考試</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="addcild" style="display:none">
      <input type="button" class="button se add" value="基本設定">
      <input type="button" class="button se add" value="選擇題目">
      <input type="button" class="button se add" value="預覽">
      <input type="button" class="button se add" value="送出">
    </div>
  </div>
</body>
<script>
  $("#setall").click(function(){
    $(".tclogin").hide();
    $("#select").show();
  });
  $("#settext").click(function(){
    $(".tclogin").hide();
    $("#setselect").show();
  });
  $(".bigdialog").dialog({
    width:1300,
    height:700,
    resizable:false,
    autoOpen:false,
  });
  $("#sele").click(function(){
    $.post({
      async:false,
      url:"showsele.php",
      success:function(e){
        $(".li").remove();
        $("#dialog0").append(`
        <div class="li" id="lif">
            <div class="ui">
              <div class="title"><strong>題目</strong></div>
              <textarea id="st0" class="st" cols="20"></textarea>
            </div>
            <div class="ui">
              <div class="title"><strong>第一題</strong></div>
              <textarea id="st1" class="st" cols="20" ></textarea>
              <input type="file" onchange="simg()" id="fimg0" accept="image/*" class="file">
              <img class="img" id="simg0" src="seleimg/sele.png">
            </div>
            <div class="ui">
              <div class="title"><strong>第二題</strong></div>
              <textarea id="st2" class="st" cols="20" ></textarea>
              <input type="file" onchange="simg()" id="fimg1" accept="image/*" class="file">
              <img class="img" id="simg1" src="seleimg/sele.png">
            </div>
            <div class="ui">
              <div class="title"><strong>第三題</strong></div>
              <textarea id="st3" class="st" cols="20" ></textarea>
              <input type="file" onchange="simg()" id="fimg2" accept="image/*" class="file">
              <img class="img" id="simg2" src="seleimg/sele.png">
            </div>
            <div class="ui">
              <div class="title"><strong>第四題</strong></div>
              <textarea id="st4" class="st" cols="20" ></textarea>
              <input type="file" onchange="simg()" id="fimg3" accept="image/*" accept="image/*" class="file">
              <img class="img" id="simg3" src="seleimg/sele.png">
            </div>
            <div class="ui">
              <div class="title"><strong>解析</strong></div>
              <textarea id="st5" class="st" cols="20" ></textarea>
            </div>
            <label style="font-size:300%">答案：</label>
            <select id="ss" style="font-size:300%">
                <option value="1">第一題</option>
                <option value="2">第二題</option>
                <option value="3">第三題</option>
                <option value="4">第四題</option>
            <select>
            <input type="button" style="font-size:300%" class="button" value="送出" onclick="selesend()">
          </div>
        `);
        let list = e.split("(+{8&^$})");
        list.pop();
        let arr=[];
        for (let i = 0 ; i < list.length ; i++){
          arr[i] = JSON.parse(list[i]);
          $("#dialog0").append(`
            <div class="li">
              <div class="ui">
                <div class="title"><strong>題目</strong></div>
                <textarea id="st0${arr[i][0]}" class="st" cols="20">${arr[i][1]}</textarea>
              </div>
              <div class="ui">
                <div class="title"><strong>第一題</strong></div>
                <textarea id="st1${arr[i][0]}" class="st" cols="20" >${arr[i][2]}</textarea>
                <img class="nimg" id="simg0" src="${arr[i][3]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>第二題</strong></div>
                <textarea id="st2${arr[i][0]}" class="st" cols="20" >${arr[i][4]}</textarea>
                <img class="nimg" id="simg1" src="${arr[i][5]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>第三題</strong></div>
                <textarea id="st3${arr[i][0]}" class="st" cols="20" >${arr[i][6]}</textarea>
                <img class="nimg" id="simg2" src="${arr[i][7]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>第四題</strong></div>
                <textarea id="st4${arr[i][0]}" class="st" cols="20" >${arr[i][8]}</textarea>
                <img class="nimg" id="simg3" src="${arr[i][9]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>解析</strong></div>
                <textarea id="st5${arr[i][0]}" class="st" cols="20" >${arr[i][12]}</textarea>
              </div>
              <label style="font-size:300%">答案：</label>
              <select id="ss${arr[i][0]}" style="font-size:300%">
                  <option value="1">第一題</option>
                  <option value="2">第二題</option>
                  <option value="3">第三題</option>
                  <option value="4">第四題</option>
              <select>
              <input type="button" style="font-size:300%" class="button" value="修改" onclick="fix(${arr[i][0]})">
            </div>
          `);
          $("#ss"+arr[i][0]).val(arr[i][11]);//答案選擇更改
        };
      },
    });
    $("#dialog0").dialog("open");
  });
  $("#drag").click(function(){
    $.post({
      async:false,
      url : "fun.php?call=1",
      success:function(e){
        $(".li").remove();
        $("#dialog2").append(`
          <div class="li" id="lif">
            <div class="ui">
              <div class="title"><strong>物品</strong></div>
              <select class="sedr" style="font-size:200%" id="sd0u">
                <option value="01">斧頭</option>
                <option value="02">鐮刀</option>
                <option value="03">盾牌</option>
                <option value="04">鏟子</option>
                <option value="05">稿子</option>
              </select>
              <img src=image/dr01.png id="imgsd0u" draggable="false">
            </div>
            <div class="ui">
              <div class="title"><strong>背景</strong></div>
              <select class="sedrbk" style="font-size:200%" id="sdbk0u">
                <option value="01">天空</option>
                <option value="02">冰藍</option>
                <option value="03">海藍</option>
                <option value="04">科技</option>
                <option value="05">酷炫</option>
                <option value="06">放射</option>
              </select>
            </div>
            <img src=image/dra01.png id="imgsdbk0u" style="position: relative;top:-50px;" draggable="false">
            <input type="button" class="button" onclick="drnew()" style="position: relative;font-size:300%;top:-120px;" value="新增">
          </div>
        `);
        let list = e.split("(+{8&^$})");
        list.pop();
        let arr=[];
        for (let i = 0 ; i < list.length ; i++){
          arr[i] = JSON.parse(list[i]);
          $("#dialog2").append(`
            <div class="li" id="lif">
              <div class="ui">
                <div class="title"><strong>物品</strong></div>
                <select class="sedr" style="font-size:200%" id="sd0${arr[i][0]}">
                  <option value="01">斧頭</option>
                  <option value="02">鐮刀</option>
                  <option value="03">盾牌</option>
                  <option value="04">鏟子</option>
                  <option value="05">稿子</option>
                </select>
                <img src=image/dr${arr[i][1]}.png id="imgsd0${arr[i][0]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>背景</strong></div>
                <select class="sedrbk" style="font-size:200%" id="sdbk0${arr[i][0]}">
                  <option value="01">天空</option>
                  <option value="02">冰藍</option>
                  <option value="03">海藍</option>
                  <option value="04">科技</option>
                  <option value="05">酷炫</option>
                  <option value="06">放射</option>
                </select>
              </div>
              <img src=image/dra${arr[i][2]}.png id="imgsdbk0${arr[i][0]}" style="position: relative;top:-50px;" draggable="false">
              <input type="button" class="button" onclick="drfix(${arr[i][0]})" style="position: relative;font-size:300%;top:-120px;" value="修改">
            </div>
          `);
          $("#sd0"+arr[i][0]).val(arr[i][1]);
          $("#sdbk0"+arr[i][0]).val(arr[i][2]);
        };
      },
    });
    $(".sedr").change(function(){
      let img = "#img" + $(this)[0].id;
      $(img)[0].src = "image/dr"+$(this).val()+".png";
    });
    $(".sedrbk").change(function(){
      let img = "#img" + $(this)[0].id;
      $(img)[0].src = "image/dra"+$(this).val()+".png";
    });
    $("#dialog2").dialog("open");
  });
  $("#pair").click(function(){
    $.post({
      async:false,
      url : "fun.php?call=4",
      success:function(e){
        $(".li").remove();
        $("#dialog1").append(`
          <div class="li" id="lif">
            <div class="ui">
              <div class="title"><strong>題目</strong></div>
              <textarea id="pt0" class="st" cols="20"></textarea>
            </div>
            <div class="ui">
              <div class="title"><strong>第一題</strong></div>
              <textarea id="pt1" class="st" cols="20"></textarea>
            </div>
            <div class="ui">
              <div class="title"><strong>第二題</strong></div>
              <textarea id="pt2" class="st" cols="20"></textarea>
            </div>
            <div class="ui">
              <div class="title"><strong>第三題</strong></div>
              <textarea id="pt3" class="st" cols="20"></textarea>
            </div>
            <div class="ui">
              <div class="title"><strong>解析</strong></div>
              <textarea id="pt4" class="st" cols="20"></textarea>
            </div>
            <label style="font-size:300%">答案：</label>
            <select id="ps" style="font-size:300%">
                <option value="1">第一題</option>
                <option value="2">第二題</option>
                <option value="3">第三題</option>
            <select>
            <input type="button" class="button" onclick="pairsend()" style="position: relative;font-size:300%;" value="新增">
          </div>
        `);
        let list = e.split("(+{8&^$})");
        list.pop();
        let arr=[];
        for (let i = 0 ; i < list.length ; i++){
          arr[i] = JSON.parse(list[i]);
          $("#dialog1").append(`
            <div class="li" id="lif">
              <div class="ui">
                <div class="title"><strong>題目</strong></div>
                <textarea id="pt0${arr[i][0]}" class="st" cols="20">${arr[i][1]}</textarea>
              </div>
              <div class="ui">
                <div class="title"><strong>第一題</strong></div>
                <textarea id="pt1${arr[i][0]}" class="st" cols="20">${arr[i][2]}</textarea>
              </div>
              <div class="ui">
                <div class="title"><strong>第二題</strong></div>
                <textarea id="pt2${arr[i][0]}" class="st" cols="20">${arr[i][3]}</textarea>
              </div>
              <div class="ui">
                <div class="title"><strong>第三題</strong></div>
                <textarea id="pt3${arr[i][0]}" class="st" cols="20">${arr[i][4]}</textarea>
              </div>
              <div class="ui">
                <div class="title"><strong>解析</strong></div>
                <textarea id="pt4${arr[i][0]}" class="st" cols="20">${arr[i][7]}</textarea>
              </div>
              <label style="font-size:300%">答案：</label>
              <select id="ps${arr[i][0]}" style="font-size:300%">
                  <option value="1">第一題</option>
                  <option value="2">第二題</option>
                  <option value="3">第三題</option>
              <select>
              <input type="button" class="button" onclick="pairfix(${arr[i][0]})" style="position: relative;font-size:300%;" value="修改">
            </div>
          `);
          $("#ps"+arr[i][0]).val(arr[i][6]);
        };
      },
    });
    $("#dialog1").dialog("open");
  });
  $("#box").click(function(){
    $.post({
      async:false,
      url : "fun.php?call=7",
      success:function(e){
        $(".li").remove();
        $("#dialog3").append(`
          <div class="li" id="lif">
            <div class="ui">
              <div class="title"><strong>題目</strong></div>
              <select id="bs" class="bsc" style="font-size:200%">
                  <option value="1">蒐集浣熊</option>
                  <option value="2">蒐集貓咪</option>
                  <option value="3">蒐集兔子</option>
                  <option value="4">蒐集老虎</option>
              <select>
              <img id="imgbs" src="image/box1.png" draggable="false">
            </div>
            <div class="boxbk" id="boxbku">
              <input id="ar0u" class="ckbutton" type="button">
              <input id="ar1u" class="ckbutton" type="button">
              <input id="ar2u" class="ckbutton" type="button">
              <input id="ar3u" class="ckbutton" type="button"><br><br>
              <input id="ar4u" class="ckbutton" type="button">
              <input id="ar5u" class="ckbutton" type="button">
              <input id="ar6u" class="ckbutton" type="button">
              <input id="ar7u" class="ckbutton" type="button">
            </div>
            <input type="button" class="button" onclick="boxsend()" style="position: relative;font-size:300%;" value="新增">
          </div>
        `);
        let list = e.split("(+{8&^$})");
        list.pop();
        let arr=[];
        for (let i = 0 ; i < list.length ; i++){
          arr = JSON.parse(list[i]);
          $("#dialog3").append(`
            <div class="li" id="lif">
              <div class="ui">
                <div class="title"><strong>題目</strong></div>
                <select id="bs${arr[0]}" class="bsc" style="font-size:200%">
                    <option value="1">蒐集浣熊</option>
                    <option value="2">蒐集貓咪</option>
                    <option value="3">蒐集兔子</option>
                    <option value="4">蒐集老虎</option>
                <select>
                <img id="imgbs${arr[0]}" src="image/box1.png" draggable="false">
              </div>
              <div class="boxbk" id="boxbk${arr[0]}">
                <input id="ar0${arr[0]}" class="ckbutton" type="button">
                <input id="ar1${arr[0]}" class="ckbutton" type="button">
                <input id="ar2${arr[0]}" class="ckbutton" type="button">
                <input id="ar3${arr[0]}" class="ckbutton" type="button"><br><br>
                <input id="ar4${arr[0]}" class="ckbutton" type="button">
                <input id="ar5${arr[0]}" class="ckbutton" type="button">
                <input id="ar6${arr[0]}" class="ckbutton" type="button">
                <input id="ar7${arr[0]}" class="ckbutton" type="button">
              </div>
              <input type="button" class="button" onclick="boxfix(${arr[0]})" style="position: relative;font-size:300%;" value="修改">
            </div>
          `);
          $("#bs"+arr[0]).val(arr[1]);
          $("#imgbs"+arr[0])[0].src="image/box"+arr[1]+".png";
          let pos = arr[2].split(",");
          for (let i = 0 ;i < pos.length ; i++){
            $("#ar"+pos[i]+arr[0]).css("background-color","red");
          };
        };
        $(".bsc").change(function(){
          let img = "#img"+$(this)[0].id;
          $(img)[0].src = "image/box" + $(this).val() + ".png";
        });
        $(".ckbutton").click(function(){
          cbutton($(this));
        });
      },
    });
    $("#dialog3").dialog("open");
  });
</script>
<script src="js/main.js"></script>
<script src="js/function.js"></script>
</html>