$(function(){
  $("html").keydown(function(e){
    if (e.keyCode == 40){
      down();
    };
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
  ctx.fillRect(0,0,10,18);
  //初始陣列
  let arr = [];
  for (let i = 0 ; i < canvas.height / zoom ; i++){
    let list = [];
    for (let j = 0 ; j < canvas.width / zoom ; j++){
      list.push(0);
    };
    arr.push(list);
  };
  //方塊
  let T = {
    0 : [
      [1,1,1],
      [0,1,0],
      [0,0,0],
    ],
    1 : [
      [1,0,0],
      [1,1,0],
      [1,0,0],
    ],
  };
  let I = {
    0 : [
      [2,0,0,0],
      [2,0,0,0],
      [2,0,0,0],
      [2,0,0,0],
    ],
    1 : [
      [0,0,0,0],
      [2,2,2,2],
      [0,0,0,0],
      [0,0,0,0],
    ],
  };
  let L = {
    0 : [
      [3,3,0],
      [0,3,0],
      [0,3,0],
    ],
    1 : [
      [3,3,3],
      [3,0,0],
      [0,0,0],
    ],
  };
  let O = {
    0 : [
      [4,4],
      [4,4],
    ],
    1 : [
      [4,4],
      [4,4],
    ],
  };
  let allblock = [T,I,L,O];
  let player = {
    block : allblock[rand(0,allblock.length-1)][0],
    x : parseInt(canvas.width / zoom / 2.5),
    y : 0,
  };
  function drawblock(){//畫現在方塊
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    let x = player.x;
    let y = player.y;
    ctx1.fillStyle = "red";
    for (let i = 0 ; i < player.block.length ; i++){
      for (let j = 0 ; j < player.block[i].length ; j++){
        if (player.block[i][j] != 0){
          ctx1.fillRect(x + j,y + i,1,1);
        };
      };
    };
  };
  drawblock();
  let dwonspeed = 500;
  function down(){//方塊下降
    let y = 0;
    for (let i = 0 ; i < player.block.length ; i++){
      for (let j = 0 ; j < player.block[i].length ; j++){
        if (player.block[i][j] != 0){
          y++;
          break;
        };
      };
    };
    if ((player.y + 1) + y > 18){//超過螢幕
      for (let i = player.y ; i < player.block.length + player.y ; i++){
        for (let j = player.x ; j < player.block[i - player.y].length + player.x ; j++){
          if (player.block[i - player.y][j - player.x] != 0){
            arr[i][j] = player.block[i - player.y][j - player.x]; //填陣列
          };
        };
      };
      return false;
    };
    player.y++;
    drawblock();
  };
  setInterval(down,dwonspeed);
});