<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="js/jquery-3.4.1.js"></script>
  <link rel="stylesheet" href="js/jquery-ui.css">
  <script src="js/jquery-ui.js"></script>
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>圖書管理系統-後臺管理</title>
</head>
<style>
  body{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 620px;
    background:linear-gradient(aqua,white);
  }
  html{
    background: rgb(0, 75, 173);
    font-weight: bold;
    font-family: "微軟正黑體";
  }
  .bk{
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 900px;
    height: 600px;
    background: #212D5D;
    overflow: hidden;
  }
  .welt{
    top: 50px;
    position: absolute;
    width: 100%;
    height: 100px;
    border-color: gray;
    border-top-style: solid;
    border-bottom-style: solid;
    background: linear-gradient(#3d5577,#1D295A);
  }
  .head{
    overflow: hidden;
    text-align: center;
    z-index: 10;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 90px;
    border-color: gray;
    border-style: solid;
    border-top-style: hidden;
    background: linear-gradient(#3d5577,#1D295A);
    box-shadow: 5px 5px 5px 0 rgb(32, 32, 32);
  }
  .list,.ll{
    user-select: none;
    display: inline-block;
    font-size: 150%;
    color: orange;
    position: relative;
    width: auto;
    height: 40px;
    background: linear-gradient(rgb(42, 61, 136),rgb(35, 48, 100));
    font-weight: bold;
    font-family: "微軟正黑體";
    line-height: 40px;
    text-align: center;
    margin: 20px 60px 0 60px;
    padding: 0 30px 0 30px;
    box-shadow: 5px 5px 5px 0 rgb(32, 32, 32);
    border-style: solid;
    border-color: rgb(42, 61, 136);
    cursor: pointer;
  }
  .list:hover,.ll:hover{
    background: linear-gradient(45deg,aqua,rgb(0, 140, 255));
  }
  .paper{
    text-align: center;
    overflow: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 820px;
    height: 70px;
    background: white;
    box-shadow: 3px 3px 3px 0 rgb(100, 95, 79);
  }
  .paper *{
    position: relative;
    top: 100px;
  }
  .welt2{
    border-color: gray;
    border-style: solid;
    position: absolute;
    width: 500px;
    height: 60px;
    background: rgb(43, 64, 144);
    top: 500px;
    box-shadow: 5px 5px 5px 0 rgb(32, 32, 32);
  }
  textarea{
    width: 120px;
    height: 120px;
    resize: none;
    font-size: 200%;
    margin: 30px; 
    border-color: gray;
  }
  .uu{
    margin: 30px; 
    vertical-align: top;
    display: inline-block;
    width: 120px;
    height: 120px;
    font-size: 200%;
    border-color: gray;
    border-style: solid;
    cursor: pointer;
  }
  .uu img{
    user-select: none;
    width: 120px;
    height: 120px;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
  }
  .uu input[type="file"]{
    width: 120px;
    height: 120px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
  }
  .new_book{
    width: 100px;
    height: 100px;
    position: relative;
    cursor: pointer;
    border-color: orange;
    font-size: 250%;
    border-width: 2px;
    border-radius: 5px;
    background: linear-gradient(45deg,gray,white,gray,white);
  }
  .new_book:hover{
    background: linear-gradient(45deg,white,gray,white,gray);
  }
  .date , #type{
    cursor: pointer;
    text-align: center;
    vertical-align: top;
    width: 120px;
    height: 120px;
    font-size: 150%;
    margin: 30px; 
    border-color: gray;
  }
  #type{
    height: auto;
    font-size: 200%;
  }
  .li{
    margin: 20px;
    display: inline-block;
    background: url(img/wood.png);
    background-repeat: no-repeat;
    background-position-y: 195px;
    width: 200px;
    height: 250px;
    vertical-align: top;
  }
  .li img{
    cursor: pointer;
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-color: aqua;
    border-radius: 10px;
    box-shadow: 5px 5px 5px 0 gray;
  }
  .bottom{
    position: absolute;
    width: 100%;
    height: auto;
    background: rgb(0, 75, 173);
    top: 620px;
    text-align: center;
  }
  .bottom h1{
    position: relative;
    display: inline-block;
    margin: 46px;
    color: orange;
    font-weight: bold;
    font-family: "微軟正黑體";
  }
  #dialog0 input[type=text]{
    width: 160px;
    font-size: 200%;
  }
  .dd{
    font-size: 0;
  }
  .dd *{
    top: 0;
    font-size: 20px;
  }
  table , table *{
    border-collapse: collapse;
    padding: 0px 10px 0px 10px;
  }
