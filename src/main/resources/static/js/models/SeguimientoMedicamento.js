class SeguimientoMedicamento {
    constructor(seguimientoId, fechaProgramada, tipoNotificacionCod, tipoNotificacionDesc, observacion) {
        this.seguimientoId = seguimientoId;
        this.tratamientoMedicamentoId = null;
        this.tipoNotificacion = tipoNotificacionCod;
        this.tipoNotificacionDesc = tipoNotificacionDesc;
        this.fechaProgramada = fechaProgramada;
        this.observacion = observacion;
    }
}