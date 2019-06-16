time = 60 ;
$("#searchb").click(function(){
  $.post({
    async:false,
    url : "allcall.php?call=5",
    data : {account : $("#search").val()},
    success:function(e){
      $(".tr").remove();
      creatnew();
      let list = e.split("$(*/)");
      let arr = [];
      list.pop();
      for (let i = 0 ; i < list.length; i++){
        arr = JSON.parse(list[i]);
        $("#tbody").append(`
          <tr class="tr">
            <td><input type="text" id="t0${arr[0]}" value="${arr[0]}"></td>
            <td><input type="text" id="t1${arr[0]}" value="${arr[1]}"></td>
            <td><input type="text" id="t2${arr[0]}" value="${arr[2]}"></td>
            <td><input type="text" id="t3${arr[0]}" value="${arr[3]}"></td>
            <td>
              <select id="s${arr[0]}">
                <option value="1">一般使用者</option>
                <option value="2">一般管理者</option>
                <option value="3">超級管理者</option>
              <select>
            </td>
            <td><input type="button" value="修改" id="fix${arr[0]}" class="fix"></td>
            <td><input type="button" value="刪除" id="dele${arr[0]}" class="dele"></td>
          </tr>
        `);
        $("#s"+arr[0]).val(arr[4]);
      };
    },
  })
});
function creatnew(){
  $("#tbody").append(`
    <tr class="tr">
      <td><input type="text" readonly="readonly" id="t0"></td>
      <td><input type="text" class="wc" id="t1"></td>
      <td><input type="text" class="wc" id="t2"></td>
      <td><input type="text" class="wc" id="t3"></td>
      <td>
        <select id="s">
          <option value="1">一般使用者</option>
          <option value="2">一般管理者</option>
          <option value="3">超級管理者</option>
        <select>
      </td>
      <td colspan="2"><input type="button" value="新增" id="cn"></td>
    </tr>
  `);
};
setInterval(function(){
  time--;
  if (time<5){
    $("#dialog0").dialog("open");
  }
  if (time<0){
    location.href="index.html";
    return false;
  }
  $(".time").html(time);
},1000);
$("#dialog0").dialog({
  width:600,
  height:600,
  autoOpen:false,
  resizable:false,
});
$(".ui-dialog-titlebar").hide();
$("#dialog1").dialog({
  width:600,
  height:600,
  autoOpen:false,
  resizable:false,
});
$("#YES").mousedown(function(){
  time = 60;
  $("#dialog0").dialog("close");
});
$("#NO").mousedown(function(){
  location.href="index.html";
});
function timeset(){
  time = $("#settime").val();
};
function reetime(){
  time = 60 ;
};
$("#log").mousedown(function(){
  $("#dialog1").dialog("open");
  $.post({
    async:false,
    url:"allcall.php?call=6",
    success:function(e){
      $(".ttr").remove();
      let list = e.split("$(*/)");
      let arr = [];
      list.pop();
      for (let i = 0 ; i < list.length; i++){
        arr = JSON.parse(list[i]);
        $("#tb").append(`
          <tr class="ttr">
            <td>${arr[0]}</td>
            <td>${arr[1]}</td>
            <td>${arr[2]}</td>
            <td>${arr[3]}</td>
          </tr>
        `);
      };
    },
  })
});
$("#logout").mousedown(function(){
  $.post({
    async:false,
    url:"allcall.php?call=7",
  })
  location.href="index.html";
});
$(".sort").mousedown(function(){
  let id = $(this).attr("id").substr(1);
  if (id % 2 ==1){
    id -- ;
    $(this).attr("id","b"+id);
  }
  else {
    id ++ ;
    $(this).attr("id","b"+id);
  };
  $.post({
    async:false,
    url : "allcall.php?call=8",
    data : {sort:id,account:$("#search").val()},
    success:function(e){
      $(".tr").remove();
      creatnew();
      let list = e.split("$(*/)");
      let arr = [];
      list.pop();
      for (let i = 0 ; i < list.length; i++){
        arr = JSON.parse(list[i]);
        $("#tbody").append(`
          <tr class="tr">
            <td><input type="text" id="t0${arr[0]}" value="${arr[0]}"></td>
            <td><input type="text" id="t1${arr[0]}" value="${arr[1]}"></td>
            <td><input type="text" id="t2${arr[0]}" value="${arr[2]}"></td>
            <td><input type="text" id="t3${arr[0]}" value="${arr[3]}"></td>
            <td>
              <select id="s${arr[0]}">
                <option value="1">一般使用者</option>
                <option value="2">一般管理者</option>
                <option value="3">超級管理者</option>
              <select>
            </td>
            <td><input type="button" value="修改" id="fix${arr[0]}" class="fix"></td>
            <td><input type="button" value="刪除" id="dele${arr[0]}" class="dele"></td>
          </tr>
        `);
        $("#s"+arr[0]).val(arr[4]);
      };
    },
  });
});
