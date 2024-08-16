$(document).ready(() => {

    const bodyTablaReportes = $('#tabla-reportes tbody');
    const tablaHistorial = $('#tabla-historial');
    const pagination = $(".pagination-info");
    const btnPrev = $('.btn-prev');
    const btnNext = $('.btn-next');
    const inputBuscar = $('#buscar');

    const modalHistorial = $('#modal-historial');

    let paginaTablaActual = 0
    let timeoutId = null;
    let pacienteId;
    cargarTablaReportes();

    function cargarTablaReportes() {
        let url = `/reportes/paciente?page=${paginaTablaActual}`;
        let query = inputBuscar.val();
        if (query) {
            url += "&q=" + encodeURIComponent(query);
        }
        $.getJSON(url, (response) => {
            bodyTablaReportes.empty();
            let pageable = response.data;
            response.data.data.forEach((paciente) => {
                bodyTablaReportes.append(`
                    <tr>
                    <td>${paciente.hc}</td>
                    <td>${paciente.apellidoPaterno} ${paciente.apellidoMaterno} ${paciente.nombres}</td>
                    <td class="text-center py-0 align-middle">
                      <div class="btn-group btn-group-sm">
                      <a data-id="${paciente.pacienteId}" class="ver-historial btn btn-primary" title="Ver"">
                        <i class="nav-icon fas fa-eye"></i>
                      </a>
                    </td>
                    </tr>
                `);
            });

            pagination.html(`Página ${pageable.number + 1} de ${pageable.totalPages} - ${pageable.totalElements} registros`);
            cambiarEstadoBoton(btnPrev, pageable.first)
            cambiarEstadoBoton(btnNext, pageable.last)

        });
    }

    function cambiarEstadoBoton(button, isDisabled) {
        button.toggleClass("disabled", isDisabled);
        button.prop("disabled", isDisabled);
    }

    btnPrev.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaActual--;
            cargarTablaReportes();
        }
    });
    btnNext.click((e) => {
        if (!$(e.currentTarget).prop("disabled")) {
            paginaTablaActual++;
            cargarTablaReportes();
        }
    });
    inputBuscar.on("input", () => {
        paginaTablaActual = 0;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(cargarTablaReportes, 1000);
    });
    let hc;
    let nombrePaciente;

    $(document).on('click', '.ver-historial', (e) => {
        e.preventDefault();
        pacienteId = $(e.currentTarget).data('id');
        hc = $(e.currentTarget).closest('tr').find("td:nth-child(1)").text();
        nombrePaciente = $(e.currentTarget).closest('tr').find("td:nth-child(2)").text();
        cargarTablaHistorialPorPaciente(pacienteId)
        modalHistorial.modal('show');
    });

    tablaHistorial.DataTable({
        "searching": false,
        "paging": false,
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "columns": [
            {"data": "enfermedad"},
            {"data": "tipoSeguimiento"},
            {"data": "nombreSeguimiento"},
            {"data": "observacion"},
            {"data": "respuesta"},
            {"data": "fechaInicio"},
            {"data": "fechaFin"}
        ],
        "buttons": [
            {
                extend: 'excel',
                filename: function () {
                    return `seguimiento_reporte_${hc}_${nombrePaciente}`;
                },
                customize: function (xlsx) {
                    let sheet = xlsx.xl.worksheets['sheet1.xml'];
                    $('row:first c', sheet).attr('s', '2');
                    $('row:first c t', sheet).text(`Paciente ${hc} - ${nombrePaciente}`);
                }
            },
            {
                extend: 'pdf',
                filename: function(){
                    return `seguimiento_reporte_${hc}_${nombrePaciente}`;
                },
                customize: function(doc) {
                    doc.pageOrientation = 'landscape';
                },
                title: function() {
                    return `Paciente ${hc} - ${nombrePaciente}`;
                }
            }
        ]
    }).buttons().container().appendTo('#tabla-historial_wrapper .col-md-6:eq(0)');

    function cargarTablaHistorialPorPaciente(pacienteId) {
        $('#tabla-historial').DataTable().ajax.url(`/reportes/historial/${pacienteId}`).load();
    }

});