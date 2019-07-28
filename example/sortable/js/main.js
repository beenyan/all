//<script>
  $(".sort").sortable({
    connectWith : ".sort",
  });
  function aa(){
    let arr = "";
    for (let i = 0 ; i < $(".sort:eq(1) .img").length ; i++){
      arr += $(`.sort:eq(1) .img:eq(${i})`).text();
    };
    alert(arr);
  }
//</script>