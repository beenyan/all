//<script>
  $(".ll").hide();
  $(`.ll:eq(0)`).show();
  $(".bt").mousedown(function(){
    $(".ll").hide();
    $(`.ll:eq(${$(this).index()})`).show();
  });
  $("#calculator0").mousedown(function(){
    let num = [];
    let arr = [];
    arr = $("#expression0").val().split(/-|\+|\*|\//);
    for (let i = 0 ; i < $("#expression0").val().length ; i++){
      if (!($("#expression0").val()[i] <= 9 && $("#expression0").val()[i] >= 0)){
        num.push($("#expression0").val()[i])
      }
    };
    for (let i = 0 ; i < arr.length ; i++){
      arr[i] = parseFloat(arr[i]);
    };
    let first = arr[0];
    for (let i = 1 ; i < arr.length ; i++) {
      if (num[i - 1] == "+"){
        first += arr[i]
      }
      else if (num[i - 1] == "-"){
        first -= arr[i]
      }
      else if (num[i - 1] == "*"){
        first *= arr[i]
      }
      else if (num[i - 1] == "/"){
        first /= arr[i]
      }
    }
    $("#result0").val(first);
  });
  $("#calculator1").mousedown(function(){
    let arr = [];
    let first = parseInt($("#number1").val());
    if (frist == "") return false;
    while (first != 1){
      if (first %2 == 0){
        first /= 2;
        arr.push(first);
      }
      else{
        first = first * 3 + 1;
        arr.push(first);
      };
    };
    $("#result1").val(JSON.stringify(arr).substr(1,JSON.stringify(arr).length - 2));
  });
  $("#controller2").mousedown(function(){
    if ($("#animation").css("animation-play-state") == "paused"){
      $("#animation").css("animation-play-state","running");
    }
    else {
      $("#animation").css("animation-play-state","paused");
    }
  });
//</script>