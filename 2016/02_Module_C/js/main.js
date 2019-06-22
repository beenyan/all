$(function(){
  $("html").keydown(function(e){
    if (e.keyCode == 40){
      down();
    }
    else if (e.keyCode == 37){//左
      for (let i = player.y ; i < player.block.length + player.y ; i++){//左邊有東西
        for (let j = player.x - 1 ; j < player.block[i - player.y].length + player.x - 1 ; j++){
          if (player.block[i - player.y][j - player.x + 1] != 0){
            if(arr[i][j] != 0){
              return false;
            }
          };
        };
      };
      if (player.x == 0) {
        let left = 0;
        for (let i = 0 ; i < player.block.length ; i++){
          left += player.block[i][0];
        };
        if (left) return false;
      };
      player.x--;
    }
    else if (e.keyCode == 38){//上
      while (player.x < 0) player.x++;//左邊超過邊界
      while (outx(nowblock.block[(nowblock.style + 1) % Object.keys(nowblock.block).length]) + player.x > 10) player.x--;//右邊超過邊界
      while (outy(nowblock.block[(nowblock.style + 1) % Object.keys(nowblock.block).length]) + player.y > 18) player.y--;//下面超過邊界
      while (havetop(//底部有東西
        leftx(nowblock.block[(nowblock.style + 1) % Object.keys(nowblock.block).length]) + player.x,
        outy(nowblock.block[(nowblock.style + 1) % Object.keys(nowblock.block).length]) + player.y,
        arr
      )) player.y--;
      if (boom(
        nowblock.block[(nowblock.style + 1) % Object.keys(nowblock.block).length],
        leftx(nowblock.block[(nowblock.style + 1) % Object.keys(nowblock.block).length]) + player.x,
        player.y,
        arr
      )) return false;
      nowblock.style = (nowblock.style + 1) % Object.keys(nowblock.block).length;
    }
    else if (e.keyCode == 39){//右
      let maxx = outx(player.block);
      for (let i = player.y ; i < player.block.length + player.y ; i++){//左邊有東西
        for (let j = player.x + 1 ; j < player.block[i - player.y].length + player.x + 1 ; j++){
          if (player.block[i - player.y][j - player.x - 1] != 0){
            if(arr[i][j] != 0){
              return false;
            }
          };
        };
      };
      if (player.x + maxx == 10) return false;
      player.x++;
    }
  });
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  var canvas1 = document.createElement('canvas');
  var ctx1 = canvas1.getContext('2d');
  let zoom = 40;
  canvas.width = zoom * 10;canvas.height = zoom * 18;canvas.className = "canvas";
  canvas1.width = zoom * 10;canvas1.height = zoom * 18;canvas1.className = "canvas";
  ctx.scale(zoom,zoom);
  ctx1.scale(zoom,zoom);
  $("#background").append(canvas);
  $("#background").append(canvas1);
  //初始陣列
  let arr = [];
  for (let i = 0 ; i < canvas.height / zoom ; i++){
    let list = [];
    for (let j = 0 ; j < canvas.width / zoom ; j++){
      list.push(0);
    };
    arr.push(list);
  };
  function cgcolor(n){
    if (n == 0){
      return "rgba(0,0,0,1)";
    }
    else if (n == 1){
      return "rgba(160,0,240,1)"
    }
    else if (n == 2){
      return "rgba(255,102,0,1)"
    }
    else if (n == 3){
      return "rgba(0,0,255,1)"
    }
    else if (n == 3){
      return "rgba(255,0,0,1)"
    }
    else return "rgba(255,0,0,1)"
  };
  function drawbackground(){//畫背景
    for (let i = 0 ;i < arr.length ; i++){
      for (let j = 0 ; j < arr[i].length ; j++){
        ctx.fillStyle = cgcolor(arr[i][j]);
        ctx.fillRect(j,i,1,1);
      };
    };
  };
  drawbackground();
  //方塊
  let T = {
    0 : [
      [1,1,1],
      [0,1,0],
      [0,0,0],
    ],
    1 : [
      [0,0,1],
      [0,1,1],
      [0,0,1],
    ],
    2 : [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ],
    3 : [
      [1,0,0],
      [1,1,0],
      [1,0,0],
    ]
  };
  let I = {
    0 : [
      [0,2,0,0],
      [0,2,0,0],
      [0,2,0,0],
      [0,2,0,0],
    ],
    1 : [
      [2,2,2,2],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
    ]
  };
  let L = {
    0 : [
      [3,3,0],
      [0,3,0],
      [0,3,0],
    ],
    1 : [
      [0,0,3],
      [3,3,3],
      [0,0,0],
    ],
    2 : [
      [3,0,0],
      [3,0,0],
      [3,3,0],
    ],
    3 : [
      [3,3,3],
      [3,0,0],
      [0,0,0],
    ]
  };
  let O = {
    0 : [
      [4,4],
      [4,4],
    ],
    1 : [
      [4,4],
      [4,4],
    ]
  };
  let allblock = [T,I,L,O];
  let nowblock = {
    block : allblock[rand(0,allblock.length-1)],
    style : 0,
  }
  let player = {
    block : nowblock.block[nowblock.style],
    x : parseInt(canvas.width / zoom / 2.5),
    y : 0,
  };
  function drawblock(){//畫現在方塊
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    let x = player.x;
    let y = player.y;
    for (let i = 0 ; i < player.block.length ; i++){
      for (let j = 0 ; j < player.block[i].length ; j++){
        if (player.block[i][j] != 0){
          ctx1.fillStyle = cgcolor(player.block[i][j]);
          ctx1.fillRect(x + j,y + i,1,1);
        };
      };
    };
    player.block = nowblock.block[nowblock.style];
  };
  drawblock();
  let dwonspeed = 500;
  function pusharr(){//填陣列 畫方塊 刷新螢幕 清除畫布 刷新方塊
    for (let i = player.y ; i < player.block.length + player.y ; i++){//填陣列
      for (let j = player.x ; j < player.block[i - player.y].length + player.x ; j++){
        if (player.block[i - player.y][j - player.x] != 0){
          arr[i][j] = player.block[i - player.y][j - player.x]; 
        };
      };
    };
    arr = deleblock(arr);
    drawbackground();
    ctx1.clearRect(0,0,canvas1.width,canvas1.height); //清除畫布
    nowblock = {
      block : allblock[rand(0,allblock.length-1)],
      style : 0,
    }
    player = {
      block : nowblock.block[nowblock.style],
      x : parseInt(canvas.width / zoom / 2.5),
      y : 0,
    };
  };
  function down(){//方塊下降
    let y = outy(player.block);
    if ((player.y + 1) + y > 18){//超過螢幕
      pusharr();
      return false;
    };
    for (let i = (player.y + 1) ; i < player.block.length + (player.y + 1) ; i++){//壓到下面的
      for (let j = player.x ; j < player.block[i - player.y - 1].length + player.x ; j++){
        if (player.block[i - player.y - 1][j - player.x] != 0){
          if(arr[i][j] != 0){
            pusharr();
            return false;
          };
        };
      };
    };
    player.y++;
  };
  setInterval(down,dwonspeed);
  setInterval(function(){
    drawblock();
  },1000/60);
});