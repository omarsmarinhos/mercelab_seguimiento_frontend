$(document).ready(() => {

    const notificaciones = $('#notificaciones')
    const totalNotificaciones = $('#total-notificaciones')

    cargarNotificaciones();

    function cargarNotificaciones() {
        $.getJSON(`/home/dashboard`, (response) => {
            const data = response.data;
            totalNotificaciones.text(data.seguimientosTotal);
            notificaciones.html(`
                  <span class="dropdown-item dropdown-header">${data.seguimientosTotal} Notifications</span>
                  <div class="dropdown-divider"></div>
                  ${data.seguimientosHoy > 0 ? `<a th:href="@{/seguimientos/}" 
                      class="dropdown-item"><i class="fas fa-envelope mr-2"></i>
                      ${data.seguimientosHoy} seguimientos para hoy</a>` : ''}
                  ${data.seguimientosSemana > 0 ? `<a th:href="@{/seguimientos/}" 
                      class="dropdown-item"><i class="fas fa-envelope mr-2"></i>
                      ${data.seguimientosSemana} seguimientos para la semana</a>` : ''}
                  ${data.seguimientosAtrasados > 0 ? `<a th:href="@{/seguimientos/}" 
                      class="dropdown-item"><i class="fas fa-envelope mr-2"></i>
                      ${data.seguimientosAtrasados} seguimientos atrasados</a>` : ''}
                `);
        })
    }
});