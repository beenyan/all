//<script>
  function rand(nn,mm){
    return parseInt(Math.random() * (mm - nn + 1) + nn);
  };
  function touch(nn,mm){
    if (nn === undefined || mm === undefined){
      return false;
    }
    if (nn[1] < mm[3] + mm[1] && nn[3] + nn[1] > mm[1] && nn[2] < mm[2] + mm[4] && nn[2] + nn[4] > mm[2]) return true;
    else return false;
  };
  function touch_line(){//碰撞箱
    let nn;
    ctx.strokeStyle = "red";
    for (let i = 0 ; i < all_img.length ; i++){//所有物件
      if ($(all_img[i][0]).attr("src").substr(6,2) != "bg"){
        nn = all_img[i];
        ctx.strokeRect(nn[1],nn[2],nn[3],nn[4]);
      };
    };
    for (let i = 0 ; i < aerolite_list.length ; i++){//隕石
      nn = aerolite_list[i];
      ctx.strokeRect(nn[1],nn[2],nn[3],nn[4]);
    };
    for (let i = 0 ; i < enemy_list.length ; i++){//敵人
      nn = enemy_list[i];
      ctx.strokeRect(nn[1],nn[2],nn[3],nn[4]);
    };
    for (let i = 0 ; i < gas_list.length ; i++){//汽油
      nn = gas_list[i];
      ctx.strokeRect(nn[1],nn[2],nn[3],nn[4]);
    };
    for (let i = 0 ; i < team_list.length ; i++){//汽油
      nn = team_list[i];
      ctx.strokeRect(nn[1],nn[2],nn[3],nn[4]);
    };
    nn = player;
    ctx.strokeRect(nn[1],nn[2],nn[3],nn[4]);
  }
  function gas_cg(nn){
    gas_have = gas_have + nn;
    if (gas_have > 30){
      gas_time = 0;
      gas_have = 30;
    }
    $("#gas_text").text(gas_have);
    $("#have_gas").animate({top: 60 - gas_have * 2},200);
    if (gas_have < 0){
      start = 1;
      $(".music:eq(0)")[0].pause();
      $("#dialog1").dialog("open");
    };
  };
  function score_cg(nn){
    if (music == 0){
      $(".music:eq(2)")[0].currentTime = 0;
      $(".music:eq(2)")[0].play();
    }
    score = score + nn;
    $("#score_text").text(score);
  };
  function stop_cg(){
    if ($("#dialog4").dialog("isOpen")) return false;
    stop = (stop + 1) % 2;
    if (stop){
      $(".music:eq(0)")[0].pause()
      $("#stop img").attr("src","image/gamestop.png");
    }
    else {
      if (music == 0){
        $(".music:eq(0)")[0].play()
      }
      $("#stop img").attr("src","image/gameplay.png");
    }
  };
  function time_cg(){
    let sec = parseInt(time / 1000);
    let min = parseInt(sec / 60);
    $("#time_text").text(`${full_zero(min,2)}:${full_zero(sec % 60,2)}`)
  };
  function full_zero(mean,val){
    mean = mean.toString();
    for (let i = mean.length ; i < val ; i++){
      mean = "0" + mean;
    };
    return mean;
  };
  function game_over(){
    $("#dialog4").empty();
    aerolite_list = [];
    enemy_list = [];
    gas_list = [];
    gas_have = 15;
    gas_time = 0;
    score = 0;
    gas_cg(0);
    stop = 0;
    time = 0;
    start = 0;
    level = 100;
    score_cg(0);
    all_img = [];
    level_time = 0;
    team_list = [];
    player.length = 0;
    player.push(img_player,0,canvas.height / 2 - img_player.height / 2,img_player.width,img_player.height);
    $(".music:eq(2)")[0].pause();
    if (music == 0){
      $(".music:first")[0].play();
    };
  };
//</script>