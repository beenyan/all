function rand(nn,mm){
  return parseInt(Math.random() * (mm - nn + 1) + nn)
};
function max(nn,mm){
  if (nn > mm) return nn;
  else return mm;
};
function outy(nn){
  let y = 0;
  for (let i = 0 ; i < nn.length ; i++){
    for (let j = 0 ; j < nn[i].length ; j++){
      if (nn[i][j] != 0){
        y++
        break;
      };
    };
  };
  return y;
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
  while (line--){
    for (let i = 0 ; i < 10 ; i++){
      if (arr[line][i] != 0){
        linck++;
      };
    };
    if (linck == 10){//整排都是
      for (let i = 0 ; i < 10 ; i++){
        waitarr[line][i] = 0;
      };
      line++;
      let templine = line;
      while (templine > 1){
        waitarr[templine] = waitarr[templine-1];
        templine--;
      };
    };
    linck = 0;
  };
  return waitarr;
};