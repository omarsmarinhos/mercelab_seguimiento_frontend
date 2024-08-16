package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SegEnfermedadDto {

    private Long id;
    private Long pacienteId;
    private LocalDate fechaDiagnostico;

    private Long cie10Id;
    private Boolean esCronico;
    private String descripcion;

    private String observacion;
    private Long estadoId;

    private LocalDateTime creadoEn;
    private LocalDateTime editadoEn;
    private Long creadoPor;
    private Long editadoPor;

}
