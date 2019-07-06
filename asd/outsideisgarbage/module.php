<?php
  class calendar {
    public function allData() {
      global $db;
      $sql = $db->query('SELECT * FROM `calendar`');
      $result = [];
      while ($row = $sql->fetch_assoc()) {
        $result[] = $row;
      }
      return $result;
    }

    public function addData($data) {
      global $db;

      $sql = $db->query("SELECT id FROM calendar WHERE (startTime BETWEEN ${data['startTime']} AND ${data['endTime']}) OR (endTime BETWEEN ${data['startTime']} AND ${data['endTime']})");
      while ($row = $sql->fetch_assoc()) {
        $result[] = $row['id'];
      }

      $sql = $db->query("INSERT INTO `calendar` (`id`, `name`, `state`, `priority`, `startTime`, `endTime`, `content`, `col`) VALUES (
        NULL,
        '${data['name']}',
        '${data['state']}',
        '${data['priority']}',
        '${data['startTime']}',
        '${data['endTime']}',
        '${data['content']}',
        '".$this->getMaxCol($result ?? [])."');");

      $data['id'] = $db->insert_id;

      return $data;
    }

    public function editData($data) {
      global $db;

      $sql = $db->query("SELECT id FROM calendar WHERE (startTime BETWEEN ${data['startTime']} AND ${data['endTime']}) OR (endTime BETWEEN ${data['startTime']} AND ${data['endTime']})");
      while ($row = $sql->fetch_assoc()) {
        $result[] = $row['id'];
      }

      $data['col'] = $this->getMaxCol($result ?? []);

      $sql = $db->query("UPDATE `calendar` SET
        `name` = '${data['name']}',
        `state` = '${data['state']}',
        `priority` = '${data['priority']}',
        `startTime` = '${data['startTime']}',
        `endTime` = '${data['endTime']}',
        `content` = '${data['content']}',
        `col` = '${data['col']}'
        WHERE `calendar`.`id` = ${data['id']};");

      return $data;
    }

    public function delData($data) {
      global $db;
      $sql = $db->query("DELETE FROM `calendar` WHERE `calendar`.`id` = ${data['id']}");
      return [
        'success' => $sql,
        'msg' => ($sql ? '刪除成功' : '刪除失敗'),
      ];
    }

    public function getMaxCol($data) {
      global $db;
      if (count($data)) {
        $sql = $db->query('SELECT MAX(col) col FROM `calendar` WHERE id in ('.implode(',', $data).')');
        $sql = $sql->fetch_assoc();
        $sql = $sql['col'] + 1;
      } else {
        $sql = 0;
      }
      return $sql;
    }
  }