</style>
<body>
  <div style="display: none" id="account"><?php $account = $_GET["account"]; echo $account ?></div>
  <div class="bk">
    <div class="welt"></div>
    <div class="welt" style="top:350px"></div>
    <div class="head">
      <div class="list">全部書籍</div>
      <div class="list">借閱紀錄</div>
    </div>
    <div class="paper"></div>
    <div class="welt2" style="transform: rotate(45deg);left: -150px;"></div>
    <div class="welt2" style="transform: rotate(-45deg);left: 550px;"></div>
  </div>
  <div class="bottom">
  </div>
  <div class="dialog" id="dialog0" style="display: none">
    <div>
      <div class="ll">書名</div> <input type="text"><div class="ll search">搜尋</div>
    </div>
    <div>
      <div class="ll">作者</div> <input type="text"><div class="ll search">搜尋</div><br>
    </div>
    <div>
      <div class="ll">類別</div> <select id="type"></select> <div class="ll search">搜尋</div><br>
    </div>
    <div>
      <div class="ll">年份</div> <input type="text" readonly> 至 <input type="text" readonly><div class="ll search">搜尋</div><br>
    </div>
  </div>
</body>
<script>
  $(".dialog").dialog({
    resizable : false,
    width : 900,
    height : 400,
    autoOpen : false,
  });
  $("#dialog0 div:not(.ll):eq(3) :text").datepicker({
    dateFormat : "yy/mm/dd",
  });
  $.post({
    async : false,
    url : "fun.php?c=4",
    success : function(e){
      let list = e.split("$(/)");
      list.pop();
      for (let i = 0 ; i < list.length ; i++){
        let arr = JSON.parse(list[i]);
        $("#type").append(`
          <option value="${arr[0]}">${arr[1]}</option>
        `);
      };
    },
  });
  let src = "";
  $(".list").mousedown(function(){
    if ($(".paper").css("height") != "590px" && $(".paper").css("height") != "70px") return false;
    $(".paper").empty();
    $(".list").css("background","");
    $(this).css("background","aqua");
    $(".paper").css("height",70);
    $(".paper").animate({height : 590},1500);
    if ($(this).index() == 0){
      $(".paper").append(`
        <div class="li">
          <img src="img/search.png" draggable="false">
        </div>
      `)
      $.post({
        async : false,
        url : "fun.php?c=3",
        success : function(e){
          let list = e.split("$(/)");
          list.pop();
          for (let i = 0 ; i < list.length ; i++){
            let arr = JSON.parse(list[i]);
            $(".paper").append(`
              <div class="li">
                  ${arr[2]}
                <img src="${arr[1]}" draggable="false">
              </div>
            `);
            $(".li:last").data("id",arr[0]);
          };
        },
      });
    }
    else if ($(this).index() == 1){
      $.post({
        async : false,
        url : "fun.php?c=8",
        data : {account : $("#account").text()},
        success : function(e){
          let list = e.split("$(/)");
          list.pop();
          $(".paper").append(`
            <table align="center" border="1">
            <tbody class="dd">
            <tr>
              <td>書名</td>
              <td>借閱日期</td>
              <td>歸還日期</td>
              <td>是否歸還</td>
              <td>歸還</td>
            </tr>
            </tbody>
            </table>
          `);
          for (let i = 0 ; i < list.length ; i++){
            let arr = JSON.parse(list[i]);
            let takedate = new Date(parseInt(arr[2]));
            let senddate = new Date(parseInt(arr[2]) + 1000*60*60*24*7);
            let send = "";
            if (arr[3] == 0)send = "否";
            else send = "是";
            if (send == "否"){
              $(".dd").append(`
                <tr>
                  <td>${arr[1]}</td>
                  <td>${takedate.getFullYear()}/${parseInt(takedate.getMonth()) + 1}/${takedate.getDate()}</td>
                  <td>${senddate.getFullYear()}/${parseInt(senddate.getMonth()) + 1}/${senddate.getDate()}</td>
                  <td>${send}</td>
                  <td><input type="button" onclick="out_book(${arr[0]})" value="歸還" style="display:none"></td>
                </tr>
              `);
            }
            else {
              $(".dd").append(`
                <tr>
                  <td>${arr[1]}</td>
                  <td>${takedate.getFullYear()}/${parseInt(takedate.getMonth()) + 1}/${takedate.getDate()}</td>
                  <td>${senddate.getFullYear()}/${parseInt(senddate.getMonth()) + 1}/${senddate.getDate()}</td>
                  <td>${send}</td>
                </tr>
              `);
            };
            $(":button").fadeIn(2000);
            $("tr:odd").css("background","aqua");
            $("tr:even").css("background","gold");
          };
        },
      });
    };
  });
  function out_book(id){
    if ($(".paper").css("height") != "590px" && $(".paper").css("height") != "70px") return false;
    $.post({
      async : false,
      url : "fun.php?c=9",
      data : {id : id},
      success : function(e){
        alert("已歸還");
        $(".list:eq(1)").mousedown();
      },
    });
  };
  $(".paper").on("click",".li:first img",function(){
    $("#dialog0").dialog("open");
  });
  $(".search:eq(0)").mousedown(function(){
    search("name",$(":text:eq(0)").val());
  });
  $(".search:eq(1)").mousedown(function(){
    search("writer",$(":text:eq(1)").val());
  });
  $(".search:eq(2)").mousedown(function(){
    search("style",$("#dialog0 :selected").val());
  });
  $(".search:eq(3)").mousedown(function(){
    searchdate("date",+new Date($(":text:eq(2)").val()),+new Date($(":text:eq(3)").val()));
  });
  function search(wh,val){
    $(".paper").empty();
    $(".paper").append(`
      <div class="li">
        <img src="img/search.png" draggable="false">
      </div>
    `)
    $.post({
      async : false,
      url : "fun.php?c=5",
      data : {wh : wh ,val :val},
      success : function(e){
        let list = e.split("$(/)");
        list.pop();
        for (let i = 0 ; i < list.length ; i++){
          let arr = JSON.parse(list[i]);
          $(".paper").append(`
            <div class="li">
              ${arr[2]}
              <img src="${arr[1]}" draggable="false">
            </div>
          `);
          $(".li:last").data("id",arr[0]);
        };
      },
    });
  };
  function searchdate(wh,min,max){
    $(".paper").empty();
    $(".paper").append(`
      <div class="li">
        <img src="img/search.png" draggable="false">
      </div>
    `)
    $.post({
      async : false,
      url : "fun.php?c=6",
      data : {wh : wh ,min : min,max : max},
      success : function(e){
        let list = e.split("$(/)");
        list.pop();
        for (let i = 0 ; i < list.length ; i++){
          let arr = JSON.parse(list[i]);
          $(".paper").append(`
            <div class="li">
              ${arr[2]}
              <img src="${arr[1]}" draggable="false">
            </div>
          `);
          $(".li:last").data("id",arr[0]);
        };
      },
    });
  };
  $(".paper").on("click",".li:not(:first) img",function(){
    if (confirm("是否借閱")){
      $.post({
        async : false,
        url : "fun.php?c=7",
        data : {account : $("#account").text(),id : $(this).parent().data("id"),date : +new Date()},
        success : function(e){
          let mess = e.split(";");
          alert(mess[0]);
        },
      });
    };
  });
</script>
</html>