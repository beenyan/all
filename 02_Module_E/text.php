<!DOCTYPE html>
 
<html>
<head>
    <title>�h�a��Google�a��</title>
    <script src='http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.js'></script>   
    <script src="https://maps.google.com/maps/api/js?sensor=false"></script>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta charset="utf-8">
    
    <style>
        body,input { font-size: 9pt; }
        html { height: 100% }  
        body { height: 100%; margin: 0px; padding: 0px }  
        #map_canvas { height: 100% }        
    </style>
    
    <script>
        $(function () {
            
            var latlng = new google.maps.LatLng(30.041404,121.446438);
   �@�@�@�@�@var latlng2 = new google.maps.LatLng(40.041399,121.452435);
            //�]�w�a�ϰѼ�
            var mapOptions = {
                zoom: 16, //��l��j����
                center: latlng, //�����I�Ҧb��m
                mapTypeId: google.maps.MapTypeId.ROADMAP //���`2D�D���Ҧ�
            };
            //�b���wDOM�������O�J�a��
            var map = new google.maps.Map(
                document.getElementById("map_canvas"), mapOptions);
            //�[�J�Х��I(Marker)
            var marker = new google.maps.Marker({
                position: latlng, //�g�n��
                title: "�s���βy��", //��ܤ�r
                map: map //���w�n��m���a�Ϲ�H
            });
   �@�@�@�@�@var marker2 = new google.maps.Marker({
                position: latlng2, //�g�n��
                title: "�s����|�]", //��ܤ�r
                map: map //���w�n��m���a�Ϲ�H
            });
        });
    </script>

</head>

<body>
<iframe id="map_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1807.6098019769004!2d121.56138565804936!3d25.02662042637543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAxJzM1LjgiTiAxMjHCsDMzJzQ0LjkiRQ!5e0!3m2!1szh-TW!2stw!4v1557296300703!5m2!1szh-TW!2stw" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>

</body>
</html>