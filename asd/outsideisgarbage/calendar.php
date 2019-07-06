<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="../css/jquery-ui.css">
  <link rel="stylesheet" href="main.css">
  <title>日工作計劃表</title>
</head>
<body>
  <button type="button" onclick="$('.adit-calender-container').data({'title': '新增工作', adit: 0}).dialog('open')" class="button">新增工作</button>
  <button type="button" onclick="$('.adit-calender-container').data({'title': '修改工作', adit: 1}).dialog('open')" class="adit-btn ui-state-disabled">修改所選工作</button>
  <button type="button" class="del-btn ui-state-disabled">刪除所選工作</button>
  <div class="calendar-container">
    <table class="calendar-table" rules="all">
      <thead>
        <tr>
          <th>時間</th>
          <th>工作計劃</th>
        </tr>
      </thead>
      <tbody>
        <tr class="ct-row">
          <td class="ct-time">00:00-02:00</td>
          <td class="ct-content" data-time="0"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">02:00-04:00</td>
          <td class="ct-content" data-time="2"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">04:00-06:00</td>
          <td class="ct-content" data-time="4"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">06:00-08:00</td>
          <td class="ct-content" data-time="6"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">08:00-10:00</td>
          <td class="ct-content" data-time="8"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">10:00-12:00</td>
          <td class="ct-content" data-time="10"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">12:00-14:00</td>
          <td class="ct-content" data-time="12"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">14:00-16:00</td>
          <td class="ct-content" data-time="14"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">16:00-18:00</td>
          <td class="ct-content" data-time="16"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">18:00-20:00</td>
          <td class="ct-content" data-time="18"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">20:00-22:00</td>
          <td class="ct-content" data-time="20"></td>
        </tr>
        <tr class="ct-row">
          <td class="ct-time">22:00-24:00</td>
          <td class="ct-content" data-time="22"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <button type="button" class="button" onclick="$('.order-table-container').dialog('open');">排序/檢索</button>
  <script src="../js/jquery-3.3.1.js"></script>
  <script src="../js/jquery-ui.js"></script>
  <script src="main.js"></script>
  <div style="display: none;">
    <div class="adit-calender-container">
      <form class="ac-form">
        <div>
          <label for="ac-name">工作名稱</label>
          <input type="text" name="name" id="ac-name">
        </div>
        <div>
          <label for="ac-state">處理情形</label>
          <select name="state" id="ac-state">
            <option value="0">未處理</option>
            <option value="1">處理中</option>
            <option value="2">已完成</option>
          </select>
          <label for="ac-priority">優先情形</label>
          <select name="priority" id="ac-priority">
            <option value="0">普通件</option>
            <option value="1">速件</option>
            <option value="2">最速件</option>
          </select>
        </div>
        <div>
          <label for="ac-start">開始時間</label>
          <select name="startTime" id="ac-start">
            <option value="0">00:00</option>
            <option value="1">01:00</option>
            <option value="2">02:00</option>
            <option value="3">03:00</option>
            <option value="4">04:00</option>
            <option value="5">05:00</option>
            <option value="6">06:00</option>
            <option value="7">07:00</option>
            <option value="8">08:00</option>
            <option value="9">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
            <option value="21">21:00</option>
            <option value="22">22:00</option>
            <option value="23">23:00</option>
          </select>
          <label for="ac-end">結束時間</label>
          <select name="endTime" id="ac-end" disabled>
            <option value="0">00:00</option>
            <option value="1">01:00</option>
            <option value="2">02:00</option>
            <option value="3">03:00</option>
            <option value="4">04:00</option>
            <option value="5">05:00</option>
            <option value="6">06:00</option>
            <option value="7">07:00</option>
            <option value="8">08:00</option>
            <option value="9">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
            <option value="21">21:00</option>
            <option value="22">22:00</option>
            <option value="23" selected>23:00</option>
          </select>
        </div>
        <textarea name="content" id="ac-content" cols="40" rows="10"></textarea>
      </form>
    </div>
    <div class="order-table-container">
      <span>依：</span>
      <select name="" id="ot-state">
        <option value="0">皆可</option>
        <option value="1">未處理</option>
        <option value="2">處理中</option>
        <option value="3">已完成</option>
      </select>
      <select name="" id="ot-priority">
        <option value="0">皆可</option>
        <option value="1">普通件</option>
        <option value="2">速件</option>
        <option value="3">最速件</option>
      </select>
      <button class='search-btn'>搜尋</button>
      <table class="ot-table" rules="all">
        <thead>
          <th>工作名稱</th>
          <th>處理情形</th>
          <th>優先情形</th>
          <th>開始時間</th>
          <th>結束時間</th>
          <th>工作內容</th>
        </thead>
        <tbody class="ot-rows">

        </tbody>
      </table>
    </div>
  </div>
</body>
</html>