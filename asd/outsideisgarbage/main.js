const STATE = ['未處理', '處理中', '已完成'];
const PRIORITY = ['普通件', '速件', '最速件'];
const ORDERSP = ['未處理', '處理中', '已完成', '普通件', '速件', '最速件']

$(function() {

  $('.button').button();

  $(".adit-calender-container").dialog({
    title: '',
    autoOpen: false,
    width: 'auto',
    buttons: {
      "確定": function () {
        if($(this).data('adit')) {
          Ajx('calendar', 'editData', $(this).find('.ac-form'), {id: $(this).data('id')}).done(function(data) {
            calendar();
          });
        } else {
          Ajx('calendar', 'addData', $(this).find('.ac-form')).done(function(data) {
            calendar();
          });
          $(".adit-btn, .del-btn").addClass("ui-state-disabled");
        }
        $(this).dialog("close");
      },
      "取消": function () {
        $(this).dialog("close");
      }
    },
    open: function() {
      $(this).find('form')[0].reset();
      $(this).dialog('option', 'title', $(this).data('title'));
      if($(this).data('adit')) {
        let selectBox = $('.ct-box--focus').data();
        $(this).data('id', selectBox['id']);
        $('#ac-name').val(selectBox.name);
        $('#ac-state').val(selectBox.state);
        $('#ac-priority').val(selectBox.priority);
        $('#ac-start').val(Number(selectBox.startTime));
        $('#ac-end').val(Number(selectBox.endTime)).prop('disabled', false);
        $('#ac-content').val(selectBox.content);
      }
    }
  });

  $('.order-table-container').dialog({
    title: '排序(點擊欄位切換升降序)',
    autoOpen: false,
    width: 'auto',
    modal: true,
    appendTo: "body",
    draggable: false,
    buttons: {
      "確定": function () {
        $(this).dialog('close');
      }
    },
    open: function() {
      $('.ot-rows').empty();
      Ajx('calendar', 'allData').done(function(data) {
        data = JSON.parse(data);
        data.forEach(function(data) {
          let row = $('<tr>');
          row.append($('<td>').text(data.name));
          row.append($('<td>').text(STATE[data.state]));
          row.append($('<td>').text(PRIORITY[data.priority]));
          row.append($('<td>').text(data.startTime));
          row.append($('<td>').text(data.endTime));
          row.append($('<td>').text(data.content));
          $('.ot-rows').append(row);
        })
        $(".order-table-container").css('max-height', '500px').parent().position({my: "center",
          at: "center",
          of: window
        });
      });
    }
  });

  $('#ac-start').on('change', function(val) {
    $('#ac-end > option').show().filter(x => x <= $(val.target).val()).hide();
    $('#ac-end').prop('disabled', false);
  });

  $(".del-btn").on('click', function() {
    if(confirm('確定刪除？')) {
      Ajx('calendar', 'delData', {id: $('.ct-box--focus').data('id')}).done(function(data) {
        data = JSON.parse(data);
        calendar();
        alert(data.msg);
      });
      $(".adit-btn, .del-btn").addClass("ui-state-disabled");
    }
  });

  $('.ot-table th:gt(0):lt(3)').on('click', function() {
    let index = $(this).index();
    let arr = $('.ot-table tr:gt(0)').toArray().sort(function(x, y) {
      x = $(x).children().eq(index).text(); y = $(y).children().eq(index).text();
      return ($.isNumeric(x) && $.isNumeric(y) ? x - y : ORDERSP.indexOf(x) - ORDERSP.indexOf(y));
    })
    if(this.asc) {
      arr.reverse();
    }
    this.asc = !this.asc;
    arr.forEach(x => $('.ot-rows').append(x));
  });

  $('.search-btn').on('click', function() {
    $('.ot-rows').empty();
    Ajx('calendar', 'allData').done(function(data) {
      data = JSON.parse(data);
      let x = Number($('#ot-state').val()), y = Number($('#ot-priority').val());
      data.forEach(function(data) {
        if((x === 0 || data.state == x - 1) && (y === 0 || data.priority == y - 1)) {
          let row = $('<tr>');
          row.append($('<td>').text(data.name));
          row.append($('<td>').text(STATE[data.state]));
          row.append($('<td>').text(PRIORITY[data.priority]));
          row.append($('<td>').text(data.startTime));
          row.append($('<td>').text(data.endTime));
          row.append($('<td>').text(data.content));
          $('.ot-rows').append(row);
        }
      })
      $(".order-table-container").css('max-height', '500px').parent().position({my: "center",
        at: "center",
        of: window
      });
    });
  })

  calendar();

})

