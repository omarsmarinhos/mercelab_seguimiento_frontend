package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SegSeguimientoEspecialidadDto {

    private Long id;
    private Long seguimientoId;
    private Long tratamientoEspecialidadId;
    private Character tipoNotificacion;
    private LocalDate fechaProgramada;

    private LocalDateTime fechaNotificacion;
    private String observacion;
    private Long estadoId;
    private LocalDateTime creadoEn;
    private LocalDateTime editadoEn;
    private Long creadoPor;
    private Long editadoPor;

    private String nombreEspecialidad;

}
