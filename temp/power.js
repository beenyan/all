for (let i = 0 ;i < $("h1").length ; i++){
  $("h1:eq(" + i + ")").data("id",i);
};//data值
for (let i = 0 ;i < $(".uu").length ; i++){
  $(".uu:eq(" + i + ")").data("id",i);
};//data值
let uuid = 404;//選種項判斷
let date = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate();
//價格只能輸入數字
$(":text:eq(3)").keydown(function(e){
  if ((e.keyCode > 105 || e.keyCode < 97) && e.keyCode != 8) return false;
});
//選種項換色
$(".uu").mousedown(function(){
  uuid = $(this).data("id");
  $(".uu").css("background","rgba(255,206,255,0.6)");
  $(this).css("background","rgba(251, 107, 251, 1)");
  $(".back:eq(2)").empty();
  $(".back:eq(2)").append(`${$(".back .uu:eq(" + $(this).data("id") + ")")[0].outerHTML}`);
  pos();
});
//切換視窗
$("h1:not(h1:eq(3))").mousedown(function(){
  $(".back").hide();
  $(".back:eq(" + $(this).data("id") + ")").show();
});
//預覽
$("h1:eq(2)").mousedown(function(){
  if ($(".back:eq(2)").children().length == 0) return false;pos();
});
//送出資料
$("h1:eq(3)").mousedown(function(){
  if (src == "" || $(":text:eq(0)").val() == "" || $(":text:eq(1)").val() == "" || $(":text:eq(2)").val() == "" || $(":text:eq(3)").val() == "" || uuid == 404){
    alert ("值不能為空");return false;
  };
  if (confirm("是否送出?")){
    let object = {
      type : $(".back:eq(0) .uu:eq(" + uuid + ")")[0].outerHTML,
      name : $(":text:eq(0)").val(),
      mean : $(":text:eq(1)").val(),
      loca : $(":text:eq(2)").val(),
      money : $(":text:eq(3)").val(),
      date : date,
      image : src,
    };
    $.post({
      async : false,
      url : "fun.php?c=0",
      data : {object : object},
      success : function(){
        alert("新增成功");
        location.href = "lookpower.html";
      },
    });
  };
});
//預覽function
function pos(){
  $(".back:eq(2) .name").text($(":text:eq(0)").val());
  $(".back:eq(2) .mean").text($(":text:eq(1)").val());
  $(".back:eq(2) .loca").text($(":text:eq(2)").val());
  $(".back:eq(2) .money").text($(":text:eq(3)").val());
  $(".back:eq(2) .date").text(date);
  $(".back:eq(2) .img").empty();
  $(".back:eq(2) .img").append(`<img src = "${src}" width = "100%" height = "100%">`);
};
//圖片壓縮轉base64
let src="";
function img(){
  let reader = new FileReader();
  reader.readAsDataURL($(":file")[0].files[0]);
  reader.onload = function(e){
    let img = new Image();
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    img.src = e.target.result;
    img.onload = function(){
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      src = canvas.toDataURL();
    };
  };
};