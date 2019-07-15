<?php
  $c = $_GET["c"];
  if ($c == 0){
    $mean = $_POST["mean"];
    $name = $_POST["name"];
    $myfile = fopen("txt/$name.txt", "w");
    fwrite($myfile,$mean);
  }
  else if ($c == 1){
    $name = $_POST["name"];
    $file = fopen("txt/$name", "r");
    echo fread($file,500);
  }