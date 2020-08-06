<?php

/**
 * obtenerPaginaActual.
 * Obtiene el nombre de la pagina actual y le quita la extension .php.
 *
 */
function obtenerPaginaActual()
{
    $archivo = basename($_SERVER['PHP_SELF']);
    $pagina = str_replace('.php', '', $archivo);

    return $pagina;
}

function obtenerNombreProyecto($id)
{
    include 'db.php';
    try {
        return $conn->query('SELECT nombre from proyecto WHERE id_proyecto ='.$id);
    } catch (Exception $e) {
        die($e->getMessage());
    }
}

function obtenerTareas($id_proyecto)
{
    include 'db.php';
    try {
        return $conn->query('SELECT * from tarea WHERE id_proyecto='.$id_proyecto.' ORDER BY estado');
    } catch (Exception $e) {
        die($e->getMessage());
    }
}
