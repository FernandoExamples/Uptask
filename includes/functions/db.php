<?php

   $conn = new mysqli('localhost', 'fernando', '123456', 'uptask');
   if ($conn->connect_error) {
       die('Error de Conexión ('.$conn->connect_errno.') '
            .$conn->connect_error);
   }
   $conn->set_charset('utf8');
 