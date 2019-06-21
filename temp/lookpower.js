$("html").contextmenu(function(){return false});//右鍵迴避
//展示
function creat(nn,mm){
  $.post({
    url : "fun.php?c=1",
    data : {wh : nn , val : mm},
    success : function(e){
      $(".uu").remove();
      let list = e.split("$(*/)"),time = 500;list.pop();
      for (let i = 0 ; i < list.length ; i++){
        let arr = JSON.parse(list[i]);
        $("#background").append(`${arr["type"]}`);
        $("#background .uu:last").hide();
        $("#background .uu:last").fadeIn(time);time += 500;
        $("#background .uu:last .money").text(arr["money"]);
        $("#background .uu:last .name").text(arr["name"]);
        $("#background .uu:last .mean").text(arr["mean"]);
        $("#background .uu:last .date").text(arr["date"]);
        $("#background .uu:last .loca").text(arr["loca"]);
        $("#background .uu:last .img").empty();
        $("#background .uu:last .img").append(`<img src = "${arr["image"]}" width="160px">`);
        $("#background .uu:last .img img").attr("draggable","false");
        $("#background .uu:last").data("id",arr["id"]);
      };
    },
  });
};
creat("name","");
//製作電子報
$("#title div").mousedown(function(){
  location.href = "addpower.html";
});
//查詢
$("#search").mousedown(function(){
  $("#dialog0").dialog("open");
  $(".ui-dialog-title").empty();
  $(".ui-dialog-title").append(`<input type="button" class="bt" value="另類查詢">`)
  $(".bt").mousedown(function(){
    $(".d0search").toggle();
  });
});
$("#dialog0").dialog({
  autoOpen : false,
});
//查詢結果
$(".dialog0:eq(2)").mousedown(function(){
  creat($(".dialog0:eq(0) :selected").val(),$(".dialog0:eq(1)").val());
});
//價格查詢
$(".d0search:eq(1)").children(":eq(7)").mousedown(function(){
  if ($(".d0search:eq(1)").children(":eq(1)").val() == "" || $(".d0search:eq(1)").children(":eq(4)").val() == ""){
    alert("值不能為空");return false;
  };
  $.post({
    url : "fun.php?c=2",
    data : {min : $(".d0search:eq(1)").children(":eq(1)").val() , max : $(".d0search:eq(1)").children(":eq(4)").val()},
    success : function(e){
      $(".uu").remove();
      let list = e.split("$(*/)"),time = 500;list.pop();
      for (let i = 0 ; i < list.length ; i++){
        let arr = JSON.parse(list[i]);
        $("#background").append(`${arr["type"]}`);
        $("#background .uu:last").hide();
        $("#background .uu:last").fadeIn(time);time += 500;
        $("#background .uu:last .money").text(arr["money"]);
        $("#background .uu:last .name").text(arr["name"]);
        $("#background .uu:last .mean").text(arr["mean"]);
        $("#background .uu:last .date").text(arr["date"]);
        $("#background .uu:last .loca").text(arr["loca"]);
        $("#background .uu:last .img").empty();
        $("#background .uu:last .img").append(`<img src = "${arr["image"]}" width="160px">`);
        $("#background .uu:last .img img").attr("draggable","false");
        $("#background .uu:last").data("id",arr["id"]);
      };
    },
  });
});
//價格只輸入數字
$(".d0search:eq(1) :text").keydown(function(e){
  if (e.keyCode != 8 && (e.keyCode < 96 || e.keyCode > 105))return false;
});
$("#dialog1").dialog({
  autoOpen : false,
  width : 1000,
  height : 500,
  resizable : false,
  show : {
    effect : "blind",
    duration : 500,
  },
  hide : {
    effect: "explode",
    duration: 500
  },
});
//修改開啟
$("#background").on("mousedown",".uu",function(){
  $(this).css("opacity",1);
  $("#dialog1").dialog("close");
  $("#dialog1").empty();
  $("#dialog1").dialog("open");
  $("#dialog1").append(`${$(this)[0].outerHTML} <input type="button" onclick="fix(${$(this).data("id")})" value="修改">`);
  $("#dialog1 .uu").css("width","auto");
  $("#dialog1 td:not(.img , .date)").each(function(){
    let input = document.createElement("input");
    input.type = "text";
    input.value = $(this).text();
    input.className = $(this)[0].className;
    $(this).empty();
    $(this).append(input);
  });
});
//檢查修改內容
function fix(id){
  if ($("#dialog1 input.name").val() == "" || $("#dialog1 input.mean").val() == "" || $("#dialog1 input.loca").val() == "" || $("#dialog1 input.money").val() == ""){
    alert("值不能為空");return false;
  };
  $("#dialog1").dialog("close");
  let object = {
    name : $("#dialog1 input.name").val(),
    mean : $("#dialog1 input.mean").val(),
    loca : $("#dialog1 input.loca").val(),
    money : $("#dialog1 input.money").val(),
    id : id,
  };
  $.post({
    async:false,
    url : "fun.php?c=3",
    data : {object : object},
    success : function(){creat("name","");alert("修改成功");},
  });
};