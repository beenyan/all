function rainbow(createpos,word,fontsize,shadow,textwidth){
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = fontsize * word.length + shadow;
  canvas.height = fontsize + fontsize / 3;
  $(canvas).css("pointer-events","none");
  createpos.append(canvas);
  ctx.font = "bold " + fontsize +"px 微軟正黑體";
  ctx.fillText(word,0,fontsize);
  let pos = 0;
  let ck = 1;
  setInterval(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillText(word,0,fontsize)
    if (pos < canvas.width*1.5 && ck) pos++; //控制位置
    else {
      ck = 0;
      pos--;
    }
    if (pos < -100) ck = 1;
    let gar = ctx.createLinearGradient(pos,0,canvas.width-pos,canvas.height);
    gar.addColorStop(0,"red");
    gar.addColorStop(0.2,"orange");
    gar.addColorStop(0.35,"yellow");
    gar.addColorStop(0.55,"green");
    gar.addColorStop(0.7,"aqua");
    gar.addColorStop(0.8,"blue");
    gar.addColorStop(1,"purple");
    ctx.fillStyle = gar;
    ctx.globalCompositeOperation = "source-in";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(128,128,128,1)";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = textwidth;
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillText(word,shadow,fontsize + shadow);
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeText(word,0,fontsize);
  },10);
};
