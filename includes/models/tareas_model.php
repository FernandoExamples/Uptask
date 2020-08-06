<?php

$tarea = $_POST['tarea']; //nombre de la tarea
$id_proyecto = (int) $_POST['id_proyecto']; //id de su proyecto
$id_tarea = $_POST['id_tarea'];
$estado = $_POST['estado'];
$accion = $_POST['accion'];

//abrir la conexion
include '../functions/db.php';

if ($accion == 'crear') {
    try {
        $sql = 'INSERT INTO tarea(nombre, id_proyecto) values(?,?)';
        $ps = $conn->prepare($sql);
        $ps->bind_param('si', $tarea, $id_proyecto);
        if ($ps->execute()) {
            $respuesta = [
                'status' => true,
                'id_tarea' => $ps->insert_id,
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

if ($accion == 'actualizar') {
    try {
        $sql = 'UPDATE tarea set estado=? where id_tarea=?';
        $ps = $conn->prepare($sql);
        $ps->bind_param('ii', $estado, $id_tarea);
        if ($ps->execute()) {
            $respuesta = [
                'status' => true,
                'id_tarea' => $id_tarea,
                'estado' => $estado,
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

if ($accion == 'eliminar') {
    try {
        $sql = 'DELETE from tarea where id_tarea=?';
        $ps = $conn->prepare($sql);
        $ps->bind_param('i', $id_tarea);
        if ($ps->execute()) {
            $respuesta = [
                'status' => true,
                'id_tarea' => $id_tarea,
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

//crerrar la conexion
$conn->close();
