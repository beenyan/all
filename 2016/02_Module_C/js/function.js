function rand(nn,mm){
  return parseInt(Math.random() * (mm - nn + 1) + nn)
};
function max(nn,mm){
  if (nn > mm) return nn;
  else return mm;
};
function outy(nn){
  let y = nn.length;
  let length = 0;
  for (let i = nn.length - 1 ; i >= 0 ; i--){
    for (let j = 0 ; j < nn[i].length ; j++){
      if (nn[i][j] == 0){
        length ++;
      };
    };
    if (length == nn.length){
      y--;
      length = 0;
    }
    else {
      return y;
    }
  };
};
function outx(nn){
  let x = {};
  let maxx = 0;
  for (let i = 0 ; i < nn.length ; i++){
    x[i] = 0;
    for (let j = 0 ; j < nn[i].length ; j++){
      if (nn[i][j] != 0){
        x[i]++;
      };
    };
  };
  for (let i = 0 ; i < Object.keys(x).length ; i++){
    maxx = max(maxx,x[i]);
  }
  return maxx;
};
function leftx(nn){
  let lx = 0;
  for (let i = 0 ; i < nn.length ; i++){
    if (nn[i][0] == 0){
      lx++;
    }
  };
  if (lx == nn.length) return 1
  else return 0;
};
function havetop(x,y,arr){
  let havey = 0;
  while (y--){
    if (arr[y][x] != 0){
      havey ++;
      break;
    }
  };
  return havey;
};
function boom(nn,x,y,arr){
  let tf = 0;
  for (let i = 0 ; i < nn.length ; i++){
    for (let j = 0 ; j < nn[i].length ; j++){
      if (arr[y + i][x + j] > 0 && nn[i][j] > 0){
        tf++;
        break;
      }
    };
  };
  return tf;
};
function deleblock(arr){
  let waitarr = arr;
  let line = 18;
  let linck = 0;
  let con = 0;
  while (line--){
    for (let i = 0 ; i < 10 ; i++){
      if (arr[line][i] != 0){
        linck++;
      };
    };
    if (linck == 10){//整排都是
      $("#music")[0].play()
      for (let i = 0 ; i < 10 ; i++){
        if (waitarr[line][i] == 10){
          con = -1101000;
        };
        waitarr[0][i] = 0;
        waitarr[line][i] = 0;
        con ++;
      };
      if (con > 0){
        $("#number label:eq(1)").text("行數：" + (parseInt($("#number label:eq(1)").text().substr(3)) + 1));
        con = 0;
      }
      let templine = line;
      line++;
      while (templine > 0){
        waitarr[templine] = JSON.parse(JSON.stringify(waitarr[templine-1]));
        templine--;
      };
    };
    linck = 0;
  };
  return waitarr;
};
function blockcolor(n){
  if (n == 0){
    return BK;
  }
  else if (n == 1){
    return imgT;
  }
  else if (n == 2){
    return imgI;
  }
  else if (n == 3){
    return imgL;
  }
  else if (n == 4){
    return imgO;
  }
  else if (n == 5){
    return imgBL;
  }
  else if (n == 6){
    return imgZ;
  }
  else if (n == 7){
    return imgBZ;
  }
  else if (n == 10){
    return imgstone;
  }
}
function zerotop(nn){
  let zero = 0;
  let length = 0;
  for (let i = 0 ; i < nn.length ; i++){
    for (let j = 0 ; j < nn[i].length ; j++){
      if (nn[i][j] == 0){
        length++;
      }
      else {
        return zero;
      }
    };
    if (length == nn.length) zero++;
    length = 0;
  };
};
function uptf(player,x,y,arr){
  for (let i = y ; i < player.length + y ; i++){
    for (let j = x ; j < player[i - y].length + x ; j++){
      if (player[i - y][j - x] != 0 && arr[i][j] === undefined){//超出邊界
        return 1;
      }
      if (player[i - y][j - x] != 0 && arr[i][j] != 0){//超出邊界
        return 1;
      }
    };
  };
  return 0;
};
function touch(player,x,y,arr){
  for (let i = y ; i < player.length + y ; i++){
    for (let j = x ; j < player[i - y].length + x ; j++){
      if (player[i - y][j - x] != 0 && arr[i][j] != 0){
        return 1;
      };
    };
  };
  return 0;
};
function d0(){
  $("#dialog1").empty();
  $("#dialog1").append(`
    <div class="bk" onclick="d0()">一般</div>
    <div class="bk" onclick="d1()">困難</div><br>
    <div class="bk" style="background:#B4C6E7; width:10%">名次</div>
    <div class="bk" style="background:#B4C6E7; width:55%">暱稱</div>
    <div class="bk" style="background:#B4C6E7; width:10%">行數</div>
    <div class="bk" style="background:#B4C6E7; width:20%">時間</div><br>
  `);
  $.post({
    async : false,
    url : "fun.php?c=1",
    success : function(e){
      let list = e.split("$(/)");
      let id = list.pop();
      for (let i = 0 ; i < list.length ; i++){
        let arr = JSON.parse(list[i]);
        $("#dialog1").append(`
          <div class="list">
            <div class="bk" style=" width:10%">${i + 1}</div>
            <div class="bk" style=" width:55%">${arr[1]}</div>
            <div class="bk" style=" width:10%">${arr[2]}</div>
            <div class="bk" style=" width:20%">${parseInt(arr[3] / 60)} : ${parseInt(arr[3] % 60)}</div>
          </div>
        `);
        $(".list:last").data("id",arr[0]);
      };
      $(".list").each(function(){
        if ($(this).data("id") == id){
          $(this).attr("id","none");
          $(this).children().css("background","#FFD965");
        }
      });
      $(".list:gt(4):not(#none)").remove();
    },
  });
};
function d1(){
  $("#dialog1").empty();
  $("#dialog1").append(`
    <div class="bk" onclick="d0()">一般</div>
    <div class="bk" onclick="d1()">困難</div><br>
    <div class="bk" style="background:#B4C6E7; width:10%">名次</div>
    <div class="bk" style="background:#B4C6E7; width:55%">暱稱</div>
    <div class="bk" style="background:#B4C6E7; width:10%">行數</div>
    <div class="bk" style="background:#B4C6E7; width:20%">時間</div><br>
  `);
  $.post({
    async : false,
    url : "fun.php?c=2",
    success : function(e){
      let list = e.split("$(/)");
      let id = list.pop();
      for (let i = 0 ; i < list.length ; i++){
        let arr = JSON.parse(list[i]);
        $("#dialog1").append(`
          <div class="list">
            <div class="bk" style=" width:10%">${i + 1}</div>
            <div class="bk" style=" width:55%">${arr[1]}</div>
            <div class="bk" style=" width:10%">${arr[2]}</div>
            <div class="bk" style=" width:20%">${parseInt(arr[3] / 60)} : ${parseInt(arr[3] % 60)}</div>
          </div>
        `);
        $(".list:last").data("id",arr[0]);
      };
      $(".list").each(function(){
        if ($(this).data("id") == id){
          $(this).attr("id","none");
          $(this).children().css("background","#FFD965");
        }
      });
      $(".list:gt(4):not(#none)").remove();
    },
  });
};
function lookcon(){
  $("#dialog2").empty();
  $("#dialog2").dialog("open");
  if ($("select :selected").val() == 0) dd0();
  else dd1();
};
function dd0(){
  $("#dialog2").empty();
  $("#dialog2").append(`
    <div class="bk" onclick="dd0()">一般</div>
    <div class="bk" onclick="dd1()">困難</div><br>
    <div class="bk" style="background:#B4C6E7; width:10%">名次</div>
    <div class="bk" style="background:#B4C6E7; width:55%">暱稱</div>
    <div class="bk" style="background:#B4C6E7; width:10%">行數</div>
    <div class="bk" style="background:#B4C6E7; width:20%">時間</div><br>
  `);
  $.post({
    async : false,
    url : "fun.php?c=1",
    success : function(e){
      let list = e.split("$(/)");
      list.pop();
      for (let i = 0 ; i < list.length ; i++){
        let arr = JSON.parse(list[i]);
        $("#dialog2").append(`
          <div class="list">
            <div class="bk" style=" width:10%">${i + 1}</div>
            <div class="bk" style=" width:55%">${arr[1]}</div>
            <div class="bk" style=" width:10%">${arr[2]}</div>
            <div class="bk" style=" width:20%">${parseInt(arr[3] / 60)} : ${parseInt(arr[3] % 60)}</div>
          </div>
        `);
      };
    },
  });
};
function dd1(){
  $("#dialog2").empty();
  $("#dialog2").append(`
    <div class="bk" onclick="dd0()">一般</div>
    <div class="bk" onclick="dd1()">困難</div><br>
    <div class="bk" style="background:#B4C6E7; width:10%">名次</div>
    <div class="bk" style="background:#B4C6E7; width:55%">暱稱</div>
    <div class="bk" style="background:#B4C6E7; width:10%">行數</div>
    <div class="bk" style="background:#B4C6E7; width:20%">時間</div><br>
  `);
  $.post({
    async : false,
    url : "fun.php?c=2",
    success : function(e){
      let list = e.split("$(/)");
      list.pop();
      for (let i = 0 ; i < list.length ; i++){
        let arr = JSON.parse(list[i]);
        $("#dialog2").append(`
          <div class="list">
            <div class="bk" style=" width:10%">${i + 1}</div>
            <div class="bk" style=" width:55%">${arr[1]}</div>
            <div class="bk" style=" width:10%">${arr[2]}</div>
            <div class="bk" style=" width:20%">${parseInt(arr[3] / 60)} : ${parseInt(arr[3] % 60)}</div>
          </div>
        `);
      };
    },
  });
};
function showline(){
  $("#lineafter").remove();
  $.post({
    async : false,
    url : "fun.php?c=3",
    data : {diff : $("select :selected").val()},
    success : function(e){
      $("#heightline").after(`
        <label style="position: relative;left: 80%;" id="lineafter">${e}</label>
      `);
    },
  });
};
function start(){
  let time1;
  let fastdown = 0;
  let upstop = 0;
  let falstop = 0;
  $(".db:eq(0)").mousedown(function(){
    let canvasall = $("<canvas>")[0];
    let ctxall = canvasall.getContext('2d');
    canvasall.width = canvas1.width;
    canvasall.height = canvas1.height;
    let temp0 = ctx.getImageData(0,0,canvas1.width,canvas1.height);
    ctxall.putImageData(temp0,0,0);
    let img = new Image();
    img.src = canvas1.toDataURL();
    allstop = 1;
    if (allstop == 0){
      time0 = setTimeout(down,downspeed);
      $("#viewnext").css("background-color","white");
    }
    else{
      $("#viewnext").css("background-color","gray");
      ctx1.fillStyle = "rgb(128,128,128)";
      ctx1.fillRect(0,0,canvas1.width,canvas1.height);
      ctx2.fillStyle = "rgb(128,128,128)";
      ctx2.fillRect(0,0,canvas2.width,canvas2.height);
      ctx1.fillStyle = "rgb(255,255,255)";
      ctx1.font = "5px 微軟正黑體";
      ctx1.fillText("暫停",0,10);
    };
    img.onload = function(){
      ctxall.drawImage(img,0,0);
      let a = $("<a>");
      a.attr("href",canvas.toDataURL("image/jpeg",1));
      a.attr("download",+new Date());
      a[0].click();
    };
  });
  $(".db:eq(1)").mousedown(function(){
    allstop = (allstop + 1) % 2
    if (allstop == 0){
      time0 = setTimeout(down,downspeed);
      $("#viewnext").css("background-color","white");
    }
    else{
      $("#viewnext").css("background-color","gray");
      ctx1.fillStyle = "rgb(128,128,128)";
      ctx1.fillRect(0,0,canvas1.width,canvas1.height);
      ctx2.fillStyle = "rgb(128,128,128)";
      ctx2.fillRect(0,0,canvas2.width,canvas2.height);
      ctx1.fillStyle = "rgb(255,255,255)";
      ctx1.font = "5px 微軟正黑體";
      ctx1.fillText("暫停",0,10);
    };
  });
  $(".db:eq(2)").mousedown(function(){
    if(confirm("是否結束遊戲")){
      history.go(0);
    };
  });
  $("html").keyup(function(e){
    upstop = 0;
  });
  $("html").keydown(function(e){
    if (e.keyCode == 32){
      if (allstop) return false;
      if (fastdown){
        return false;
      }
      fastdown = 1;
      clearInterval(time1);
      clearTimeout(time0);
      time1 = setInterval(down,1);
    }
    if (e.keyCode == 40){//下
      if (allstop) return false;
      clearTimeout(time0);
      down();
    }
    else if (e.keyCode == 37){//左
      if (allstop) return false;
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
      if (allstop) return false;
      if (upstop) return false;
      upstop = 1;
      if (uptf(
        nowblock.block[(nowblock.style + 1) % Object.keys(nowblock.block).length],
        player.x,
        player.y,
        arr,
      )) return false;
      nowblock.style = (nowblock.style + 1) % Object.keys(nowblock.block).length;
    }
    else if (e.keyCode == 39){//右
      if (allstop) return false;
      let maxx = outx(player.block);
      for (let i = player.y ; i < player.block.length + player.y ; i++){//左邊有東西
        for (let j = player.x + 1 ; j < player.block[i - player.y].length + player.x + 1 ; j++){
          if (player.block[i - player.y][j - player.x - 1] != 0){
            if(arr[i][j] != 0){
              return false;
            };
          };
        };
      };
      if (player.x + maxx == 10) return false;
      player.x++;
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
  //下一個方塊
  let canvas2 = document.createElement('canvas');
  let ctx2 = canvas2.getContext('2d');
  canvas2.width = zoom * 4;
  canvas2.height = zoom * 4;
  ctx2.scale(zoom,zoom);
  canvas2.id = "nextblock";
  $("#viewnext").append(canvas2);
  //初始陣列
  let arr = [];
  for (let i = 0 ; i < canvas.height / zoom ; i++){
    let list = [];
    for (let j = 0 ; j < canvas.width / zoom ; j++){
      list.push(0);
    };
    arr.push(list);
  };
  function drawbackground(){//畫背景
    for (let i = 0 ;i < arr.length ; i++){
      for (let j = 0 ; j < arr[i].length ; j++){
        ctx.drawImage(blockcolor(arr[i][j]),j,i,1,1)
      };
    };
  };
  drawbackground();
  //方塊
  let T = {
    0 : [
      [0,0,0],
      [1,1,1],
      [0,1,0],
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
      [0,1,0],
      [0,1,1],
      [0,1,0],
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
  let BL = {
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
  let BZ = {
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
  let allblock = [T,I,I,BL,L,O,Z,BZ];
  let nowblock = {
    block : allblock[rand(0,allblock.length-1)],
    style : 0,
  }
  let player = {
    block : nowblock.block[nowblock.style],
    x : parseInt(canvas.width / zoom / 2.5),
    y : 0,
  };
  let nextblock = allblock[rand(0,allblock.length-1)];
  function drawblock(){//畫現在方塊
    player.block = nowblock.block[nowblock.style];
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    for (let i = 0 ; i < nextblock[0].length ; i++){
      for (let j = 0 ; j < nextblock[0][i].length ; j++){
        if (nextblock[0][i][j] != 0){
          ctx2.drawImage(blockcolor(nextblock[0][i][j]),j,i,1,1);
        };
      };
    };
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    let x = player.x;
    let y = player.y;
    for (let i = 0 ; i < player.block.length ; i++){
      for (let j = 0 ; j < player.block[i].length ; j++){
        if (player.block[i][j] != 0){
          ctx1.drawImage(blockcolor(player.block[i][j]),x + j,y + i,1,1);
        };
      };
    };
  };
  drawblock();
  function pusharr(){//填陣列 畫方塊 刷新螢幕 清除畫布 刷新方塊
    falstop = 1;
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
    player = {
      block : nowblock.block[nowblock.style],
      x : parseInt(canvas.width / zoom / 2.5),
      y : 0,
    };
    nowblock = {
      block : nextblock,
      style : 0,
    };
    nextblock = allblock[rand(0,allblock.length - 1)];
    falstop = 0;
    if ($("select :selected").val() == 1 && difftime >= 10000){
      difftime -= 10000;
      for (let i = 0 ; i < 10 ; i++){
        if (arr[0][i] !=0){ 
          allstop = 1;
          $("#dialog1").dialog("open");
          return false;
        }
      };
      arr.shift();
      let stone = [10,10,10,10,10,10,10,10,10,10];
      stone[rand(0,9)] = 0;
      arr.push(stone);
      drawbackground();
    };
  };
  function down(){//方塊下降
    if (allstop) return false;
    if (touch(//game over
      player.block,player.x,player.y,arr
    )){
      allstop = 1;
      $("#dialog1").dialog("open");
    };
    clearTimeout(time0);
    time0 = setTimeout(down,downspeed)
    if (falstop) return false;
    let y = outy(player.block);
    if ((player.y + 1) + y > 18){//超過螢幕
      clearInterval(time1);
      fastdown = 0;
      pusharr();
      return false;
    };
    for (let i = (player.y + 1) ; i < player.block.length + (player.y + 1) ; i++){//壓到下面的
      for (let j = player.x ; j < player.block[i - player.y - 1].length + player.x ; j++){
        if (player.block[i - player.y - 1][j - player.x] != 0){
          if(arr[i][j] != 0){
            clearInterval(time1);
            fastdown = 0;
            pusharr();
            return false;
          };
        };
      };
    };
    player.y++;
  };
  let time0 = setTimeout(down,downspeed);
  setInterval(function(){
    if (allstop) return false;
    drawblock();
  },1);
  setInterval(function(){
    if (allstop) return false;
    difftime += 1000/60;
  },1000 / 60);
};