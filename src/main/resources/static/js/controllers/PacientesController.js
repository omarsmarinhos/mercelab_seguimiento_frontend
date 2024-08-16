$(document).ready(() => {

    let currentPage = 0;
    let timeoutId = null;

    const elementoInputBuscar = $('#buscar');
    const tablaPacientesBody = $('#tabla-pacientes tbody');

    cargarResultados();

    function cargarResultados() {
        let url = `/pacientes/listar?page=${currentPage}`
        let query = elementoInputBuscar.val();
        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            success: (response) => {
                tablaPacientesBody.empty();
                let pageable = response.data;
                response.data.data.forEach((paciente) => {
                    tablaPacientesBody.append(`
                        <tr data-id="${paciente.id}">
                        <td>${paciente.codHistorialClinico}</td>
                        <td>${paciente.persona.numeroDocumento}</td>
                        <td>${paciente.nombreCompleto}</td>
                        <td>${paciente.tieneAlergia ? "SI" : "NO"} </td>
                        <td>${paciente.persona.sexo}</td>
                        <td>${paciente.edad}</td>
                        <td class="text-center py-0 align-middle">
                          <div class="btn-group btn-group-sm">
                              <a href="#" class="ver-paciente btn btn-primary" title="Ver"">
                                <i class="nav-icon fas fa-search"></i>
                              </a>
                              <a  href="/pacientes/form/${paciente.id}" class="btn btn-info" title="Editar">
                              <i class="nav-icon fas fa-edit"></i></a>
                              <a href="#" class="eliminar-paciente btn btn-danger" title="Eliminar">
                              <i class="nav-icon fas fa-user-slash"></i></a>
                          </div>
                        </td>
                        </tr>
                        `);
                });

                let paginationInfo = $(".pagination-info");
                paginationInfo
                    .html(`Página ${pageable.number + 1} de ${pageable.totalPages} - ${pageable.totalElements} registros`);

                cambiarEstadoBoton($(".btn-prev"), pageable.first);
                cambiarEstadoBoton($(".btn-next"), pageable.last);
            }
        });
    }

    function cambiarEstadoBoton(button, isDisabled) {
        button.toggleClass("disabled", isDisabled);
        button.prop("disabled", isDisabled);
    }

    $(".btn-prev").click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            currentPage--;
            cargarResultados();
        }
    });
    $(".btn-next").click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            currentPage++;
            cargarResultados();
        }
    });

    elementoInputBuscar.on("input", () => {
        currentPage = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(cargarResultados, 1000);
    });

    $(document).on("click", ".ver-paciente", (e) => {
        e.preventDefault();
        let pacienteId = $(e.target).closest('tr').data('id');
        const url = `/pacientes/${pacienteId}`;
        $.ajax({
            url: url,
            dataType: 'json',
            success: (response) => {
                let paciente = response.data;
                let modalBodyHtml = `
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Historial clínico</p>
                      <div class="col-sm">
                        <p>${paciente.codHistorialClinico}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Tipo de documento</p>
                      <div class="col-sm">
                        <p>${convertirATipoDocumento(paciente.persona.tipoDocumento)}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Número de documento</p>
                      <div class="col-sm">
                        <p>${paciente.persona.numeroDocumento}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Apellido paterno</p>
                      <div class="col-sm">
                        <p>${paciente.persona.apellidoPaterno}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Apellido Materno</p>
                      <div class="col-sm">
                        <p>${paciente.persona.apellidoMaterno}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Nombres</p>
                      <div class="col-sm">
                        <p>${paciente.persona.nombres}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Fecha de nacimiento</p>
                      <div class="col-sm">
                        <p>${paciente.persona.fechaNacimiento}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Edad</p>
                      <div class="col-sm">
                        <p>${paciente.edad}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Sexo</p>
                      <div class="col-sm">
                        <p>${paciente.persona.sexo === 'F' ? 'Femenino' : paciente.persona.sexo === 'M' ? 'Masculino' : 'Otro'}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Distrito</p>
                      <div class="col-sm">
                        <p>${paciente.ubigeo === null ? '-' : paciente.ubigeo}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Dirección</p>
                      <div class="col-sm">
                        <p>${paciente.persona.direccion}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Email</p>
                      <div class="col-sm">
                        <p>${paciente.persona.email}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Teléfono</p>
                      <div class="col-sm">
                        <p>${paciente.persona.telefono}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Tiene alergia</p>
                      <div class="col-sm">
                        <p>${paciente.tieneAlergia ? "SI" : "NO"} </p>
                      </div>
                    </div>
                `;
                $("#modal-ver-paciente .modal-body").html(modalBodyHtml);
                $("#modal-ver-paciente").modal("show");
            }
        });
    });

    function convertirATipoDocumento(tipo) {
        if (tipo === 1) {
            return "DNI"
        } else if (tipo === 2) {
            return "Carnet de extranjería"
        }
    }

    $(document).on('click', '.eliminar-paciente', (e) => {
        e.preventDefault();
        let pacienteId = $(e.target).closest('tr').data('id');
        mostrarModalConfirmacion("¿Estás seguro de eliminar este paciente?", () => {
            $.ajax({
                url: `/pacientes/anular/${pacienteId}`,
                type: 'PUT',
                contentType: 'application/json',
                success: function (response) {
                    toast('success', "Paciente eliminado(a)");
                    cargarResultados();
                },
                error: function (xhr, status, error) {
                    toast('error', "Ha ocurrido un problema");
                }
            });
        });
    });
});
