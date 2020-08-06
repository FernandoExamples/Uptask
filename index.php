<?php include_once 'includes/functions/sesiones.php'; ?>
<?php include_once 'includes/functions/funciones.php'; ?>
<?php include_once 'includes/templates/header.php'; ?>
<?php include_once 'includes/templates/barra.php'; ?>
<?php
   if (isset($_GET['id_proyecto'])) {
       $id_proyecto = $_GET['id_proyecto'];
   }
?>
<div class="contenedor">

    <?php include_once 'includes/templates/sidebar.php'; ?>

    <main class="contenido-principal">
        <?php
         $proyecto = obtenerNombreProyecto($id_proyecto);
        ?>

        <?php if ($proyecto): ?>
        <h1>Proyecto Actual:

            <?php foreach ($proyecto as $nombre):?>
            <span><?php echo $nombre['nombre']; ?></span>
            <?php endforeach; //Fin del ciclo foreach?>
        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" id="nombre_tarea">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="<?php echo $id_proyecto; ?>">
                <input type="submit" class="boton" id='nueva-tarea' value="Agregar">
            </div>
        </form>
        <?php else: ?>
        <p style='text-align:center'>Selecciona un proyecto a la izquierda</p>
        <?php endif; //fin del if?>

        <h2>Listado de tareas:</h2>
        <!-- Obtener el listado de tareas -->
        <?php
            $tareas = obtenerTareas($id_proyecto);
        ?>
        <div class="listado-pendientes">
            <ul>
                <?php if ($tareas->num_rows > 0): ?>

                <?php foreach ($tareas as $tarea):?>
                <li id="tarea:<?php echo $tarea['id_tarea']; ?>" class="tarea">
                    <p><?php echo $tarea['nombre']; ?></p>
                    <div class="acciones">
                        <i class="far fa-check-circle <?php echo $tarea['estado'] == 1 ? 'completo' : ''; ?>"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>
                <?php endforeach; //Fin del ciclo foreach?>
                <?php else: ?>
                <p style='text-align:center' id='sin-tareas'>No hay tareas en este proyecto</p>
                <?php endif; //fin del if?>
            </ul>

            <!-- Boton para eliminar el proyecto -->
            <?php if ($proyecto): ?>
            <div style='text-align:center'><a href="#" class="boton btn-eliminar" id='btn-eliminar'
                    data-id="<?php echo $id_proyecto; ?>">Eliminar Proyecto</a></div>
            <?php endif; //Fin del if?>

        </div>

        <div class="avance">
            <h2>Avance del proyecto</h2>
            <div class="barra-avance" id="barra-avance">
                <div class="porcentaje" id="porcentaje"></div>
            </div>
        </div>

    </main>
</div>
<!--.contenedor-->

<?php include_once 'includes/templates/footer.php'; ?>