<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/jquery-ui.css">
  <link rel="stylesheet" href="css/main.css">
  <title>後臺管理系統</title>
</head>
<body>
  <button class="button" onclick="$('#add-member-container').dialog('open')">新增</button>
  <a href="index.php" class="button">回首頁</a>
  <button class="button" onclick="$('#record-container').dialog('open');">記錄</button>
  <div class="search-container">
    <label for="search-text">搜尋</label>
    <input type="text" id="search-text">
    <button onclick="search();">搜尋</button>
  </div>
  <table class="member-data" rules="all" style="border: 1px #000 solid; border-collapse: collapse;">
    <thead>
      <tr>
        <th>新增</th>
        <th>刪除</th>
        <th>編號</th>
        <th>名稱</th>
        <th>帳號</th>
        <th>密碼</th>
        <th>權限</th>
      </tr>
    </thead>
    <tbody class="md-body">
    </tbody>
  </table>

  <div style="display: none;">
    <div id="add-member-container">
      <form action="" id="am-form">
        <div>
          <label for="am-name">名字</label>
          <input type="text" id="am-name" name="name">
        </div>
        <div>
          <label for="am-account">帳號</label>
          <input type="text" id="am-account" name="account">
        </div>
        <div>
          <label for="am-password">密碼</label>
          <input type="text" id="am-password" name="password">
        </div>
        <div>
          <input type="radio" id="am-user" name="permission" value="1">
          <label for="am-user">一般使用者</label>
          <input type="radio" id="am-admin" name="permission" value="2">
          <label for="am-admin">一般管理者</label>
        </div>
      </form>
    </div>
    <div id="edit-member-container">
      <form action="" id="em-form">
        <div>
          <label for="em-name">名字</label>
          <input type="text" id="em-name" name="name">
        </div>
        <div>
          <label for="em-account">帳號</label>
          <input type="text" id="em-account" name="account">
        </div>
        <div>
          <label for="em-password">密碼</label>
          <input type="text" id="em-password" name="password">
        </div>
        <div>
          <input type="radio" id="em-user" name="permission" value="1">
          <label for="em-user">一般使用者</label>
          <input type="radio" id="em-admin" name="permission" value="2">
          <label for="em-admin">一般管理者</label>
        </div>
        <input type="hidden" name="id" id="em-id">
      </form>
    </div>
    <div id="record-container">
      <textarea name="" id="record-text" cols="100" rows="25" readonly></textarea>
    </div>
  </div>
  <script src="js/jquery-3.3.1.js"></script>
  <script src="js/jquery-ui.js"></script>
  <script src="js/main.js"></script>
  <script>
    $("#add-member-container").dialog({
      title: "新增使用者",
      autoOpen: false,
      buttons: {
        "確定": function () {
          Ajx('manager', 'addMember', $("#am-form")).done(function (data) {
            data = JSON.parse(data);
            data.per = true;
            $(".md-body").append(Member(data));
          });
        },
        "取消": function () {
          $(this).dialog("close");
        }
      },
      open: function () {
        $('.ui-dialog-titlebar-close').hide();
      }
    })
    $("#edit-member-container").dialog({
      title: "修改使用者",
      autoOpen: false,
      buttons: {
        "確定": function () {
          Ajx('manager', 'editMember', $("#em-form")).done(function (data) {
            Ajx('manager', 'allMember').done(function (data) {
              data = JSON.parse(data);
              addMember(data);
            })
          });
          $(this).dialog("close");
          alert('修改成功');
        },
        "取消": function () {
          $(this).dialog("close");
        }
      },
      open: function () {
        $('.ui-dialog-titlebar-close').hide();
      }
    })
    $("#record-container").dialog({
      title: "記錄",
      autoOpen: false,
      width: "auto",
      buttons: {
        "關閉": function () {
          $(this).dialog("close");
        }
      },
      open: function () {
        $('.ui-dialog-titlebar-close').hide();
        $('#record-text').load("record.ini");
      }
    })
    Ajx('manager', 'allMember').done(function (data) {
      data = JSON.parse(data);
      addMember(data);
    })
    function addMember(data) {
      $(".md-body").empty();
      let mdBody = $(".md-body");
      for(let val of data) {
        mdBody.append(Member(val));
      }
    }
    function Member(val) {
      let row = $("<tr>").attr('id', 'rowid' + Number(val.id));
        if(val.per) {
          row.append($("<td>").text('修改').on('click', function () {
            let data = $(this).siblings().toArray().map(x => $(x).text());
            $("#em-id").val(data[1]);
            $("#em-name").val(data[2]);
            $("#em-account").val(data[3]);
            $("#em-password").val(data[4]);
            $(`input[name=permission]`).prop('checked', false);
            $(`input[name=permission][value=${data[5]}]`).prop('checked', true);
            $("#edit-member-container").dialog('open');
          }));
          row.append($("<td>").text('刪除').on('click', function () {
            let id = $(this).siblings().eq(1);
            Ajx('manager', 'delMember', {id: Number(id.text())});
            $(this).parents("tr").remove();
          }));
        } else {
          row.append($("<td>"));
          row.append($("<td>"));
        }
        delete val.per;
        for(let val2 in val) {
          row.append($("<td>").text(val[val2]));
        }
      return row;
    }
    function search() {
      let text = $("#search-text").val();
      if(text != '') {
        Ajx('manager', 'searchMember', {text}).done(function (data) {
          data = JSON.parse(data);
          addMember(data);
        })
      }
    }
    $(".member-data th:gt(1):lt(3)").on('click', function () {
      let col = $(this).index();
      let arr = $(".md-body > tr").toArray().sort(function (x, y) {
        let t = [$(x).children().eq(col).text(), $(y).children().eq(col).text()];
        if($.isNumeric(t[0]) && $.isNumeric(t[1])) {
          return Number(t[0]) - Number(t[1]);
        } else {
          return t[0].toString().localeCompare(t[1].toString());
        }
      });
      if(this.asc) {
        arr.reverse();
      }
      this.asc = !this.asc;
      arr.map(x => $(".md-body").append(x));
    })
  </script>
</body>
</html>