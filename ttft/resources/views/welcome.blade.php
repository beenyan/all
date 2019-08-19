<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible">
    <script src="js/jquery-3.4.1.js"></script>
    <link rel="stylesheet" href="js/jquery-ui.css">
    <script src="js/jquery-ui.js"></script>
    <link rel="stylesheet" src="js/jquery-ui.min.css">
    <script src="js/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="main.css">
    <title>title</title>
</head>
<style>
    #dialog0{
        text-align: center;
    }
    .uu{
        cursor: pointer;
        position: relative;
        width: 200px;
        height: 300px;
        box-shadow: 5px 5px 5px;
        display: inline-block;
        margin: 5px;
        border-style: solid;
        border-color: blue;
    }
</style>
<body>
    <input type="text" id="name" placeholder="暱稱"><br><br>
    <input type="email" id="FILTER_VALIDATE_EMAIL" placeholder="E_mail"><br><br>
    <input type="password" id="password" placeholder="密碼"><br><br>
    <input type="text" id="ck_password" placeholder="確認密碼"><br><br>
    <input type="button" value="提交" id="send">
    <input type="button" value="asd" id="asd">
    <div id="dialog0">
        <h1></h1><hr>
        <div class="uu"></div>
        <div class="uu"></div>
        <div class="uu"></div>
        <div class="uu"></div>
        <hr>
        <button>送出</button>
    </div>
</body>
<script>
    $("#asd").mousedown(function(){
        $.post({
            url : "http://localhost/ttft/public/userlogin",
            async : false,
            data : {_token : "{{csrf_token()}}",name : $("#name").val()},
            success : function(e){
                console.log(e);
            },
        });
    });
    let question = [];
    let ans;
    let score = 0;
    let new_q = [];
    $("#dialog0").dialog({
        width : 1000,
        height : 650,
        resizable : false,
        autoOpen : false,
    });
    $(".ui-dialog-titlebar").hide();
    $("#send").mousedown(function(){
        for (let i = 0 ; i < $("input").length - $(":button").length ; i++){
            if ($(`input:eq(${i})`).val() === "") return false;
        };
        if ($("#password").val() != $("#ck_password").val()) {
            alert("密碼不同");
            return false;
        }
        if ($("#password").val().length < 6){
            alert("密碼過短");
            return false;
        }
        $.post({
            url : "http://localhost/ttft/public/singup",
            async : false,
            data : {
                name : $("#name").val(),
                mail : $("#FILTER_VALIDATE_EMAIL").val(),
                password : $("#password").val(),
                _token : "{{csrf_token()}}",
            },
            success : function(e){
                if (e == "email重複" || e == "email錯誤"){
                    alert(e);
                }
                else{
                    question = JSON.parse(e);
                    $("#dialog0").dialog("open");
                    next_question();
                };
            },
        });
    });
    function next_question(){
        if (ans == "") return false;
        if (new_q != ""){
            if (new_q["ans"] == ans){
                score += 20;
            };
        }
        if (question.length){
            new_q = question.shift();
            $("#dialog0 h1").text(new_q["title"]);
            $("#dialog0 .uu:eq(0)").text(new_q["q1"]);
            $("#dialog0 .uu:eq(0)").data("id","q1");
            $("#dialog0 .uu:eq(1)").text(new_q["q2"]);
            $("#dialog0 .uu:eq(1)").data("id","q2");
            $("#dialog0 .uu:eq(2)").text(new_q["q3"]);
            $("#dialog0 .uu:eq(2)").data("id","q3");
            $("#dialog0 .uu:eq(3)").text(new_q["q4"]);
            $("#dialog0 .uu:eq(3)").data("id","q4");
        }
        else{
            if (score < 80){
                new_q = "";
                ans = "";
                $(".uu").css("border-color","blue");
                $.post({
                    url : "http://localhost/ttft/public/temp",
                    async : false,
                    data : {_token : "{{csrf_token()}}"},
                    success : function(e){
                        question = JSON.parse(e);
                        next_question();
                    },
                });
            }
            else {
                $.post({
                    url : "http://localhost/ttft/public/login",
                    async : false,
                    data : {_token : "{{csrf_token()}}",name : $("#name").val()},
                });
            }
        }
    };
    $(".uu").mousedown(function(){
        $(".uu").css("border-color","blue");
        $(this).css("border-color","red");
        ans = $(this).data("id");
    });
    $("#dialog0 :button").mousedown(function(){
        next_question();
        $(".uu").css("border-color","blue");
        ans = "";
    });
</script>
</html>