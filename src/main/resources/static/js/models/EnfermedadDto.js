class EnfermedadDto {
    constructor(pacienteId, fechaDiagnostico, cie10Id, descripcionCie10, esCronico, descripcion, observacion) {
        this.pacienteId = pacienteId
        this.fechaDiagnostico = fechaDiagnostico
        this.cie10Id = cie10Id
        this.descripcionCie10 = descripcionCie10
        this.esCronico = esCronico
        this.descripcion = descripcion
        this.observacion = observacion
    }
}