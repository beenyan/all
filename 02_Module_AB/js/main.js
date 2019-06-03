let cBox = {};

$(function() {
  let prevViewTab = $('.describe');
  cBox.tabBtn = $('.tabs-nav > a').on('click', function() {
    let cls = $(this).attr('href');
    $('a[href=".'+ $(prevViewTab).attr('class') +'"]').removeClass('tab--active');
    prevViewTab.hide('slide', {}, 500, () => {
      prevViewTab = $(cls).show('slide', {direction: 'right'}, 500);
      $(this).addClass('tab--active');
    });
    return false;
  })
})