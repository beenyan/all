//<script>
  $("html").contextmenu(function(){
    return false;
  });
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = 960;canvas.height = 600;
  $("#background").append(canvas);
  let all_img = [];//[圖片,起始X,起始Y,到達X,到達Y,型態];
  let player_speed = 10;
  let player = [];//[圖片,起始X,起始Y,到達X,到達Y];
  let player_move = ["","","",""];
  let ck_gum = 0;
  let gun_speed = 8;
  let bg_planet = [];
  let aerolite_list = [];
  let enemy_list = [];
  let gas_list = [];
  let team_list = [];
  let gas_time = 0;
  let gas_have = 15;
  let score = 0;
  let stop = 0;
  let time = 0;
  let start = 1;
  let music = 0;
  let level = 100;
  let level_time = 0;
  for (let i = 1 ; i <= 5 ; i++){
    let img = new Image();
    img.src = `image/bg_${i}.png`;
    img.className = "bg_planet";
    img.onload = function(e){
      bg_planet.push(img);
    };
  };
  let aerolite = [];
  for (let i = 1 ; i <= 5 ; i++){
    let img = new Image();
    img.src = `image/aerolite${i}.png`;
    img.className = "aerolite";
    img.onload = function(e){
      aerolite.push(img);
    };
  };
  let enemy = [];
  for (let i = 1 ; i <= 3 ; i++){
    let img = new Image();
    img.src = `image/enemy${i}.png`;
    img.className = "enemy";
    img.onload = function(e){
      enemy.push(img);
    };
  };
  //按鍵
  $("html").keyup(function(e){
    if (e.keyCode == 40){//下
      clearInterval(player_move[0]);
      player_move[0] = "";
    }
    else if (e.keyCode == 38){//上
      clearInterval(player_move[1]);
      player_move[1] = "";
    }
    else if (e.keyCode == 37){//左
      clearInterval(player_move[2]);
      player_move[2] = "";
    }
    else if (e.keyCode == 39){//右
      clearInterval(player_move[3]);
      player_move[3] = "";
    }
    else if (e.keyCode == 32){//空白建
      $(".music:eq(1)")[0].pause();
      ck_gum = 0;
    }
  });
  $("html").keydown(function(e){
    if (e.keyCode == 116){
      history.go(0);
    }
    if (e.keyCode == 80){
      $("#dialog3").dialog("close");
      if (!start){
        for (let i = 0 ; i < 4 ; i++){
          clearInterval(player_move[i]);
          player_move[i] = "";
        };
        stop_cg();
      };
    }
    if (stop) {
      $("#light").animate({left : 1200},1000);
      return false;
    }
    else {
      $("#light").animate({left : -400},1);
    }
    if (e.keyCode == 40){//下
      if (start){
        return false;
      }
      if (player_move[0] != "") return false;
      player_move[0] = setInterval(() => {
        if (player[2] + player[4] + player_speed > canvas.height) {
          player[2] = canvas.height - player[4];
          return false;
        }
        player[2] += player_speed;
      }, 1000/60);
    }
    else if (e.keyCode == 38){//上
      if (start){
        return false;
      }
      if (player_move[1] != "") return false;
      player_move[1] = setInterval(() => {
        if (player[2] - player_speed < 0) {
          player[2] = 0;
          return false;
        }
        player[2] -= player_speed;
      }, 1000/60);
    }
    else if (e.keyCode == 37){//左
      if (start){
        return false;
      }
      if (player_move[2] != "") return false;
      player_move[2] = setInterval(() => {  
        if (player[1] - player_speed < 0) {
          player[1] = 0;
          return false;
        }
        player[1] -= player_speed;
      }, 1000/60);
    }
    else if (e.keyCode == 39){//右
      if (start){
        return false;
      }
      if (player_move[3] != "") return false;
      player_move[3] = setInterval(() => {
        if (player[1] + player[3] + player_speed > canvas.width) {
          player[1] = canvas.width - player[3];
          return false;
        }
        player[1] += player_speed;
      }, 1000/60);
    }
    else if (e.keyCode == 32){//空白建
      if (start){
        return false;
      }
      if (ck_gum) return false;
      if (music == 0){
        $(".music:eq(1)")[0].currentTime = 0;
        $(".music:eq(1)")[0].play();
      };
      all_img.push([img_gum,player[1] + player[3] - img_gum.width / 2,player[2] + player[4] / 2 - img_gum.height / 2,img_gum.width,img_gum.height,1]);
      ck_gum++;
    };
  });
  //圖片
  let img_background = new Image();
  img_background.src = "image/background.png";
  img_background.onload = function(){
    ctx.drawImage(img_background,0,0,canvas.width,canvas.height);
    setInterval(() => {
      if (stop || start) return false;
      ctx.clearRect(0,0,canvas.width,canvas.height);//刷新畫布
      ctx.drawImage(img_background,0,0,canvas.width,canvas.height);
      for (let i = 0 ; i < all_img.length ; i++){//所有物件
        ctx.drawImage(all_img[i][0],all_img[i][1],all_img[i][2]);
      };
      for (let i = 0 ; i < aerolite_list.length ; i++){//隕石
        ctx.drawImage(aerolite_list[i][0],aerolite_list[i][1],aerolite_list[i][2]);
      };
      for (let i = 0 ; i < enemy_list.length ; i++){//敵人
        ctx.drawImage(enemy_list[i][0],enemy_list[i][1],enemy_list[i][2]);
      };
      for (let i = 0 ; i < team_list.length ; i++){//敵人
        ctx.drawImage(team_list[i][0],team_list[i][1],team_list[i][2]);
      };
      for (let i = 0 ; i < gas_list.length ; i++){//汽油
        ctx.drawImage(gas_list[i][0],gas_list[i][1],gas_list[i][2]);
      };
      ctx.drawImage(player[0],player[1],player[2]);
      if ($("#cb0")[0].checked)touch_line()
    }, 1000 / 60);
  };
  let img_player = new Image();
  img_player.src = "image/player.png";
  img_player.onload = function(){
    player.push(img_player,0,canvas.height / 2 - img_player.height / 2,img_player.width,img_player.height);
  };
  let img_gum = new Image();
  img_gum.src = "image/gum.png";
  let img_gas = new Image();
  img_gas.src = "image/gas.png";
  let img_enemygum = new Image();
  img_enemygum.src = "image/enemygum.png";
  let img_team = new Image();
  img_team.src = "image/team.png";
  //判斷,刪除,移動,生成
  setInterval(() => {
    if (stop || start) return false;;
    time += 1000 / 60;
    time_cg();
    gas_time += 1000 / 60;
    if (gas_time > 1000){
      gas_cg(-1);
      gas_time -= 1000;
    };
    for (let i = 0 ; i < all_img.length ; i++){
      if (all_img[i][0] === img_gum){//子彈
        all_img[i][1] += gun_speed;
        for (let j = 0 ; j < aerolite_list.length ; j++){
          if (touch(all_img[i],aerolite_list[j])){//碰到隕石
            all_img.splice(i,1);
            aerolite_list[j][5]--;
            if (aerolite_list[j][5] == 0){
              score_cg(10);
              $("#dialog4").append(`
                <div class="game_list0">擊毀隕石
                  <span class="green">分數 +10</span>
                </div>
                <div class="game_list1">目前分數：
                  <span class="purple">${score}</span>
                </div>
              <br>`);
              aerolite_list.splice(j,1);
            };
          };
        };
        for (let j = 0 ; j < enemy_list.length ; j++){
          if (touch(all_img[i],enemy_list[j])){//碰到敵人
            all_img.splice(i,1);
            score_cg(5);
            $("#dialog4").append(`
              <div class="game_list0">擊毀敵方軍艦
                <span class="green">分數 +5</span>
              </div>
              <div class="game_list1">目前分數：
                <span class="purple">${score}</span>
              </div>
            <br>`);
            enemy_list.splice(j,1);
          };
        };
        if (all_img[i] != undefined && all_img[i][1] > canvas.width){//刪除子彈
          all_img.splice(i,1);
        }
        else if (all_img[i] != undefined && all_img[i][5] == 1){
          for (let j = 0 ; j < team_list.length ; j++){//我方子彈撞到友機
            if (touch(all_img[i],team_list[j])){
              all_img.splice(i,1);
              team_list.splice(j,1);
              score_cg(-10);
              $("#dialog4").append(`
                <div class="game_list0">子彈擊中我方戰艦
                  <span class="red">分數 -10</span>
                </div>
                <div class="game_list1">目前分數：
                  <span class="purple">${score}</span>
                </div>
              <br>`);
            };
          };
        };
      }
      else if (all_img[i][0].className == "bg_planet"){//背景星球
        all_img[i][1] -= all_img[i][3] / 100;
        if (all_img[i][1] + all_img[i][3] < 0){//刪除星球
          all_img.splice(i,1);
        };
      }
      else if (all_img[i][0] === img_enemygum){//敵人子彈
        all_img[i][1] -= 4;
        if (touch(all_img[i],player)){//碰到玩家
          all_img.splice(i,1);
          if (music == 0){
            $(".music:eq(2)")[0].currentTime = 0;
            $(".music:eq(2)")[0].play();
          }
          gas_cg(-15);
          $("#dialog4").append(`
            <div class="game_list0">被敵方軍艦擊中
              <span class="red">燃料 -15</span>
            </div>
            <div class="game_list1">目前燃料：
              <span class="tomato">${gas_have}</span>
            </div>
          <br>`);
        }
        for (let j = 0 ; j < team_list.length ; j++){
          if (touch(team_list[j],all_img[i])){
            if (music == 0){
              $(".music:eq(2)")[0].currentTime = 0;
              $(".music:eq(2)")[0].play();
            };
            all_img.splice(i,1);
            team_list.splice(j,1);
          };
        };
        if (all_img[i] != undefined && all_img[i][1] + all_img[i][3] < 0){//刪除敵人子彈
          all_img.splice(i,1);
        };
      }
    };
    for (let i = 0 ; i < aerolite_list.length ; i++){//隕石
      aerolite_list[i][1] -= aerolite_list[i][3] / 100;
      if (aerolite_list[i][1] + aerolite_list[i][3] < 0){//刪除隕石
        aerolite_list.splice(i,1);
      };
    };
    for (let i = 0 ; i < enemy_list.length ; i++){//敵人
      enemy_list[i][1] -= 3;
      if (enemy_list[i][1] + enemy_list[i][3] < 0){//刪除敵人
        enemy_list.splice(i,1);
      };
      for (let j = 0 ; j < team_list.length ; j++){
        if (touch(team_list[j],enemy_list[i])){
          if (music == 0){
            $(".music:eq(2)")[0].currentTime = 0;
            $(".music:eq(2)")[0].play();
          };
          enemy_list.splice(i,1);
          team_list.splice(j,1);
        };
      };
    };
    for (let i = 0 ; i < gas_list.length ; i++){//燃料
      gas_list[i][2] += 1;
      if (gas_list[i][2] > canvas.height){
        gas_list.splice(i,1);
      };
      if (touch(player,gas_list[i])){//吃到燃料
        gas_cg(15);
        $("#dialog4").append(`
          <div class="game_list0">獲得燃料補給
            <span class="green">燃料 +15</span>
          </div>
          <div class="game_list1">目前燃料：
            <span class="tomato">${gas_have}</span>
          </div>
        <br>`);
        gas_list.splice(i,1);
      }
    }
    for (let i = 0 ; i < aerolite_list.length ; i++){//撞到隕石
      if (touch(player,aerolite_list[i])){
        if (music == 0){
          $(".music:eq(2)")[0].currentTime = 0;
          $(".music:eq(2)")[0].play();
        }
        gas_cg(-15);
        $("#dialog4").append(`
          <div class="game_list0">軍艦誤觸隕石
            <span class="red">燃料 -15</span>
          </div>
          <div class="game_list1">目前燃料：
            <span class="tomato">${gas_have}</span>
          </div>
        <br>`);
        aerolite_list.splice(i,1);
      }
      for (let j = 0 ; j < team_list.length ; j++){
        if (touch(team_list[j],aerolite_list[i])){
          if (music == 0){
            $(".music:eq(2)")[0].currentTime = 0;
            $(".music:eq(2)")[0].play();
          };
          aerolite_list.splice(i,1);
          team_list.splice(j,1);
        };
      };
    }
    for (let i = 0 ; i < enemy_list.length ; i++){//撞到敵人
      if (touch(player,enemy_list[i])){
        if (music == 0){
          $(".music:eq(2)")[0].currentTime = 0;
          $(".music:eq(2)")[0].play();
        }
        gas_cg(-15);
        $("#dialog4").append(`
          <div class="game_list0">與敵方軍艦發生碰撞
            <span class="red">燃料 -15</span>
          </div>
          <div class="game_list1">目前燃料：
            <span class="tomato">${gas_have}</span>
          </div>
        <br>`);
        enemy_list.splice(i,1);
      }
      if (rand(0,level * 3) == 0){//敵人發射子彈
        all_img.push([img_enemygum,enemy_list[i][1],enemy_list[i][2] + enemy_list[i][4] / 2,img_enemygum.width,img_enemygum.height]);
      }
    };
    for (let i = 0 ; i < team_list.length ; i++){//隊友
      team_list[i][1] += 3;
      if (team_list[i][1] > canvas.width){//刪除隊友
        team_list.splice(i,1);
      };
      if (rand(0,level * 2) == 0){//隊友發射子彈
        all_img.push([img_gum,team_list[i][1] + team_list[i][3] - img_gum.width / 2,team_list[i][2] + team_list[i][4] / 2 - img_gum.height / 2,img_gum.width,img_gum.height,0]);
      }
    };
    if (rand(0,level) == 0){//背景星球
      let temp = rand(0,bg_planet.length - 1);
      all_img.push([bg_planet[temp],canvas.width,rand(0,canvas.height),bg_planet[temp].width,bg_planet[temp].height]);
    }
    if (rand(0,level) == 0){//隕石生成
      let temp = rand(0,aerolite.length - 1);
      aerolite_list.push([aerolite[temp],canvas.width,rand(0,canvas.height - aerolite[temp].height),aerolite[temp].width,aerolite[temp].height,2]);
    }
    if (rand(0,level) == 0){//敵人生成
      let temp = rand(0,enemy.length - 1);
      enemy_list.push([enemy[temp],canvas.width,rand(0,canvas.height - enemy[temp].height),enemy[temp].width,enemy[temp].height]);
    }
    if (rand(0,level) == 0){//隊友生成
      team_list.push([img_team,-img_team.width,rand(0,canvas.height - img_team.height),img_team.width,img_team.height]);
    }
    if (rand(0,level * 2) == 0){//燃料生成
      gas_list.push([img_gas,rand(0,canvas.width - img_gas.width),-img_gas.height,img_gas.width,img_gas.height]);
    }
  }, 1000 / 60);
  $("#stop").mousedown(function(){
    let e = $.Event('keydown');
    e.keyCode = 80;
    $("html").trigger(e);
  });
  $(".start_game").hover(function(){
    $(this).css({
      "background-color" : "#f19e0d",
    });
  });
  $(".start_game").mouseleave(function(){
    $(this).css({
      "background-color" : "#FF4E18",
    });
  });
  $("#music").mousedown(function(){
    music = (music + 1) % 2;
    if (music){
      if ($("#dialog0").dialog("isOpen")) return false;
      $("#music img").attr("src","image/musicclose.png");
      $(".music")[0].pause();
    }
    else {
      if ($("#dialog0").dialog("isOpen")) return false;
      $("#music img").attr("src","image/musicopen.png");
      $(".music")[0].play();
    }
  });
  $("#set").mousedown(function(){
    if ($("#dialog4").dialog("isOpen")) return false;
    $("#dialog3").dialog("open");
    stop = 1;
  });
  $("#lf").mousedown(function(){
    $("#score_text").css("font-size",parseInt($("#score_text").css("font-size")) - 1);
    $("#time_text").css("font-size",parseInt($("#time_text").css("font-size")) - 1);
  });
  $("#rf").mousedown(function(){
    $("#score_text").css("font-size",parseInt($("#score_text").css("font-size")) + 1);
    $("#time_text").css("font-size",parseInt($("#time_text").css("font-size")) + 1);
  });
  $("#book").mousedown(function(){
    if ($("#dialog0").dialog("isOpen")) return false;
    $("#dialog4").dialog("open");
    $(".game_list0:odd , .game_list1:odd").css("background","rgba(249, 204, 173,0.4)");
    $(".game_list0:even, .game_list1:even").css("background","rgba(252, 157, 153,0.4)");
    stop = 1;
  });
  setInterval(() => {
    if ($("#name").val().length > 0){
      $("#continue")[0].disabled = false;
    }
    else {
      $("#continue")[0].disabled = true;
    }
  }, 1000 / 60);
  $("#continue").mousedown(function(){
    if ($("#name").val() == "") return false;
    $.post({
      async : false,
      url : "fun.php?c=0",
      data : {
        name : $("#name").val(),
        time : parseInt(time / 1000),
        score : score,
      },
    });
    $("#dialog1").dialog("close");
    $.post({
      async : false,
      url : "fun.php?c=1",
      success : function(e){
        $("#dialog2").dialog("open");
        $("#dialog2").empty();
        $("#dialog2").append(`
          <h1>Ranking Table</h1><hr style="border-width: 2px;border-color: black;border-radius: 2em;">
          <div id="rank">
            <div style="background-color:#FFD26D;font-size:0">
              <div class="show_rank" style="width:25%">Position</div>
              <div class="show_rank" style="width:45%">Name</div>
              <div class="show_rank" style="width:15%">Score</div>
              <div class="show_rank" style="width:15%">Time</div>
            </div>
          </div>
        `);
        let arr = JSON.parse(e);
        for (let i = 0 ; i < arr.length ; i++){
          $("#dialog2 #rank").append(`
            <div>
              <div class="temp_rank" style="background-color:#F8E9C0;font-size:0">
                <div class="show_rank" style="width:25%;font-size: 30px;color:#6B512C;">${arr[i].id}</div>
                <div class="show_rank" style="width:45%;font-size: 30px;color:#6B512C;">${arr[i].name}</div>
                <div class="show_rank" style="width:15%;font-size: 30px;color:#6B512C;">${arr[i].score}</div>
                <div class="show_rank" style="width:15%;font-size: 30px;color:#6B512C;">${arr[i].time}</div>
              </div>
            </div>
          `);
          if (arr[i].val){
            $(".temp_rank:last").css("background-color","aqua");
          };
        };
        $("#dialog2").append(`
          <input type="button" id="sg" value="Start game">
        `);
        $("#sg").mousedown(function(){
          $("#dialog2").dialog("close");
          game_over();
        });
      },
    });
  });
  setInterval(() => {
    if (stop) return false;
    if (start) return false;
    level_time += 1000 / 60;
    if (level_time > 5000){
      level_time -= 5000;
      level -= 1;
    };
  }, 1000 / 60);
//</script>