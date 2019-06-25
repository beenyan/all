function rainbow(createpos,word,fontsize,shadow,textwidth){
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = fontsize * word.length + shadow;
  canvas.height = fontsize + fontsize / 3;
  $(canvas).css("pointer-events","none");
  createpos.append(canvas);
  ctx.font = "bold " + fontsize +"px 微軟正黑體";
  ctx.fillText(word,0,fontsize);
  let pos = 0;
  let ck = 1;
  setInterval(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillText(word,0,fontsize)
    if (pos < canvas.width*1.5 && ck) pos++; //控制位置
    else {
      ck = 0;
      pos--;
    }
    if (pos < -100) ck = 1;
    let gar = ctx.createLinearGradient(pos,0,canvas.width-pos,canvas.height);
    gar.addColorStop(0,"red");
    gar.addColorStop(0.2,"orange");
    gar.addColorStop(0.35,"yellow");
    gar.addColorStop(0.55,"green");
    gar.addColorStop(0.7,"aqua");
    gar.addColorStop(0.8,"blue");
    gar.addColorStop(1,"purple");
    ctx.fillStyle = gar;
    ctx.globalCompositeOperation = "source-in";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(128,128,128,1)";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = textwidth;
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillText(word,shadow,fontsize + shadow);
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeText(word,0,fontsize);
  },10);
};
rainbow($("#title"),"後臺管理系統",48,7,2);
rainbow($("#title .bt"),"管理者登出",38,3,2);
rainbow($("#ltit div:eq(0)"),"會員管理",38,3,2);
rainbow($("#ltit div:eq(1)"),"樓層管理",38,3,2);
rainbow($("#ltit div:eq(2)"),"預約單管理",38,3,2);
function reflash(){
  $(".ui").remove();
  $(".mean:eq(0)").append(`
    <div class="ui">
      <div class="li"></div>
      <div class="li"></div>
      <div class="li"></div>
      <div class="li"></div>
      <div class="li"></div>
      <div class="li" style="border-right-style: hidden;"></div>
    </div>
  `);
  rainbow($(".mean:eq(0) .ui:eq(0) .li:eq(0)"),"帳號",48,7,2);
  rainbow($(".mean:eq(0) .ui:eq(0) .li:eq(1)"),"密碼",48,7,2);
  rainbow($(".mean:eq(0) .ui:eq(0) .li:eq(2)"),"提示字",42,5,2);
  rainbow($(".mean:eq(0) .ui:eq(0) .li:eq(3)"),"答案",48,7,2);
  rainbow($(".mean:eq(0) .ui:eq(0) .li:eq(4)"),"修改",48,7,2);
  rainbow($(".mean:eq(0) .ui:eq(0) .li:eq(5)"),"刪除",48,7,2);
  $.post({
    async : false,
    url : "fun.php?c=1",
    success : function (e){
      list = e.split("$(/)");
      list.pop();
      for(let i = 0 ; i < list.length ; i++){
        let arr = JSON.parse(list[i]);
        $(".mean:eq(0)").append(`
          <div class="ui">
            <div class="li"><input type="text" value="${arr[1]}"></div>
            <div class="li"><input type="text" value="${arr[2]}"></div>
            <div class="li"><input type="text" value="${arr[3]}"></div>
            <div class="li"><input type="text" value="${arr[4]}"></div>
            <div class="li" onclick="fixlog(this)"></div>
            <div class="li" style="border-right-style: hidden;" onclick="delelog(${arr[0]})"></div>
          </div>
        `);
        $(".mean:eq(0) .ui:eq(" + (i + 1) + ") .li:eq(4)").data("id",arr[0]);
        $(".mean:eq(0) .ui:eq(" + (i + 1) + ") .li:eq(5)").data("id",arr[0]);
        rainbow($(".mean:eq(0) .ui:eq(" + (i + 1) + ") .li:eq(4)"),"修改",48,7,2);
        rainbow($(".mean:eq(0) .ui:eq(" + (i + 1) + ") .li:eq(5)"),"刪除",48,7,2);
      };
    },
  });
  $(".mean:eq(0)").append(`
    <div class="ui">
      <div class="li"><input type="text"></div>
      <div class="li"><input type="text"></div>
      <div class="li"><input type="text"></div>
      <div class="li"><input type="text"></div>
      <div class="li" style="border-right-style: hidden;width:33.3%"></div>
    </div>
  `);
  rainbow($(".mean:eq(0) .ui:last .li:last"),"新增",48,7,2);
  $(":text:odd,.li:odd").css("background","aqua");
  $(".ui:not(:last)").css({
    "border-bottom-style" : "hidden",
  });
  $(".ui").find(".li:gt(3)").css("cursor","pointer");
  $(".ui:even").css("border-color","red");
  $(":text:even,.li:even").css("background","greenyellow");
  $(".li:last").mousedown(function(){
    if ($(".ui:last .li:eq(0) :text").val() == "" || $(".ui:last .li:eq(1) :text").val() == ""){
      alert("Please input account or password.");
      return false;
    };
    let object = {
      account : $(".ui:last .li:eq(0) :text").val(),
      password : $(".ui:last .li:eq(1) :text").val(),
      point : $(".ui:last .li:eq(2) :text").val(),
      ans : $(".ui:last .li:eq(3) :text").val(),
    };
    $.post({
      async : false,
      url : "fun.php?c=2",
      data : {object : object},
      success : function (){
        reflash();
      },
    });
  });
};reflash();
function refloor(){
  $(".mean:eq(1) .ui").remove();
  $(".mean:eq(1)").append(`
    <div class="ui">
      <div class="li" style="width:33%">樓層名稱</div>
      <div class="li" style="width:33%">管理</div>
      <div class="li" style="border-right-style: hidden;width:33%">刪除</div>
    </div>
  `);
  $.post({
    async : false,
    url : "fun.php?c=5",
    success : function(e){
      list = e.split("$(/)");
      list.pop();
      for (let i = 0 ; i < list.length ; i++){
        let arr = JSON.parse(list[i]);
        $(".mean:eq(1)").append(`
          <div class="ui">
            <div class="li" style="width:33%;overflow:auto">${arr[1]}</div>
            <div class="li" style="width:33%">管理</div>
            <div class="li" style="border-right-style: hidden;width:33%">刪除</div>
          </div>
        `);
      };
      $(".mean:eq(1)").append(`
        <div class="ui">
          <div class="li" style="width:49%"><input type="text"></div>
          <div class="li" style="border-right-style: hidden;width:50%">新增</div>
        </div>
      `);
      $(".mean:eq(1) .ui").find(".li:even").css("background","greenyellow");
      $(".mean:eq(1) .ui").find(".li:odd").css("background","aqua");
      $(".mean:eq(1) .li:last").mousedown(function(){
        if ($(".mean:eq(1) :text").val() != ""){
          $.post({
            async : false,
            url : "fun.php?c=6",
            data : {name : $(".mean:eq(1) :text").val()},
            success : function (){
              refloor();
            },
          });
        };
      });
    },
  });
};
function fixlog(th){
  th = $(th).parent();
  if (th.find(".li:eq(0) :text").val() == "" || th.find(".li:eq(1) :text").val() == ""){
    alert("Please input account or password.");
    return false;
  };
  let object = {
    account : th.find(".li:eq(0) :text").val(),
    password : th.find(".li:eq(1) :text").val(),
    point : th.find(".li:eq(2) :text").val(),
    ans : th.find(".li:eq(3) :text").val(),
    id : th.find(".li:eq(4)").data("id"),
  };
  $.post({
    async : false,
    url : "fun.php?c=3",
    data : {object : object},
    success : function (){
      reflash();
    },
  });
};
function delelog(id){
  $.post({
    async : false,
    url : "fun.php?c=4",
    data : {id : id},
    success : function (){
      reflash();
    },
  });
};
$("#ltit div").mousedown(function(){
  $(".mean").hide();
  $(`.mean:eq(${$(this).index()})`).show();
  if ($(this).index() == 1) refloor();
});
$("#logout").mousedown(function(){
  location.href = "index.html";
});