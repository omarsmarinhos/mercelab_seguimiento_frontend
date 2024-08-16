package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SegPacienteDto {

    private Long id;
    private String codHistorialClinico;
    private Boolean tieneAlergia;
    private SegPersonaDto persona;
    private Long estadoId;
    private LocalDateTime creadoEn;
    private LocalDateTime editadoEn;
    private Long creadoPor;
    private Long editadoPor;

}