//<script>
$("html").contextmenu(function(){
  return false;
});
rainbow($(".login_div .title"),"火星市立圖書館",25,5,1);
$("canvas:last").css({
  position : "absolute",
  top : 20,
  left : 60,
});
$(".sing_up").click(function(){
  $(".welt *").toggle(500);
});
$(".sing_up_ck").click(function(){
  let none = 0;
  let account = $(".welt :text:eq(0)").val(),
      password = $(".welt :text:eq(1)").val(),
      name = $(".welt :text:eq(2)").val(),
      body = $(".welt :text:eq(3)").val();
  $(".welt :text").each(function(){
    if ($(this).val() == ""){
      $(this).css("border","1px solid rgb(255, 0, 0)");
      none++;
    }
    else {
      $(this).css("border","1px solid gray");
    };
  });
  //身分證檢查
  if (body.length != 10 || !(body[0] <= "Z" && body[0] >= "A")){
    $(".welt :text:eq(3)").css("border","1px solid rgb(255, 0, 0)");
    none++;
  };
  for (let i = 1 ; i < body.length ; i++){
    if (!(body[1] == 1 || body[1] == 2)){
      $(".welt :text:eq(3)").css("border","1px solid rgb(255, 0, 0)");
      none++;
      break;
    };
    if (!(body[i] <= 9 && body[i] >= 0)){
      $(".welt :text:eq(3)").css("border","1px solid rgb(255, 0, 0)");
      none++;
      break;
    };
  };
  if (none) return false;
  let object = {
    account : $(".welt :text:eq(0)").val(),
    password : $(".welt :text:eq(1)").val(),
    name : $(".welt :text:eq(2)").val(),
    body : $(".welt :text:eq(3)").val(),
  };
  $.post({
    async : false,
    url : "fun.php?c=0",
    data : {object : object},
    success : function(e){
      if (e == 1){
        alert("帳號名稱重複");
        return false
      }
      else{
        alert("新增成功");
      }
    },
  });
});
$(".sing_in").click(function(){
  let none = 0;
  $(".t1").each(function(){
    if ($(this).val() == ""){
      $(this).css("border","1px solid rgb(255, 0, 0)");
      none++;
    }
    else {
      $(this).css("border","1px solid gray");
    };
  });
  if (none) return false;
  $.post({
    async : false,
    url : "fun.php?c=1",
    data : {account : $(".t1:eq(0)").val() ,password : $(".t1:eq(1)").val()},
    success : function(e){
      if (e == 1){
        alert("查無此帳號");
        return false;
      }
      else if (e == 2){
        alert("密碼錯誤");
        return false;
      }
      else if (e == 3) {
        location.href = "admin.html";
      }
      else if (e == 4){
        location.href = "people.php?account=" + $(".t1:eq(0)").val();
      }
    },
  });
});
//</script>