$("html").contextmenu(function(){
  return false;
});
let textid = $("#textid").text();
let isay = 0;
let ans = "";
var settime = 100;
var time0 = setInterval(logtext,settime);
var $rand = "false";
function logtext(){
  $.post({
    url : "fun.php?call=20",
    data : {id:textid},
    success:function(e){
      let arr = JSON.parse(e);
      $("#time").text("剩餘時間：" + arr[5]);
      if (arr[5] == 0){
        $("#ans").show();
        $(".trash").css("pointer-events","none");
      }
      else {
        $("#ans").hide();
        $(".trash").css("pointer-events","");
      }
      if (arr[5] < 3){
        $("#time").css({
          color : "red",
          "text-shadow" : "5px 5px 3px rgba(0, 0, 255, 0.5)",
        });
      }
      else {
        $("#time").css({
          color : "black",
          "text-shadow" : "5px 5px 3px rgba(, 0, 0, 0.7)",
        });
      }
      $rand = arr[4];
      if (arr[1] == "閒置中"){
        if (settime < 500){
          clearInterval(time0);
          settime = 500;
          time0 = setInterval(logtext,settime);
        };
        $(".trasha").remove();
        let list = arr[0].split("%&^");
        list.pop();
        for (let  i = 0 ;i < list.length ; i++){
          $(".temp:eq(0)").append(`
            <label class="trasha">第${i+1}位學生：${list[i]}<br></label>
          `);
        };
      }
      else if (arr[1] == "考試中"){
        $(".temp:eq(0)").hide();
        if (arr[2] != ans){
          let tf;
          if (ans == "") { tf = 0; }
          else { tf = 1; }
          ans = arr[2];
          cgans(ans,tf);
        };
      }
      else {
        $.post({
          url : "fun.php?call=23",
          data : {temp :"4", id: textid},
          success : function(e){
            console.log(e);
          }
        })
        location.href = "index.php";
      };
    },
  });
};
var tnn = "";
function cgans(nn,mm){
  let id = nn.substr(1);
  if (mm){//送回達到資料庫
    if (tnn.substr(0,1) == "s"){
      let ans = 0;
      $(".trash").find(".ui").each(function(){
        if ($(this).css("border-width") == "5px"){
          ans = $(this).data("ans");
        }
      });
      $.post({
        async : false,
        url : "fun.php?call=26",
        data : {wh : "select" ,ans : ans , id : tnn.substr(1) , textid :textid}
      })
    }
    else if (tnn.substr(0,1) == "d"){
      let ans = 2;
      if ($("#d1").width() + parseInt($("#d1").css("left")) > parseInt($("#d2").css("left")) && parseInt($("#d1").css("left")) <parseInt($("#d2").css("left"))+$("#d2").width() && parseInt($("#d1").css("top")) <parseInt($("#d2").css("top"))+$("#d2").height() && $("#d1").height() + parseInt($("#d1").css("top")) > parseInt($("#d2").css("top"))){
        ans = 1;
      };
      $.post({
        async : false,
        url : "fun.php?call=27",
        data : {ans : ans , textid :textid}
      })
    }
    else if (tnn.substr(0,1) == "p"){
      let ans = 0;
      $(".trash").find(".ui").each(function(){
        if ($(this).css("border-width") == "5px"){
          ans = $(this).data("ans");
        }
      });
      $.post({
        async : false,
        url : "fun.php?call=26",
        data : {wh : "pair" ,ans : ans , id : tnn.substr(1) , textid :textid}
      })
    }
    else if (tnn.substr(0,1) == "b"){
      let ans = 0;
      $(".ckbutton").each(function(){
        if($(this).css("background-image") == $("#img").css("background-image")) {
          ans = 1;
        };
        if ($(this).css("background-image") != "none" && ans == 0){
          ans = 1;
        }
      });
      $.post({
        async : false,
        url : "fun.php?call=27",
        data : {ans : ans, textid :textid},
      })
    }
  };
  tnn = nn;
  $(".trash").remove();
  if (nn.substr(0,1) == "s"){
    $.post({
      async:false,
      url : "fun.php?call=11",
      data : {wh : "select" ,id : id},
      success : function(e){
        let arr = JSON.parse(e);
        $("body").append(`
          <div class="trash">
            <h1>選擇題</h1>
            <div id="time">剩餘時間：</div>
            <h1 id="ans"></h1>
            <hr>
            <h2>${arr[1]}</h2>
            <div class="ui">
              <h3>${arr[2]}</h3>
              <img class="img" draggable="false" src="${arr[3]}">
            </div>
            <div class="ui">
              <h3>${arr[4]}</h3>
              <img class="img" draggable="false" src="${arr[5]}">
            </div>
            <div class="ui">
              <h3>${arr[6]}</h3>
              <img class="img" draggable="false" src="${arr[7]}">
            </div>
            <div class="ui">
              <h3>${arr[8]}</h3>
              <img class="img" draggable="false" src="${arr[9]}">
            </div>
          </div>
        `);
        $("#ans").text(arr[arr["ans"]*2]);
        let i = 1;
        $(".ui").each(function(){
          $(this).data("ans",i);
          i++;
        });
      },
    });
    if ($rand == "true"){
      for (let i = 0 ; i < 10 ;i++){
        let temp = $(".img:eq(" + rand(0,$(".img").length-1) + ")").parent();
        $(".trash").append(temp);
      };
    };
  }
  else if (nn.substr(0,1) == "d"){
    $.post({
      async:false,
      url : "fun.php?call=11",
      data : {wh : "drag" ,id : id},
      success : function(e){
        let arr = JSON.parse(e);
        $("body").append(`
          <div class="trash">
            <h1>拖拉題</h1>
            <div id="time">剩餘時間：</div>
            <hr>
            <img id="d1" src="image/dr${arr[1]}.png" style="z-index:2">
            <img id="d2" src="image/dra${arr[2]}.png" draggable="false" style="left:500px;top:300px">
          </div>
        `);
        $("#d1").draggable({
          appendTo:"#d2",
        });
      },
    });
    if ($rand == "true"){
      $("#d1").css({
        left : rand(50,1150),
        top : rand(50 ,550),
      })
    };
    let $dl;
    $("#d1").draggable({
      drag : function  (e){
        if (parseInt($("#d1").css("left")) > $(".trash").width() - parseInt($(".trash").css("left")) - $("#d1").width()/2){
          $("#d1").css("left",$(".trash").width() - parseInt($(".trash").css("left")) - $("#d1").width()/2)
          return false;
        }
        if (parseInt($("#d1").css("left")) < 5 ){
          $("#d1").css("left",5)
          return false;
        }
        if (parseInt($("#d1").css("top")) < 5 ){
          $("#d1").css("top",5)
          return false;
        }
        if (parseInt($("#d1").css("top")) > $(".trash").height() - parseInt($(".trash").css("top")) - $("#d1").height()/1.5){
          $("#d1").css("top",$(".trash").height() - parseInt($(".trash").css("top")) - $("#d1").height()/1.5)
          return false;
        }
      }
    })
  }
  else if (nn.substr(0,1) == "p"){
    $.post({
      async:false,
      url : "fun.php?call=11",
      data : {wh : "pair" ,id : id},
      success : function(e){
        let arr = JSON.parse(e);
        $("body").append(`
          <div class="trash">
            <h1>配對提</h1>
            <div id="time">剩餘時間：</div>
            <h1 id="ans"></h1>
            <hr>
            <h2>${arr[1]}</h2>
            <div class="ui">
              <h3>${arr[2]}</h3>
            </div>
            <div class="ui">
              <h3>${arr[3]}</h3>
            </div>
            <div class="ui">
              <h3>${arr[4]}</h3>
            </div>
          </div>
        `);
        $("#ans").text(arr[parseInt(arr["ans"])+1]);
        let i = 1;
        $(".ui").each(function(){
          $(this).data("ans",i);
          i++;
        });
      },
    });
    if ($rand == "true"){
      for (let i = 0 ; i < 10 ;i++){
        let temp = $("h3:eq(" + rand(0,$("h3").length-1) + ")").parent();
        $(".trash").append(temp);
      };
    };
  }
  else if (nn.substr(0,1) == "b"){
    $.post({
      async:false,
      url : "fun.php?call=11",
      data : {wh : "box" ,id : id},
      success : function(e){
        let arr = JSON.parse(e)[2].split(",");
        $("body").append(`
          <div class="trash">
            <h1>尋寶題</h1>
            <div id="time">剩餘時間：</div>
            <hr>
            <div id="img" style="display:inline-block;width:130px;height:130px;background:url(image/box${JSON.parse(e)[1]}.png)"></div>
            <div id="boxbk">
              <input id="b1" type="button" class="ckbutton">
              <input id="b2" type="button" class="ckbutton">
              <input id="b3" type="button" class="ckbutton">
              <input id="b4" type="button" class="ckbutton"><br>
              <input id="b5" type="button" class="ckbutton">
              <input id="b6" type="button" class="ckbutton">
              <input id="b7" type="button" class="ckbutton">
              <input id="b8" type="button" class="ckbutton">
            </div>
          </div>
        `);
        for (let i = 0 ;i < arr.length ; i++){
          $("#b" + arr[i]).css({
            'background-color' : "rgba(128,128,128,0)",
            'pointer-events' : "none",
          })
        };
        $(".ckbutton").mousedown(function(){
          if ($(this).css("background-color") != "rgb(128, 128, 128)") return false;
          $(this).css({
            background:"url(image/box"+rand(1,4)+".png)",
          })
        });
      },
    });
  };
  $(".ui").mousedown(function(){
    $(".ui").css("border","0px outset rgb(255, 0, 0)");
    $(this).css("border","5px outset rgb(255, 0, 0)");
  });
};