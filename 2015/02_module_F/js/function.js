//<script> 
let nimg = new Image();
function img(nn){
  if (nn.files[0].type != "image/jpeg"){
    alert("請選擇jpg檔");
    return false;
  };
  if (nn.files[0].size > 300 * 1024){
    alert("檔案過大");
    return false;
  };
  //上傳圖片
  $(".schedule").width(0);
  let read = new FileReader();
  read.readAsDataURL(nn.files[0]);
  read.onprogress = function(e){
    $(".schedule").width((e.loaded/e.total) * $("#asd").width());
  };
  read.onload = function(e){
    nimg.src = e.target.result;
    nimg.onload = function(){
      ctx.drawImage(nimg,0,0,canvas.width,canvas.height);
      stop = 0;
    };
  };
};
//</script>