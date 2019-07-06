<?php
  if (!isset($_SESSION)) {
    session_start();
  }

  $db = new mysqli('localhost', 'admin', '1234', 'web05');
  $db->set_charset('utf8');
  date_default_timezone_set('Asia/Taipei');

  include_once 'module.php';

  if (isset($_POST['cls'], $_POST['fn'])) {
    $cls = [$_POST['cls'], $_POST['fn']];
    unset($_POST['cls'], $_POST['fn']);
    echo json_encode((new $cls[0]())->{$cls[1]}($_POST));
  }
