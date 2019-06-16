$("html").contextmenu(function(){
  return false;
});
let ans;
var settime = 100;
var time0 = setInterval(logtext,settime);
function logtext(){
  $.post({
    url : "fun.php?call=20",
    data : {id:$("#textid").html()},
    success:function(e){
      let arr = JSON.parse(e);
      if (arr[1] == "閒置中"){
        if (settime < 500){
          clearInterval(time0);
          settime = 500;
          time0 = setInterval(logtext,settime);
        };
        $(".trash").remove();
        let list = arr[0].split("%&^");
        list.pop();
        for (let  i = 0 ;i < list.length ; i++){
          $(".temp:eq(0)").append(`
            <label class="trash">第${i+1}位學生：${list[i]}<br></label>
          `);
        };
      }
      else if (arr[1] == "考試中"){
        $(".temp:eq(0)").hide();
        if (arr[2] != ans){
          ans = arr[2];
          cgans(ans);
        };
      }
      else {
        $.post({
          url : "fun.php?call=23",
          data : {temp :"4", id: $("#textid").text()},
          success : function(e){
            console.log(e);
          }
        })
        location.href = "index.php";
      };
    },
  });
};
function cgans(nn){
  $(".trash").remove();
  let id = nn.substr(1);
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
      },
    });
  }
  else if (nn.substr(0,1) == "d"){
    $.post({
      async:false,
      url : "fun.php?call=11",
      data : {wh : "drag" ,id : id},
      success : function(e){
        $("body").append(`
          <div class="trash">
          </div>
        `);
      },
    });
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
      },
    });
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
            <hr>
            <img src="image/box${JSON.parse(e)[1]}.png" draggable="false">
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
          
        });
      },
    });
  };
  $(".ui").mousedown(function(){
    $(".ui").css("border","0px outset rgb(255, 0, 0)");
    $(this).css("border","5px outset rgb(255, 0, 0)");
  });
};