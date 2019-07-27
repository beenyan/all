//<script>
    function make_week(week){
      $(`.week_day:eq(${week - 1})`).empty();
      $(`.week_day:eq(${week - 1})`).append(weeks[week] + "<br>" + day);
      $(`.week_day:eq(${week - 1})`).data("date",`${year}/${fullzero(month,2)}/${fullzero(day,2)} 星期${weeks[week]}`)
    };
    function show_this_week(){
      $(".select_date").empty();
      $(".select_date").append(10);
      for (let i = 0 ; i < 7 ; i++){
        year = new Date(datenum).getFullYear();
        month = parseInt(new Date(datenum).getMonth()) + 1;
        day = new Date(datenum).getDate();
        week = new Date(datenum).getDay();
        if (i == 0){
          $("#year_date").empty();
          $("#year_date").text(`${year} ${month}月 ${day}日 ~ `);
        };
        if (i == 6){
          $("#year_date").text($("#year_date").text() + `${year} ${month}月 ${day}日`);
        };
        make_week(week);
        datenum += 1 * 1000 * 60 * 60 * 24;
      };
      if (last_week == 0 && sele_id != -1){
        $(`.select_date:eq(${sele_id})`).css("background-color","yellow");
      }
      dele_table();
    };
    function fullzero(nn,val){
      nn = nn.toString();
      for (let i = nn.length ; i < val ; i++){
        nn = "0" + nn;
      };
      return nn;
    };
    function dele_table(){
      let first = $(".week_day:first").data("date").substr(0,10);
      let last = $(".week_day:last").data("date").substr(0,10)
      $.post({
        async : false,
        url : "fun.php?c=2",
        data : {first : +new Date(first),last : +new Date(last)},
        success : function(e){
          let list = e.split("$()");
          list.pop();
          for (let i = 0 ; i < list.length ; i++){
            let arr = list[i].split(";");
            let week = new Date(parseInt(arr[2])).getDay() - 1;
            let day = "";
            if (arr[1] == "中午"){
              dele_table_arr[week] = arr[0];
              $(`.lunch_day:eq(${week})`).text($(`.lunch_day:eq(${week})`).text() - arr[0].split(",").length);
              day = "lunch_day";
            }
            else if (arr[1] == "下午"){
              dele_table_arr[week + 7] = arr[0];
              $(`.afternoon_day:eq(${week})`).text($(`.afternoon_day:eq(${week})`).text() - arr[0].split(",").length);
              day = "afternoon_day";
            }
            else if (arr[1] == "晚上"){
              dele_table_arr[week + 14] = arr[0];
              $(`.dinner_day:eq(${week})`).text($(`.dinner_day:eq(${week})`).text() - arr[0].split(",").length);
              day = "dinner_day";
            }
          };
        },
      });
    };
//</script>