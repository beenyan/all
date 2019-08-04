//<script>
  let canvas = document.createElement('canvas');
  canvas = $("#main")[0];
  let ctx = canvas.getContext('2d');
  ctx.scale(30,30);
  let bg_arr = [];
  let img_block = [];
  let time = 1000;
  let score = 0;
  let line = 0;
  let start = 1;
  let all_time = 0;
  let game_over = 0;
  let scanvas = document.createElement('canvas');
  scanvas.width = 150;
  scanvas.height = 150;
  let sctx = scanvas.getContext('2d');
  sctx.scale(30,30);
  $(".r").prepend(scanvas);
  for (let y = 0 ; y < 20 ; y++){
    let temp = [];
    for (let x = 0 ; x < 10 ; x++){
      temp.push(0);
    };
    bg_arr.push(temp);
  };
  $(".material").each(function(){
    img_block.push(this);
  });
  draw_bk();
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
      [0,0,0],
      [0,1,0],
      [1,1,1],
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
      [0,0,0,0],
      [2,2,2,2],
      [0,0,0,0],
      [0,0,0,0],
    ],
    2 : [
      [0,0,2,0],
      [0,0,2,0],
      [0,0,2,0],
      [0,0,2,0],
    ],
    3 : [
      [0,0,0,0],
      [0,0,0,0],
      [2,2,2,2],
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
      [0,0,3],
      [3,3,3],
      [0,0,0],
    ],
    2 : [
      [0,3,0],
      [0,3,0],
      [0,3,3],
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
  let J = {
    0 : [
      [5,5,0],
      [5,0,0],
      [5,0,0],
    ],
    1 : [
      [5,5,5],
      [0,0,5],
      [0,0,0],
    ],
    2 : [
      [0,0,5],
      [0,0,5],
      [0,5,5],
    ],
    3 : [
      [5,0,0],
      [5,5,5],
      [0,0,0],
    ]
  };
  let Z = {
    0 : [
      [6,6,0],
      [0,6,6],
      [0,0,0],
    ],
    1 : [
      [0,0,6],
      [0,6,6],
      [0,6,0],
    ],
  };
  let S = {
    0 : [
      [0,7,7],
      [7,7,0],
      [0,0,0],
    ],
    1 : [
      [0,7,0],
      [0,7,7],
      [0,0,7],
    ],
  };
  let all_block = [T,I,L,O,J,Z,S];
  let player = {
    block : all_block[rand(0,all_block.length - 1)],
    x : 4,
    y : 0,
    style : 0,
  };
  let next_block = all_block[rand(0,all_block.length - 1)];
  draw_nblock();
  draw_bk();
  setInterval(() => {
    if (start) return false;
    time_text();
    draw_next();
    draw_bk();
  }, 1000/60);
//</script>