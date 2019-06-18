var object = {};
var arr=[];
var sele=[];
function selesend(){
  imgstop = 0;
  let none = 0;
  $("#lif").find(".st").each(function(){
    if ($(this).val()==""){
      $(this).css("border","2px solid rgb(255, 0, 0)");
      none = 1;
    }
    else {
      $(this).css("border","1px solid rgb(169, 169, 169)");
    };
  });
  if (none) return false;
  object = {
    title : $("#st0").val(),
    one : $("#st1").val(),
    oneimg : imgdata("#fimg0","oneimg"),
    two : $("#st2").val(),
    twoimg : imgdata("#fimg1","twoimg"),
    three : $("#st3").val(),
    threeimg : imgdata("#fimg2","threeimg"),
    four : $("#st4").val(),
    fourimg : imgdata("#fimg3","fourimg"),
    mean : $("#st5").val(),
    ans : $("#ss").val(),
  };
  let time=setInterval(function(){
    if (object.oneimg != undefined && object.twoimg != undefined && object.threeimg != undefined && object.fourimg != undefined){
      $.post({
        url : "selesave.php",
        data :{json:object},
        success:function(e){
          $(".miss").fadeIn(1);
          $(".miss").fadeOut(3000);
          $("#sele").click();
        },
      });
      clearInterval(time);
    };
  },1000/60);
};
function simg(){
  $(".file").each(function(){
    if ($(this)[0].files[0] == undefined){
    }
    else{
      let img = "#s" + $(this)[0].id.substr(1);
      let reader = new FileReader();
      reader.readAsDataURL($(this)[0].files[0]);
      reader.onload = function(e){
        $(img)[0].src = e.target.result;
      };
    };
  });
};
function imgdata(nn,mm){
  if ($(nn)[0].files[0] == undefined){
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 188.78;
    canvas.height = 162;
    let img0 = new Image();
    img0.src = "seleimg/none.png";
    img0.onload = function (){
      ctx.drawImage(img0,0,0,188.78,162);
      let data = canvas.toDataURL();
      object[mm] = data;
    };
  }
  else{
    let reader = new FileReader();
    reader.readAsDataURL($(nn)[0].files[0]);
    reader.onload = function(e){
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = 188.78;
      canvas.height = 162;
      let img0 = new Image();
      img0.src = e.target.result;
      img0.onload = function (){
        ctx.drawImage(img0,0,0,188.78,162);
        let data = canvas.toDataURL();
        object[mm] = data;
      };
    };
  };
};
function fix(nn){
  let object={
    title:$("#st0"+nn).val(),
    one:$("#st1"+nn).val(),
    two:$("#st2"+nn).val(),
    three:$("#st3"+nn).val(),
    four:$("#st4"+nn).val(),
    mean:$("#st5"+nn).val(),
    ans:$("#ss"+nn).val(),
    id : nn,
  }
  $.post({
    async:false,
    url:"sefix.php",
    data:{object:object},
    success:function(e){
      console.log(e);
    },
  })
};
function drnew(){
  let object = {
    dragob : $("#sd0u").val(),
    dragbk : $("#sdbk0u").val(),
  };
  $.post({
    async : false,
    url : "fun.php?call=2",
    data : {object:object},
    success : function(e){
      $(".miss").fadeIn(1);
      $(".miss").fadeOut(3000);
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
    },
  });
};
function drfix(nn){
  let object = {
    dragob : $("#sd0"+nn).val(),
    dragbk : $("#sdbk0"+nn).val(),
    id : nn,
  };
  $.post({
    async : false,
    url : "fun.php?call=3",
    data : {object:object},
  });
};
function pairsend(){
  let none = 0;
  $("#lif").find(".st").each(function(){
    if ($(this).val()==""){
      $(this).css("border","2px solid rgb(255, 0, 0)");
      none = 1;
    }
    else {
      $(this).css("border","1px solid rgb(169, 169, 169)");
    };
  });
  if (none) return false;
  let object = {
    problem : $("#pt0").val(),
    one : $("#pt1").val(),
    two : $("#pt2").val(),
    three : $("#pt3").val(),
    ans : $("#ps").val(),
    mean : $("#pt4").val(),
  };
  $.post({
    asynd:false,
    url:"fun.php?call=5",
    data:{object:object},
    success:function(e){
      $(".miss").fadeIn(1);
      $(".miss").fadeOut(3000);
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
    }
  });
};
function pairfix(nn){
  let object = {
    problem : $("#pt0"+nn).val(),
    one : $("#pt1"+nn).val(),
    two : $("#pt2"+nn).val(),
    three : $("#pt3"+nn).val(),
    ans : $("#ps"+nn).val(),
    mean : $("#pt4"+nn).val(),
    id : nn,
  };
  $.post({
    async : false,
    url : "fun.php?call=6",
    data : {object:object},
  });
};
function cbutton(th){
  arr = [];
  if (th.css("background-color") == "rgb(128, 128, 128)"){
    th.css("background-color","red");
  }
  else{
    th.css("background-color","gray")
  }
  let ck ="#boxbk"+th[0].id.substr(3);
  $(ck).find(".ckbutton").each(function(){
    if ($(this).css("background-color") == "rgb(255, 0, 0)"){
      arr.push($(this)[0].id.substr(2,1));
    }
  });
};
function boxsend(){
  if (arr.length<2){
    return false;
  }
  $.post({
    async:false,
    url:"fun.php?call=8",
    data:{title:$("#bs").val(),pos:JSON.stringify(arr)},
    success:function(e){
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
    },
  })
};
function boxfix(nn){
  if (arr.length<2){
    return false;
  }
  $.post({
    async:false,
    url:"fun.php?call=9",
    data:{title:$("#bs"+nn).val(),pos:JSON.stringify(arr),id:nn},
  })
};
function textpaper(nn){
  if ($("#"+nn).val()=="以選擇"){
    let index = sele.indexOf(nn);
    sele.splice(index,1);
    $("#"+nn).val("選擇");
    return false;
  }
  sele.push(nn);
  $("#"+nn).val("以選擇");
};
function fs(nn,mm){
  $.post({
    async:false,
    url : "fun.php?call=11",
    data:{wh:nn,id:mm},
    success:function(e){
      let ans;
      let arr = JSON.parse(e);
      if (nn == "select"){
        if (arr[11]==0)ans = "第一題";
          else if (arr[11]==1)ans = "第二題";
          else if (arr[11]==2)ans = "第三題";
          else if (arr[11]==3)ans = "第四題";
          $("#dialog6").append(`
            <div class="li" id="${nn.substr(0,1)+mm}">
              <div class="ui">
                <div class="title"><strong>題目</strong></div>
                <label>${arr[1]}</label>
              </div>
              <div class="ui">
                <div class="title"><strong>第一題</strong></div>
                <label>${arr[2]}</label><br>
                <img class="nimg" id="simg0" src="${arr[3]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>第二題</strong></div>
                <label>${arr[4]}</label><br>
                <img class="nimg" id="simg1" src="${arr[5]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>第三題</strong></div>
                <label>${arr[6]}</label><br>
                <img class="nimg" id="simg2" src="${arr[7]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>第四題</strong></div>
                <label>${arr[8]}</label><br>
                <img class="nimg" id="simg3" src="${arr[9]}" draggable="false">
              </div>
              <div class="ui">
                <div class="title"><strong>解析</strong></div>
                <label>${arr[12]}</label>
              </div>
              <label style="font-size:300%">答案：${ans}</label>
            </div>
          `);
      }
      else if (nn == "pair"){
        let ans = "";
        if (arr[6]==1) ans="第一題";
        else if (arr[6]==2) ans="第二題";
        else if (arr[6]==3) ans="第三題";
        $("#dialog6").append(`
          <div class="li" id="${nn.substr(0,1)+mm}">
            <div class="ui">
              <div class="title"><strong>題目</strong></div>
              <label>${arr[1]}</label>
            </div>
            <div class="ui">
              <div class="title"><strong>第一題</strong></div>
              <label>${arr[2]}</label>
            </div>
            <div class="ui">
              <div class="title"><strong>第二題</strong></div>
              <label>${arr[3]}</label>
            </div>
            <div class="ui">
              <div class="title"><strong>第三題</strong></div>
              <label>${arr[4]}</label>
            </div>
            <div class="ui">
              <div class="title"><strong>解析</strong></div>
              <label>${arr[7]}</label>
            </div>
            <label style="font-size:300%">答案：${ans}</label>
          </div>
        `);
      }
      else if (nn == "box"){
        $("#dialog6").append(`
          <div class="li" id="${nn.substr(0,1)+mm}">
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
          </div>
        `);
        $("#bs"+arr[0]).val(arr[1]);
        $("#imgbs"+arr[0])[0].src="image/box"+arr[1]+".png";
        let pos = arr[2].split(",");
        for (let i = 0 ;i < pos.length ; i++){
          $("#ar"+pos[i]+arr[0]).css("background-color","red");
        };
      }
      else if (nn == "drag"){
        $("#dialog6").append(`
          <div class="li" id="${nn.substr(0,1)+mm}">
            <div class="ui">
              <div class="title"><strong>物品</strong></div>
              <img src=image/dr${arr[1]}.png id="imgsd0${arr[0]}" draggable="false">
            </div>
            <div class="ui">
              <div class="title"><strong>背景</strong></div>
            </div>
            <img src=image/dra${arr[2]}.png id="imgsdbk0${arr[0]}" style="position: relative;top:-50px;" draggable="false">
          </div>
        `);
      };
    },
  });
};
function fixtext(nn,id){
  $.post({
    async:false,
    url : "fun.php?call=14",
    data : {
      anstime : $("." + nn + ":eq(0)").val(),
      showans : $("." + nn + ":eq(1)").val(),
      rand : $("." + nn + ":eq(2)").val(),
      id : id,
    },
  });
};
function deletext(nn,id){
  $.post({
    async:false,
    url : "fun.php?call=15",
    data : {id : id},
    success:function(e){
      console.log(e)
      if (e == "can"){
        nn.remove();
      }
    },
  });
};
function copytext(id){
  $.post({
    async:false,
    url : "fun.php?call=16",
    data : {id : id},
    success:function(e){
      $("#set").mousedown();
    },
  });
};
function starttext(id){
  $.post({
    async:false,
    url:"fun.php?call=19",
    data:{id:id},
    success:function(e){
      if (e == "cant"){
        alert("此考卷無法考試");
        return false;
      };
      location.href = "oversee.php?id=" + id;
    },
  });
};
function rand(nn,mm){
  return parseInt(Math.random()*(mm-nn+1)+nn);
};