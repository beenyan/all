//<script>
  function full_zero(text,val){
    for (let i = text.toString().length ; i < val ; i++){
      text = "0" + text;
    };
    return text;
  };
  function rand(nn,mm){
    return parseInt(Math.random()*(mm - nn + 1) + nn);
  };
  function wb(nn){
    return img_block[nn]
  };
  function draw_bk(){
    for (let y = 0 ; y < 20 ; y++){
      for (let x = 0 ; x < 10 ; x++){
        ctx.drawImage(wb(bg_arr[y][x]),x,y,1,1);
      };
    };
    if ($("#name").val() == "tetris"){
      ctx.fillStyle = "rgba(255,0,0,0.1)";
      ctx.font = "arial 20px";
      ctx.fillText("CHEAT",1,8,8,6);
    };
  };
  function draw_nblock(){
    if (start) return false;
    let block = player.block[player.style];
    for (let y = 0 ; y < block.length - bkempty(block).y ; y++){
      for (let x = 0 ; x < block[y].length ; x++){
        if (bg_arr[y + player.y][x + player.x] != 0 && block[y][x] != 0){
          gameover();
          start = 1;
          return false;
        };
        if (bg_arr[y + player.y][x + player.x] == 0){//背景無方塊
          bg_arr[y + player.y][x + player.x] = player.block[player.style][y][x];
        }
      };
    };
  };
  function down(){
    if (start) return false;
    let block = player.block[player.style];
    let candown = 1;
    for (let y = 0 ; y < block.length - bkempty(block).y ; y++){
      for (let x = 0 ; x < block[y].length ; x++){
        if (bg_arr[y + player.y + 1] === undefined){//方塊下降結束
          deline();
          player.x = 4;
          player.y = 0;
          player.style = 0;
          player.block = next_block;
          next_block = all_block[rand(0,all_block.length - 1)];
          return false;
        }
      };
    };
    if (have_down(block)){//下面有方塊
      for (let y = 0 ; y < block.length - bkempty(block).y ; y++){
        for (let x = 0 ; x < block[y].length ; x++){
          if (bg_arr[y + player.y][x + player.x] == 0){//背景無方塊
            bg_arr[y + player.y][x + player.x] = player.block[player.style][y][x];
          }
        };
      };
      deline();
      player.x = 4;
      player.y = 0;
      player.style = 0;
      player.block = next_block;
      next_block = all_block[rand(0,all_block.length - 1)];
      return false;
    }
    for (let y = 0 ; y < block.length - bkempty(block).y ; y++){
      for (let x = 0 ; x < block[y].length ; x++){
        if (block[y][x] != 0){
          bg_arr[y + player.y][x + player.x] = 0;
        };
      };
    };
    player.y++;
  };
  function bkempty(nn){
    let block = {
      y : 0,
      lx : 0,
      rx : 0,
    };
    bkcg = 0;
    let list_x = nn[0].length;
    for (let y = nn.length - 1 ; y >= 0 ; y--){
      let now_x = 0;
      for (let x = nn[y].length - 1 ; x >= 0 ; x--){
        if (nn[y][x] == 0) now_x++;
        else bkcg++;
      };
      if (now_x == list_x) block.y++;
      if (bkcg) break;
    };
    let list_y = nn.length;
    let lx_temp = 0;
    for (let x = 0 ; x < nn[0].length ; x++){
      let now_y = 0;
      for (let y = 0 ; y < nn.length ; y++){
        if (nn[y][x] == 0) now_y++;
        else lx_temp = 1;
      };
      if (now_y == list_y) block.lx++;
      if (lx_temp) break;
    };
    let rx_temp = 0;
    for (let x = nn[0].length - 1 ; x >= 0 ; x--){
      let now_y = 0;
      for (let y = nn.length - 1 ; y >= 0 ; y--){
        if (nn[y][x] == 0) now_y++;
        else {
          rx_temp = 1;
        }
      };
      if (now_y == list_y) block.rx++;
      if (rx_temp) break;
    };
    return block;
  };  
  function have_down(nn){
    for (let y = 0 ; y < nn.length - bkempty(nn).y ; y++){
      for (let x = 0 ; x < nn[y].length ; x++){
        if (nn[y][x] != 0){
          bg_arr[y + player.y][x + player.x] = 0;
        };
      };
    };
    for (let y = 0 ; y < nn.length - bkempty(nn).y ; y++){
      for (let x = 0 ; x < nn[y].length ; x++){
        if (nn[y][x] != 0){
          if (bg_arr[y + player.y + 1][x + player.x] != 0){
            return true;
          };
        };
      };
    };
    return false;
    /*let arr = [];
    for (let x = 0 + bkempty(nn).lx ; x < nn[0].length - bkempty(nn).rx ; x++){
      arr.push(0);
    };
    for (let x = 0 + bkempty(nn).lx ; x < nn[0].length - bkempty(nn).rx ; x++){
      for (let y = 0 ; y < nn.length ; y++){
        if (nn[y][x] == 0 && arr[x - bkempty(nn).lx] == 0){
          arr[x - bkempty(nn).lx] = y;
        };
      };
    };
    for (let x = 0 ; x < arr.length ; x++){
      if (arr[x] == 0){
        arr[x] = nn.length - bkempty(nn).y;
      };
    };
    for (let x = 0 ; x < arr.length ; x++){
      if (bg_arr[arr[x] + player.y][player.x + bkempty(nn).lx + x] != 0){
        return true;
      };
    };
    return false;*/
  };
  function have_left(nn){
    for (let y = 0 ; y < nn.length - bkempty(nn).y ; y++){
      for (let x = 0 ; x < nn[y].length ; x++){
        if (nn[y][x] != 0){
          bg_arr[y + player.y][x + player.x] = 0;
        };
      };
    };
    for (let y = 0 ; y < nn.length - bkempty(nn).y ; y++){
      for (let x = 0 ; x < nn[y].length ; x++){
        if (nn[y][x] != 0 && bg_arr[y + player.y][x + player.x - 1]){
          return true;
        };
      };
    };
    return false;
  };
  function have_right(nn){
    for (let y = 0 ; y < nn.length - bkempty(nn).y ; y++){
      for (let x = 0 ; x < nn[y].length ; x++){
        if (nn[y][x] != 0){
          bg_arr[y + player.y][x + player.x] = 0;
        };
      };
    };
    for (let y = 0 ; y < nn.length - bkempty(nn).y ; y++){
      for (let x = 0 ; x < nn[y].length ; x++){
        if (nn[y][x] != 0 && bg_arr[y + player.y][x + player.x + 1]){
          return true;
        };
      };
    };
    return false;
  };
  function have_style(nn,mm){
    for (let y = 0 ; y < nn.length - bkempty(nn).y ; y++){
      for (let x = 0 ; x < nn[y].length ; x++){
        if (nn[y][x] != 0){
          bg_arr[y + player.y][x + player.x] = 0;
        };
      };
    };
    for (let y = 0 ; y < mm.length ; y++){
      for (let x = 0 ; x < mm[y].length ; x++){
        if (bg_arr[y + player.y] === undefined){
          return true;
        };
        if (mm[y][x] != 0){
          if (bg_arr[y + player.y][x + player.x] === undefined){
            return true;
          };
          if (bg_arr[y + player.y][x + player.x] != 0){
            return true;
          };
        };
      };
    };
    return false;
  };
  function goleft(){
    if (start) return false;
    let block = player.block[player.style];
    for (let y = 0 ; y < block.length - bkempty(block).y ; y++){
      for (let x = 0 ; x < block[y].length ; x++){
        if (x + player.x - 1 + bkempty(block).lx < 10){
          if (bg_arr[y + player.y][x + player.x - 1 + bkempty(block).lx] === undefined){//方塊左邊沒東西
            return false;
          };
        };
      };
    };
    if (have_left(block)){//左邊有方塊
      return false;
    };
    for (let y = 0 ; y < block.length - bkempty(block).y ; y++){
      for (let x = 0 ; x < block[y].length ; x++){
        if (block[y][x] != 0){
          bg_arr[y + player.y][x + player.x] = 0;
        };
      };
    };
    player.x--;
  };
  function goright(){
    if (start) return false;
    let block = player.block[player.style];
    for (let y = 0 ; y < block.length - bkempty(block).y ; y++){
      for (let x = 0 ; x < block[y].length ; x++){
        if (x + player.x + 1 - bkempty(block).rx > 0){
          if (bg_arr[y + player.y][x + player.x + 1 - bkempty(block).rx] === undefined){//方塊右邊沒東西
            return false;
          }
        }
      };
    };
    if (have_right(block)){//右邊有方塊
      return false;
    }
    for (let y = 0 ; y < block.length - bkempty(block).y ; y++){
      for (let x = 0 ; x < block[y].length ; x++){
        if (block[y][x] != 0){
          bg_arr[y + player.y][x + player.x] = 0;
        };
      };
    };
    player.x++;
  };
  function cgstyle(){
    if (start) return false;
    let block = player.block[player.style];
    let block2 = player.block[(player.style + 1) % Object.keys(player.block).length];
    if (have_style(block,block2)){//不能旋轉
      draw_nblock();
      return false;
    }
    else {
      player.style = (player.style + 1) % Object.keys(player.block).length;
      draw_nblock();
    };
  };
  function deline(){
    let delinenum = 0;
    for (let y = 19 ; y >= 0 ; y--){
      let no_zero = 0;
      for (let x = 0 ; x < 10 ; x++){
        if (bg_arr[y][x] != 0) no_zero++;
      };
      if (no_zero == 10){//整排都有
        delinenum++;
        for (let cgy = y ; cgy > 1 ; cgy--){
          bg_arr[cgy] = JSON.parse(JSON.stringify(bg_arr[cgy - 1]));
        };
        bg_arr[0] = [0,0,0,0,0,0,0,0,0,0];
        y++;
      };
    };
    if (delinenum == 1){
      score += 40;
    }
    else if (delinenum == 2){
      score += 100;
    }
    else if (delinenum == 3){
      score += 300;
    }
    else if (delinenum == 4){
      score += 1200;
    };
    line += delinenum;
    $("#score").text("分數：" + score);
    $("#line").text("行數：" + line);
  };
  function draw_next(){
    let block = next_block[0];
    sctx.clearRect(0,0,scanvas.width,scanvas.height);
    for (let y = 0 ; y < block.length; y++){
      for (let x = 0 ; x < block.length; x++){
        if (block[y][x] != 0)
        sctx.drawImage(wb(block[y][x]),x + 1,y + 1,1,1);
      };
    };
  };
  function time_text(){
    all_time += 1000 / 60;
    $("#time").text("時間 " + full_zero(parseInt(all_time / 1000 / 60),2) + "：" + full_zero(parseInt(all_time / 1000 % 60),2));
  };
  function gameover(){
    game_over = 1;
    let object = {
      time : all_time,
      lines : line,
      score : score,
      difficult : $("#dialog0 :selected").text(),
    };
    $.post({
      url : "fun.php?c=0",
      async : false,
      data : {js : object}
    });
  };
//</script>