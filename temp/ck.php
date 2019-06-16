<?php
  session_start();
  $db=mysqli_connect("localhost","admin","1234","temp");
  mysqli_query($db,"SET NAMES UTF8");
  $date = date("Y/m/d h:i:sa");
  $name = $_POST["name"];
  $pass = $_POST["pass"];
  $ckpass = $_POST["ckpass"];
  if ($row=mysqli_fetch_array(mysqli_query($db,"SELECT * FROM `login` WHERE `account` LIKE '$name'"))){
    if ($row["password"]==$pass){
      if ($_SESSION["word"]==$ckpass){
        mysqli_query($db,"INSERT INTO `log`(`name`, `time`, `do`, `success`) VALUES ('$name','$date','登入','成功');");
        echo "登入成功";
      }
      else{
        mysqli_query($db,"INSERT INTO `log`(`name`, `time`, `do`, `success`) VALUES ('$name','$date','登入','失敗');");
        echo "驗證碼錯誤";
      }
    }
    else{
      mysqli_query($db,"INSERT INTO `log`(`name`, `time`, `do`, `success`) VALUES ('$name','$date','登入','失敗');");
      echo "密碼錯誤";
    };
  }
  else{
    echo "帳號錯誤";
  };