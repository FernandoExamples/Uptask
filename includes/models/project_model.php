<?php

$accion = $_POST['accion'];
$proyecto = $_POST['proyecto']; //nombre del proyecto
$id_proyecto = $_POST['id_proyecto']; 

//abrir la conexion
include '../functions/db.php';

if ($accion == 'crear') {
    //hashear password

    try {
        $sql = 'INSERT INTO  proyecto (nombre) VALUES (?)';
        $ps = $conn->prepare($sql);
        $ps->bind_param('s', $proyecto);

        if ($ps->execute()) {
            $respuesta = [
                'status' => true,
                'id_proyecto' => $ps->insert_id,
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

if ($_POST['accion'] == 'llenar') {
    $sql = 'SELECT * from proyecto';
    $result = $conn->query($sql);

    if ($result) {
        $contactos = [];
        while ($row = $result->fetch_assoc()) {
            $contactos[] = $row;
        }

        $respuesta = [
                'status' => true,
                'proyectos' => $contactos,
            ];
        echo json_encode($respuesta);
    } else {
        echo json_encode([
                'status' => false,
                'error' => 'Hubo un error al ejecutar la consulta',
           ]);
    }
}

if ($_POST['accion'] == 'eliminar') {
    try {
        $sql = 'DELETE FROM proyecto where id_proyecto=?';
        $ps = $conn->prepare($sql);
        $ps->bind_param('s', $id_proyecto);

        if ($ps->execute()) {
            $respuesta = [
                'status' => true,
                'id_proyecto' => $id_proyecto,
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
