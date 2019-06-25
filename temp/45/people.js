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
rainbow($("#title"),"會議室預約系統",48,7,2);
rainbow($("#title .bt"),"登出",38,3,2);
rainbow($("#ltit div:eq(0)"),"預約單/取消",38,3,2);
rainbow($("#ltit div:eq(1)"),"查詢/預約",38,3,2);
rainbow($("#ltit div:eq(2)"),"會議室瀏覽",38,3,2);
$("#ltit div").mousedown(function(){
  $("#ltit div").css("background","");
  $(this).css("background","aqua");
  $(".mean").hide();
  $(`.mean:eq(${$(this).index()})`).show();
  if ($(this).index() == 1){
    $(".mean:eq(1)").empty();
    $(`.mean:eq(${$(this).index()})`).append(`
      <h1>請選擇日期及時段</h1>
      <label class="date">日期：</label><select></select><br><br>
      <label class="date">時段：</label><select></select><br><br>
      <div class="bt">確定</div> <div class="bt">清除</div>
    `);
    let num = +new Date();
    for (let i = 0 ; i < 7 ; i++){
      let date = new Date(num);
      $(".mean:eq(1) select:eq(0)").append(`
        <option value="${i}">${date.getMonth() + 1}/${date.getDate()}</option>
      `);
      num += 1000*60*60*24;
    };
    $(".mean:eq(1) select:eq(0)").change(function(){
      time();
    });
    function time(){
      $(".mean:eq(1) select:eq(1)").empty();
      let allhour = 10;
      if ($(".mean:eq(1) :selected").val() == 0){
        let hour = new Date().getHours();
        if (hour > 18) return false;
        for (let i = 0 ; i < 4 ; i++){
          allhour = 10 + i * 2;
          if (hour > allhour) break;
          $(".mean:eq(1) select:eq(1)").append(`
            <option value="${i}">${allhour}:00-${allhour+2}:00</option>
          `);
        };
      }
      else{
        for (let i = 0 ; i < 4 ; i++){
          allhour = 10 + i * 2;
          $(".mean:eq(1) select:eq(1)").append(`
            <option value="${i}">${allhour}:00-${allhour+2}:00</option>
          `);
        };
      };
    };time();
    $(".mean:eq(1) .bt:last").mousedown(function(){
      $("#ltit div:eq(1)").mousedown();
    });
  };
});
$("#logout").mousedown(function(){
  location.href = "index.html";
});