(function () {
  'use strict';

  document
    .querySelector('#formulario')
    .addEventListener('submit', validarRegistro);

  /**
   * validarRegistro.
   * Revisa que los campos de registro esten llenos e invoca una funcion correcpondiente para crear una cuenta o loguearse
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Monday, August 3rd, 2020.
   * @return	void
   */
  function validarRegistro(e) {
    e.preventDefault();
    var usuario = document.querySelector('#usuario').value;
    var password = document.querySelector('#password').value;
    var tipo = document.querySelector('#tipo').value;

    if (!usuario || !password) {
      Swal.fire({
        type: 'error',
        title: 'Error!',
        text: 'Todos los campos son obligatorios',
      });
    } else {
      if (tipo === 'crear') {
        createUser(usuario, password, tipo);
      } else {
        login(usuario, password, tipo);
      }
    }
  }

  /**
   * createUser.
   * Crea un usuario en la base de datos mediante una peticion AJAX fetch()
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Monday, August 3rd, 2020.
   * @param	mixed 	usuario
   * @param	mixed 	password
   * @param	string	tipo    	Default: 'crear'
   * @return	void
   */
  function createUser(usuario, password, tipo = 'crear') {
    //peticion AJAX meidnate la funcion fetch()
    var datos = new FormData();
    datos.append('usuario', usuario);
    datos.append('password', password);
    datos.append('accion', tipo);

    fetch('includes/models/admin_model.php', {
      method: 'POST',
      body: datos,
    })
      .then((response) => {
        //response.ok = codigos del 200 al 299
        if (response.ok) return response.json();
        else throw new Error('Fallo en la respuesta HTTP: ' + response.status);
      })
      .then((json) => {
        console.log(json);
        //Este status es personalizado que me devuelve mi archivo PHP
        if (json.status) {
          Swal.fire({
            type: 'success',
            title: 'Usuario Creado',
            text: 'El usuario se creó correctamente',
          });
        } else {
          console.log(json.error);
          Swal.fire({
            type: 'error',
            title: 'Oops!',
            text:
              'Tuvimos un error al crear tu usuario. Lamentamos los inconvenientes',
          });
        }
      })
      .catch((err) => console.error(err));
  }

  /**
   * login.
   * Loguea a un usuario mediante una peticion AJAX fetch()
   * @author	Fernando Acosta
   * @since	v0.0.1
   * @version	v1.0.0	Monday, August 3rd, 2020.
   * @param	mixed 	usuario
   * @param	mixed 	password
   * @param	string	tipo    	Default: 'login'
   * @return	void
   */
  function login(usuario, password, tipo = 'login') {
    //peticion AJAX meidnate la funcion fetch()
    var datos = new FormData();
    datos.append('usuario', usuario);
    datos.append('password', password);
    datos.append('accion', tipo);

    fetch('includes/models/admin_model.php', {
      method: 'POST',
      body: datos,
    })
      .then((response) => {
        //response.ok = codigos del 200 al 299
        if (response.ok) return response.json();
        else throw new Error('Fallo en la respuesta HTTP: ' + response.status);
      })
      .then((json) => {
        console.log(json);
        //Este status es personalizado que me devuelve mi archivo PHP
        if (json.status) {
          if (json.loggin) {
            //loguear al usuario
            document.location = 'index.php';
          } else {
            Swal.fire({
              type: 'error',
              title: json.error,
              text: 'Por favor revisa tus credenciales',
            });
          }
        } else {
          console.log(json.error);
          Swal.fire({
            type: 'error',
            title: 'Oops!',
            text: 'Hubo un error. Lamentamos el inconveniente',
          });
        }
      })
      .catch((err) => console.error(err));
  }
})();
