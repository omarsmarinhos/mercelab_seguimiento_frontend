$(document).ready(() => {

    let currentPage = 0;
    let timeoutId = null;

    const elementoInputBuscar = $('#buscar');
    const tablaUsuariosBody = $('#tabla-usuarios tbody');

    cargarResultados();

    function cargarResultados() {
        let url = `/usuarios/listar?page=${currentPage}`
        let query = elementoInputBuscar.val();
        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            success: (response) => {
                tablaUsuariosBody.empty();
                let pageable = response.data;
                response.data.data.forEach((usuario) => {
                    tablaUsuariosBody.append(`
                        <tr data-id="${usuario.id}">
                        <td>${usuario.apellidoPaterno} 
                        ${usuario.apellidoMaterno} 
                        ${usuario.nombres}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.rol}</td>
                        <td class="text-center py-0 align-middle">
                          <div class="btn-group btn-group-sm">
                              <a href="#" class="ver-usuario btn btn-primary" title="Ver"">
                                <i class="nav-icon fas fa-search"></i>
                              </a>
                              <a  href="/usuarios/form/${usuario.id}" class="btn btn-info" title="Editar">
                              <i class="nav-icon fas fa-edit"></i></a>
                              <a href="#" class="eliminar-usuario btn btn-danger" title="Eliminar">
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

    $('[data-toggle="popover"]').popover();

    $(document).on("click", ".ver-usuario", (e) => {
        e.preventDefault();
        const usuarioId = $(e.target).closest('tr').data('id');
        $.ajax({
            url: `/usuarios/${usuarioId}`,
            dataType: 'json',
            success: (response) => {
                let usuario = response.data;
                let modalBodyHtml = `
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Tipo de documento</p>
                      <div class="col-sm">
                        <p>${convertirATipoDocumento(usuario.persona.tipoDocumento)}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Número de documento</p>
                      <div class="col-sm">
                        <p>${usuario.persona.numeroDocumento}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Apellido paterno</p>
                      <div class="col-sm">
                        <p>${usuario.persona.apellidoPaterno}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Apellido Materno</p>
                      <div class="col-sm">
                        <p>${usuario.persona.apellidoMaterno}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Nombres</p>
                      <div class="col-sm">
                        <p>${usuario.persona.nombres}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Email</p>
                      <div class="col-sm">
                        <p>${usuario.persona.email}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Fecha de nacimiento</p>
                      <div class="col-sm">
                        <p>${usuario.persona.fechaNacimiento}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Edad</p>
                      <div class="col-sm">
                        <p>${usuario.edad}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Sexo</p>
                      <div class="col-sm">
                        <p>${usuario.persona.sexo === 'F' ? 'Femenino' : usuario.persona.sexo === 'M' ? 'Masculino' : 'Otro'}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Ubigeo</p>
                      <div class="col-sm">
                        <p>${usuario.ubigeo == null ? '-': usuario.ubigeo}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Dirección</p>
                      <div class="col-sm">
                        <p>${usuario.persona.direccion}</p>
                      </div>
                    </div>
                    <div class="row">
                      <p class="font-weight-bold col-sm-6">Teléfono</p>
                      <div class="col-sm">
                        <p>${usuario.persona.telefono}</p>
                      </div>
                    </div>
                `;
                $("#modal-ver-usuario .modal-body").html(modalBodyHtml);
                $("#modal-ver-usuario").modal("show");
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

    $(document).on('click', '.eliminar-usuario', (e) => {
        e.preventDefault();
        let usuarioId = $(e.target).closest('tr').data('id');
        mostrarModalConfirmacion("¿Estás seguro de eliminar este usuario?", () => {
            $.ajax({
                url: `/usuarios/anular/${usuarioId}`,
                type: 'PUT',
                contentType: 'application/json',
                success: function (response) {
                    toast('success', "Usuario eliminado(a)");
                    cargarResultados();
                },
                error: function (xhr, status, error) {
                    toast('error', "Ha ocurrido un problema");
                }
            });
        });
    });
});
