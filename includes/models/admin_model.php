<?php

$accion = $_POST['accion'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];

//abrir la conexion
include '../functions/db.php';

//Crear un usuario
if ($accion == 'crear') {
    //hashear password
    $opciones = [
        'cost' => 12,
    ];
    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

    try {
        $sql = 'INSERT INTO  usuario (usuario, password) VALUES (?,?)';
        $ps = $conn->prepare($sql);
        $ps->bind_param('ss', $usuario, $hash_password);

        if ($ps->execute()) {
            $respuesta = [
                'status' => true,
                'id_usuario' => $ps->insert_id,
            ];
        } else {
            $respuesta = [
                'status' => false,
                'error' => $ps->error,
            ];
        }

        $ps->close();
    } catch (Throwable $e) {
        $respuesta = [
            'status' => false,
            'error' => $e->getMessage(),
        ];
    }
    echo json_encode($respuesta);
}

//Logueamos al usuario
if ($accion == 'login') {
    try {
        //Seleccionar el usuario
        $sql = 'SELECT * from usuario where usuario = ?';
        $ps = $conn->prepare($sql);
        $ps->bind_param('s', $usuario);

        if ($ps->execute()) {
            $ps->bind_result($id_usuario, $nombre_usuario, $password_usuario);
            $ps->fetch();

            //si existe el usuario en la base de datos
            if ($nombre_usuario) {
                if (password_verify($password, $password_usuario)) {
                    //iniciar la sesion
                    session_start();
                    $_SESSION['nombre'] = $usuario;
                    $_SESSION['id'] = $id_usuario;
                    $respuesta = [
                        'status' => true,
                        'loggin' => true,
                        'id_usuario' => $id_usuario,
                        'usuario' => $nombre_usuario,
                    ];
                } else {
                    $respuesta = [
                        'status' => true,
                        'loggin' => false,
                        'error' => 'Contraseña Incorrecta',
                    ];
                }
            } else {
                $respuesta = [
                    'status' => true,
                    'loggin' => false,
                    'error' => 'Usuario Incorrecto',
                ];
            }
        } else {
            $respuesta = [
                'status' => false,
                'error' => $ps->error,
            ];
        }

        $ps->close();
    } catch (Throwable $e) {
        $respuesta = [
            'status' => false,
            'error' => $e->getMessage(),
        ];
    }
    echo json_encode($respuesta);
}

//crerrar la conexion
$conn->close();
