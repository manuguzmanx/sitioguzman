document.addEventListener('DOMContentLoaded', function() {

    const email = {
        nombre: '',
        telefono: '',
        email: '',
        mensaje: ''
    }
    
    const inputNombre = document.querySelector('#nombre');
    const inputTelefono = document.querySelector('#telefono');
    const inputEmail = document.querySelector('#email');
    const inputMensaje = document.querySelector('#mensaje');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');

    //Asignamos eventos
    inputNombre.addEventListener('blur', validar);
    inputTelefono.addEventListener('blur', validar);
    inputEmail.addEventListener('blur', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        //Reiniciar el formulario
        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            formulario.submit();
            resetFormulario();

            //Crear una alerta de envío exitoso
            const alertaExito = document.createElement('P');

            alertaExito.textContent = 'Recibí tu mensaje!';
            alertaExito.classList.add('alerta-exito');

            formulario.append(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);

    }

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //Asignar los valores al objeto
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //Comprobamos el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        //Generamos el HTML de la alerta
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('alerta-campo');

        //Inyectamos el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.alerta-campo');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('btn-disabled');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('btn-disabled');
            btnSubmit.disabled = false;
        }
    }

    function resetFormulario() {
        email.email = '';
        email.nombre = '';
        email.telefono = '';
        email.mensaje = '';
        formulario.reset();
        
        comprobarEmail();
    }
    
});