$(document).ready(() => {

    const bodyTableSeguimientosLimit = $('#tabla-seguimientos-limit tbody');
    const modalVentanaEmergente = $('#modal-ventana-emergente');

    const countPacientes = $('#count-pacientes');
    const countSeguimientosHoy = $('#count-seguimientos-hoy');
    const countSeguimientos7Dias = $('#count-seguimientos-7-dias');
    const countSeguimientosAtrasados = $('#count-seguimientos-atrasados');

    cargarTablaSeguimientosLimit();

    $.getJSON(`/home/dashboard`, (response) => {
        const data = response.data;
        countPacientes.text(data.pacientes);
        countSeguimientosHoy.text(data.seguimientosHoy);
        countSeguimientos7Dias.text(data.seguimientosSemana);
        countSeguimientosAtrasados.text(data.seguimientosAtrasados);
    })

    modalVentanaEmergente.modal('show')

    function cargarTablaSeguimientosLimit() {
        $('#loader').css('visibility', 'visible');
        $.getJSON(`/seguimientos/modal?rows=5`, (response) => {
            bodyTableSeguimientosLimit.empty();
            response.data.data.forEach((seguimiento) => {
                if (seguimiento.tipo === "Medicamento") {
                    cargarFilaMedicamento(seguimiento)
                } else {
                    cargarFilaSeguimiento(seguimiento)
                }
            });
            $('#loader').css('visibility', 'hidden');
        }).fail(() => {
            $('#loader').css('visibility', 'hidden');
        })
    }

    function cargarFilaMedicamento(seguimiento) {
        let medicamentoUrl = `/servicios/medicamento/buscar/${seguimiento.elementoSeguimiento}`;
        $.ajax({
            async: false,
            url: medicamentoUrl,
            dataType: 'json',
            success: (responseMed) => {
                bodyTableSeguimientosLimit.append(`
              <tr>
                <td>${seguimiento.paciente}</td>
                <td>${seguimiento.tipo}</td>
                <td>${responseMed.data.nombre}</td>
                <td>${seguimiento.fechaProgramada}</td>
                <td class="py-0 align-middle">
                  <span class="${seguimiento.fechaProgramada < getFechaActual() ? 'badge badge-danger' : 'badge badge-success'}">
                    ${seguimiento.fechaProgramada < getFechaActual() ? 'Atrasado' : 'En seguimiento'}
                  </span>
                </td>
              </tr>
            `);
            }
        });
    }

    function cargarFilaSeguimiento(seguimiento) {
        bodyTableSeguimientosLimit.append(`
    <tr>
      <td>${seguimiento.paciente}</td>
      <td>${seguimiento.tipo}</td>
      <td>${seguimiento.elementoSeguimiento}</td>
      <td>${seguimiento.fechaProgramada}</td>
      <td class="py-0 align-middle">
        <span class="${seguimiento.fechaProgramada < getFechaActual() ? 'badge badge-danger' : 'badge badge-success'}">
          ${seguimiento.fechaProgramada < getFechaActual() ? 'Atrasado' : 'En seguimiento'}
        </span>
      </td>
    </tr>
  `);
    }

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

    let ticksStyle = {
        fontColor: '#495057',
        fontStyle: 'bold'
    }

    let mode = 'index'
    let intersect = true
    const $salesChart = $('#seguimientos-chart')

    $.getJSON(`/home/dashboard/grafico`, (response) => {
        const data = response.data;
        $('#seguimientos-total').text(data.totalSeguimientos);
        const salesChart = new Chart($salesChart, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: data.datasets
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    mode: mode,
                    intersect: intersect
                },
                hover: {
                    mode: mode,
                    intersect: intersect
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        // display: false,
                        gridLines: {
                            display: true,
                            lineWidth: '4px',
                            color: 'rgba(0, 0, 0, .2)',
                            zeroLineColor: 'transparent'
                        },
                        ticks: $.extend({
                            beginAtZero: true,
                        }, ticksStyle)
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        },
                        ticks: ticksStyle
                    }]
                }
            }
        })
    })


    $.getJSON(`/home/dashboard/grafico/circular`, (response) => {
        $('#seguimientos-total-circular').text(response.data.totalSeguimientos);
        const pieChartCanvas = $('#seguimientos-chart-pie').get(0).getContext('2d')
        const pieData = response.data;
        const pieOptions = {
            legend: {
                display: false
            },
            maintainAspectRatio: false,
            responsive: true
        }
        const pieChart = new Chart(pieChartCanvas, { // lgtm[js/unused-local-variable]
            type: 'doughnut',
            data: pieData,
            options: pieOptions
        })
    });


});