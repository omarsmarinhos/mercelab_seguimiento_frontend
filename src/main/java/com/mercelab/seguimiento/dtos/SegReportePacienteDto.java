package com.mercelab.seguimiento.dtos;

import lombok.Data;

@Data
public class SegReportePacienteDto {

    private String hc;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String nombres;
    private Long seguimientoId;

    public SegReportePacienteDto() {
    }

    public SegReportePacienteDto(String hc, String apellidoPaterno, String apellidoMaterno, String nombres,
                                 Long seguimientoId) {
        this.hc = hc;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.nombres = nombres;
        this.seguimientoId = seguimientoId;
    }
}
