<?php

   /**
    * $_SESSION Es un array asociativo que contiene variables de sesión disponibles para el script actual. 
    * session_start() - Iniciar una nueva sesión o reanudar la existente
    */
   function usuario_autenticado()
   {
       if (!revisar_usuario()) {
           header('Location:login.php');
           exit();
       }
   }

   function revisar_usuario()
   {
       return isset($_SESSION['nombre']);
   }

   session_start();
   usuario_autenticado();
