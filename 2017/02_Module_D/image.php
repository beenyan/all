<?php
  $img=$_FILES["up"];
  if (substr($img["name"],-4)!=".png"){
    echo "Please select image .png";
    return false;
  };
  move_uploaded_file($img["tmp_name"],"avatar/".$img["name"]);
  $imgsize=getimagesize("avatar/".$img["name"]);
  $photo = imagecreatetruecolor(60,60);
  $white = imagecolorallocate($photo,224,168,179);
  $black = imagecolorallocate($photo,0,0,0);
  imagefill($photo,0,0,$white);
  imagefilledellipse($photo,30,30,60,60,$black);//繪製圓形(圖片，X，Y，r，r，color)
  imagecolortransparent($photo, $black);
  $firstimg=imagecreatefrompng( "avatar/".$img["name"]);
  $newimage=imagecreatetruecolor(60,60);//創建圖片
  imagecopyresampled($newimage ,imagecreatefrompng( "avatar/".$img["name"] ), 
                      0, 0, 
                      0, 0, 
                      60, 60, 
                      $imgsize[0], $imgsize[1]);//壓縮圖片
  imagecopymerge($newimage,$photo,0,0,0,0,60,60,100);//合成圖片
  imagecolortransparent($newimage, $white);//去除四角
  $tempname=name();
  imagepng($newimage,"avatar/".$tempname.".png");
  $imgst="avatar/".$tempname.".png";
  unlink("avatar/".$img["name"]);//刪除檔案
  echo $imgst;
  function name(){
    $name="";
    $w="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    $rand=rand(30,35);
    for ($i=0;$i<$rand;$i++){
      $name=$name.$w[rand(0,61)];
    }
    //檢查名字是否重複
    $arr=glob("avatar/*.png");
    for ($i=0;$i<count($arr);$i++){
      if (substr($arr[$i],7)==$name){
        name();
        return false;
      }
    }
    return $name;
  }
?>