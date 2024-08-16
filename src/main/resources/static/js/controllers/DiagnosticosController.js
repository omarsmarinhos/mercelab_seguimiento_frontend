$(document).ready(() => {

    /**************************************************************************************
     * Modales usados en vista HTML 'Diagnósticos'
     **************************************************************************************/
    const modalAgregarEnfermedad = $('#modal-agregar-enfermedad');
    const modalEnfermedadesPreseleccionadas = $('#modal-enfermedades-preseleccionadas')
    const modalSeleccionarCie10 = $('#modal-seleccionar-cie10');
    const modalSeleccionarExamen = $('#modal-seleccionar-examen');
    const modalSeleccionarMedicamento = $('#modal-seleccionar-medicamento');
    const modalSeleccionarVacuna = $('#modal-seleccionar-vacuna');
    const modalSeleccionarEspecialidad = $('#modal-seleccionar-especialidad');
    const modalTratamientos = $('#modal-tratamientos');
    const modalSeguimientos = $('#modal-seguimientos');
    const modalVerFechasProgramadasExamen = $('#modal-ver-fechas-programadas-exa');
    const modalVerFechasProgramadasMedicamento = $('#modal-ver-fechas-programadas-med');
    const modalVerFechasProgramadasVacuna = $('#modal-ver-fechas-programadas-vac');
    const modalVerFechasProgramadasEspecialidad = $('#modal-ver-fechas-programadas-esp');
    const modalAgregarSeguimientoExamen = $('#modal-agregar-seguimiento-examen');
    const modalAgregarSeguimientoMedicamento = $('#modal-agregar-seguimiento-medicamento');
    const modalAgregarSeguimientoVacuna = $('#modal-agregar-seguimiento-vacuna');
    const modalAgregarSeguimientoEspecialidad = $('#modal-agregar-seguimiento-especialidad');

    /**************************************************************************************
     * Elementos de vista principal 'Diagnósticos'
     **************************************************************************************/
    const inputBuscarDiagnostico = $('#buscar-diagnostico');
    const bodyTablaDiagnosticos = $('#tabla-diagnosticos tbody');
    const paginationDiagnosticos = $("#pagination-diagnosticos .pagination-info");
    const btnPrevDiagnosticos = $('#pagination-diagnosticos .btn-prev');
    const btnNextDiagnosticos = $('#pagination-diagnosticos .btn-next');

    /**************************************************************************************
     * Elementos de vista modal 'Enfermedades Preseleccionadas'
     **************************************************************************************/
    const selectBuscarPaciente = $('#paciente');
    const bodyTablaEnfermedadesPreseleccionadas = $("#tabla-enfermedades-pre tbody");

    /**************************************************************************************
     * Elementos de vista modal 'Agregar Enfermedad'
     **************************************************************************************/
    const checkBoxCronico = $("#check-cronico");
    const inputTextCie10 = $('#enfermedad-cie10');
    const inputHiddenCie10Id = $('#enfermedad-cie10-id');
    const inputFechaDiagnostico = $('#fecha-diagnostico');
    const textAreaDescripcionEnfermedad = $('#descripcion-enfermedad');
    const textAreaObservacionEnfermedad = $('#observación-enfermedad');
    const btnAgregarEnfermedad = $('#btn-agregar-enfermedad');
    const divNoCronico = $('#no-cronico');
    const divSiCronico = $('#si-cronico');

    /**************************************************************************************
     * Elementos de vista modal 'Seleccionar Cie10'
     **************************************************************************************/
    const inputBuscarCie10 = $('#buscar-cie10');
    const bodyTablaCie10 = $('#tabla-cie10 tbody');
    const paginationCie10 = $("#pagination-cie10 .pagination-info");
    const btnPrevCie10 = $('#pagination-cie10 .btn-prev');
    const btnNextCie10 = $('#pagination-cie10 .btn-next');

    /**************************************************************************************
     * Elementos de vista modal 'Tratamientos'
     **************************************************************************************/
    const bodyTablaTratamientosMedicamentos = $('#tabla-tratamientos-medicamentos tbody');
    const bodyTablaTratamientosExamenes = $('#tabla-tratamientos-examenes tbody');
    const bodyTablaTratamientosVacunas = $('#tabla-tratamientos-vacunas tbody');
    const bodyTablaTratamientosEspecialidad = $('#tabla-tratamientos-especialidades tbody');
    const textAreaObservacionTratamiento = $('#observación-tratamiento');
    const btnEditarObservacionTratamiento = $('#btn-editar-observacion-tratamiento');
    const btnGuardarObservacionTratamiento = $('#btn-guardar-observacion-tratamiento');

    /***************************************************************************************
     * Elementos de vista modal 'Seleccionar Exámenes'
     ***************************************************************************************/
    const inputBuscarExamen = $('#buscar-examen');
    const bodyTablaExamenes = $('#tabla-examenes tbody');
    const paginationExamenes = $("#pagination-examen .pagination-info");
    const btnPrevExamenes = $('#pagination-examen .btn-prev');
    const btnNextExamenes = $('#pagination-examen .btn-next');

    /****************************************************************************************
     * Elementos de vista modal 'Seleccionar medicamentos'
     ****************************************************************************************/
    const inputBuscarMedicamento = $('#buscar-medicamento');
    const bodyTablaMedicamentos = $('#tabla-medicamentos tbody');
    const paginationMedicamentos = $("#pagination-medicamento .pagination-info");
    const btnPrevMedicamentos = $('#pagination-medicamento .btn-prev');
    const btnNextMedicamentos = $('#pagination-medicamento .btn-next');

    /****************************************************************************************
     * Elementos de vista modal 'Seleccionar vacunas'
     ****************************************************************************************/
    const inputBuscarVacuna = $('#buscar-vacuna');
    const bodyTablaVacunas = $('#tabla-vacunas tbody');
    const paginationVacunas = $("#pagination-vacuna .pagination-info");
    const btnPrevVacunas = $('#pagination-vacuna .btn-prev');
    const btnNextVacunas = $('#pagination-vacuna .btn-next');

    /****************************************************************************************
     * Elementos de vista modal 'Seleccionar especialidades'
     ****************************************************************************************/
    const inputBuscarEspecialidad = $('#buscar-especialidad');
    const bodyTablaEspecialidades = $('#tabla-especialidades tbody');
    const paginationEspecialidades = $("#pagination-especialidad .pagination-info");
    const btnPrevEspecialidades = $('#pagination-especialidad .btn-prev');
    const btnNextEspecialidades = $('#pagination-especialidad .btn-next');

    /****************************************************************************************
     * Elementos de vista modal 'Seguimiento'
     ****************************************************************************************/
    const textAreaObservacionSeguimiento = $('#observación-seguimiento');
    const btnEditarObservacionSeguimiento = $('#btn-editar-observacion-seguimiento');
    const btnGuardarObservacionSeguimiento = $('#btn-guardar-observacion-seguimiento');

    /****************************************************************************************
     * Elementos de vista modal 'Agregar Seguimiento Medicamento'
     ****************************************************************************************/
    const bodyTablaSegMedicamentos = $('#tabla-seguimiento-medicamentos tbody');
    const bodyTablaPreFechasSegMedicamentos = $('#tabla-pre-fechas-programadas-seg-medicamentos tbody');
    const bodyTablaFechasSegMedicamentos = $('#tabla-fechas-programadas-seg-med tbody');
    const selectMedicamentosSinSeguimiento = $('#medicamento-sin-seguimiento');
    const btnAgregarFechaMedicamento = $('#btn-agregar-fecha-med');
    const inputFechaProgramadaMedicamento = $('#seguimiento-fecha-programada-med');
    const selectTipoSegMedicamento = $('#tipo-seg-med');
    const observacionSegMedicamento = $('#observacion-seg-med');

    /****************************************************************************************
     * Elementos de vista modal 'Agregar Seguimiento Examen'
     ****************************************************************************************/
    const bodyTablaSegExamenes = $('#tabla-seguimiento-examenes tbody');
    const bodyTablaPreFechasSegExamenes = $('#tabla-pre-fechas-programadas-seg-examenes tbody');
    const bodyTablaFechasSegExamenes = $('#tabla-fechas-programadas-seg-exa tbody');
    const selectExamenesSinSeguimiento = $('#examen-sin-seguimiento');
    const btnAgregarFechaExamen = $('#btn-agregar-fecha-exa');
    const inputFechaProgramadaExamen = $('#seguimiento-fecha-programada-exa');
    const selectTipoSegExamen = $('#tipo-seg-exa');
    const observacionSegExamen = $('#observacion-seg-exa');

    /****************************************************************************************
     * Elementos de vista modal 'Agregar Seguimiento Vacuna'
     ****************************************************************************************/
    const bodyTablaSegVacunas = $('#tabla-seguimiento-vacunas tbody');
    const bodyTablaPreFechasSegVacunas = $('#tabla-pre-fechas-programadas-seg-vacunas tbody');
    const bodyTablaFechasSegVacunas = $('#tabla-fechas-programadas-seg-vacunas tbody');
    const selectVacunasSinSeguimiento = $('#vacuna-sin-seguimiento');
    const btnAgregarFechaVacuna = $('#btn-agregar-fecha-vac');
    const inputFechaProgramadaVacuna = $('#seguimiento-fecha-programada-vac');
    const selectTipoSegVacuna = $('#tipo-seg-vac');
    const observacionSegVacuna = $('#observacion-seg-vac');

    /****************************************************************************************
     * Elementos de vista modal 'Agregar Seguimiento Especialidad'
     ****************************************************************************************/
    const bodyTablaSegEspecialidades = $('#tabla-seguimiento-especialidades tbody');
    const bodyTablaPreFechasSegEspecialidades = $('#tabla-pre-fechas-programadas-seg-especialidades tbody');
    const bodyTablaFechasSegEspecialidades = $('#tabla-fechas-programadas-seg-especialidades tbody');
    const selectEspecialidadesSinSeguimiento = $('#especialidad-sin-seguimiento');
    const btnAgregarFechaEspecialidad = $('#btn-agregar-fecha-esp');
    const inputFechaProgramadaEspecialidad = $('#seguimiento-fecha-programada-esp');
    const selectTipoSegEspecialidad = $('#tipo-seg-esp');
    const observacionSegEspecialidad = $('#observacion-seg-esp');


    let timeoutId = null;

    /*************************************************
     * Lógica de la vista principal 'Diagnosticos'
     *************************************************/

    let paginaTablaDiagnosticosActual = 0;
    cargarTablaDiagnosticos()

    function cargarTablaDiagnosticos() {
        let url = `/diagnosticos/listar?page=${paginaTablaDiagnosticosActual}`;
        let query = inputBuscarDiagnostico.val();
        let esCronico = $('input[name="r1"]:checked').val();
        if (query) {
            url += "&q=" + encodeURIComponent(query);
        }
        if (esCronico) {
            url += "&esCronico=" + encodeURIComponent(esCronico);
        }
        $.getJSON(url, (response) => {
            bodyTablaDiagnosticos.empty();
            let pageable = response.data;
            response.data.data.forEach((diagnostico) => {
                bodyTablaDiagnosticos.append(`
                    <tr data-enfermedad-id="${diagnostico.enfermedadId}" data-paciente-id="${diagnostico.pacienteId}">
                    <td>${diagnostico.paciente}</td>
                    <td>${diagnostico.esCronico ? diagnostico.cie10.descripcion : diagnostico.enfermedad}</td>
                    <td class="py-0 align-middle"> <span ${diagnostico.esCronico ? "class='badge badge-success'" : "class='badge badge-danger'"}>
                      ${diagnostico.esCronico ? "SI" : "NO"} </  span>
                    </td>
                    <td class="py-0 align-middle"> <span ${diagnostico.tratamientoId != null ? (diagnostico.estadoTratamientoId === Estado.ACTIVO ?
                    "class='badge badge-success'" : (diagnostico.estadoTratamientoId === Estado.VACIO ?
                        "class='badge badge-secondary'" : "class='badge badge-danger'")) : "class='badge badge-danger'"}>
                      ${diagnostico.tratamientoId != null ? (diagnostico.estadoTratamientoId === Estado.ACTIVO ?
                    "ACTIVO" : (diagnostico.estadoTratamientoId === Estado.VACIO ? "VACÍO"
                        : "class='badge badge-danger'")) : "NO INICIADO"}</span>
                    </td>
                    <td class="py-0 align-middle"> <span ${diagnostico.seguimientoId != null ? (diagnostico.estadoSeguimientoId === Estado.ACTIVO ?
                    "class='badge badge-success text-center'" : (diagnostico.estadoSeguimientoId === Estado.VACIO ?
                        "class='badge badge-secondary'" : "class='badge badge-danger'")) : "class='badge badge-danger'"}>
                      ${diagnostico.seguimientoId != null ? (diagnostico.estadoSeguimientoId === Estado.ACTIVO ?
                    "ACTIVO" : (diagnostico.estadoSeguimientoId === Estado.VACIO ? "VACÍO"
                        : "class='badge badge-danger'")) : "NO INICIADO"}</span>
                    </td>
                    <td class="text-center py-0 align-middle">
                      <div class="btn-group btn-group-sm">
                        <a class="btn btn-primary" id="btn-ver-tratamiento"
                        data-tratamiento-id="${diagnostico.tratamientoId}"
                        title="${diagnostico.tratamientoId != null ? "Ver Tratamiento" : "Iniciar Tratamiento"}"><i 
                        class="${diagnostico.tratamientoId != null ? "fas fa-eye" : "fas fa-play"}"></i></a>
                        <a class="btn btn-info" id="btn-ver-seguimiento"
                        data-seguimiento-id="${diagnostico.seguimientoId}"
                        title="${diagnostico.seguimientoId != null ? "Ver Seguimiento" : "Iniciar Seguimiento"}"><i 
                        class="${diagnostico.seguimientoId != null ? "fas fa-eye" : "fas fa-play"}"></i></a>
                        <a class="btn btn-danger eliminar-diagnostico" title="Eliminar"><i class="fas fa-trash" ></i></a>
                      </div>
                    </td>
                    </tr>
                `);
            });

            paginationDiagnosticos.html(`Página ${pageable.number + 1} de ${pageable.totalPages} - ${pageable.totalElements} registros`);
            cambiarEstadoBoton(btnPrevDiagnosticos, pageable.first);
            cambiarEstadoBoton(btnNextDiagnosticos, pageable.last);

        });
    }

    $('input[name="r1"]').change(() => {
        cargarTablaDiagnosticos();
    });

    btnPrevDiagnosticos.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaDiagnosticosActual--;
            cargarTablaDiagnosticos();
        }
    });
    btnNextDiagnosticos.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaDiagnosticosActual++;
            cargarTablaDiagnosticos();
        }
    });
    inputBuscarDiagnostico.on("input", () => {
        paginaTablaDiagnosticosActual = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(cargarTablaDiagnosticos, 1000);
    });

    $(document).on('click', '.eliminar-diagnostico', (e) => {
        e.preventDefault();
        let enfermedadId = $(e.target).closest('tr').data('enfermedad-id');
        mostrarModalConfirmacion("¿Estás seguro de eliminar este diagnóstico?", () => {
            $.ajax({
                url: `/diagnosticos/anular/${enfermedadId}`,
                type: 'PUT',
                contentType: 'application/json',
                success: (response) => {
                    toast('success', "Diagnóstico eliminado")
                    cargarTablaDiagnosticos()
                },
                error: (error) => {
                    toast('error', "Ha ocurrido un problema")
                }
            });
        })
    });

    function cambiarEstadoBoton(button, isDisabled) {
        button.toggleClass("disabled", isDisabled);
        button.prop("disabled", isDisabled);
    }

    /**
     * Lógica para modal de 'Enfermedades'
     */

    let paginaTablaCie10Actual = 0;
    const enfermedadesPre = []
    cargarTablaCie10()

    cargarFechaActual();

    function cargarFechaActual() {
        const fechaActual = new Date();
        let dia = fechaActual.getDate();
        let mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();

        if (mes < 10) {
            mes = "0" + mes;
        }
        if (dia < 10) {
            dia = "0" + dia;
        }
        const fechaFormateada = anio + "-" + mes + "-" + dia;
        inputFechaDiagnostico.val(fechaFormateada)
    }

    function cargarTablaCie10() {
        let url = `/diagnosticos/enfermedad/cie10?page=${paginaTablaCie10Actual}`;
        let query = inputBuscarCie10.val();
        if (query) {
            url += "&q=" + encodeURIComponent(query);
        }
        $.getJSON(url, (response) => {
            bodyTablaCie10.empty();
            let pageable = response.data;
            response.data.data.forEach((cie10) => {
                bodyTablaCie10.append(`
                    <tr>
                    <td>${cie10.codigoCie10}</td>
                    <td>${cie10.descripcion}</td>
                    <td>
                      <a class="btn btn-sm btn-primary seleccionar-cie10" data-toggle="modal" data-target="#modal-confirmacion"
                      data-cie10-id="${cie10.id}">Seleccionar</a>
                    </td>
                    </tr>
                `);
            });

            paginationCie10.html(`Página ${pageable.number + 1} de ${pageable.totalPages} - ${pageable.totalElements} registros`);

            cambiarEstadoBoton(btnPrevCie10, pageable.first)
            cambiarEstadoBoton(btnNextCie10, pageable.last)

        });
    }

    btnPrevCie10.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaCie10Actual--;
            cargarTablaCie10();
        }
    });
    btnNextCie10.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaCie10Actual++;
            cargarTablaCie10();
        }
    });
    inputBuscarCie10.on("input", () => {
        paginaTablaCie10Actual = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(cargarTablaCie10, 1000);
    });

    selectBuscarPaciente.select2({
        placeholder: 'Ingrese código de historial clínico o apellido',
        language: {
            inputTooShort: () => {
                return "Por favor, ingrese al menos 1 carácter";
            }
        },
        allowClear: true,
        minimumInputLength: 1,
        ajax: {
            url: `/pacientes/listar?page=0`,
            dataType: 'json',
            delay: 500,
            data: (params) => {
                return {
                    q: params.term
                };
            },
            processResults: (response) => {
                let data = response.data.data;
                let results = [];
                $.each(data, (index, item) => {
                    let text = item.codHistorialClinico + ' - ' + item.nombreCompleto;
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

    checkBoxCronico.on("change", (e) => {
        if ($(e.currentTarget).is(":checked")) {
            divNoCronico.addClass("d-none");
            divSiCronico.removeClass("d-none");
            textAreaDescripcionEnfermedad.val("");
        } else {
            divNoCronico.removeClass("d-none");
            divSiCronico.addClass("d-none");
            inputTextCie10.val("");
            inputHiddenCie10Id.val("");
        }
    });

    $(document).on("click", ".seleccionar-cie10", (e) => {
        let cie10Id = $(e.target).data("cie10-id");
        let descripcion = $(e.target).closest("tr").find("td:nth-child(2)").text();
        mostrarModalConfirmacion("¿Estás seguro de seleccionar esta enfermedad?", () => {
            inputTextCie10.val(descripcion)
            inputHiddenCie10Id.val(cie10Id)
            modalSeleccionarCie10.modal("hide");
        });
    });

    btnAgregarEnfermedad.click(() => {
        modalAgregarEnfermedad.modal('show')

        let fechaDiagnostico = inputFechaDiagnostico.val()
        let cie10id = null;
        let descripcionCie10 = null;
        let esCronico = checkBoxCronico[0].checked;
        let descripcion = null;
        let observacion = textAreaObservacionEnfermedad.val()

        if (esCronico) {
            cie10id = inputHiddenCie10Id.val()
            descripcionCie10 = inputTextCie10.val()
        } else {
            descripcion = textAreaDescripcionEnfermedad.val()
        }

        const enfermedadDto = new EnfermedadDto(null, fechaDiagnostico
            , cie10id, descripcionCie10, esCronico, descripcion, observacion)

        if (agregarEnfermedad(enfermedadDto)) {
            cargarTablaEnfermedadesPreseleccionadas()
            limpiarCamposAgregarEnfermedad()
            modalAgregarEnfermedad.modal('hide')
        }

    });

    function agregarEnfermedad(enfermedadDto) {
        if (enfermedadDto.esCronico) {
            if (enfermedadDto.descripcionCie10 === '') {
                return false
            }
            if (enfermedadesPre.some(e => e.cie10Id === enfermedadDto.cie10Id)) {
                toast('warning', 'Esta enfermedad ya se encuentra seleccionada')
                return false
            }
        } else {
            if (enfermedadDto.descripcion === '') {
                toast('warning', 'Debe ingresar una enfermedad')
                return false
            }
            if (enfermedadesPre.some(e => e.descripcion === enfermedadDto.descripcion)) {
                toast('warning', 'Esta enfermedad ya se encuentra seleccionada')
                return false
            }
        }

        enfermedadesPre.push(enfermedadDto)
        return true
    }

    function limpiarCamposAgregarEnfermedad() {
        textAreaObservacionEnfermedad.val('')
        inputHiddenCie10Id.val('')
        textAreaDescripcionEnfermedad.val('')
        inputTextCie10.val('')
    }

    function cargarTablaEnfermedadesPreseleccionadas() {
        bodyTablaEnfermedadesPreseleccionadas.empty();
        enfermedadesPre.forEach((enfermedad, index) => {
            bodyTablaEnfermedadesPreseleccionadas.append(`
                 <tr>
                    <td>${enfermedad.esCronico ? enfermedad.descripcionCie10 : enfermedad.descripcion}</td>
                    <td>${enfermedad.esCronico ? 'Si' : 'No'}</td>
                    <td class="text-center">
                      <a class="eliminar-elemento" data-index="${index}">
                        <i class="nav-icon fas fa-trash" style="color: red;"></i>
                        </a>
                    </td>
                 </tr>
            `);
        });
    }

    bodyTablaEnfermedadesPreseleccionadas.on("click", ".eliminar-elemento", (e) => {
        mostrarModalConfirmacion("¿Desea quitar esta enfermedad?", () => {
            const index = $(e.currentTarget).data("index");
            if (index !== undefined) {
                enfermedadesPre.splice(index, 1);
                cargarTablaEnfermedadesPreseleccionadas()
            }
        });
    });

    $(document).on('click', "#btn-guardar-enfermedades", function () {
        let pacienteId = selectBuscarPaciente.val();
        if (pacienteId == null) {
            toast('warning', 'Debe seleccionar un paciente')
            return;
        }
        if (enfermedadesPre.length === 0) {
            toast('warning', 'Debe agregar enfermedades')
            return;
        }
        const enfermedades = new EnfermedadesListWrapper(enfermedadesPre);
        enfermedadesPre.forEach(enfermedad => {
            enfermedad.pacienteId = pacienteId;
        })
        $.ajax({
            url: `/diagnosticos/enfermedad`,
            type: "POST",
            data: JSON.stringify(enfermedades),
            contentType: "application/json",
            success: (response) => {
                toast('success', 'Enfermedades agregadas')
                enfermedadesPre.splice(0, enfermedadesPre.length);
                bodyTablaEnfermedadesPreseleccionadas.empty();
                modalEnfermedadesPreseleccionadas.modal('hide');
                cargarTablaDiagnosticos();
            },
            error: (error) => {
                toast('error', 'Ha ocurrido un error');
            }
        });
    })

    /**
     * Lógica para modal 'Tratamientos'
     */

    let tratamientoId
    let tratamientoObj = {};

    $(document).on('click', '#btn-ver-tratamiento', (e) => {
        tratamientoId = $(e.currentTarget).data("tratamiento-id");
        let enfermedadId = $(e.currentTarget).closest("tr").data("enfermedad-id");

        if (tratamientoId == null) {
            mostrarModalConfirmacion("¿Desea iniciar el tratamiento?", () => {
                iniciarTratamiento(enfermedadId);
            });
            return;
        }

        cargarTablaTratamientosExamenes(tratamientoId);
        cargarTablaTratamientosMedicamentos(tratamientoId);
        cargarTablaTratamientosVacunas(tratamientoId);
        cargarTablaTratamientosEspecialidades(tratamientoId);
        cargarTratamiento(tratamientoId);
        modalTratamientos.modal('show');

    });

    function iniciarTratamiento(enfermedadId) {
        let tratamiento = {
            "enfermedadId": enfermedadId,
            "estadoId": Estado.VACIO
        }
        $.ajax({
            url: `/diagnosticos/tratamiento`,
            type: "POST",
            data: JSON.stringify(tratamiento),
            contentType: "application/json",
            success: (response) => {
                toast('success', 'Tratamiento iniciado');
                cargarTablaDiagnosticos();
            },
            error: (error) => {
                toast('error', 'Ha ocurrido un problema');
            }
        });
    }

    function cargarTratamiento(tratamientoId) {
        $.getJSON(`/diagnosticos/tratamiento/${tratamientoId}`, (response) => {
            if (response && response.data) {
                textAreaObservacionTratamiento.val(response.data.observacion)
                tratamientoObj = response.data
            }
        });
    }

    function editarTratamiento() {
        tratamientoObj.observacion = textAreaObservacionTratamiento.val();
        $.ajax({
            url: `/diagnosticos/tratamiento/${tratamientoId}`,
            type: "PUT",
            data: JSON.stringify(tratamientoObj),
            contentType: "application/json",
            success: function (response) {
                toast('success', 'Tratamiento editado con éxito')
                modalTratamientos.modal('hide')
            },
            error: function (error) {
                toast('error', 'Ha ocurrido un problema ' + error)
            }
        });
    }

    btnEditarObservacionTratamiento.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            btnGuardarObservacionTratamiento.prop('disabled', false);
            $(e.currentTarget).prop('disabled', true)
            textAreaObservacionTratamiento.prop('disabled', false);
        }
    });
    btnGuardarObservacionTratamiento.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            btnEditarObservacionTratamiento.prop('disabled', false);
            editarTratamiento()
            $(e.currentTarget).prop('disabled', true)
            textAreaObservacionTratamiento.prop('disabled', true);
        }
    });

    /**
     * Lógica para Tratamientos Exámenes
     */

    let paginaTablaExamenesActual = 0;
    cargarTablaExamenes()

    function cargarTablaTratamientosExamenes(tratamientoId) {
        bodyTablaTratamientosExamenes.empty();
        $.getJSON(`/diagnosticos/tratamiento/examen/${tratamientoId}`, (response) => {
            if (response && response.data) {
                response.data.forEach((examen) => {
                    bodyTablaTratamientosExamenes.append(`
                    <tr data-tra-examen-id="${examen.id}">
                      <td>${examen.examenTipo}</td>
                      <td class="text-wrap">${examen.examenDescripcion}</td>
                      <td>${new Date(examen.creadoEn).toLocaleString()}</td>
                      <td class="d-flex justify-content-center">
                        <a title="Eliminar" href="#" class="eliminar-tratamiento-examen"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                    </tr>
                `);
                });
            }
        });
    }

    function cargarTablaExamenes() {
        let url = `/diagnosticos/examen/listar?page=${paginaTablaExamenesActual}`;
        let query = $("#buscar-examen").val();
        if (query) {
            url += "&q=" + encodeURIComponent(query);
        }
        $.getJSON(url, (response) => {
            bodyTablaExamenes.empty();
            let pageable = response.data;
            response.data.data.forEach((examen) => {
                bodyTablaExamenes.append(`
                    <tr>
                    <td>${examen.codigo}</td>
                    <td>${examen.examenTipo.descripcion}</td>
                    <td>${examen.descripcion}</td>
                    <td>
                      <a class="btn btn-sm btn-primary seleccionar-examen" data-toggle="modal" data-target="#modal-confirmacion"
                      data-examen-id="${examen.id}">Seleccionar</a>
                    </td>
                    </tr>
                `);
            });

            paginationExamenes.html(`Página ${pageable.number + 1} de ${pageable.totalPages} - ${pageable.totalElements} registros`);
            cambiarEstadoBoton(btnPrevExamenes, pageable.first)
            cambiarEstadoBoton(btnNextExamenes, pageable.last)

        });
    }

    btnPrevExamenes.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaExamenesActual--;
            cargarTablaExamenes();
        }
    });
    btnNextExamenes.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaExamenesActual++;
            cargarTablaExamenes();
        }
    });
    inputBuscarExamen.on("input", () => {
        paginaTablaExamenesActual = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(cargarTablaExamenes, 1000);
    });

    function agregarTratamientoExamen(examenId, tratamientoId) {
        let json = {
            "tratamientoId": tratamientoId,
            "examenId": examenId,
            "estadoId": Estado.ACTIVO
        }
        $.ajax({
            url: `/diagnosticos/tratamiento/examen`,
            type: "POST",
            data: JSON.stringify(json),
            contentType: "application/json",
            success: function (response) {
                toast('success', 'Examen agregado con éxito')
                cargarTablaTratamientosExamenes(tratamientoId)
                cargarTablaDiagnosticos()
            },
            error: function (error) {
                if (error.responseJSON.error.examenId) {
                    toast('warning', error.responseJSON.error.examenId)
                } else {
                    toast('error', 'Ha ocurrido un problema')
                }
            }
        });
    }

    $(document).on("click", ".seleccionar-examen", (e) => {
        let examenId = $(e.currentTarget).data("examen-id");
        mostrarModalConfirmacion("¿Estás seguro de seleccionar este examen?", () => {
            agregarTratamientoExamen(examenId, tratamientoId)
            modalSeleccionarExamen.modal('hide');
        });
    });

    $(document).on('click', '.eliminar-tratamiento-examen', (e) => {
        e.preventDefault();
        let tratamientoExamenId = $(e.currentTarget).closest("tr").data('tra-examen-id');
        mostrarModalConfirmacion("¿Estás seguro de eliminar este examen?", () => {
            $.ajax({
                url: `/diagnosticos/tratamiento/examen/${tratamientoExamenId}`,
                type: 'PUT',
                contentType: 'application/json',
                success: (response) => {
                    toast('success', "Examen eliminado")
                    cargarTablaTratamientosExamenes(tratamientoId)
                },
                error: (error) => {
                    toast('error', "Ha ocurrido un problema")
                }
            });
        })
    });

    /**
     * Lógica para Tratamientos Medicamentos
     */

    let paginaTablaMedicamentosActual = 0
    cargarTablaMedicamentos();

    function cargarTablaTratamientosMedicamentos(tratamientoId) {
        bodyTablaTratamientosMedicamentos.empty();
        $.getJSON(`/diagnosticos/tratamiento/medicamento/${tratamientoId}`, (response) => {
            if (response && response.data) {
                response.data.forEach((medicamento) => {
                    $.getJSON(`/servicios/medicamento/buscar/${medicamento.medicamentoId}`, (medResponse) => {
                        bodyTablaTratamientosMedicamentos.append(`
                              <tr data-tra-medicamento-id="${medicamento.id}">
                                <td>${medResponse.data.pactivo}</td>
                                <td>${medResponse.data.nombre}</td>
                                <td>${new Date(medicamento.creadoEn).toLocaleString()}</td>
                                <td class="d-flex justify-content-center">
                                  <a title="Eliminar" href="#" class="eliminar-tratamiento-medicamento"><i class="nav-icon fas fa-trash"></i></a>
                                </td>
                              </tr>
                            `);
                    });
                });
            }
        });
    }

    function cargarTablaMedicamentos() {
        const buscar = inputBuscarMedicamento.val();
        $.getJSON(`/servicios/medicamento/listar?value=${buscar}&page=${paginaTablaMedicamentosActual}&size=10`, (response) => {
            bodyTablaMedicamentos.empty();
            const pageable = response.data.result;
            response.data.result.content.forEach((medicamento) => {
                bodyTablaMedicamentos.append(`
                    <tr>
                    <td>${medicamento.nombre}</td>
                    <td>${medicamento.pactivo}</td>
                    <td>
                      <a class="btn btn-sm btn-primary seleccionar-medicamento" data-toggle="modal" data-target="#modal-confirmacion"
                      data-medicamento-id="${medicamento.id}">Seleccionar</a>
                    </td>
                    </tr>
                `);
            });
            paginationMedicamentos.html(`Página ${pageable.number + 1} de ${pageable.totalPages} - ${pageable.totalElements} registros`);
            cambiarEstadoBoton(btnPrevMedicamentos, pageable.first);
            cambiarEstadoBoton(btnNextMedicamentos, pageable.last);
        });
    }

    btnPrevMedicamentos.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaMedicamentosActual--;
            cargarTablaMedicamentos();
        }
    });
    btnNextMedicamentos.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaMedicamentosActual++;
            cargarTablaMedicamentos();
        }
    });
    inputBuscarMedicamento.on("input", () => {
        paginaTablaMedicamentosActual = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(cargarTablaMedicamentos, 1000);
    });

    function agregarTratamientoMedicamento(medicamentoId, tratamientoId) {
        let json = {
            "tratamientoId": tratamientoId,
            "medicamentoId": medicamentoId,
            "estadoId": Estado.ACTIVO
        }
        $.ajax({
            url: `/diagnosticos/tratamiento/medicamento`,
            type: "POST",
            data: JSON.stringify(json),
            contentType: "application/json",
            success: function (response) {
                toast('success', 'Medicamento agregado con éxito')
                cargarTablaTratamientosMedicamentos(tratamientoId)
                cargarTablaDiagnosticos()
            },
            error: function (error) {
                if (error.responseJSON.error.medicamentoId) {
                    toast('warning', error.responseJSON.error.medicamentoId)
                } else {
                    toast('error', 'Ha ocurrido un problema')
                }
            }
        });
    }

    $(document).on("click", ".seleccionar-medicamento", (e) => {
        let medicamentoId = $(e.currentTarget).data("medicamento-id");
        mostrarModalConfirmacion("¿Estás seguro de seleccionar este medicamento?", () => {
            agregarTratamientoMedicamento(medicamentoId, tratamientoId)
            modalSeleccionarMedicamento.modal('hide');
        });
    });

    $(document).on('click', '.eliminar-tratamiento-medicamento', (e) => {
        e.preventDefault();
        let tratamientoMedicamentoId = $(e.currentTarget).closest("tr").data('tra-medicamento-id');
        mostrarModalConfirmacion("¿Estás seguro de eliminar este medicamento?", () => {
            $.ajax({
                url: `/diagnosticos/tratamiento/medicamento/${tratamientoMedicamentoId}`,
                type: 'PUT',
                contentType: 'application/json',
                success: (response) => {
                    toast('success', "Medicamento eliminado")
                    cargarTablaTratamientosMedicamentos(tratamientoId)
                },
                error: (error) => {
                    toast('error', "Ha ocurrido un problema")
                }
            });
        })
    });

    /**
     * Lógica para Tratamientos Vacunas
     */

    let paginaTablaVacunasActual = 0;
    cargarTablaVacunas()

    function cargarTablaTratamientosVacunas(tratamientoId) {
        bodyTablaTratamientosVacunas.empty();
        $.getJSON(`/diagnosticos/tratamiento/vacuna/${tratamientoId}`, (response) => {
            if (response && response.data) {
                response.data.forEach((vacuna) => {
                    bodyTablaTratamientosVacunas.append(`
                    <tr data-tra-vacuna-id="${vacuna.id}">
                      <td>${vacuna.vacunaDescripcion}</td>
                      <td>${new Date(vacuna.creadoEn).toLocaleString()}</td>
                      <td class="d-flex justify-content-center">
                        <a title="Eliminar" href="#" class="eliminar-tratamiento-vacuna"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                    </tr>
                `);
                });
            }
        });
    }

    function cargarTablaVacunas() {
        let url = `/diagnosticos/vacuna/listar?page=${paginaTablaVacunasActual}`;
        let query = inputBuscarVacuna.val();
        if (query) {
            url += "&q=" + encodeURIComponent(query);
        }
        $.getJSON(url, (response) => {
            bodyTablaVacunas.empty();
            let pageable = response.data;
            response.data.data.forEach((vacuna) => {
                bodyTablaVacunas.append(`
                    <tr>
                    <td>${vacuna.descripcion}</td>
                    <td>${vacuna.edad ? vacuna.edad : ''}</td>
                    <td>${vacuna.dosis ? vacuna.dosis : ''}</td>
                    <td>${vacuna.laboratorio ? vacuna.laboratorio : ''}</td>
                    <td>
                      <a class="btn btn-sm btn-primary seleccionar-vacuna" data-toggle="modal" data-target="#modal-confirmacion"
                      data-vacuna-id="${vacuna.id}">Seleccionar</a>
                    </td>
                    </tr>
                `);
            });

            paginationVacunas.html(`Página ${pageable.number + 1} de ${pageable.totalPages} - ${pageable.totalElements} registros`);
            cambiarEstadoBoton(btnPrevVacunas, pageable.first)
            cambiarEstadoBoton(btnNextVacunas, pageable.last)

        });
    }

    btnPrevVacunas.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaVacunasActual--;
            cargarTablaVacunas();
        }
    });
    btnNextVacunas.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaVacunasActual++;
            cargarTablaVacunas();
        }
    });
    inputBuscarVacuna.on("input", () => {
        paginaTablaVacunasActual = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(cargarTablaVacunas, 1000);
    });

    function agregarTratamientoVacuna(vacunaId, tratamientoId) {
        let json = {
            "tratamientoId": tratamientoId,
            "vacunaId": vacunaId,
            "estadoId": Estado.ACTIVO
        }
        $.ajax({
            url: `/diagnosticos/tratamiento/vacuna`,
            type: "POST",
            data: JSON.stringify(json),
            contentType: "application/json",
            success: function (response) {
                toast('success', 'Vacuna agregada con éxito')
                cargarTablaTratamientosVacunas(tratamientoId)
                cargarTablaDiagnosticos()
            },
            error: function (error) {
                if (error.responseJSON.error.vacunaId) {
                    toast('warning', error.responseJSON.error.vacunaId)
                } else {
                    toast('error', 'Ha ocurrido un problema')
                }
            }
        });
    }

    $(document).on("click", ".seleccionar-vacuna", (e) => {
        let vacunaId = $(e.currentTarget).data("vacuna-id");
        mostrarModalConfirmacion("¿Estás seguro de seleccionar esta vacuna?", () => {
            agregarTratamientoVacuna(vacunaId, tratamientoId)
            modalSeleccionarVacuna.modal('hide');
        });
    });

    $(document).on('click', '.eliminar-tratamiento-vacuna', (e) => {
        e.preventDefault();
        let tratamientoVacunaId = $(e.currentTarget).closest("tr").data('tra-vacuna-id');
        mostrarModalConfirmacion("¿Estás seguro de eliminar esta vacuna?", () => {
            $.ajax({
                url: `/diagnosticos/tratamiento/vacuna/${tratamientoVacunaId}`,
                type: 'PUT',
                contentType: 'application/json',
                success: (response) => {
                    toast('success', "Vacuna eliminada")
                    cargarTablaTratamientosVacunas(tratamientoId)
                },
                error: (error) => {
                    toast('error', "Ha ocurrido un problema")
                }
            });
        })
    });

    /**
     * Lógica para Tratamientos Especialidades
     */

    let paginaTablaEspecialidadesActual = 0;
    cargarTablaEspecialidades()

    function cargarTablaTratamientosEspecialidades(tratamientoId) {
        bodyTablaTratamientosEspecialidad.empty();
        $.getJSON(`/diagnosticos/tratamiento/especialidad/${tratamientoId}`, (response) => {
            if (response && response.data) {
                response.data.forEach((especialidad) => {
                    bodyTablaTratamientosEspecialidad.append(`
                    <tr data-tra-especialidad-id="${especialidad.id}">
                      <td>${especialidad.especialidadDescripcion}</td>
                      <td>${new Date(especialidad.creadoEn).toLocaleString()}</td>
                      <td class="d-flex justify-content-center">
                        <a title="Eliminar" href="#" class="eliminar-tratamiento-especialidad"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                    </tr>
                `);
                });
            }
        });
    }

    function cargarTablaEspecialidades() {
        let url = `/diagnosticos/especialidad/listar?page=${paginaTablaEspecialidadesActual}`;
        let query = inputBuscarEspecialidad.val();
        if (query) {
            url += "&q=" + encodeURIComponent(query);
        }
        $.getJSON(url, (response) => {
            bodyTablaEspecialidades.empty();
            let pageable = response.data;
            response.data.data.forEach((especialidad) => {
                bodyTablaEspecialidades.append(`
                    <tr>
                    <td>${especialidad.descripcion}</td>
                    <td>
                      <a class="btn btn-sm btn-primary seleccionar-especialidad" data-toggle="modal" data-target="#modal-confirmacion"
                      data-especialidad-id="${especialidad.id}">Seleccionar</a>
                    </td>
                    </tr>
                `);
            });

            paginationEspecialidades.html(`Página ${pageable.number + 1} de ${pageable.totalPages} - ${pageable.totalElements} registros`);
            cambiarEstadoBoton(btnPrevEspecialidades, pageable.first)
            cambiarEstadoBoton(btnNextEspecialidades, pageable.last)

        });
    }

    btnPrevEspecialidades.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaEspecialidadesActual--;
            cargarTablaEspecialidades();
        }
    });
    btnNextEspecialidades.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaEspecialidadesActual++;
            cargarTablaEspecialidades();
        }
    });
    inputBuscarEspecialidad.on("input", () => {
        paginaTablaEspecialidadesActual = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(cargarTablaEspecialidades, 1000);
    });

    function agregarTratamientoEspecialidad(especialidadId, tratamientoId) {
        let json = {
            "tratamientoId": tratamientoId,
            "especialidadId": especialidadId,
            "estadoId": Estado.ACTIVO
        }
        $.ajax({
            url: `/diagnosticos/tratamiento/especialidad`,
            type: "POST",
            data: JSON.stringify(json),
            contentType: "application/json",
            success: function (response) {
                toast('success', 'Especialidad agregada con éxito')
                cargarTablaTratamientosEspecialidades(tratamientoId)
                cargarTablaDiagnosticos()
            },
            error: function (error) {
                if (error.responseJSON.error.especialidadId) {
                    toast('warning', error.responseJSON.error.especialidadId)
                } else {
                    toast('error', 'Ha ocurrido un problema')
                }
            }
        });
    }

    $(document).on("click", ".seleccionar-especialidad", (e) => {
        let especialidadId = $(e.currentTarget).data("especialidad-id");
        mostrarModalConfirmacion("¿Estás seguro de seleccionar esta especialidad?", () => {
            agregarTratamientoEspecialidad(especialidadId, tratamientoId)
            modalSeleccionarEspecialidad.modal('hide');
        });
    });

    $(document).on('click', '.eliminar-tratamiento-especialidad', (e) => {
        e.preventDefault();
        let tratamientoEspecialidadId = $(e.currentTarget).closest("tr").data('tra-especialidad-id');
        mostrarModalConfirmacion("¿Estás seguro de eliminar esta especialidad?", () => {
            $.ajax({
                url: `/diagnosticos/tratamiento/especialidad/${tratamientoEspecialidadId}`,
                type: 'PUT',
                contentType: 'application/json',
                success: (response) => {
                    toast('success', "Especialidad eliminada")
                    cargarTablaTratamientosEspecialidades(tratamientoId)
                },
                error: (error) => {
                    toast('error', "Ha ocurrido un problema")
                }
            });
        })
    });


    /**
     *  Lógica para seguimientos
     */

    let seguimientoId
    let seguimientoObj = {}

    $(document).on('click', '#btn-ver-seguimiento', (e) => {
        seguimientoId = $(e.currentTarget).data("seguimiento-id");
        let tratamientoId = $(e.currentTarget).closest("tr").find("#btn-ver-tratamiento").data("tratamiento-id");
        let pacienteId = $(e.currentTarget).closest("tr").data("paciente-id");

        if (tratamientoId == null) {
            toast('warning', 'Debe iniciar un tratamiento primero');
            return;
        }

        if (seguimientoId == null) {
            mostrarModalConfirmacion("¿Desea iniciar el seguimiento?", () => {
                iniciarSeguimiento(tratamientoId, pacienteId);
            })
            return;
        }

        cargarSeguimiento(seguimientoId);
        cargarTablaSeguimientosExamenesUnicos(seguimientoId);
        cargarTablaSeguimientosMedicamentosUnicos(seguimientoId);
        cargarTablaSeguimientosVacunasUnicas(seguimientoId)
        cargarTablaSeguimientosEspecialidadesUnicas(seguimientoId)
        cargarSelectExamenesConTratamientos(tratamientoId);
        cargarSelectMedicamentosConTratamientos(tratamientoId);
        cargarSelectVacunasConTratamientos(tratamientoId);
        cargarSelectEspecialidadesConTratamientos(tratamientoId);
        modalSeguimientos.modal('show');
    });

    function iniciarSeguimiento(tratamientoId, pacienteId) {
        let seguimiento = {
            "tratamientoId": tratamientoId,
            "pacienteId": pacienteId,
            "estadoId": Estado.VACIO
        }
        $.ajax({
            url: `/diagnosticos/pre/seguimiento`,
            type: "POST",
            data: JSON.stringify(seguimiento),
            contentType: "application/json",
            success: (response) => {
                toast('success', 'Seguimiento iniciado');
                cargarTablaDiagnosticos();
            },
            error: (error) => {
                toast('error', 'Ha ocurrido un problema');
            }
        });
    }

    function cargarSeguimiento(seguimientoId) {
        $.getJSON(`/diagnosticos/pre/seguimiento/${seguimientoId}`, (response) => {
            if (response && response.data) {
                textAreaObservacionSeguimiento.val(response.data.observacion)
                seguimientoObj = response.data
            }
        });
    }

    function editarSeguimiento() {
        seguimientoObj.observacion = textAreaObservacionSeguimiento.val();
        $.ajax({
            url: `/diagnosticos/pre/seguimiento/${seguimientoId}`,
            type: "PUT",
            data: JSON.stringify(seguimientoObj),
            contentType: "application/json",
            success: function (response) {
                toast('success', 'Seguimiento editado con éxito')
                modalSeguimientos.modal('hide')
            },
            error: function (error) {
                toast('error', 'Ha ocurrido un problema ' + error)
            }
        });
    }

    btnEditarObservacionSeguimiento.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            btnGuardarObservacionSeguimiento.prop('disabled', false);
            $(e.currentTarget).prop('disabled', true)
            textAreaObservacionSeguimiento.prop('disabled', false);
        }
    });
    btnGuardarObservacionSeguimiento.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            btnEditarObservacionSeguimiento.prop('disabled', false);
            editarSeguimiento()
            $(e.currentTarget).prop('disabled', true)
            textAreaObservacionSeguimiento.prop('disabled', true);
        }
    });

    /**
     * Lógica para Seguimientos Exámenes
     */

    const fechasProgramadasExamen = []
    const fechaActual = new Date().toISOString().split('T')[0];
    inputFechaProgramadaExamen.attr('min', fechaActual);
    inputFechaProgramadaMedicamento.attr('min', fechaActual);
    inputFechaProgramadaVacuna.attr('min', fechaActual);
    inputFechaProgramadaEspecialidad.attr('min', fechaActual);

    function cargarTablaSeguimientosExamenesUnicos(seguimientoId) {
        bodyTablaSegExamenes.empty();
        $.getJSON(`/diagnosticos/pre/seguimiento/examen/${seguimientoId}`, (response) => {
            if (response && response.data) {
                response.data.forEach((examen) => {
                    bodyTablaSegExamenes.append(`
                    <tr data-tra-examen-id="${examen.tratamientoExamenId}">
                      <td>${examen.tipoExamen}</td>
                      <td class="text-wrap">${examen.nombreExamen}</td>
                      <td class="d-flex justify-content-around">
                        <a title="Ver fechas" href="#" class="ver-fechas-programadas"><i class="nav-icon fas fa-eye"></i></a>
                        <a title="Eliminar todo" href="#" class="eliminar-fechas-programadas"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                    </tr>
                `);
                });
            }
        });
    }

    function cargarTablaSeguimientoExamenes(seguimientoId, tratamientoExamenId) {
        $.getJSON(`/diagnosticos/pre/seguimiento/examen/${seguimientoId}/${tratamientoExamenId}`, (response) => {
            bodyTablaFechasSegExamenes.empty();
            if (response && response.data) {
                response.data.forEach((segExamen) => {
                    bodyTablaFechasSegExamenes.append(`
                     <tr data-seg-examen-id="${segExamen.id}" 
                     data-tra-examen-id="${segExamen.tratamientoExamenId}">
                      <td>${segExamen.fechaProgramada}</td>
                      <td>${segExamen.tipoNotificacion === 'S' ? 'Servicio' : 'Compra'}</td>
                      <td>${segExamen.observacion}</td>
                      <td class="text-center">
                        <a title="Eliminar" href="#" class="eliminar-fecha"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                      </tr>
                    `);
                });
                modalVerFechasProgramadasExamen.modal('show');
            }
        });
    }

    bodyTablaSegExamenes.on('click', '.ver-fechas-programadas', (e) => {
        e.preventDefault();
        const tratamientoExamenId = $(e.currentTarget).closest('tr').data("tra-examen-id");
        cargarTablaSeguimientoExamenes(seguimientoId, tratamientoExamenId)
    })

    bodyTablaSegExamenes.on('click', '.eliminar-fechas-programadas', (e) => {
        e.preventDefault();
        const tratamientoExamenId = $(e.currentTarget).closest('tr').data("tra-examen-id");
        mostrarModalConfirmacion("¿Estás seguro de eliminar todas las fechas programadas?"
            , () => {
                $.ajax({
                    url: `/diagnosticos/pre/seguimiento/anular/examenes/${seguimientoId}/${tratamientoExamenId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    success: (response) => {
                        toast('success', "Fechas eliminadas")
                        cargarTablaSeguimientosExamenesUnicos(seguimientoId);
                        cargarTablaDiagnosticos();
                    },
                    error: (error) => {
                        toast('error', "Ha ocurrido un problema")
                    }
                });
            })
    })

    bodyTablaFechasSegExamenes.on('click', '.eliminar-fecha', (e) => {
        e.preventDefault();
        const seguimientoExamenId = $(e.currentTarget).closest('tr').data("seg-examen-id");
        const tratamientoExamenId = $(e.currentTarget).closest('tr').data("tra-examen-id");
        mostrarModalConfirmacion("¿Estás seguro de eliminar esta fecha?"
            , () => {
                $.ajax({
                    url: `/diagnosticos/pre/seguimiento/anular/examen/${seguimientoExamenId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    success: (response) => {
                        toast('success', "Fecha eliminada")
                        cargarTablaSeguimientoExamenes(seguimientoId, tratamientoExamenId)
                        cargarTablaSeguimientosExamenesUnicos(seguimientoId)
                    },
                    error: (error) => {
                        toast('error', "Ha ocurrido un problema")
                    }
                });
            })
    })

    function cargarSelectExamenesConTratamientos(tratamientoId) {
        $.getJSON(`/diagnosticos/tratamiento/examen/${tratamientoId}`, (response) => {
            if (!(response && response.data)) {
                return;
            }
            let data = response.data;
            selectExamenesSinSeguimiento.empty();
            $.each(data, (index, item) => {
                let text = item.examenDescripcion;
                let option = $('<option>', {
                    value: item.id,
                    text: text
                });
                selectExamenesSinSeguimiento.append(option);
            });
        });
    }

    btnAgregarFechaExamen.click((e) => {
        e.preventDefault();
        const fecha = inputFechaProgramadaExamen.val();
        const tipoId = selectTipoSegExamen.val();
        const tipoDescripcion = selectTipoSegExamen.find(":selected").text();
        const observacion = observacionSegExamen.val();
        const seguimientoExamen = new SeguimientoExamen(seguimientoId, fecha, tipoId, tipoDescripcion, observacion)

        if (agregarFechaSegExamen(seguimientoExamen)) {
            fechasProgramadasExamen.sort((a, b) => new Date(a.fechaProgramada) - new Date(b.fechaProgramada));
            cargarTablaPreFechasSegExamenes();
            observacionSegExamen.val('');
        }

    });

    function agregarFechaSegExamen(seguimientoExamen) {
        if (seguimientoExamen.tipoNotificacionDesc === "Seleccionar") {
            toast('warning', 'Debe elegir un tipo de notificación');
            return false;
        }
        if (seguimientoExamen.fechaProgramada === '') {
            toast('warning', 'Debe seleccionar una fecha');
            return false;
        }
        const fechaIngresada = new Date(seguimientoExamen.fechaProgramada);
        const fechaActual = new Date();
        if (fechaIngresada <= fechaActual) {
            toast('warning', 'No se puede programar en esta fecha');
            return false;
        }
        const fechaExistente = fechasProgramadasExamen.find((obj) => {
            return obj.fechaProgramada === seguimientoExamen.fechaProgramada;
        });

        if (fechaExistente) {
            toast('warning', 'La fecha ya ha sido ingresada anteriormente');
            return;
        }
        if (seguimientoExamen.tipoNotificacionCod === '') {
            toast('warning', 'Debe seleccionar un tipo');
            return false;
        }

        fechasProgramadasExamen.push(seguimientoExamen);
        return true;
    }

    $(document).on('click', "#btn-guardar-seg-examenes", () => {
        if (fechasProgramadasExamen.length === 0) {
            toast('warning', 'Debe agregar fechas')
            return;
        }
        const tratamientoExamenId = selectExamenesSinSeguimiento.val();
        fechasProgramadasExamen.forEach((e) => {
            e.tratamientoExamenId = tratamientoExamenId;
        })
        const segExamenesList = new SeguimientoExamenListWrapper(fechasProgramadasExamen);
        console.log(segExamenesList)
        $.ajax({
            url: `/diagnosticos/pre/seguimiento/examen`,
            type: "POST",
            data: JSON.stringify(segExamenesList),
            contentType: "application/json",
            success: (response) => {
                fechasProgramadasExamen.splice(0, fechasProgramadasExamen.length);
                bodyTablaPreFechasSegExamenes.empty();
                cargarTablaSeguimientosExamenesUnicos(seguimientoId)
                cargarTablaDiagnosticos()
                toast('success', 'Fechas programadas agregadas')
                modalAgregarSeguimientoExamen.modal('hide')
            },
            error: (error) => {
                if (error.responseJSON.error) {
                    toast('warning', "Una fecha ya está programada")
                } else {
                    toast('error', 'Ha ocurrido un problema')
                }
            }
        });
    })

    function cargarTablaPreFechasSegExamenes() {
        bodyTablaPreFechasSegExamenes.empty();
        fechasProgramadasExamen.forEach((e, index) => {
            bodyTablaPreFechasSegExamenes.append(`
            <tr>
              <td>${e.fechaProgramada}</td>
              <td style="max-width: 150px;" class="text-truncate">${e.observacion}</td>
              <td>${e.tipoNotificacionDesc}</td>
              <td class="text-center">
                <a title="Eliminar" href="#" class="eliminar-elemento" data-index="${index}">
                  <i class="nav-icon fas fa-trash" style="color: red;"></i>
                </a>
              </td>
            </tr>
            `);
        });
    }

    bodyTablaPreFechasSegExamenes.on("click", ".eliminar-elemento", (e) => {
        const index = $(e.currentTarget).data("index");
        if (index !== undefined) {
            fechasProgramadasExamen.splice(index, 1);
            cargarTablaPreFechasSegExamenes()
        }
    });

    /**
     * Lógica para Seguimientos Medicamentos
     */

    const fechasProgramadasMedicamento = []

    function cargarTablaSeguimientosMedicamentosUnicos(seguimientoId) {
        bodyTablaSegMedicamentos.empty();
        $.getJSON(`/diagnosticos/pre/seguimiento/medicamento/${seguimientoId}`, (response) => {
            if (!(response && response.data)) {
                return;
            }
            response.data.forEach((medicamento) => {
                $.getJSON(`/servicios/medicamento/buscar/${medicamento.medicamentoId}`, (medResponse) => {
                    bodyTablaSegMedicamentos.append(`
                              <tr data-tra-medicamento-id="${medicamento.tratamientoMedicamentoId}">
                              <td>${medResponse.data.pactivo}</td>
                              <td>${medResponse.data.nombre}</td>
                              <td class="d-flex justify-content-around">
                                <a title="Ver fechas" href="#" class="ver-fechas-programadas"><i class="nav-icon fas fa-eye"></i></a>
                                <a title="Eliminar todo" href="#" class="eliminar-fechas-programadas"><i class="nav-icon fas fa-trash"></i></a>
                              </td>
                              </tr>
                        `);
                });
            });
        });
    }

    function cargarTablaSeguimientoMedicamentos(seguimientoId, tratamientoMedicamentoId) {
        $.getJSON(`/diagnosticos/pre/seguimiento/medicamento/${seguimientoId}/${tratamientoMedicamentoId}`, (response) => {
            bodyTablaFechasSegMedicamentos.empty();
            if (response && response.data) {
                response.data.forEach((segMedicamento) => {
                    bodyTablaFechasSegMedicamentos.append(`
                     <tr data-seg-medicamento-id="${segMedicamento.id}" 
                     data-tra-medicamento-id="${segMedicamento.tratamientoMedicamentoId}">
                      <td>${segMedicamento.fechaProgramada}</td>
                      <td>${segMedicamento.tipoNotificacion === 'S' ? 'Servicio' : 'Compra'}</td>
                      <td>${segMedicamento.observacion}</td>
                      <td class="text-center">
                        <a title="Eliminar" href="#" class="eliminar-fecha"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                      </tr>
                    `);
                });
                modalVerFechasProgramadasMedicamento.modal('show');
            }
        });
    }

    bodyTablaSegMedicamentos.on('click', '.ver-fechas-programadas', (e) => {
        e.preventDefault();
        const tratamientoMedicamentoId = $(e.currentTarget).closest('tr').data("tra-medicamento-id");
        cargarTablaSeguimientoMedicamentos(seguimientoId, tratamientoMedicamentoId)
    });

    bodyTablaSegMedicamentos.on('click', '.eliminar-fechas-programadas', (e) => {
        e.preventDefault();
        const tratamientoMedicamentoId = $(e.currentTarget).closest('tr').data("tra-medicamento-id");
        mostrarModalConfirmacion("¿Estás seguro de eliminar todas las fechas programadas?"
            , () => {
                $.ajax({
                    url: `/diagnosticos/pre/seguimiento/anular/medicamentos/${seguimientoId}/${tratamientoMedicamentoId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    success: (response) => {
                        toast('success', "Fechas eliminadas")
                        cargarTablaSeguimientosMedicamentosUnicos(seguimientoId);
                        cargarTablaDiagnosticos();
                    },
                    error: (error) => {
                        toast('error', "Ha ocurrido un problema")
                    }
                });
            })
    })

    bodyTablaFechasSegMedicamentos.on('click', '.eliminar-fecha', (e) => {
        e.preventDefault();
        const seguimientoMedicamentoId = $(e.currentTarget).closest('tr').data("seg-medicamento-id");
        const tratamientoMedicamentoId = $(e.currentTarget).closest('tr').data("tra-medicamento-id");
        mostrarModalConfirmacion("¿Estás seguro de eliminar esta fecha?"
            , () => {
                $.ajax({
                    url: `/diagnosticos/pre/seguimiento/anular/medicamento/${seguimientoMedicamentoId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    success: () => {
                        toast('success', "Fecha eliminada")
                        cargarTablaSeguimientoMedicamentos(seguimientoId, tratamientoMedicamentoId)
                        cargarTablaSeguimientosMedicamentosUnicos(seguimientoId)
                    },
                    error: () => {
                        toast('error', "Ha ocurrido un problema")
                    }
                });
            })
    })

    function cargarSelectMedicamentosConTratamientos(tratamientoId) {
        $.getJSON(`/diagnosticos/tratamiento/medicamento/${tratamientoId}`, (response) => {
            if (!(response && response.data)) {
                return;
            }
            selectMedicamentosSinSeguimiento.empty();
            response.data.forEach((medicamento) => {
                $.getJSON(`/servicios/medicamento/buscar/${medicamento.medicamentoId}`, (responseMed) => {
                    let text = responseMed.data.nombre;
                    let option = $('<option>', {
                        value: medicamento.id,
                        text: text
                    });
                    selectMedicamentosSinSeguimiento.append(option);
                });
            });
        });
    }

    btnAgregarFechaMedicamento.click((e) => {
        e.preventDefault();
        const fecha = inputFechaProgramadaMedicamento.val();
        const tipoId = selectTipoSegMedicamento.val();
        const tipoDescripcion = selectTipoSegMedicamento.find(":selected").text();
        const observacion = observacionSegMedicamento.val();
        const seguimientoMedicamento = new SeguimientoMedicamento(seguimientoId, fecha, tipoId, tipoDescripcion, observacion)

        if (agregarFechaSegMedicamento(seguimientoMedicamento)) {
            fechasProgramadasMedicamento.sort((a, b) => new Date(a.fechaProgramada) - new Date(b.fechaProgramada));
            cargarTablaPreFechasSegMedicamentos();
            observacionSegMedicamento.val('');
        }

    });

    function agregarFechaSegMedicamento(seguimientoMedicamento) {
        if (seguimientoMedicamento.tipoNotificacionDesc === "Seleccionar") {
            toast('warning', 'Debe elegir un tipo de notificación');
            return false;
        }
        if (seguimientoMedicamento.fechaProgramada === '') {
            toast('warning', 'Debe seleccionar una fecha');
            return false;
        }
        const fechaIngresada = new Date(seguimientoMedicamento.fechaProgramada);
        const fechaActual = new Date();
        if (fechaIngresada <= fechaActual) {
            toast('warning', 'No se puede programar en esta fecha');
            return false;
        }
        const fechaExistente = fechasProgramadasMedicamento.find((obj) => {
            return obj.fechaProgramada === seguimientoMedicamento.fechaProgramada;
        });

        if (fechaExistente) {
            toast('warning', 'La fecha ya ha sido ingresada anteriormente');
            return;
        }
        if (seguimientoMedicamento.tipoNotificacionCod === '') {
            toast('warning', 'Debe seleccionar un tipo');
            return false;
        }

        fechasProgramadasMedicamento.push(seguimientoMedicamento);
        return true;
    }

    $(document).on('click', "#btn-guardar-seg-medicamentos", () => {
        if (fechasProgramadasMedicamento.length === 0) {
            toast('warning', 'Debe agregar fechas')
            return;
        }
        const tratamientoMedicamentoId = selectMedicamentosSinSeguimiento.val();
        fechasProgramadasMedicamento.forEach((e) => {
            e.tratamientoMedicamentoId = tratamientoMedicamentoId;
        })
        const segMedicamentosList = new SeguimientoMedicamentoListWrapper(fechasProgramadasMedicamento);
        console.log(segMedicamentosList)
        $.ajax({
            url: `/diagnosticos/pre/seguimiento/medicamento`,
            type: "POST",
            data: JSON.stringify(segMedicamentosList),
            contentType: "application/json",
            success: (response) => {
                fechasProgramadasMedicamento.splice(0, fechasProgramadasMedicamento.length);
                bodyTablaPreFechasSegMedicamentos.empty();
                cargarTablaSeguimientosMedicamentosUnicos(seguimientoId)
                cargarTablaDiagnosticos()
                toast('success', 'Fechas programadas agregadas')
                modalAgregarSeguimientoMedicamento.modal('hide')
            },
            error: (error) => {
                if (error.responseJSON.error) {
                    toast('warning', "Una fecha ya está programada")
                } else {
                    toast('error', 'Ha ocurrido un problema')
                }
            }
        });
    })

    function cargarTablaPreFechasSegMedicamentos() {
        bodyTablaPreFechasSegMedicamentos.empty();
        fechasProgramadasMedicamento.forEach((e, index) => {
            bodyTablaPreFechasSegMedicamentos.append(`
            <tr>
              <td>${e.fechaProgramada}</td>
              <td style="max-width: 150px;" class="text-truncate">${e.observacion}</td>
              <td>${e.tipoNotificacionDesc}</td>
              <td class="text-center">
                <a title="Eliminar" href="#" class="eliminar-elemento" data-index="${index}">
                  <i class="nav-icon fas fa-trash" style="color: red;"></i>
                </a>
              </td>
            </tr>
            `);
        });
    }

    bodyTablaPreFechasSegMedicamentos.on("click", ".eliminar-elemento", (e) => {
        const index = $(e.currentTarget).data("index");
        if (index !== undefined) {
            fechasProgramadasMedicamento.splice(index, 1);
            cargarTablaPreFechasSegMedicamentos();
        }
    });

    /**
     * Lógica para Seguimientos Vacunas
     */

    const fechasProgramadasVacuna = []

    function cargarTablaSeguimientosVacunasUnicas(seguimientoId) {
        bodyTablaSegVacunas.empty();
        $.getJSON(`diagnosticos/pre/seguimiento/vacuna/${seguimientoId}`, (response) => {
            if (response && response.data) {
                response.data.forEach((vacuna) => {
                    bodyTablaSegVacunas.append(`
                    <tr data-tra-vacuna-id="${vacuna.tratamientoVacunaId}">
                      <td class="text-wrap">${vacuna.nombreVacuna}</td>
                      <td class="d-flex justify-content-around">
                        <a title="Ver fechas" href="#" class="ver-fechas-programadas"><i class="nav-icon fas fa-eye"></i></a>
                        <a title="Eliminar todo" href="#" class="eliminar-fechas-programadas"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                    </tr>
                `);
                });
            }
        });
    }

    function cargarTablaSeguimientoVacunas(seguimientoId, tratamientoVacunaId) {
        $.getJSON(`/diagnosticos/pre/seguimiento/vacuna/${seguimientoId}/${tratamientoVacunaId}`, (response) => {
            bodyTablaFechasSegVacunas.empty();
            if (response && response.data) {
                response.data.forEach((segVacuna) => {
                    bodyTablaFechasSegVacunas.append(`
                     <tr data-seg-vacuna-id="${segVacuna.id}" 
                     data-tra-vacuna-id="${segVacuna.tratamientoVacunaId}">
                      <td>${segVacuna.fechaProgramada}</td>
                      <td>${segVacuna.tipoNotificacion === 'S' ? 'Servicio' : 'Compra'}</td>
                      <td>${segVacuna.observacion}</td>
                      <td class="text-center">
                        <a title="Eliminar" href="#" class="eliminar-fecha"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                      </tr>
                    `);
                });
                modalVerFechasProgramadasVacuna.modal('show');
            }
        });
    }

    bodyTablaSegVacunas.on('click', '.ver-fechas-programadas', (e) => {
        e.preventDefault();
        const tratamientoVacunaId = $(e.currentTarget).closest('tr').data("tra-vacuna-id");
        cargarTablaSeguimientoVacunas(seguimientoId, tratamientoVacunaId)
    })

    bodyTablaSegVacunas.on('click', '.eliminar-fechas-programadas', (e) => {
        e.preventDefault();
        const tratamientoVacunaId = $(e.currentTarget).closest('tr').data("tra-vacuna-id");
        mostrarModalConfirmacion("¿Estás seguro de eliminar todas las fechas programadas?"
            , () => {
                $.ajax({
                    url: `/diagnosticos/pre/seguimiento/anular/vacunas/${seguimientoId}/${tratamientoVacunaId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    success: (response) => {
                        toast('success', "Fechas eliminadas")
                        cargarTablaSeguimientosVacunasUnicas(seguimientoId);
                        cargarTablaDiagnosticos();
                    },
                    error: (error) => {
                        toast('error', "Ha ocurrido un problema")
                    }
                });
            })
    })

    bodyTablaFechasSegVacunas.on('click', '.eliminar-fecha', (e) => {
        e.preventDefault();
        const seguimientoVacunaId = $(e.currentTarget).closest('tr').data("seg-vacuna-id");
        const tratamientoVacunaId = $(e.currentTarget).closest('tr').data("tra-vacuna-id");
        mostrarModalConfirmacion("¿Estás seguro de eliminar esta fecha?"
            , () => {
                $.ajax({
                    url: `/diagnosticos/pre/seguimiento/anular/vacuna/${seguimientoVacunaId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    success: (response) => {
                        toast('success', "Fecha eliminada")
                        cargarTablaSeguimientoVacunas(seguimientoId, tratamientoVacunaId)
                        cargarTablaSeguimientosVacunasUnicas(seguimientoId)
                    },
                    error: (error) => {
                        toast('error', "Ha ocurrido un problema")
                    }
                });
            })
    })

    function cargarSelectVacunasConTratamientos(tratamientoId) {
        $.getJSON(`/diagnosticos/tratamiento/vacuna/${tratamientoId}`, (response) => {
            if (!(response && response.data)) {
                return;
            }
            let data = response.data;
            selectVacunasSinSeguimiento.empty();
            $.each(data, (index, item) => {
                let text = item.vacunaDescripcion;
                let option = $('<option>', {
                    value: item.id,
                    text: text
                });
                selectVacunasSinSeguimiento.append(option);
            });
        });
    }

    btnAgregarFechaVacuna.click((e) => {
        e.preventDefault();
        const fecha = inputFechaProgramadaVacuna.val();
        const tipoId = selectTipoSegVacuna.val();
        const tipoDescripcion = selectTipoSegVacuna.find(":selected").text();
        const observacion = observacionSegVacuna.val();
        const seguimientoVacuna = new SeguimientoVacuna(seguimientoId, fecha, tipoId, tipoDescripcion, observacion)

        if (agregarFechaSegVacuna(seguimientoVacuna)) {
            fechasProgramadasVacuna.sort((a, b) => new Date(a.fechaProgramada) - new Date(b.fechaProgramada));
            cargarTablaPreFechasSegVacunas();
            observacionSegVacuna.val('');
        }
    });

    function agregarFechaSegVacuna(seguimientoVacuna) {
        if (seguimientoVacuna.tipoNotificacionDesc === "Seleccionar") {
            toast('warning', 'Debe elegir un tipo de notificación');
            return false;
        }
        if (seguimientoVacuna.fechaProgramada === '') {
            toast('warning', 'Debe seleccionar una fecha');
            return false;
        }
        const fechaIngresada = new Date(seguimientoVacuna.fechaProgramada);
        const fechaActual = new Date();
        if (fechaIngresada <= fechaActual) {
            toast('warning', 'No se puede programar en esta fecha');
            return false;
        }
        const fechaExistente = fechasProgramadasVacuna.find((obj) => {
            return obj.fechaProgramada === seguimientoVacuna.fechaProgramada;
        });

        if (fechaExistente) {
            toast('warning', 'La fecha ya ha sido ingresada anteriormente');
            return;
        }
        if (seguimientoVacuna.tipoNotificacionCod === '') {
            toast('warning', 'Debe seleccionar un tipo');
            return false;
        }

        fechasProgramadasVacuna.push(seguimientoVacuna);
        return true;
    }

    $(document).on('click', "#btn-guardar-seg-vacunas", () => {
        if (fechasProgramadasVacuna.length === 0) {
            toast('warning', 'Debe agregar fechas')
            return;
        }
        const tratamientoVacunaId = selectVacunasSinSeguimiento.val();
        fechasProgramadasVacuna.forEach((e) => {
            e.tratamientoVacunaId = tratamientoVacunaId;
        })
        const segVacunasList = new SeguimientoVacunaListWrapper(fechasProgramadasVacuna);
        $.ajax({
            url: `/diagnosticos/pre/seguimiento/vacuna`,
            type: "POST",
            data: JSON.stringify(segVacunasList),
            contentType: "application/json",
            success: (response) => {
                fechasProgramadasVacuna.splice(0, fechasProgramadasVacuna.length);
                bodyTablaPreFechasSegVacunas.empty();
                cargarTablaSeguimientosVacunasUnicas(seguimientoId)
                cargarTablaDiagnosticos()
                toast('success', 'Fechas programadas agregadas')
                modalAgregarSeguimientoVacuna.modal('hide')
            },
            error: (error) => {
                if (error.responseJSON.error) {
                    toast('warning', "Una fecha ya está programada")
                } else {
                    toast('error', 'Ha ocurrido un problema')
                }
            }
        });
    })

    function cargarTablaPreFechasSegVacunas() {
        bodyTablaPreFechasSegVacunas.empty();
        fechasProgramadasVacuna.forEach((e, index) => {
            bodyTablaPreFechasSegVacunas.append(`
            <tr>
              <td>${e.fechaProgramada}</td>
              <td style="max-width: 150px;" class="text-truncate">${e.observacion}</td>
              <td>${e.tipoNotificacionDesc}</td>
              <td class="text-center">
                <a title="Eliminar" href="#" class="eliminar-elemento" data-index="${index}">
                  <i class="nav-icon fas fa-trash" style="color: red;"></i>
                </a>
              </td>
            </tr>
            `);
        });
    }

    bodyTablaPreFechasSegVacunas.on("click", ".eliminar-elemento", (e) => {
        const index = $(e.currentTarget).data("index");
        if (index !== undefined) {
            fechasProgramadasVacuna.splice(index, 1);
            cargarTablaPreFechasSegVacunas()
        }
    });

    /**
     * Lógica para Seguimientos Especialidades
     */

    const fechasProgramadasEspecialidades = []

    function cargarTablaSeguimientosEspecialidadesUnicas(seguimientoId) {
        bodyTablaSegEspecialidades.empty();
        $.getJSON(`diagnosticos/pre/seguimiento/especialidad/${seguimientoId}`, (response) => {
            if (response && response.data) {
                response.data.forEach((especialidad) => {
                    bodyTablaSegEspecialidades.append(`
                    <tr data-tra-especialidad-id="${especialidad.tratamientoEspecialidadId}">
                      <td class="text-wrap">${especialidad.nombreEspecialidad}</td>
                      <td class="d-flex justify-content-around">
                        <a title="Ver fechas" href="#" class="ver-fechas-programadas"><i class="nav-icon fas fa-eye"></i></a>
                        <a title="Eliminar todo" href="#" class="eliminar-fechas-programadas"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                    </tr>
                `);
                });
            }
        });
    }

    function cargarTablaSeguimientoEspecialidades(seguimientoId, tratamientoEspecialidadId) {
        $.getJSON(`/diagnosticos/pre/seguimiento/especialidad/${seguimientoId}/${tratamientoEspecialidadId}`, (response) => {
            bodyTablaFechasSegEspecialidades.empty();
            if (response && response.data) {
                response.data.forEach((segEspecialidad) => {
                    bodyTablaFechasSegEspecialidades.append(`
                     <tr data-seg-especialidad-id="${segEspecialidad.id}" 
                     data-tra-especialidad-id="${segEspecialidad.tratamientoEspecialidadId}">
                      <td>${segEspecialidad.fechaProgramada}</td>
                      <td>${segEspecialidad.tipoNotificacion === 'S' ? 'Servicio' : 'Compra'}</td>
                      <td>${segEspecialidad.observacion}</td>
                      <td class="text-center">
                        <a title="Eliminar" href="#" class="eliminar-fecha"><i class="nav-icon fas fa-trash"></i></a>
                      </td>
                      </tr>
                    `);
                });
                modalVerFechasProgramadasEspecialidad.modal('show');
            }
        });
    }

    bodyTablaSegEspecialidades.on('click', '.ver-fechas-programadas', (e) => {
        e.preventDefault();
        const tratamientoEspecialidadId = $(e.currentTarget).closest('tr').data("tra-especialidad-id");
        cargarTablaSeguimientoEspecialidades(seguimientoId, tratamientoEspecialidadId)
    })

    bodyTablaSegEspecialidades.on('click', '.eliminar-fechas-programadas', (e) => {
        e.preventDefault();
        const tratamientoEspecialidadId = $(e.currentTarget).closest('tr').data("tra-especialidad-id");
        mostrarModalConfirmacion("¿Estás seguro de eliminar todas las fechas programadas?"
            , () => {
                $.ajax({
                    url: `/diagnosticos/pre/seguimiento/anular/especialidades/${seguimientoId}/${tratamientoEspecialidadId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    success: (response) => {
                        toast('success', "Fechas eliminadas")
                        cargarTablaSeguimientosEspecialidadesUnicas(seguimientoId);
                        cargarTablaDiagnosticos();
                    },
                    error: (error) => {
                        toast('error', "Ha ocurrido un problema")
                    }
                });
            })
    })

    bodyTablaFechasSegEspecialidades.on('click', '.eliminar-fecha', (e) => {
        e.preventDefault();
        const seguimientoEspecialidadId = $(e.currentTarget).closest('tr').data("seg-especialidad-id");
        const tratamientoEspecialidadId = $(e.currentTarget).closest('tr').data("tra-especialidad-id");
        mostrarModalConfirmacion("¿Estás seguro de eliminar esta fecha?"
            , () => {
                $.ajax({
                    url: `/diagnosticos/pre/seguimiento/anular/especialidad/${seguimientoEspecialidadId}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    success: (response) => {
                        toast('success', "Fecha eliminada")
                        cargarTablaSeguimientoEspecialidades(seguimientoId, tratamientoEspecialidadId)
                        cargarTablaSeguimientosEspecialidadesUnicas(seguimientoId)
                    },
                    error: (error) => {
                        toast('error', "Ha ocurrido un problema")
                    }
                });
            })
    })

    function cargarSelectEspecialidadesConTratamientos(tratamientoId) {
        $.getJSON(`/diagnosticos/tratamiento/especialidad/${tratamientoId}`, (response) => {
            if (!(response && response.data)) {
                return;
            }
            let data = response.data;
            selectEspecialidadesSinSeguimiento.empty();
            $.each(data, (index, item) => {
                let text = item.especialidadDescripcion;
                let option = $('<option>', {
                    value: item.id,
                    text: text
                });
                selectEspecialidadesSinSeguimiento.append(option);
            });
        });
    }

    btnAgregarFechaEspecialidad.click((e) => {
        e.preventDefault();
        const fecha = inputFechaProgramadaEspecialidad.val();
        const tipoId = selectTipoSegEspecialidad.val();
        const tipoDescripcion = selectTipoSegEspecialidad.find(":selected").text();
        const observacion = observacionSegEspecialidad.val();
        const seguimientoEspecialidad = new SeguimientoEspecialidad(seguimientoId, fecha, tipoId, tipoDescripcion, observacion)

        if (agregarFechaSegEspecialidad(seguimientoEspecialidad)) {
            fechasProgramadasEspecialidades.sort((a, b) => new Date(a.fechaProgramada) - new Date(b.fechaProgramada));
            cargarTablaPreFechasSegEspecialidades();
            observacionSegEspecialidad.val('');
        }
    });

    function agregarFechaSegEspecialidad(seguimientoEspecialidad) {
        if (seguimientoEspecialidad.tipoNotificacionDesc === "Seleccionar") {
            toast('warning', 'Debe elegir un tipo de notificación');
            return false;
        }
        if (seguimientoEspecialidad.fechaProgramada === '') {
            toast('warning', 'Debe seleccionar una fecha');
            return false;
        }
        const fechaIngresada = new Date(seguimientoEspecialidad.fechaProgramada);
        const fechaActual = new Date();
        if (fechaIngresada <= fechaActual) {
            toast('warning', 'No se puede programar en esta fecha');
            return false;
        }
        const fechaExistente = fechasProgramadasEspecialidades.find((obj) => {
            return obj.fechaProgramada === seguimientoEspecialidad.fechaProgramada;
        });

        if (fechaExistente) {
            toast('warning', 'La fecha ya ha sido ingresada anteriormente');
            return;
        }
        if (seguimientoEspecialidad.tipoNotificacionCod === '') {
            toast('warning', 'Debe seleccionar un tipo');
            return false;
        }

        fechasProgramadasEspecialidades.push(seguimientoEspecialidad);
        return true;
    }

    $(document).on('click', "#btn-guardar-seg-especialidades", () => {
        if (fechasProgramadasEspecialidades.length === 0) {
            toast('warning', 'Debe agregar fechas')
            return;
        }
        const tratamientoEspecialidadId = selectEspecialidadesSinSeguimiento.val();
        fechasProgramadasEspecialidades.forEach((e) => {
            e.tratamientoEspecialidadId = tratamientoEspecialidadId;
        })
        const segEspecialidadesList = new SeguimientoEspecialidadListWrapper(fechasProgramadasEspecialidades);
        $.ajax({
            url: `/diagnosticos/pre/seguimiento/especialidad`,
            type: "POST",
            data: JSON.stringify(segEspecialidadesList),
            contentType: "application/json",
            success: (response) => {
                fechasProgramadasEspecialidades.splice(0, fechasProgramadasEspecialidades.length);
                bodyTablaPreFechasSegEspecialidades.empty();
                cargarTablaSeguimientosEspecialidadesUnicas(seguimientoId)
                cargarTablaDiagnosticos()
                toast('success', 'Fechas programadas agregadas')
                modalAgregarSeguimientoEspecialidad.modal('hide')
            },
            error: (error) => {
                if (error.responseJSON.error) {
                    toast('warning', "Una fecha ya está programada")
                } else {
                    toast('error', 'Ha ocurrido un problema')
                }
            }
        });
    })

    function cargarTablaPreFechasSegEspecialidades() {
        bodyTablaPreFechasSegEspecialidades.empty();
        fechasProgramadasEspecialidades.forEach((e, index) => {
            bodyTablaPreFechasSegEspecialidades.append(`
            <tr>
              <td>${e.fechaProgramada}</td>
              <td style="max-width: 150px;" class="text-truncate">${e.observacion}</td>
              <td>${e.tipoNotificacionDesc}</td>
              <td class="text-center">
                <a title="Eliminar" href="#" class="eliminar-elemento" data-index="${index}">
                  <i class="nav-icon fas fa-trash" style="color: red;"></i>
                </a>
              </td>
            </tr>
            `);
        });
    }

    bodyTablaPreFechasSegEspecialidades.on("click", ".eliminar-elemento", (e) => {
        const index = $(e.currentTarget).data("index");
        if (index !== undefined) {
            fechasProgramadasEspecialidades.splice(index, 1);
            cargarTablaPreFechasSegEspecialidades()
        }
    });

});