$(document).ready(() => {

    let currentPage = 0;
    let timeoutId = null;
    let rol = new Rol();
    let menuId = 0;

    const elementoInputBuscar = $('#buscar-rol');
    const tablaRolesBody = $('#tabla-roles tbody');

    const tablaMenusCrearBody = $('#tabla-menus-crear-rol tbody');
    const tablaMenusCrear = $('#tabla-menus-crear-rol');
    const inputRol = $('#nombre-crear-rol')
    const checkEsAdmin = $('#check-es-admin');
    const btnModalRegistrarRol = $('#btn-modal-registrar-rol');
    const btnGuardarRol = $('#btn-guardar-rol');

    const tablaMenusEditarBody = $('#tabla-menus-editar-rol tbody');

    const nameButtonGroupCustom = $('input[name="acceso"]');
    const contenedorPermisos = $('#contenedor-permisos');
    const btnGuardarPermisos = $('#btn-guardar-permisos');
    const radioAccesoTotal = $('#acceso-total');
    const radioAccesoCustom = $('#acceso-custom');
    const checkPermisoLeer = $('#permiso-leer');
    const checkPermisoCrear = $('#permiso-crear');
    const checkPermisoEditar = $('#permiso-editar');
    const checkPermisoEliminar = $('#permiso-eliminar');

    const modalRegistrarRol = $('#modal-registrar-rol');
    const modalEditarRol = $('#modal-editar-rol');
    const modalConfigPermisos = $('#modal-config-permisos');

    cargarRoles();

    function cargarRoles() {
        let url = `/permisos/roles?page=${currentPage}`
        let query = elementoInputBuscar.val();
        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            success: (response) => {
                tablaRolesBody.empty();
                let pageable = response.data;
                response.data.data.forEach((rol) => {
                    tablaRolesBody.append(`
                        <tr data-id="${rol.id}">
                        <td>${rol.nombre.toUpperCase()}</td>
                        <td class="text-center py-0 align-middle">
                          <div class="btn-group btn-group-sm">
                              <a href="#" class="ver-rol btn btn-primary" title="Ver"">
                                <i class="nav-icon fas fa-search"></i>
                              </a>
                              <a href="#" class="editar-rol btn btn-info" title="Editar">
                              <i class="nav-icon fas fa-edit"></i>
                              </a>
                              <a href="#" class="eliminar-rol btn btn-danger" title="Eliminar">
                              <i class="nav-icon fas fa-user-slash"></i>
                              </a>
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
            cargarRoles();
        }
    });
    $(".btn-next").click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            currentPage++;
            cargarRoles();
        }
    });

    elementoInputBuscar.on("input", () => {
        currentPage = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(cargarRoles, 1000);
    });

    btnModalRegistrarRol.click(() => {
        const menus = cargarTablaCrearRol();
        modalRegistrarRol.modal({
            backdrop: 'static',
            keyboard: false
        });
        rol = new Rol();
        rol.menus = menus;
        console.log(rol)
    })

    function cargarTablaCrearRol() {
        const menus = [];
        $.getJSON(`/permisos/menus`, (response) => {
            tablaMenusCrearBody.empty();
            response.data.forEach((menu) => {
                const menuId = menu.id;
                const checkboxId = `check-estado-${menu.id}`;

                tablaMenusCrearBody.append(`
                <tr>
                    <td>${menu.nombre}</td>
                    <td class="text-center">
                      ${menu.url ? `<div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                        <input type="checkbox" class="custom-control-input" id="${checkboxId}">
                        <label class="custom-control-label" for="${checkboxId}"></label>
                      </div>` : ''}
                    </td>   
                    <td class="text-center"> 
                    ${menu.url ? `<button data-menu-id="${menu.id}" type="button" class="btn btn-primary btn-ver-config-permisos" disabled>Ver permisos</button>` : ''}
                    </td>
                </tr>
            `);

                menus.push(new Menu(menu.id, 2, null, null));

                $(`#${checkboxId}`).change(function () {
                    const button = $(`button[data-menu-id="${menuId}"]`);
                    button.prop('disabled', !$(this).is(':checked'));
                });
            });
        });

        return menus;
    }

    checkEsAdmin.on('change', (e) => {
        if ($(e.currentTarget).is(':checked')) {
            console.log("check")
            tablaMenusCrear.disabled = true;
        } else {
            console.log("no check")
            tablaMenusCrear.disabled = false;
        }
    })

    $(document).on('click', '.btn-ver-config-permisos', (e) => {
        menuId = $(e.currentTarget).data("menu-id");
        const menuNombre = $(e.currentTarget).closest('tr').find("td:nth-child(1)").text();
        $('#menu-nombre').text('Menu: ' + menuNombre);

        reiniciarPermisosModalConfigPermisos();
        const menu = rol.menus.find(menu => menu.id === menuId);

        if (menu) {

            if (menu.accesoTotal) {
                radioAccesoTotal.prop('checked', menu.accesoTotal);
                contenedorPermisos.toggleClass('d-none', menu.accesoTotal);
            } else {
                radioAccesoCustom.prop('checked', true);
                contenedorPermisos.toggleClass('d-none', false);
            }

            if (menu.permisos) {
                checkPermisoLeer.prop('checked', menu.permisos.leer);
                checkPermisoCrear.prop('checked', menu.permisos.crear);
                checkPermisoEditar.prop('checked', menu.permisos.editar);
                checkPermisoEliminar.prop('checked', menu.permisos.eliminar);
            }
        }
        modalConfigPermisos.modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    nameButtonGroupCustom.on("change", (e) => {
        if ($(e.currentTarget).attr('id') === 'acceso-custom' && $(e.currentTarget).is(':checked')) {
            contenedorPermisos.removeClass('d-none');
        } else {
            contenedorPermisos.addClass('d-none');
        }
    });

    btnGuardarPermisos.on('click', (e) => {
        const menu = rol.menus.find(menu => menu.id === menuId);
        menu.estado = 1;
        if (menu) {
            menu.accesoTotal = radioAccesoTotal.is(':checked')
            if (menu.accesoTotal === false) {
                menu.permisos = {
                    leer: checkPermisoLeer.is(':checked'),
                    crear: checkPermisoCrear.is(':checked'),
                    editar: checkPermisoEditar.is(':checked'),
                    eliminar: checkPermisoEliminar.is(':checked')
                };
            }
        }
    });

    btnGuardarRol.on('click', (e) => {
        rol.nombre = inputRol.val();
        rol.esAdmin = checkEsAdmin[0].checked

        if (rol.nombre === '') {
            toast('warning', 'EL nombre del rol no debe estar vacío')
            return;
        }

        $.ajax({
            url: `/permisos/rol`,
            type: 'POST',
            data: JSON.stringify(rol),
            contentType: 'application/json',
            success: (response) => {
                toast('success', "Rol agregado")
                modalRegistrarRol.modal('hide');
                cargarRoles()
            },
            error: (error) => {
                toast('error', "Ha ocurrido un problema")
            }
        });
    });

    function reiniciarPermisosModalConfigPermisos() {
        radioAccesoTotal.prop('checked', true);
        contenedorPermisos.toggleClass('d-none', true);
        checkPermisoLeer.prop('checked', false);
        checkPermisoCrear.prop('checked', false);
        checkPermisoEditar.prop('checked', false);
        checkPermisoEliminar.prop('checked', false);
    }
});
