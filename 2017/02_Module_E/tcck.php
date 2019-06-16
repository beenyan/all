<?php
  $db = mysqli_connect("localhost","admin","1234","2017e01");
  mysqli_query($db,"SET NAMES UTF8");
  $i = json_decode(json_encode($_POST["json"]),true);
  $name = $i["name"];
  $password = hash("sha512",$i["password"]);
  if ($row = mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `login` WHERE binary `account` LIKE '$name'"))){//binary 區分大小寫
    if ($row["password"] == $password){
      echo "成功登入";
    }
    else {
      echo "密碼錯誤";
    }
  }
  else{
    echo "帳號錯誤";
  }