$(document).ready(() => {

    const usuarioId = parseInt($('#usuario-id').val());
    const metodoHttp = usuarioId !== 0 ? "PUT" : "POST";
    let url = `/usuarios`;

    if (usuarioId !== 0) {
        url = `/usuarios/${usuarioId}`;
        cargarDatosUsuario();
    }

    let personaId = null;
    let creadoEn = null;
    let estadoId = null;

    const formulario = $('#formulario-usuario');
    const inputTipoDocumento = $('#tipo-documento')
    const inputNumeroDocumento = $('#numero-documento');
    const labelError = $('#nro-error');
    const inputApellidoPaterno = $('#apellido-paterno');
    const inputApellidoMaterno = $('#apellido-materno');
    const inputNombres = $('#nombres');
    const inputTelefono = $('#telefono');
    const inputDireccion = $('#direccion');
    const inputEmail = $('#email');
    const inputPassword = $('#password');
    const selectSexo = $('#sexo');
    const inputFechaNacimiento = $('#fecha-nacimiento');
    const inputDistrito = $('#ubigeo');
    const selectRol = $('#rol');

    cargarRoles();

    formulario.on('submit', (event) => {
        event.preventDefault();
        if (formulario.valid()) {
            guardarUsuario()
        }

    });

    function cargarRoles() {
        selectRol.empty();
        $.getJSON(`/usuarios/roles`, (response) => {
            const roles = response.data;
            roles.forEach((rol) => {
                selectRol.append($('<option>', {
                    value: rol.id,
                    text: rol.nombre
                }));
            });
        });
    }

    $('.select2').select2({
        placeholder: 'Ingrese su distrito',
        allowClear: true,
        minimumInputLength: 1,
        ajax: {
            url: `/pacientes/ubigeo`,
            dataType: 'json',
            delay: 500,
            data: (params) => {
                return {
                    q: params.term
                };
            },
            processResults: (response) => {
                let data = response.data;
                let results = [];
                $.each(data, (index, item) => {
                    let text = `${item.distrito} - ${item.provincia} - ${item.departamento}`;
                    let option = {
                        id: item.id,
                        text: text
                    };
                    results.push(option);
                });
                return {
                    results: results
                };
            },
            cache: true,
        }
    });

    function cargarDatosUsuario() {
        $.getJSON(url, (response) => {
            let usuario = response.data;
            inputTipoDocumento.val(usuario.persona.tipoDocumento);
            inputNumeroDocumento.val(usuario.persona.numeroDocumento);
            inputApellidoPaterno.val(usuario.persona.apellidoPaterno);
            inputApellidoMaterno.val(usuario.persona.apellidoMaterno);
            inputNombres.val(usuario.persona.nombres);
            inputTelefono.val(usuario.persona.telefono);
            inputDireccion.val(usuario.persona.direccion);
            inputEmail.val(usuario.persona.email);
            inputPassword.val(usuario.password)
            selectSexo.val(usuario.persona.sexo);
            inputFechaNacimiento.val(usuario.persona.fechaNacimiento);
            personaId = usuario.persona.id;
            creadoEn = usuario.creadoEn;
            estadoId = usuario.estadoId;
            selectRol.val(usuario.rolId);

            if (usuario.persona.distritoId) {
                $.getJSON(`/pacientes/ubigeo/${usuario.persona.distritoId}`, (response) => {
                    let data = response.data;
                    let text = data.distrito + ' - ' + data.provincia + ' - ' + data.departamento;
                    let option = new Option(text, data.id, true, true);
                    inputDistrito.append(option);
                });
            }
        });
    }

    function guardarUsuario() {
        let usuario = {
            "id": usuarioId !== 0 ? usuarioId : null,
            "creadoEn": creadoEn,
            "estadoId": estadoId,
            "password": inputPassword.val(),
            "rolId": selectRol.val(),
            "persona": {
                "id": personaId,
                "tipoDocumento": inputTipoDocumento.val(),
                "numeroDocumento": inputNumeroDocumento.val(),
                "apellidoPaterno": inputApellidoPaterno.val(),
                "apellidoMaterno": inputApellidoMaterno.val(),
                "nombres": inputNombres.val(),
                "telefono": inputTelefono.val(),
                "distritoId": inputDistrito.val(),
                "direccion": inputDireccion.val(),
                "email": inputEmail.val(),
                "sexo": selectSexo.val(),
                "fechaNacimiento": inputFechaNacimiento.val()
            }
        };

        $.ajax({
            type: metodoHttp,
            url: url,
            contentType: "application/json",
            data: JSON.stringify(usuario),
            success: () => {
                toast('success', 'Usuario guardado');
                setTimeout(() => {
                    window.location.href = "/usuarios";
                }, 2500);
            },
            error: () => {
                toast('error', 'Ha ocurrido un problema');
            }
        });
    }

    inputNumeroDocumento.on("input", () => {
        if (inputNumeroDocumento.val().length === 8) {
            $.getJSON(`/pacientes/verificar/${inputNumeroDocumento.val()}`, (response) => {
                if (response.data !== '') {
                    labelError.text(response.data);
                    labelError.removeClass('d-none');
                }
            });
            $.getJSON(`/servicios/reniec/${inputNumeroDocumento.val()}`, (response) => {
                inputApellidoPaterno.val(response.data.apellidoPaterno);
                inputApellidoMaterno.val(response.data.apellidoMaterno);
                inputNombres.val(response.data.nombres);
            });

        } else {
            labelError.addClass('d-none')
            inputApellidoPaterno.val('');
            inputApellidoMaterno.val('');
            inputNombres.val('');
        }
    });

    $.validator.addMethod("maxDate", function (value) {
        let fechaNacimiento = new Date(value);
        let fechaActual = new Date();

        fechaNacimiento.setHours(0, 0, 0, 0);
        fechaActual.setHours(0, 0, 0, 0);

        return fechaNacimiento < fechaActual;
    }, "La fecha de nacimiento debe ser menor a la fecha actual");

    formulario.validate({
        rules: {
            tipo_documento: {
                required: true
            },
            numero_documento: {
                required: true,
                minlength: 8,
                maxlength: 12
            },
            apellido_paterno: {
                required: true,
                maxlength: 25
            },
            apellido_materno: {
                required: true,
                maxlength: 25
            },
            nombres: {
                required: true,
                maxlength: 50
            },
            fecha_nacimiento: {
                required: true,
                maxDate: true
            },
            telefono: {
                required: true
            },
            sexo: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                minlength: 5
            },
            rol: {
                required: true
            }
        },
        messages: {
            tipo_documento: {
                required: "Este campo es obligatorio"
            },
            numero_documento: {
                required: "Este campo es obligatorio",
                maxlength: "El numero de documento debe tener como máximo 12 dígitos",
                minlength: "El numero de documento debe tener como mínimo 8 dígitos"
            },
            apellido_paterno: {
                required: "Este campo es obligatorio",
                maxlength: "EL apellido paterno debe tener como máximo 25 caracteres"
            },
            apellido_materno: {
                required: "Este campo es obligatorio",
                maxlength: "EL apellido materno debe tener como máximo 25 caracteres"
            },
            nombres: {
                required: "Este campo es obligatorio",
                maxlength: "Los nombres deben tener como máximo 50 caracteres"
            },
            fecha_nacimiento: {
                required: "La fecha de nacimiento es obligatoria"
            },
            telefono: {
                required: "EL campo es obligatorio"
            },
            sexo: {
                required: "El campo es obligatorio"
            },
            email: {
                required: "El campo es obligatorio",
                email: "El correo debe ser válido"
            },
            password: {
                minlength: "La contraseña debe tener como mínimo 5 caracteres"
            },
            rol: {
                required: "El campo es obligatorio"
            }

        }
    });

});