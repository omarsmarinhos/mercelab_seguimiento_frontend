$(document).ready(() => {

    const bodyTablaSeguimiento = $('#tabla-seguimiento tbody')
    const paginationSeguimiento = $("#pagination-seguimientos .pagination-info");
    const btnPrevSeguimiento = $('#pagination-seguimientos .btn-prev');
    const btnNextSeguimiento = $('#pagination-seguimientos .btn-next');

    const inputBuscarSeguimiento = $('#buscar-seguimiento');
    const dateFechaDesde = $('#fecha-desde');
    const dateFechaHasta = $('#fecha-hasta');
    const btnConsultar = $('#btn-consultar');

    const lblPaciente = $('#paciente');
    const lblTelefono = $('#telefono');
    const txtAreaObservacion = $('#observacion');
    const txtAreaRespuesta = $('#respuesta');
    const btnNotificarSeg = $('#btn-notificar-seg');

    const modalNotificar = $('#modal-notificar-seg');

    let paginaTablaSeguimientoActual = 0;
    let tipoSeguimientoId = 0;

    cargarTablaSeguimiento()

    function cargarTablaSeguimiento() {
        let url = `/seguimientos/listar?page=${paginaTablaSeguimientoActual}`;
        let query = inputBuscarSeguimiento.val();
        let fechaDesde = dateFechaDesde.val();
        let fechaHasta = dateFechaHasta.val();
        if (query) {
            url += "&q=" + encodeURIComponent(query);
        }
        if (fechaDesde) {
            url += "&fechaDesde=" + encodeURIComponent(fechaDesde);
        }
        if (fechaHasta) {
            url += "&fechaHasta=" + encodeURIComponent(fechaHasta);
        }
        $.getJSON(url, (response) => {
            bodyTablaSeguimiento.empty();
            let pageable = response.data;
            response.data.data.forEach((seguimiento) => {
                if (seguimiento.tipo === "Medicamento") {
                    cargarFilaMedicamento(seguimiento)
                } else {
                    cargarFilaSeguimiento(seguimiento)
                }
            });

            paginationSeguimiento.html(`Página ${pageable.number + 1} de ${pageable.totalPages} - ${pageable.totalElements} registros`);
            cambiarEstadoBoton(btnPrevSeguimiento, pageable.first);
            cambiarEstadoBoton(btnNextSeguimiento, pageable.last);
        });
    }

    btnConsultar.on('click', (e) => {
        e.preventDefault();
        cargarTablaSeguimiento();
    })

    function cargarFilaMedicamento(seguimiento) {
        let medicamentoUrl = `/servicios/medicamento/buscar/${seguimiento.elementoSeguimiento}`;
        $.ajax({
            async: false,
            url: medicamentoUrl,
            dataType: 'json',
            success: (responseMed) => {
                bodyTablaSeguimiento.append(`
                   <tr>
                  <td>${seguimiento.paciente}</td>
                  <td>${seguimiento.enfermedad}</td>
                  <td>${seguimiento.tipo}</td>
                  <td>${responseMed.data.nombre}</td>
                  <td>${seguimiento.tipoNotificacion}</td>
                  <td>${seguimiento.fechaProgramada}</td>
                  <td class="py-0 align-middle"><span class="${seguimiento.fechaProgramada < getFechaActual() ? 'badge badge-danger' :
                    'badge badge-success'}">${seguimiento.fechaProgramada < getFechaActual() ? 'Atrasado' : 'En seguimiento'}</span>
                  </td>
                  <td class="text-right py-0 align-middle">
                    <div class="btn-group btn-group-sm">
                      <a data-id="${seguimiento.tipoSeguimientoId}" class="btn btn-info notificar notificar-seg-medicamento"  title="Notificar"><i 
                        class="fas fa-bell"></i></a>
                      <a data-seg-id="${seguimiento.seguimientoId}" class="btn btn-danger anular-seguimiento" title="Eliminar">
                      <i  class="fas fa-trash"></i></a>
                    </div>
                  </td>
                </tr>
                `);
            }
        });
    }

    function cargarFilaSeguimiento(seguimiento) {
        bodyTablaSeguimiento.append(`
        <tr>
          <td>${seguimiento.paciente}</td>
          <td>${seguimiento.enfermedad}</td>
          <td>${seguimiento.tipo}</td>
          <td>${seguimiento.elementoSeguimiento}</td>
          <td>${seguimiento.tipoNotificacion}</td>
          <td>${seguimiento.fechaProgramada}</td>
          <td class="py-0 align-middle"><span class="${seguimiento.fechaProgramada < getFechaActual() ? 'badge badge-danger' :
            'badge badge-success'}">${seguimiento.fechaProgramada < getFechaActual() ? 'Atrasado' : 'En seguimiento'}</span>
          </td>
          <td class="text-right py-0 align-middle">
            <div class="btn-group btn-group-sm">
              <a data-id="${seguimiento.tipoSeguimientoId}" class="btn btn-info notificar 
              ${seguimiento.tipo === "Examen" ? 'notificar-seg-examen' : seguimiento.tipo === 'Medicamento' ? 'notificar-seg-medicamento' 
            : seguimiento.tipo === 'Vacuna' ? 'notificar-seg-vacuna' : 'notificar-seg-especialidad'}" title="Notificar"><i 
                    class="fas fa-bell"></i></a>
              <a data-seg-id="${seguimiento.tipoSeguimientoId}" class="btn btn-danger eliminar  
              ${seguimiento.tipo === "Examen" ? 'eliminar-seg-examen' : seguimiento.tipo === 'Medicamento' ? 'eliminar-seg-medicamento'
            : seguimiento.tipo === 'Vacuna' ? 'eliminar-seg-vacuna' : 'eliminar-seg-especialidad'}" title="Eliminar">
              <i class="fas fa-trash"></i></a>
            </div>
           </td>
        </tr>
        `);
    }

    btnPrevSeguimiento.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaSeguimientoActual--;
            cargarTablaSeguimiento();
        }
    });
    btnNextSeguimiento.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaSeguimientoActual++;
            cargarTablaSeguimiento();
        }
    });

    function cambiarEstadoBoton(button, isDisabled) {
        button.toggleClass("disabled", isDisabled);
        button.prop("disabled", isDisabled);
    }

    let esMedicamento;
    let esExamen;
    let esVacuna;
    let esEspecialidad;

    bodyTablaSeguimiento.on('click', '.notificar', (e) => {
        esMedicamento = $(e.currentTarget).hasClass('notificar-seg-medicamento')
        esExamen = $(e.currentTarget).hasClass('notificar-seg-examen')
        esVacuna = $(e.currentTarget).hasClass('notificar-seg-vacuna')
        esEspecialidad = $(e.currentTarget).hasClass('notificar-seg-especialidad')
        tipoSeguimientoId = $(e.currentTarget).data('id');

        let url;
        if (esMedicamento) {
            url = `/seguimientos/pre/notificar/sm/${tipoSeguimientoId}`;
        } else if (esExamen) {
            url = `/seguimientos/pre/notificar/se/${tipoSeguimientoId}`;
        } else if (esVacuna) {
            url = `/seguimientos/pre/notificar/sv/${tipoSeguimientoId}`;
        } else {
            url = `/seguimientos/pre/notificar/ses/${tipoSeguimientoId}`;
        }
        $.getJSON(url, (response) => {
            const data = response.data;
            lblPaciente.text(data.paciente);
            lblTelefono.text(data.telefono);
            txtAreaObservacion.val(data.observacion);

            modalNotificar.modal('show');
        });
    })

    bodyTablaSeguimiento.on('click', '.eliminar', (e) => {
        e.preventDefault();
        esMedicamento = $(e.currentTarget).hasClass('eliminar-seg-medicamento')
        esExamen = $(e.currentTarget).hasClass('eliminar-seg-examen')
        esVacuna = $(e.currentTarget).hasClass('eliminar-seg-vacuna')
        esEspecialidad = $(e.currentTarget).hasClass('eliminar-seg-especialidad')
        const tipoSeguimientoId = $(e.currentTarget).data('seg-id');


        let url;
        if (esMedicamento) {
            url = `/diagnosticos/pre/seguimiento/anular/medicamento/${tipoSeguimientoId}`;
        } else if (esExamen) {
            url = `/diagnosticos/pre/seguimiento/anular/examen/${tipoSeguimientoId}`;
        } else if (esVacuna) {
            url = `/diagnosticos/pre/seguimiento/anular/vacuna/${tipoSeguimientoId}`;
        } else {
            url = `/diagnosticos/pre/seguimiento/anular/especialidad/${tipoSeguimientoId}`;
        }
        mostrarModalConfirmacion("¿Estás seguro de eliminar este seguimiento?"
            , () => {
                $.ajax({
                    url: url,
                    type: 'PUT',
                    contentType: 'application/json',
                    success: (response) => {
                        toast('success', "Seguimiento eliminado")
                        cargarTablaSeguimiento();
                    },
                    error: (error) => {
                        toast('error', "Ha ocurrido un problema")
                    }
                });
            })
    })

    btnNotificarSeg.on('click', (ignoredE) => {
        let url;
        if (esMedicamento) {
            url = `/seguimientos/notificar/sm/${tipoSeguimientoId}`;
        } else if (esExamen) {
            url = `/seguimientos/notificar/se/${tipoSeguimientoId}`;
        } else if (esVacuna) {
            url = `/seguimientos/notificar/sv/${tipoSeguimientoId}`;
        } else {
            url = `/seguimientos/notificar/ses/${tipoSeguimientoId}`
        }
        const respuesta = txtAreaRespuesta.val();
        $.ajax({
            url: url,
            method: 'PUT',
            contentType: 'application/json',
            data: respuesta,
            success: () => {
                toast("success", "Seguimiento terminado");
                modalNotificar.modal('hide');
                txtAreaRespuesta.val('');
                cargarTablaSeguimiento()
            },
            error: () => {
                toast("error", "Error");
            }
        });
    });

    function getFechaActual() {
        const fecha = new Date();
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        const anio = fecha.getFullYear();

        if (mes < 10) {
            mes = "0" + mes;
        }
        if (dia < 10) {
            dia = "0" + dia;
        }
        return anio + "-" + mes + "-" + dia;
    }
});