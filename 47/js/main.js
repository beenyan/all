//<script>
  let weeks = "日,一,二,三,四,五,六".split(",");
  let datenum = +new Date();
  let year = new Date(datenum).getFullYear();
  let month = parseInt(new Date(datenum).getMonth()) + 1;
  let day = new Date(datenum).getDate();
  let week = new Date(datenum).getDay();
  let sele_id = -1;
  let last_week = Infinity;
  let table_arr = [];
  let table_arr_all = [1,2,3,4,5,6,7,8,9,10];
  let dele_table_arr = [];
  datenum -= (week - 1) * 1000 * 60 * 60 * 24;
  for (let i = 0 ; i < 7 ; i++){
    $("#week").append(`
      <td class="week_day">
      </td>
    `);
  };
  for (let i = 0 ; i < 7 ; i++){
    $("#lunch").append(`
      <td class="lunch_day select_date">
        10
      </td>
    `);
    $("#afternoon_tea").append(`
      <td class="afternoon_day select_date">
        10
      </td>
    `);
    $("#dinner").append(`
      <td class="dinner_day select_date">
        10
      </td>
    `);
  };
  show_this_week();
  $("#before_date").click(function(){//上週
    dele_table_arr.length = 0;
    last_week--;
    $(".select_date").css("background-color","");
    datenum -= 14 * 1000 * 60 * 60 * 24;
    show_this_week();
  });
  $("#after_date").click(function(){//下週
    dele_table_arr.length = 0;
    last_week++;
    $(".select_date").css("background-color","");
    show_this_week();
  });
  for (let i = 0 ; i < $(".select_date").length ; i++){
    $(`.select_date:eq(${i})`).data("id",i);
  };
  $(".select_date").mousedown(function(){
    $("#text_table_count").empty();
    for (let i = 1 ; i <= $(this).text() ; i++){
      $("#text_table_count").append(`
        <option value="${i}">${i}桌</option>
      `);
    };
    table_arr_all = [1,2,3,4,5,6,7,8,9,10];
    if (dele_table_arr[$(this).data("id")] != undefined){
      let table_num = dele_table_arr[$(this).data("id")].split(",");
      for (let i = 0 ; i < table_num.length ; i++){
        table_arr_all.splice(table_arr_all.indexOf(parseInt(table_num[i])),1);
      };
    };
    $(".dark_yellow:eq(1)").mousedown();
    $("#text_date").val($(`.week_day:eq(${$(this).index() - 1})`).data("date"));
    $("#time").val(parseInt($(this).data("id") / 7));
    $(".select_date").css("background-color","");
    $(this).css("background-color","yellow");
    sele_id = $(this).data("id");
    last_week = 0;
  });
  $(".purple:eq(1)").mousedown(function(){
    if ($("#text_date").val() == ""){
      alert("先選擇日期");
      return false;
    };
    $("#dialog").dialog("open");
    $("#dialog").empty();
    for (let i = 1 ; i <= 10 ; i++){
      $("#dialog").append(`
        <div class="sele_table" style="background-color:purple">
          ${i}號桌<br>
          已訂
        </div>
      `);
      $(".sele_table:last").data("id",i);
    };
    for (let i = 0 ; i < table_arr_all.length ; i++){
      $(`.sele_table:eq(${table_arr_all[i] - 1})`).empty();
      $(`.sele_table:eq(${table_arr_all[i] - 1})`).append(`${table_arr_all[i]}號桌<br>空`);
      $(`.sele_table:eq(${table_arr_all[i] - 1})`).css("background-color","rgba(0, 0, 0, 0)");
    };
    $(".sele_table").mousedown(function(){
      if ($(this).css("background-color") == "rgba(0, 0, 0, 0)"){
        if (table_arr.length >= $("#text_table_count").val()) return false;
        table_arr.push($(this).data("id"));
        $(this).css("background-color","rgb(255, 255, 0)")
      }
      else if ($(this).css("background-color") == "rgb(255, 255, 0)"){
        table_arr.splice(table_arr.indexOf($(this).data("id")),1);
        $(this).css("background-color","rgba(0, 0, 0, 0)")
      }
    });
  });
  $(".purple:eq(0)").mousedown(function(){
    if ($("#text_date").val() == ""){
      alert("先選擇日期");
      return false;
    };
    if (table_arr_all.length < $("#text_table_count").val()){
      alert("桌數不夠");
      return false;
    }
    else {
      for (let i = 0 ; i < $("#text_table_count").val() ; i++){
        table_arr.push(table_arr_all[i]);
      };
      $("#text_table_number").val(table_arr.toString());
      table_arr = [];
    };
  });
  $("#dialog").dialog({
    autoOpen : false,
    resizable : false,
    width : 800,
    height : 400,
    buttons : {
      "確認選取" : function(){
        if (table_arr.length != $("#text_table_count :selected").val()){
          alert ("桌數不符合");
          return false;
        };
        $("#text_table_number").val(table_arr.toString());
        table_arr = [];
        $("#dialog").dialog("close");
      },
      "關閉" : function(){
        table_arr = [];
        $("#dialog").dialog("close");
      },
    },
  });
  $("#dialog0").dialog({
    autoOpen : false,
    resizable : false,
    width : 600,
    height : 500,
    buttons : {
      "確認訂餐" : function(){
        $("#dialog1").dialog("open");
        $("#dialog1").empty();
        $("#dialog1").append(`
          <h1>請填寫聯絡方式</h1>
          <span class="yellow">姓名</span> <input type="text" class="tn"><br>
          <span class="yellow">E-mail</span> <input type="text" class="tn"><br>
          <span class="yellow">電話</span> <input type="text" class="tn"><br>
          <span class="yellow">備註</span> <input type="text" class="tn"><br>
        `);
        $("#dialog0").dialog("close");
      },
      "取消" : function(){
        $("#dialog0").dialog("close");
      },
    },
  }); 
  $("#dialog1").dialog({
    autoOpen : false,
    resizable : false,
    width : 600,
    height : 500,
    buttons : {
      "送出" : function(){
        if ($(".tn:eq(0)").val() == "" || $(".tn:eq(1)").val() == "" || $(".tn:eq(2)").val() == "" || $(".tn:eq(3)").val() == ""){
          alert("資料請填寫完整");
          return false;
        };
        $.post({
          url : "fun.php?c=1",
          async : false,
          data : {date : +new Date($(".tt:eq(0)").text().substr(0,10))},
          success : function(e){
            console.log(e)
            id = parseInt(e) + 1;
          },
        });
        let finish_date = 
          $(".tt:eq(0)").text().substr(0,10)[0] + 
          $(".tt:eq(0)").text().substr(0,10)[1] + 
          $(".tt:eq(0)").text().substr(0,10)[2] + 
          $(".tt:eq(0)").text().substr(0,10)[3] + 
          $(".tt:eq(0)").text().substr(0,10)[5] + 
          $(".tt:eq(0)").text().substr(0,10)[6] + 
          $(".tt:eq(0)").text().substr(0,10)[8] + 
          $(".tt:eq(0)").text().substr(0,10)[9];
        let object = {
          mealid : finish_date + fullzero(id,4),
          date : +new Date($(".tt:eq(0)").text().substr(0,10)),
          time : $(".tt:eq(1)").text(),
          mealname : $(".tt:eq(3)").text(),
          mealnum : $(".tt:eq(2)").text(),
          desk : $(".tt:eq(4)").text(),
          tablenum : $(".tt:eq(5)").text(),
          name : $(".tn:eq(0)").val(),
          phone : $(".tn:eq(2)").val(),
          email : $(".tn:eq(1)").val(),
          mean : $(".tn:eq(3)").val(),
          allmoney : $(".tt:eq(6)").text(),
          deposit : $(".tt:eq(7)").text(),
        };
        $.post({
          url : "fun.php?c=0",
          async : false,
          data : {object : object},
          success : function(e){
            alert("訂餐編號" + e);
            history.go(0);
          },
        });
      },
    },
  }); 
  $(".ui-dialog-titlebar").hide();
  $(".dark_yellow:eq(0)").mousedown(function(){
    if ($("#text_date").val() == "" || $("#text_name").val() == "" || $("#text_table_number").val() == ""){
      alert("資料請填寫完整");
      return false;
    };
    $("#dialog0").dialog("open");
    $("#dialog0").empty();
    $("#dialog0").append(`
      <span class="yellow">日期</span><span class="tt">${$("#text_date").val()}</span><br>
      <span class="yellow">時段</span><span class="tt">${$("#time :selected").text()}</span><br>
      <span class="yellow">訂餐數量</span><span class="tt">${$("#count :selected").text()}</span><br>
      <span class="yellow">套餐名稱</span><span class="tt">${$("#text_name").val()}</span><br>
      <span class="yellow">訂餐桌數</span><span class="tt">${$("#text_table_count :selected").text()}</span><br>
      <span class="yellow">桌號</span><span class="tt">${$("#text_table_number").val()}</span><br>
      <span class="yellow">總金額</span><span class="tt">${$("#count :selected").val() * 500}</span><br><br>
      <span class="yellow">需付訂金</span><span class="tt">${$("#count :selected").val() * 50}</span><br>
    `);
  });
  $(".dark_yellow:eq(1)").mousedown(function(){
    $("#text_table_number").val("");
  });
  $("#time").mousedown(function(){
    return false;
  });
//</script>