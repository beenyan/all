<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
function question(){
    $arr = DB::select("SELECT * FROM `question`");
    $five = [];
    while (count($five) < 5){
        $temp = rand(0,count($arr) - 1);
        array_push($five,$arr[$temp]);
        array_splice($arr,$temp,1);
    }
    return $five;
};
Route::get('/', function () {
    return view('welcome');
});

Route::post('/singup',function(){
    if (!(filter_var($_POST["mail"],FILTER_VALIDATE_EMAIL))){
        echo "email錯誤";
    }
    else{
        $name = $_POST["name"];
        $mail = $_POST["mail"];
        if (DB::select("SELECT * FROM `user` WHERE `mail` LIKE '$mail'")){
            echo "email重複";
        }
        else{
            $password = password_hash($_POST["password"],PASSWORD_BCRYPT,["cost" => 12]);
            //DB::insert("INSERT INTO `user`(`name`, `mail`, `password`) VALUES ('$name','$mail','$password')");
            echo json_encode(question());
        };
    };
});

Route::post('/temp',function(){
    echo json_encode(question());
});

Route::post('/userlogin',function(){
    return view("userlogin");
});

Route::post('/ck',function(){
    if (Auth::attempt(['email' => $_POST["mail"],'password' => $_POST["password"]])){
        return "成功登入";
    }
    else {
        return "登入失敗";
    }
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
