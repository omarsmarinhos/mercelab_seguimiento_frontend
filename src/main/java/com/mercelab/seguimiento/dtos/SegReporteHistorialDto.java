package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SegReporteHistorialDto {

    private String tipoSeguimiento;
    private Object nombreSeguimiento;
    private String observacion;
    private String respuesta;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    public SegReporteHistorialDto() {
    }

    public SegReporteHistorialDto(String tipoSeguimiento, Object nombreSeguimiento, String observacion, String respuesta, LocalDate fechaInicio, LocalDate fechaFin) {
        this.tipoSeguimiento = tipoSeguimiento;
        this.nombreSeguimiento = nombreSeguimiento;
        this.observacion = observacion;
        this.respuesta = respuesta;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

}
