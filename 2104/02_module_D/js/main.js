//<script>
  $(".dg").dialog({
    autoOpen : false,
    resizable : false,
    width : 1300,
    height : 1800,
  });
  $(".search:eq(1)").mousedown(function(){
    let money = 0;
    $.post({
      async : false,
      url : "fun.php?c=4",
      data : {mean : $(".search:eq(0)").val()},
      success : function(e){
        let list = e.split("$()");
        list.pop();
        $("#t0").empty();
        $("#t0").append(`
          <tr>
            <td>姓名</td>
            <td>年齡</td>
            <td>性別</td>
            <td>學歷</td>
            <td>居住區域</td>
            <td>身高</td>
            <td>體重</td>
            <td>喜歡路跑活動類別</td>
            <td>累計路跑公里數</td>
            <td>最近參加時間(年/月/日)</td>
            <td>最高得獎</td>
            <td>贊助金額</td>
            <td></td>
          </tr>
        `);
        for (let i = 0 ; i < list.length ; i++){
          let arr = JSON.parse(list[i]);
          money += parseInt(arr[12]);
          arr[13] = `<input type="button" value="刪除" onclick="dele(${arr[0]})">`;
          if (arr[3] == 0){
            arr[3] = "女";
          }
          else {
            arr[3] = "男";
          }
          if (arr[4] == 0){
            arr[4] = "小學";
          }
          else if (arr[4] == 1){
            arr[4] = "國中";
          }
          else if (arr[4] == 2){
            arr[4] = "高中";
          }
          else if (arr[4] == 3){
            arr[4] = "大專";
          }
          else if (arr[4] == 4){
            arr[4] = "碩士";
          }
          else if (arr[4] == 5){
            arr[4] = "博士";
          }
          if (arr[5] == 0){
            arr[5] = "北部";
          }
          else if (arr[5] == 1){
            arr[5] = "中部";
          }
          else if (arr[5] == 2){
            arr[5] = "南部";
          }
          else if (arr[5] == 3){
            arr[5] = "東部";
          }
          if (arr[8] == 0){
            arr[8] = "超馬";
          }
          else if (arr[8] == 1){
            arr[8] = "全馬";
          }
          else if (arr[8] == 2){
            arr[8] = "半馬";
          }
          else if (arr[8] == 3){
            arr[8] = "中程";
          }
          else if (arr[8] == 4){
            arr[8] = "趣味";
          }
          else if (arr[8] == 5){
            arr[8] = "夜跑";
          }
          else if (arr[8] == 6){
            arr[8] = "健行";
          }
          if (arr[11] == 0){
            arr[11] = "無";
          }
          else if (arr[11] == 1){
            arr[11] = "金";
          }
          else if (arr[11] == 2){
            arr[11] = "銀";
          }
          else if (arr[11] == 3){
            arr[11] = "銅";
          }
          else if (arr[11] == 4){
            arr[11] = "優";
          }
          $("#t0").append(`<tr></tr>`);
          for (let j = 1 ; j < 14 ; j++){
            $("tr:last").append(`
              <td>${arr[j]}</td>
            `);
          };
        };
      },
    });
    $("#money").text("目前累積贊助金額：" + money + "元")
  });
  $(".p:eq(0)").mousedown(function(){
    $("#dg0").dialog("open");
    $("#dg0").empty();
    $("#dg0").append(`
      <h3>基本圖表</h3>
      <span>使用</span>
      <select class="sele">
        <option value="3">性別</option>
        <option value="4">學歷</option>
        <option value="5">居住地區</option>
        <option value="11">最高得獎</option>
        <option value="8">喜歡路跑活動類型</option>
      </select>
      <span>進行統計，並顯示</span>
      <select class="sele">
        <option value="0">長條圖</option>
        <option value="1">圓餅圖</option>
        <option value="2">折線圖</option>
        <option value="3">雷達圖</option>
      </select>
      <input type="button" value="確定">
      <table style="border-collapse: collapse" border="1" align="center"></table><br>
    `);
    $("#dg0 :button").mousedown(function(){
      $("#dg0 table").empty();
      let arr = [];
      for (let i = 0 ; i < 10 ; i++){
        arr[i] = 0;
      };
      $.post({
        async : false,
        url : 'fun.php?c=5',
        data : {wh : $(".sele:eq(0) :selected").val()},
        success : function(e){
          let list = e.split(";");
          list.pop();
          for (let i = 0 ; i < list.length ; i++){
            arr[list[i]]++;
          };
        },
      });
      for (let i = 0 ; i < 8 ; i++){
        arr[9] += arr[i];
      };
      let sele0 = $(".sele:eq(0) :selected").text();
      if (sele0 == "性別"){
        $("#dg0 table").append(`
          <tr>
            <td>${sele0}</td>
            <td>統計</td>
          </tr>
          <tr>
            <td>女性</td>
            <td>${arr[0]}</td>
          </tr>
          <tr>
            <td>男性</td>
            <td>${arr[1]}</td>
          </tr>
          <tr>
            <td>總計</td>
            <td>${arr[9]}</td>
          </tr>
        `);
      }
      else if (sele0 == "學歷"){
        $("#dg0 table").append(`
          <tr>
            <td>${sele0}</td>
            <td>統計</td>
          </tr>
          <tr>
            <td>小學</td>
            <td>${arr[0]}</td>
          </tr>
          <tr>
            <td>國中</td>
            <td>${arr[1]}</td>
          </tr>
          <tr>
            <td>高中</td>
            <td>${arr[2]}</td>
          </tr>
          <tr>
            <td>大專</td>
            <td>${arr[3]}</td>
          </tr>
          <tr>
            <td>碩士</td>
            <td>${arr[4]}</td>
          </tr>
          <tr>
            <td>博士</td>
            <td>${arr[5]}</td>
          </tr>
          <tr>
            <td>總計</td>
            <td>${arr[9]}</td>
          </tr>
        `);
      }
      else if (sele0 == "居住地區"){
        $("#dg0 table").append(`
          <tr>
            <td>${sele0}</td>
            <td>統計</td>
          </tr>
          <tr>
            <td>北部</td>
            <td>${arr[0]}</td>
          </tr>
          <tr>
            <td>中部</td>
            <td>${arr[1]}</td>
          </tr>
          <tr>
            <td>南部</td>
            <td>${arr[2]}</td>
          </tr>
          <tr>
            <td>東部</td>
            <td>${arr[3]}</td>
          </tr>
          <tr>
            <td>總計</td>
            <td>${arr[9]}</td>
          </tr>
        `);
      }
      else if (sele0 == "最高得獎"){
        $("#dg0 table").append(`
          <tr>
            <td>${sele0}</td>
            <td>統計</td>
          </tr>
          <tr>
            <td>無獎</td>
            <td>${arr[0]}</td>
          </tr>
          <tr>
            <td>金牌</td>
            <td>${arr[1]}</td>
          </tr>
          <tr>
            <td>銀牌</td>
            <td>${arr[2]}</td>
          </tr>
          <tr>
            <td>銅牌</td>
            <td>${arr[3]}</td>
          </tr>
          <tr>
            <td>優勝</td>
            <td>${arr[4]}</td>
          </tr>
          <tr>
            <td>總計</td>
            <td>${arr[9]}</td>
          </tr>
        `);
      }
      else if (sele0 == "喜歡路跑活動類型"){
        $("#dg0 table").append(`
          <tr>
            <td>${sele0}</td>
            <td>統計</td>
          </tr>
          <tr>
            <td>超馬</td>
            <td>${arr[0]}</td>
          </tr>
          <tr>
            <td>全馬</td>
            <td>${arr[1]}</td>
          </tr>
          <tr>
            <td>半馬</td>
            <td>${arr[2]}</td>
          </tr>
          <tr>
            <td>中程</td>
            <td>${arr[3]}</td>
          </tr>
          <tr>
            <td>趣味</td>
            <td>${arr[4]}</td>
          </tr>
          <tr>
            <td>夜跑</td>
            <td>${arr[5]}</td>
          </tr>
          <tr>
            <td>健行</td>
            <td>${arr[6]}</td>
          </tr>
          <tr>
            <td>總計</td>
            <td>${arr[9]}</td>
          </tr>
        `);
      }
      let sele1 = $(".sele:eq(1) :selected").text();
      if (sele1 == "長條圖"){
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 1000;
        canvas.height = 600;
        $("#dg0 canvas").remove();
        $("#dg0").append(canvas);
        ctx.strokeRect(50,0,canvas.width,canvas.height);
        for (let i = 50 ; i < canvas.height ; i += 50){
          ctx.strokeRect(50,i,canvas.width,canvas.height);
          ctx.font = "20px 微軟正黑體";
          ctx.fillText((canvas.height - i) / 5,10,i + 7);
        };
        let j = 0;
        for (let i = 1 ; i < $("#dg0 tr").length - 1 ; i++){
          j++;
          let name = $(`#dg0 tr:eq(${i})`).children(`:eq(0)`).text();
          let val = $(`#dg0 tr:eq(${i})`).children(`:eq(1)`).text();
          ctx.fillStyle = "#C0504E";
          ctx.fillRect(i * 50 + j * 50,canvas.height - val * 5,50,val * 5);
          ctx.fillStyle = "blue";
          ctx.font = "30px 微軟正黑體";
          ctx.fillText(val,i * 50 + j * 50 + 5,canvas.height - val * 5 - 10);
          ctx.font = "20px 微軟正黑體";
          ctx.fillStyle = "aqua";
          ctx.fillText(name,i * 50 + j * 50 + 5,canvas.height - 5);
        };
      }
      else if (sele1 == "圓餅圖"){
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 1000;
        canvas.height = 600;
        $("#dg0 canvas").remove();
        $("#dg0").append(canvas);
        ctx.arc(300,300,300,0,Math.PI * 2);
        let total = parseInt($("tr:last td:last").text());
        let begin = Math.PI / 180 * -90;
        let end = 0;
        for (let i = 1 ; i < $("#dg0 tr").length - 1 ; i++){
          ctx.fillStyle = `rgb(${30 * i },${20 * i },${20 * i })`;
          ctx.beginPath();
          ctx.moveTo(300,300);
          end = Math.PI / 180 * (360 / total) * parseFloat($(`#dg0 tr:eq(${i}) td:last`).text()) + begin;
          ctx.arc(300,300,300,begin,end);
          begin = end;
          ctx.fill();
          ctx.closePath();
        };
        for (let i = 1 ; i < $("#dg0 tr").length - 1 ; i++){
          ctx.fillStyle = `rgb(${30 * i },${20 * i },${20 * i })`;
          ctx.fillRect(700,i*70,50,50);
          ctx.font = "40px 微軟正黑體";
          ctx.fillText($(`#dg0 tr:eq(${i}) td:first`).text(),780,i * 70 + 40);
          ctx.fillStyle = `rgb(255,255,255)`;
          ctx.fillText($(`#dg0 tr:eq(${i}) td:last`).text(),700,i * 70 + 40);
        };
      }
      else if (sele1 == "折線圖"){
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 1000;
        canvas.height = 600;
        $("#dg0 canvas").remove();
        $("#dg0").append(canvas);
        ctx.strokeRect(50,0,canvas.width,canvas.height - 50);
        for (let i = 50 ; i < canvas.height - 50; i += 50){
          ctx.strokeRect(50,i,canvas.width,canvas.height - i - 50);
          ctx.font = "20px 微軟正黑體";
          ctx.fillText((canvas.height - i) / 5 - 10,10,i + 7);
        };
        let arr = [];
        ctx.beginPath();
        for (let i = 0 ; i < $("#dg0 tr").length - 1 ; i++){
          ctx.lineTo(i * 100 + 25,(110 - parseInt($(`#dg0 tr:eq(${i}) td:last`).text())) * 5);
          arr.push([i * 100 + 25,(110 - parseInt($(`#dg0 tr:eq(${i}) td:last`).text())) * 5]);
        }; 
        ctx.strokeStyle = "#C0504E";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
        for (let i = 0 ; i < arr.length ; i++){
          ctx.fillRect(arr[i][0] - 5,arr[i][1] - 5,10,10);
          ctx.font = "15px 微軟正黑體";
          ctx.fillText($(`#dg0 tr:eq(${i}) td:last`).text(),arr[i][0] + 10,arr[i][1] + 5);
        };
        let j = 0;
        for (let i = 1 ; i < $("#dg0 tr").length - 1 ; i++){
          j++;
          let name = $(`#dg0 tr:eq(${i})`).children(`:eq(0)`).text();
          let val = $(`#dg0 tr:eq(${i})`).children(`:eq(1)`).text();
          ctx.font = "20px 微軟正黑體";
          ctx.fillStyle = "blue";
          ctx.fillText(name,i * 50 + j * 50 + 5,canvas.height - 5);
        };
      }
      else if (sele1 == "雷達圖"){
        
      }
    });
  });
//</script>