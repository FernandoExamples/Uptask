(function (params) {
  'use strict';
  let listaProyectos = document.querySelector('#proyectos');

  //llenar la barra de proyectos
  llenarProyectos();
  eventListeners();

  function eventListeners() {
    document.addEventListener('DOMContentLoaded', () => actualizarProgreso());

    //boton para crear proyecto
    document
      .querySelector('.crear-proyecto a')
      .addEventListener('click', nuevoProyecto);

    //boton para una nueva tarea
    if (document.querySelector('#nueva-tarea'))
      document
        .querySelector('#nueva-tarea')
        .addEventListener('click', agregarTarea);

    //botones para las acciones de las tareas
    document
      .querySelector('.listado-pendientes')
      .addEventListener('click', accionesTareas);

    //boton para eliminar el proyecto
    if (document.querySelector('#btn-eliminar'))
      document
        .querySelector('#btn-eliminar')
        .addEventListener('click', accionEliminarProyecto);
  }

  /**
   * nuevoProyecto.
   *  Crea un <input> y lo agrega a la barra lateral para ingresar el nombre del proyecto
   *  Despues elimina el input
   * @return	void
   */
  function nuevoProyecto(e) {
    e.preventDefault();

    //Crea un input para el nombre del nuevo Proyecto
    if (!document.querySelector('#nuevo-proyecto')) {
      let nuevoProyecto = document.createElement('li');
      nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
      listaProyectos.appendChild(nuevoProyecto);

      //Seleccionar el ID con el nuevo proyecto
      let inputNuevoProyecto = document.querySelector('#nuevo-proyecto');
      inputNuevoProyecto.focus();

      //al presionar enter crear el proyecto
      inputNuevoProyecto.addEventListener('keypress', function (e) {
        let tecla = e.which || e.keyCode;
        if (tecla === 13) {
          if (inputNuevoProyecto.value)
            guardarProyecto(inputNuevoProyecto.value);

          nuevoProyecto.remove();
        }
      });

      inputNuevoProyecto.addEventListener('blur', function (e) {
        //evitar que el keypress y el blur se ejecuten casi a la par
        setTimeout(() => {
          if (listaProyectos.contains(inputNuevoProyecto)) {
            nuevoProyecto.remove();
          }
        }, 100);
      });
    }
  }

  /**
   * guardarProyecto.
   * Realiza una peticion AJAX y guarda el proyecto en la base de datos
   * @param	mixed	nombreProyecto
   * @return	void
   */
  async function guardarProyecto(nombreProyecto) {
    let datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    try {
      let response = await fetch('includes/models/project_model.php', {
        method: 'POST',
        body: datos,
      });
      if (response.ok) {
        let json = await response.json();
        if (json.status) {
          createNameProject(nombreProyecto, json.id_proyecto);
          //enviar una alerta
          Swal.fire({
            type: 'success',
            title: 'Proyecto Creado',
            text: `El proyecto ${nombreProyecto} se creó correctamente`,
          }).then(() => {
            //redireccionar a la nueva URL
            document.location = `index.php?id_proyecto=${json.id_proyecto}`;
          });
        } else {
          throw new Error(json.error);
        }
        console.log(json);
      } else {
        throw new Error('Fallo en la respuesta HTTP: ' + response.status);
      }
    } catch (error) {
      console.error('Ha ocurrido un error: ', error);
    }
  }

  /**
   * createNameProject.
   * Crea un li y lo agrega a la lista de proyectos de la barra lateral
   * @param	mixed	nombreProyecto
   * @return	void
   */
  function createNameProject(nombreProyecto, idProyecto) {
    //inyectar HTML
    let nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = `
        <a href="index.php?id_proyecto=${idProyecto}" id="proyecto:${idProyecto}">
            ${nombreProyecto}
        </a>
      `;
    listaProyectos.appendChild(nuevoProyecto);
  }

  /**
   * llenarProyectos.
   * Hace una peticion AJAX y llena la barra lateral
   * con los nombres de cada proyecto de la BD
   * @return	void
   */
  function llenarProyectos() {
    let datos = new FormData();
    datos.append('accion', 'llenar');
    fetch('includes/models/project_model.php', {
      method: 'POST',
      body: datos,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          for (var proyecto of json.proyectos) {
            createNameProject(proyecto.nombre, proyecto.id_proyecto);
          }
          // console.log(json.proyectos);
        } else {
          throw new Error(json.error);
        }
      })
      .catch((error) => console.error(error));
  }

  /**
   * accionEliminarProyecto.
   * Handler para el boton de eliminar proyecto
   * @return	void
   */
  function accionEliminarProyecto(e) {
    let idProyecto = e.target.getAttribute('data-id');
    Swal.fire({
      title: 'Estas seguro',
      text: 'No es posible revertir los cambios!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.value) {
        eliminarProyecto(idProyecto).then((exito) => {
          if (exito) {
            Swal.fire('Proyecto eliminado!', '', 'success').then(() => {
              document.location = 'index.php';
            });
          }
        });
      }
    });
  }

  /**
   * eliminarProyecto.
   * Elimina un proyecto de la base de datos
   */
  async function eliminarProyecto(idProyecto) {
    let datos = new FormData();
    datos.append('id_proyecto', idProyecto);
    datos.append('accion', 'eliminar');

    try {
      let response = await fetch('includes/models/project_model.php', {
        method: 'POST',
        body: datos,
      });
      if (response.ok) {
        let json = await response.json();
        if (json.status) {
          console.log(json);
          return true;
        } else throw new Error(json.error);
      } else throw new Error('Fallo la respuesta HTTP: ' + response.status);
    } catch (error) {
      console.error('Ha habido un error al eliminar la tarea: ', error);
    }
    return false;
  }

  /**
   * agregarTarea.
   * Recoge el nombre del formulario y agrega una tarea a un proyecto
   * @return	void
   */
  function agregarTarea(e) {
    e.preventDefault();
    let nuevaTarea = document.querySelector('#nombre_tarea').value.trim();
    let idProyecto = document.querySelector('#id_proyecto').value;
    if (nuevaTarea) {
      guardarTarea(nuevaTarea, idProyecto).then((exito) => {
        if (exito) {
          if (document.querySelector('#sin-tareas'))
            document.querySelector('#sin-tareas').remove();
          Swal.fire({
            type: 'success',
            title: 'Tarea creada',
          });
        } else {
          Swal.fire({
            type: 'error',
            text: `Lo sentimos hubo un error al agregar la tarea`,
          });
        }
      });
    } else {
      Swal.fire({
        type: 'error',
        text: `Una tarea no puede ir vacía`,
      });
    }
  }

  /**
   * guardarTarea.
   * Almacena una tarea en la base de datos mediane AJAX
   * @param	mixed	nombreTarea
   * @param	mixed	idProyecto
   * @return	void
   */
  async function guardarTarea(nombreTarea, idProyecto) {
    let datos = new FormData();
    datos.append('tarea', nombreTarea);
    datos.append('id_proyecto', idProyecto);
    datos.append('accion', 'crear');
    try {
      let response = await fetch('includes/models/tareas_model.php', {
        method: 'POST',
        body: datos,
      });
      if (response.ok) {
        let json = await response.json();
        if (json.status) {
          //insertar la tarea al DOM
          let nuevaTarea = document.createElement('li');
          nuevaTarea.id = 'tarea:' + json.id_tarea;
          nuevaTarea.classList.add('tarea');
          nuevaTarea.innerHTML = `
            <p>${nombreTarea}</p>
            <div class="acciones">
              <i class="far fa-check-circle"></i>
              <i class="fas fa-trash"></i>
            </div>
          `;
          let pendientes = document.querySelector('.listado-pendientes ul');
          pendientes.appendChild(nuevaTarea);

          //limpriar el formulario
          document.querySelector('.agregar-tarea').reset();

          //actualizar el progreso
          actualizarProgreso();

          return true;
        } else {
          throw new Error(json.error);
        }
      } else {
        throw new Error('Fallo en la respuesta HTTP: ' + response.status);
      }
    } catch (error) {
      console.error('Hubo un error al guardar la tarea: ', error);
    }
    return false;
  }

  /**
   * eliminarTarea.
   * Elimina una tarea de la base de datos
   * @param	mixed	id_tarea
   * @return	boolean -> Si la tarea se elimino con exito
   */
  async function eliminarTarea(id_tarea) {
    id_tarea = id_tarea.split(':')[1];
    let datos = new FormData();
    datos.append('id_tarea', id_tarea);
    datos.append('accion', 'eliminar');

    try {
      let response = await fetch('includes/models/tareas_model.php', {
        method: 'POST',
        body: datos,
      });
      if (response.ok) {
        let json = await response.json();
        if (json.status) {
          console.log(json);
          return true;
        } else throw new Error(json.error);
      } else throw new Error('Fallo la respuesta HTTP: ' + response.status);
    } catch (error) {
      console.error('Ha habido un error al eliminar la tarea: ', error);
    }
    return false;
  }

  /**
   * cambiarEstadoTarea.
   * Cambia el estado completo o incompleto de la tarea en la base de datos
   * @param	mixed	id_tarea: El Id de la tarea a completar
   * @param	mixed	estado: true -> completa o false -> incompleta
   * @return	void
   */
  function cambiarEstadoTarea(id_tarea, estado) {
    id_tarea = id_tarea.split(':')[1];
    let datos = new FormData();
    datos.append('estado', Number(estado));
    datos.append('id_tarea', id_tarea);
    datos.append('accion', 'actualizar');

    fetch('includes/models/tareas_model.php', {
      method: 'POST',
      body: datos,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw new Error('Fallo la respuesta HTTP: ' + response.status);
      })
      .then((json) => {
        if (json.status) {
          console.log(json);
          actualizarProgreso();
        } else throw new Error(json.error);
      })
      .catch((error) =>
        console.error(
          'Ha habido un error al completar/descompletar la tarea: ',
          error
        )
      );
  }

  /**
   * accionesTareas.
   * Gestiona las acciones de los botones de eliminar o completar la tarea
   * @return	void
   */
  function accionesTareas(e) {
    e.preventDefault();
    let boton = e.target;
    if (boton.classList.contains('fa-check-circle')) {
      if (boton.classList.contains('completo')) {
        boton.classList.remove('completo');
        cambiarEstadoTarea(boton.parentElement.parentElement.id, false);
      } else {
        boton.classList.add('completo');
        cambiarEstadoTarea(boton.parentElement.parentElement.id, true);
      }
    } else if (boton.classList.contains('fa-trash')) {
      Swal.fire({
        title: 'Estas seguro',
        text: 'No es posible revertir los cambios!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      }).then((result) => {
        if (result.value) {
          eliminarTarea(boton.parentElement.parentElement.id).then((exito) => {
            if (exito) {
              boton.parentElement.parentElement.remove();
              Swal.fire('Tarea eliminada!', '', 'success');
              actualizarProgreso();

              if (
                document.querySelectorAll('li.tarea').length === 0 //solo queda el aviso de "no hay tareas"
              ) {
                let parrafo = document.createElement('p');
                parrafo.innerText = 'No hay tareas en este proyecto';
                parrafo.style.cssText = 'text-align:center';
                parrafo.id = 'sin-tareas';
                document
                  .querySelector('.listado-pendientes ul')
                  .appendChild(parrafo);
              }
            }
          });
        }
      });
    }
  }

  /**
   * actualizarProgreso.
   * Actualizar el avance del proyecto
   * @return	void
   */
  function actualizarProgreso() {
    let tareas = document.querySelectorAll('li.tarea').length;
    let tareasCompletadas = document.querySelectorAll('i.completo').length;

    //determinar el avance
    let avance = Math.round((tareasCompletadas / tareas) * 100);
    avance = Number.isNaN(avance) ? 0 : avance;
    console.log('Avance: '+ avance);

    //actualizar la barra de progreso
    document.querySelector('#porcentaje').style.width = avance + '%';
  }
})();
