<?php
  include_once 'login.module.php';
  class manager {
    public function addMember($data) {
      global $db;
      $db->query("INSERT INTO `member` (`id`, `name`, `account`, `password`, `permission`)
      VALUES (NULL, '${data['name']}', '${data['account']}', '${data['password']}', '${data['permission']}')");
      return ['id' => str_pad($db->insert_id, 4, '0', STR_PAD_LEFT),
        'name' => $data['name'],
        'account' => $data['account'],
        'password' => $data['password'],
        'permission' => $data['permission'], ];
    }

    public function editMember($data) {
      global $db;
      $db->query("UPDATE `member` SET `name` = '${data['name']}', `account` = '${data['account']}', `password` = '${data['password']}', `permission` = '${data['permission']}' WHERE `member`.`id` = ${data['id']}");
      return ['id' => str_pad($db->insert_id, 4, '0', STR_PAD_LEFT),
        'name' => $data['name'],
        'account' => $data['account'],
        'password' => $data['password'],
        'permission' => $data['permission'], ];
    }

    public function delMember($data) {
      global $db;
      $db->query("DELETE FROM `member` WHERE `member`.`id` = ${data['id']}");
    }

    public function searchMember($data) {
      global $db;
      $login = (new login())->isLogin();
      $sql = $db->query("SELECT * FROM member WHERE account LIKE '%${data['text']}%'");
      while ($row = $sql->fetch_assoc()) {
        $result[] = $row;
        if ($login['permission'] >= $row['permission'] && 3 != $row['permission']) {
          $result[count($result) - 1]['per'] = true;
        } else {
          $result[count($result) - 1]['per'] = false;
        }
      }
      return $result ?? [];
    }

    public function allMember() {
      global $db;
      $login = (new login())->isLogin();
      if ($login) {
        $sql = $db->query('SELECT * FROM member');
        while ($row = $sql->fetch_assoc()) {
          $result[] = $row;
          if ($login['permission'] >= $row['permission'] && 3 != $row['permission']) {
            $result[count($result) - 1]['per'] = true;
          } else {
            $result[count($result) - 1]['per'] = false;
          }
        }
        return $result;
      }
    }
  }
