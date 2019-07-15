//<script> 
  function text(){
    let reader = new FileReader();
    reader.readAsText($(":file")[0].files[0]);
    reader.onload = function(e){
      $.post({
        async : false,
        url : "fun.php?c=0",
      });
      let list = e.target.result.split("\n");
      list.pop();
      for (let i = 0 ; i < list.length ; i++){
        let arr = list[i].split(",");
        $.post({
          async : false,
          url : "fun.php?c=1",
          data : {arr : arr},
        });
      };
      all();
    };
  };  
  function all(){
    let money = 0;
    $.post({
      async : false,
      url : "fun.php?c=2",
      success : function(e){
        let list = e.split("$()");
        list.pop();
        $("table").empty();
        for (let i = 0 ; i < list.length ; i++){
          let arr = JSON.parse(list[i]);
          if (i == 0){
            arr[13] = "";
          }
          else {
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
          };
          $("table").append(`<tr></tr>`);
          for (let j = 1 ; j < 14 ; j++){
            $("tr:last").append(`
              <td>${arr[j]}</td>
            `);
          };
        };
      },
    });
    $("#money").text("目前累積贊助金額：" + money + "元")
  };all();
  function add(){
    let reader = new FileReader();
    reader.readAsText($(":file:eq(1)")[0].files[0]);
    reader.onload = function(e){
      let list = e.target.result.split("\n");
      list.pop();
      for (let i = 1 ; i < list.length ; i++){
        let arr = list[i].split(",");
        $.post({
          async : false,
          url : "fun.php?c=1",
          data : {arr : arr},
        });
      };
      all();
    };
  }
  function dele(id){
    $.post({
      async : false,
      url : "fun.php?c=3",
      data : {id : id},
    });
    all();
  };
  
//</script>