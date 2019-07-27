<?php
  $name = $_POST["name"];
  $val = $_POST["val"];
  $fp = fopen("txt/".$name.".txt","w");
  fwrite($fp,$val);