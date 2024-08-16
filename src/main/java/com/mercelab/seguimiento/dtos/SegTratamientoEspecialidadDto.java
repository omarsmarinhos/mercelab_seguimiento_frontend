package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SegTratamientoEspecialidadDto {

    private Long id;
    private Long tratamientoId;
    private Long especialidadId;
    private String especialidadDescripcion;
    private Long estadoId;
    private LocalDateTime creadoEn;
    private LocalDateTime editadoEn;
    private Long creadoPor;
    private Long editadoPor;

    public SegTratamientoEspecialidadDto() {
    }
}
