$(document).ready(() => {

    const pacienteId = parseInt($('#paciente-id').val());
    const metodoHttp = pacienteId !== 0 ? "PUT" : "POST";
    let url = `/pacientes`;

    if (pacienteId !== 0) {
        url = `/pacientes/${pacienteId}`;
        cargarDatosPaciente();
    }

    let personaId = null;
    let creadoEn = null;
    let estadoId = null;
    let codHistorialClinico = null;

    const formulario = $('#formulario-paciente');
    const inputTipoDocumento = $('#tipo-documento')
    const inputNumeroDocumento = $('#numero-documento');
    const labelError = $('#nro-error');
    const inputApellidoPaterno = $('#apellido-paterno');
    const inputApellidoMaterno = $('#apellido-materno');
    const inputNombres = $('#nombres');
    const inputTelefono = $('#telefono');
    const inputDireccion = $('#direccion');
    const inputEmail = $('#email');
    const selectSexo = $('#sexo');
    const inputFechaNacimiento = $('#fecha-nacimiento');
    const inputDistrito = $('#ubigeo');
    const checkAlergia = $('#check-alergia');

    formulario.on('submit', (event) => {
        event.preventDefault();
        if (formulario.valid()) {
            guardarPaciente()
        }

    });

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

    function cargarDatosPaciente() {
        $.getJSON(url, (response) => {
            let paciente = response.data;
            inputTipoDocumento.val(paciente.persona.tipoDocumento);
            inputNumeroDocumento.val(paciente.persona.numeroDocumento);
            inputApellidoPaterno.val(paciente.persona.apellidoPaterno);
            inputApellidoMaterno.val(paciente.persona.apellidoMaterno);
            inputNombres.val(paciente.persona.nombres);
            inputTelefono.val(paciente.persona.telefono);
            inputDireccion.val(paciente.persona.direccion);
            inputEmail.val(paciente.persona.email);
            selectSexo.val(paciente.persona.sexo);
            inputFechaNacimiento.val(paciente.persona.fechaNacimiento);
            checkAlergia[0].checked = paciente.tieneAlergia;
            personaId = paciente.persona.id;
            creadoEn = paciente.creadoEn;
            estadoId = paciente.estadoId;
            codHistorialClinico = paciente.codHistorialClinico;

            if (paciente.persona.distritoId) {
                $.getJSON(`/pacientes/ubigeo/${paciente.persona.distritoId}`, (response) => {
                    let data = response.data;
                    let text = data.distrito + ' - ' + data.provincia + ' - ' + data.departamento;
                    let option = new Option(text, data.id, true, true);
                    inputDistrito.append(option);
                });
            }
        });
    }

    function guardarPaciente() {
        let paciente = {
            "id": pacienteId !== 0 ? pacienteId : null,
            "codHistorialClinico": codHistorialClinico,
            "tieneAlergia": checkAlergia[0].checked,
            "creadoEn": creadoEn,
            "estadoId": estadoId,
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
            data: JSON.stringify(paciente),
            success: () => {
                toast('success', 'Paciente guardado');
                setTimeout(() => {
                    window.location.href = "/pacientes";
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
            }

        }
    });

});