function calendar() {
  $(".ct-box").remove();
  let allData = [{id: null, name: null, state: null, priority: null, startTime: null, endTime: null, content: null, col: null}];

  Ajx('calendar', 'allData').done(function(data) {
    allData = JSON.parse(data);

    for(let val of allData) {
      addWork(val);
    }

    let maxCol = allData.reduce((x, y) => Math.max(x, y.col), 0) + 1;

    $(".ct-content").droppable({
      drop: function(e, ui) {
        ui.draggable.appendTo(Math.round(ui.draggable.position().top) % 50 ? $(this).parent().prev().find(".ct-content") : this).css({
          top: (Math.round(ui.draggable.position().top) % 50 ? '50%' : 0),
          left: Math.round(parseFloat(ui.helper.css('left')) / 100) * 100
        });
      },
      over: function(e, ui) {
        ui.draggable.children('.e-t').text($(this).data('time').toString().padStart(2, '0') + '-' + $(this).data('time').toString().padStart(2, '0'));
      }

    }).css({
      'width': 100 * maxCol
    });

  })

}

let prevClick = $();
function addWork(data) {
  let box = $('<div>').addClass('ct-box').data({
    'height': 25 * (+data.endTime - +data.startTime),
    'id': data.id,
    'name': data.name,
    'state': data.state,
    'priority': data.priority,
    'startTime': data.startTime,
    'endTime': data.endTime,
    'content': data.content,
  }).css({
    'position': 'absolute',
    'height': 25 * (+data.endTime - +data.startTime),
    'left': 100 * data.col,
    'top': (data.startTime % 2 ? '50%' : 0)
  }).draggable({
    snap: '.ct-content',
    snapMode: 'inner',
    grid: [100, 25],
    revert: 'invalid',
    containment: ".calendar-table",
    opacity: 0.6,
    distance: 30,
    delay: 200,
    start: function() {
      prevClick.removeClass('ct-box--focus').css('z-index', 1);
      $('.adit-btn').addClass('ui-state-disabled');
      $('.del-btn').addClass('ui-state-disabled');
      $(this).height(50);
      let xxx = $(this);
      setTimeout(() => xxx.height(xxx.data('height')), 0);
    }
  });

  box.append($('<span>').text(data.startTime.padStart(2, '0') + '-' + data.endTime.padStart(2, '0')).addClass('e-t')).append('<br>');
  box.append($('<span>').text(data.name)).append('<br>');
  box.append($('<span>').text(STATE[data.state])).append('<br>');
  box.append($('<span>').text(PRIORITY[data.priority]));
  box.on('click', function() {
    prevClick.removeClass('ct-box--focus').css('z-index', 1);
    prevClick = $(this);
    $(this).addClass('ct-box--focus').css('z-index', 2);
    $('.adit-btn').removeClass('ui-state-disabled');
    $('.del-btn').removeClass('ui-state-disabled');
  })
  $('.ct-content').eq(parseInt(data.startTime / 2)).append(box);
}

function Ajx(cls, fn, val1 = {}, val2 = {}) {
  let param = {url: 'controller.php'};

  if(val1 instanceof jQuery) {
    param.processData = false;
    param.contentType = false;
    let frm = new FormData(val1[0]);
    frm.append('cls', cls);
    frm.append('fn', fn);
    param.data = frm;
    if(val2) {
      for(let val in val2) {
        param.data.append(val, val2[val]);
      }
    }
  } else {
    param.data = val1;
    param.data.cls = cls;
    param.data.fn = fn;
  }

  return $.post(param);
}