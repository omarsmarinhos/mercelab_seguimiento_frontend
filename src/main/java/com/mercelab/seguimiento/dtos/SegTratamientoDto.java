package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SegTratamientoDto {

    private Long id;
    private Long enfermedadId;
    private String observacion;
    private Long estadoId;
    private LocalDateTime creadoEn;
    private LocalDateTime editadoEn;
    private Long creadoPor;
    private Long editadoPor;

}
