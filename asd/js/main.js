$(function() {

  $('.button').button();

  $('.login-form').on('submit', function(e) {
    $("#lg-captcha").val($(this).find('.cc-drop-box img').toArray().map(x => $(x).data('id')).join(''));
    Ajx('login', 'signIn', $('.login-form')).done(function(data) {
      data = JSON.parse(data);
      if(data.success) {
        if(data.permission) {
          location.href = "manager.php";
        } else {
          location.href = "index.php";
        }
      } else {
        if(data.error === 2) {
          location.href = "login-error.php";
        } else {
          captcha();
        }
      }
      alert(data.msg);
    });
    e.preventDefault();
  })

})

function captcha() {
  let box = {
    drop: $(".cc-drop-box").empty(),
    drag: $(".cc-drag-box").empty()
  }
  for(let w = 0; w < 4; ++w) {
    let img = $("<img>").attr('src', 'image/captcha.php?index=' + w).data('id', w);
    box.drop.append($("<div>"));
    box.drag.append(img);
    img.draggable({
      snap: '#cc-drop-box div',
      snapMode: 'inner',
      revert: 'invalid'
    });
  }
  box.drop.find('div').droppable({
    drop: function(e, ui) {
      ui.helper.appendTo(this).css({
        left: 0,
        top: 0
      });
    }
  })
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
        param.data.append(val. val2[val]);
      }
    }
  } else {
    param.data = val1;
    param.data.cls = cls;
    param.data.fn = fn;
  }

  return $.post(param);
}