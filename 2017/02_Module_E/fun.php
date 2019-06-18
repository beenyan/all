<?php
  $db = mysqli_connect("localhost","admin","1234","2017e01");
  mysqli_query($db,"SET NAMES UTF8");
  $call = $_GET["call"];
  if (!empty($_POST["object"])){
    $i = $_POST["object"];
  };
  if ($call == 1){//所有拖拉題
    $all = mysqli_query($db, "SELECT * FROM `drag`");
    while($row = mysqli_fetch_array($all)){
      echo json_encode($row)."(+{8&^$})";
    };
  }
  else if ($call == 2){//新增拖拉題
    $dragob = $i["dragob"];
    $dragbk = $i["dragbk"];
    mysqli_query($db,"INSERT INTO `drag`(`dragob`, `dragbk`, `type`) VALUES ('$dragob','$dragbk','閒置中')");
  }
  else if ($call == 3){//修改拖拉題
    $dragob = $i["dragob"];
    $dragbk = $i["dragbk"];
    $id = $i["id"];
    mysqli_query($db,"UPDATE `drag` SET `dragob`='$dragob',`dragbk`='$dragbk' WHERE `id` = $id");
  }
  else if ($call == 4){//所有配對題
    $all = mysqli_query($db, "SELECT * FROM `pair`");
    while($row = mysqli_fetch_array($all)){
      echo json_encode($row)."(+{8&^$})";
    };
  }
  else if ($call == 5){//新增配對題
    $problem = $i["problem"];
    $one = $i["one"];
    $two = $i["two"];
    $three = $i["three"];
    $ans = $i["ans"];
    $mean = $i["mean"];
    mysqli_query($db,"INSERT INTO `pair`(`problem`, `one`, `two`, `three`, `type`, `ans`, `mean`) VALUES ('$problem','$one','$two','$three','閒置中','$ans','$mean')");
  }
  else if ($call==6){//修改配對題
    $problem = $i["problem"];
    $one = $i["one"];
    $two = $i["two"];
    $three = $i["three"];
    $ans = $i["ans"];
    $mean = $i["mean"];
    $id = $i["id"];
    mysqli_query($db,"UPDATE `pair` SET `problem`='$problem',`one`='$one',`two`='$two',`three`='$three',`ans`='$ans',`mean`='$mean' WHERE `id` = $id");
  }
  else if ($call == 7){//所有尋寶題
    $all = mysqli_query($db, "SELECT * FROM `box`");
    while($row = mysqli_fetch_array($all)){
      echo json_encode($row)."(+{8&^$})";
    };
  }
  else if ($call == 8){//新增尋寶題
    $title = $_POST["title"];
    $pos = json_decode($_POST["pos"]);
    $temp = "";
    for ($i=0;$i<count($pos);$i++){
      $temp=$temp.$pos[$i].",";
    }
    $temp = substr($temp,0,-1);
    mysqli_query($db,"INSERT INTO `box`(`title`, `pos`, `type`) VALUES ('$title','$temp','閒置中')");
  }
  else if ($call==9){//修改尋寶題
    $title = $_POST["title"];
    $pos = json_decode($_POST["pos"]);
    $id = $_POST["id"];
    $temp = "";
    for ($i=0;$i<count($pos);$i++){
      $temp=$temp.$pos[$i].",";
    }
    $temp = substr($temp,0,-1);
    mysqli_query($db,"UPDATE `box` SET `title`='$title',`pos`='$temp' WHERE `id` = $id");
  }
  else if ($call==10){
    $wh = $_POST["wh"];
    $all = mysqli_query($db, "SELECT * FROM `$wh`");
    while($row = mysqli_fetch_array($all)){
      echo json_encode($row)."(+{8&^$})";
    };
  }
  else if ($call==11){
    $wh = $_POST["wh"];
    $id = $_POST["id"];
    echo json_encode(mysqli_fetch_array(mysqli_query($db, "SELECT * FROM `$wh` WHERE `id` = $id")));
  }
  else if ($call==12){
    $name = $_POST["name"];
    $time = $_POST["time"];
    $showans = $_POST["showans"];
    $rand = $_POST["rand"];
    $mean = $_POST["mean"];
    //處理出題中
    $list = json_decode($mean);
    for ($i = 0 ;$i <count($list); $i++){
      if (substr($list[$i],0,1)=="s"){
        $wh = "select";
      }
      else if (substr($list[$i],0,1)=="p"){
        $wh = "pair";
      }
      else if (substr($list[$i],0,1)=="d"){
        $wh = "drag";
      }
      else if (substr($list[$i],0,1)=="b"){
        $wh = "box";
      }
      $id =substr($list[$i],1);
      mysqli_query($db,"UPDATE `$wh` SET `type`='出題中' WHERE `id` = $id");
    }
    mysqli_query($db, "INSERT INTO `textpaper`(`name`, `anstime`, `showans`, `rand`, `mean`, `type`) VALUES ('$name','$time','$showans','$rand','$mean','閒置中')");
  }
  else if ($call==13){
    $all = mysqli_query($db, "SELECT * FROM `textpaper`");
    while($row = mysqli_fetch_array($all)){
      echo json_encode($row)."(+{8&^$})";
    };
  }
  else if ($call==14){
    $anstime = $_POST["anstime"];
    $showans = $_POST["showans"];
    $rand = $_POST["rand"];
    $id = $_POST["id"];
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `textpaper` WHERE `id` = $id"));
    if ($row["type"] != "閒置中"){
      return false;
    }
    mysqli_query($db,"UPDATE `textpaper` SET `anstime`='$anstime',`showans`='$showans',`rand`='$rand' WHERE `id` = $id");
  }
  else if ($call==15){
    $id = $_POST["id"];
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `textpaper` WHERE `id` = $id"));
    if ($row["type"] != "閒置中"){
      return false;
    };
    mysqli_query($db,"DELETE FROM `textpaper` WHERE `id` = $id");
    echo "can";
  }
  else if ($call==16){
    $id = $_POST["id"];
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `textpaper` WHERE `id` = $id"));
    mysqli_query($db,"INSERT INTO `textpaper`(`name`, `anstime`, `seetime`, `showans`, `rand`, `mean`, `type`) VALUES ('$row[1]','$row[2]','$row[3]','$row[4]','$row[5]','$row[6]','閒置中')");
  }
  else if ($call==17){
    $all = mysqli_query($db, "SELECT * FROM `textpaper`");
    while($row = mysqli_fetch_array($all)){
      echo $row[0].",";
    };
  }
  else if ($call==18){
    $id = $_POST["id"];
    $row =  mysqli_fetch_array(mysqli_query($db, "SELECT * FROM `textpaper` WHERE `id` = $id"));
    if ($row["type"] != "閒置中"){
      echo "cant";
    }
    else {
      $name = $_POST["name"];
      $name = $row["student"].$name."%&^";
      mysqli_query($db,"UPDATE `textpaper` SET `student`='$name' WHERE `id` = $id");
    }
  }
  else if ($call==19){
    $id = $_POST["id"];
    $row =  mysqli_fetch_array(mysqli_query($db, "SELECT * FROM `textpaper` WHERE `id` = $id"));
    if ($row["type"] != "閒置中" ||$row["student"] == ""){
      echo "cant";
      return false;
    }
    else {
      mysqli_query($db,"UPDATE `textpaper` SET `type`='考試中' WHERE `id` = $id");
    }
  }
  else if ($call==20){
    $id = $_POST["id"];
    $row =  mysqli_fetch_array(mysqli_query($db, "SELECT * FROM `textpaper` WHERE `id` = $id"));
    $arr = array(
      $row["student"],
      $row["type"],
      $row["now"],
      $row["showans"],
      $row["rand"],
      $row["nowtime"],
    );
    echo json_encode($arr);
  }
  else if ($call==21){ //後臺監視系統
    $id = $_POST["id"];
    mysqli_query($db, "UPDATE `textpaper` SET `ansall`='' WHERE `id` = $id");
    $row =  mysqli_fetch_array(mysqli_query($db, "SELECT * FROM `textpaper` WHERE `id` = $id"));
    $arr = array(
      $row["showans"],
      $row["rand"],
      $row["mean"],
      $row["type"],
      $row["anstime"],
    );
    echo json_encode($arr);
  }
  else if ($call==22){
    $id = $_POST["id"];
    $ansall = $_POST["ansall"];
    mysqli_query($db, "UPDATE `textpaper` SET `type`='考試完成',`ansall`='$ansall' WHERE `id` = $id");
  }
  else if ($call==23){
    $id = $_POST["id"];
    $data = $_POST["temp"];
    mysqli_query($db, "UPDATE `textpaper` SET `ansall`=concat(`ansall`,'$data') WHERE `id` = $id");
  }
  else if ($call==24){//顯示題目
    $id = $_POST["id"];
    $data = $_POST["temp"];
    mysqli_query($db, "UPDATE `textpaper` SET `ansall`=concat(`ansall`,'$data') WHERE `id` = $id");
  }
  else if ($call==25){//顯示題目
    $now = $_POST["now"];
    $id = $_POST["id"];
    if (!empty($_POST["ansall"])){
      $ansall = $_POST["ansall"];
      mysqli_query($db, "UPDATE `textpaper` SET `now`='$now',`ansall`='$ansall' WHERE `id` = $id");
    }
    mysqli_query($db, "UPDATE `textpaper` SET `now`='$now' WHERE `id` = $id");
  }
  else if ($call==26){//檢查答案並回傳
    $wh = $_POST["wh"];
    $id = $_POST["id"];
    $ans = $_POST["ans"];
    $textid = $_POST["textid"];
    if ($ans != 0){
      $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `$wh` WHERE `id` = $id"));
      if ($row["ans"] == $ans){
        mysqli_query($db, "UPDATE `textpaper` SET `ansall`=concat(`ansall`,1) WHERE `id` = $textid");
      }
      else {
        mysqli_query($db, "UPDATE `textpaper` SET `ansall`=concat(`ansall`,2) WHERE `id` = $textid");
      }
    }
    else{
      mysqli_query($db, "UPDATE `textpaper` SET `ansall`=concat(`ansall`,0) WHERE `id` = $textid");
    };
  }
  else if ($call==27){//檢查答案並回傳
    $ans = $_POST["ans"];
    $textid = $_POST["textid"];
    mysqli_query($db, "UPDATE `textpaper` SET `ansall`=concat(`ansall`,$ans) WHERE `id` = $textid");
  }
  else if ($call==28){//更改時間
    $id = $_POST["id"];
    $time = $_POST["time"];
    mysqli_query($db, "UPDATE `textpaper` SET `nowtime`='$time' WHERE `id` = $id");
  }
  else if ($call==29){//更改獲取答題
    $id = $_POST["id"]; 
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `textpaper` WHERE `id` = $id"));
    echo $row["ansall"];
    mysqli_query($db, "UPDATE `textpaper` SET `ansall`='' WHERE `id` = $id");
  }
  else if ($call==30){ //後臺監視系統
    $id = $_POST["id"];
    mysqli_query($db, "UPDATE `textpaper` SET `ansall`='' WHERE `id` = $id");
    $row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `textpaper` WHERE `id` = $id"));
    echo $row["ansall"];
  }
?>