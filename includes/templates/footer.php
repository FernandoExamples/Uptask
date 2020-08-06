<script src="js/sweetalert2.all.min.js"></script>
<?php
   $actual = obtenerPaginaActual();
    switch ($actual) {
        case 'crear-cuenta':
        case 'login':
            echo '<script src="js/formulario.js"></script>';
        break;
        default:
            echo '<script src="js/scripts.js"></script>';
    }
    $conn->close();
?>
</body>
</html>