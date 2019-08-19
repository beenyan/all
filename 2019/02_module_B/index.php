<?php
$start = microtime(true);

set_time_limit(6000);//執行此程序超過60秒，返回失敗
ob_start();
if(isset($_FILES['video'])) {//如果有檔案
  $v = $_FILES['video'];
  if($v['error'] === 0) {//檔案沒錯誤
    $ext = pathinfo($v['name'], PATHINFO_EXTENSION);//取得附檔名
    $dstDir = __DIR__.'/result/'.time();//__DIR__->到目前的絕對位置
    @mkdir($dstDir, 0777, true);//生成資料夾
    move_uploaded_file($v['tmp_name'], "$dstDir/orig.$ext");//上傳檔案
    $ffmpeg = __DIR__.'/bin/ffmpeg';
    $ffprobe = __DIR__.'/bin/ffprobe';
    $metaTxt = shell_exec("\"$ffprobe\" -v error -select_streams v:0 -show_entries stream=width,height,duration,bit_rate -print_format json \"$dstDir/orig.$ext\"");//影片資料[長，寬，高，大小，執行時間]
    $meta = json_decode($metaTxt);
    $meta = $meta->streams[0];
    
    file_put_contents("$dstDir/meta.json", json_encode($meta));//生成檔案
    
    $time = floatval($meta->duration);
    $interval = $time * .25;
    foreach(range(1, 3) as $p) {//截圖
      $t = $interval * $p;
      $cmd = "\"$ffmpeg\" -v error -y -ss $t -i \"$dstDir/orig.$ext\" -vframes 1 -vf scale=640:-1 \"$dstDir/screenshot_$p.jpg\"";
      shell_exec($cmd);//呼叫SHELL執行($CMD)
    }
    $resolutions = [360, 480, 720];
    $bRate = [.50, .60, .75];
    foreach(range(0, count($resolutions) - 1) as $i) {//壓縮影片
      $p = $resolutions[$i];
      $r = $bRate[$i] * $meta->bit_rate;

      if($meta->height <= $p) continue;
      $cmd = "\"$ffmpeg\" -i \"$dstDir/orig.$ext\" ".
              "-b:v ${r} ".//畫質
              " \"$dstDir/${p}p.mp4\"";
      shell_exec($cmd);
    }
  }
?>

<?php
} else {
?>
<form method="POST" enctype="multipart/form-data">
<p>
  <label for="video">Video</label>
  <input type="file" accept="video/*" name="video" id="video"/>
</p>
<input type="submit"/>
</form>
<?php
  $ffmpeg = __DIR__."\bin\\ffmpeg";
  $ffplay = __DIR__."\bin\\ffplay";//撥放
  $cmddo = "";//對影片下指令
  $v0 = __DIR__."\\result\\1565408008\\360p.mp4";//撥放的影片
  $cmd = $ffplay." ".$cmddo." ".$v0;
  shell_exec($cmd);
}

$time_elapsed_secs = microtime(true) - $start;
var_dump($time_elapsed_secs);