<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="js/jquery-3.4.1.js"></script>
  <link rel="stylesheet" href="js/jquery-ui.css">
  <script src="js/jquery-ui.js"></script>
  <link rel="stylesheet" src="js/jquery-ui.min.css">
  <script src="js/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="main.css">
  <title>title</title>
</head>
<body>
  <input type="button" value="Calculator" id="b1" class="bt">
  <input type="button" value="3n+1" id="b2" class="bt">
  <input type="button" value="Loading Animation" id="b3" class="bt">
  <input type="button" value="JS Array Sort" id="b4" class="bt">
  <input type="button" value="PHP Array" id="b5" class="bt">
  <div id="l1" class="ll">
    <h3>Calculator</h3>
    <input type="text" name="" id="expression0"><input type="button" id="calculator0" value="calculator"><br>
    <h3>result:</h3>
    <input type="text" id="result0">
  </div>
  <div id="l2" class="ll">
    <h3>3n+1</h3>
    <input type="text" name="" id="number1"><input type="button" id="calculator1" value="calculator"><br>
    <h3>result:</h3>
    <input type="text" id="result1">
  </div>
  <div id="l3" class="ll">
    <h3>Loading Animation</h3>
    <input type="button" id="controller2" value="pause">
    <div id="animation"></div>
  </div>
  <div id="l4" class="ll">
    <h1>JS Array Sort</h1>
    <textarea id="items" placeholder="Array Item">[{"name":"Edward","value":21},{"name":"The","value":-12},{"name":"And","value":45},{"name":"Magnetic","value":13},{"name":"Zeros","value":37},{"name":"Sharpe","value":37}]</textarea>
      <!--[{"name":"Edward","value":21},{"name":"The","value":-12},{"name":"And","value":45},{"name":"Magnetic","value":13},{"name":"Zeros","value":37},{"name":"Sharpe","value":37}]-->
      <br />
      <button id="sort" 
      onclick="sortItems(document.getElementById('items').value)"
    >Sort Item</button>
    <p>Result:</p>
    <textarea id="result4" placeholder="排序結果"></textarea>
    <script>
      function sortItems(items) {
        let obj = ArraySort(items);
        document.getElementById('result4').value = obj;
      }
      function ArraySort(items) {
        let arr = JSON.parse(items);
        arr.sort(function(a,b){
          return a.value - b.value; 
        });
        return JSON.stringify(arr);
      }
    </script>
  </div>
  <div id="l5" class="ll">
    <body>
      <?php
        function sortArray($array1, $array2){
          $array1 = array_merge($array1,$array2);
          sort($array1);
          return $array1;
        } 
      ?>
      <h1>PHP Array</h1>
      <p>Result:</p>
      <textarea id="result5" placeholder="排序結果"><?php 
        print_r(sortArray([
          '0.1',
          '2.5', 
          '-3.6',
          '-4.2',
          '-2',
        ],
        [
          '5.7',
          '6.76', 
          '6.761',
          '8',
          '-2',
        ]));
        ?></textarea>
  </div>
</body>
<script src="js/function.js"></script>
<script src="js/main.js"></script>
</html>