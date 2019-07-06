<?php
  class login {
    public function signIn($data) {
      global $db;
      for ($w = 0; $w < strlen($data['captcha']); ++$w) {
        $data['captcha'][$w] = $_SESSION['captcha'][$data['captcha'][$w]];
      }
      $scc = $_SESSION['captcha'];
      sort($scc);
      $scc = join($scc);
      $sql = $db->query("SELECT * FROM member WHERE account = '${data['account']}' AND password = '${data['password']}'");
      if ($sql && $sql = $sql->fetch_assoc()) {
        if ($data['captcha'] == $scc) {
          $_SESSION['user'] = $sql;
          file_put_contents('record.ini', file_get_contents('record.ini').$sql['account'].'於'.date('Y/m/d H:i:s')."登入成功!\r\n");
          return [
            'success' => true,
            'permission' => $sql['permission'] > 1,
            'msg' => '登入成功！',
          ];
        }
        if (++$_SESSION['error'] > 2) {
          $_SESSION['error'] = 0;
          file_put_contents('record.ini', file_get_contents('record.ini').$sql['account'].'於'.date('Y/m/d H:i:s')."登入失敗!\r\n");
          return [
            'success' => false,
            'msg' => '錯誤3次！',
            'error' => 2,
          ];
        }
        file_put_contents('record.ini', file_get_contents('record.ini').$sql['account'].'於'.date('Y/m/d H:i:s')."登入失敗!\r\n");
        return [
          'success' => false,
          'msg' => '驗證碼錯誤！',
          'error' => 0,
        ];
      }
      if (++$_SESSION['error'] > 2) {
        $_SESSION['error'] = 0;
        file_put_contents('record.ini', file_get_contents('record.ini').$sql['account'].'於'.date('Y/m/d H:i:s')."登入失敗!\r\n");
        return [
          'success' => false,
          'msg' => '錯誤3次！',
          'error' => 2,
        ];
      }
      file_put_contents('record.ini', file_get_contents('record.ini').$sql['account'].'於'.date('Y/m/d H:i:s')."登入失敗!\r\n");
      return [
        'success' => false,
        'msg' => '帳號密碼錯誤！',
        'error' => 1,
      ];
    }

    public function isLogin() {
      return $_SESSION['user'] ?? false;
    }
  }
