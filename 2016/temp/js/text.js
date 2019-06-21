function one(){//方法一
  let slider = document.createElement('div');
  slider.id = "slider";
  $(slider).slider({
    min : 50,
    max : 100,
    value : 100,
    stop : function (){
      $length = $(slider).slider("value");
      canvas3.width = $length;
      canvas3.height = $length;
    },
  })
  $("body").append(slider);
  let $length = $(slider).slider("value");
  //第一張canvas
  let canvas0 = document.createElement('canvas');
  let ctx0 = canvas0.getContext('2d');
  canvas0.width = 1200;
  canvas0.height = 720;
  let img0 = new Image();
  img0.src = "image/00011.jpg";
  img0.onload = function (){
    ctx0.drawImage(img0,0,0,canvas0.width,canvas0.height);
  };
  $("body").append(canvas0);
  //第二張背景圖canvas
  let canvas1 = document.createElement('canvas');
  let ctx1 = canvas1.getContext('2d');
  canvas1.width = 1200;
  canvas1.height = 720;
  let img1 = new Image();
  img1.src = "image/00032.jpg";
  $("body").prepend(canvas1);
  img1.onload = function (){
    ctx1.drawImage(img1,0,0,canvas1.width,canvas1.height);
    $(canvas1).remove();
  };
  //第三張canvas(隱藏)
  let canvas2 = document.createElement('canvas');
  let ctx2 = canvas2.getContext('2d');
  $(canvas2).css("pointer-events","none");
  canvas2.width = 1200;
  canvas2.height = 720;
  $("body").append(canvas2);
  // 第四張 處理器
  let canvas3 = document.createElement('canvas');
  let ctx3 = canvas3.getContext('2d');
  $(canvas3).css("pointer-events","none");
  canvas3.width = $length;
  canvas3.height = $length;
  let imgcan;
  $("canvas:eq(1)").mousemove(function(e){
    canvas3.width = canvas3.width;
    imgcan = ctx1.getImageData(e.offsetX - $length / 2,e.offsetY - $length / 2,$length,$length);
    ctx3.putImageData(imgcan,0,0);
    ctx3.globalCompositeOperation = "destination-in";
    ctx3.arc($length / 2,$length / 2,$length / 2,0,Math.PI * 2);
    ctx3.fill();
    ctx2.globalCompositeOperation = "destination-in";
    ctx2.fillStyle = "rgba(0,0,0,0.96)";
    ctx2.fillRect(0,0,canvas2.width,canvas2.height);
    ctx2.globalCompositeOperation = "source-over";
    ctx2.drawImage(canvas3,e.offsetX - $length / 2,e.offsetY - $length / 2);
  });
};
one();