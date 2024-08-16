package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SegUsuarioRequestDto {

    private Long id;

    private String password;

    private SegPersonaDto persona;

    private Long rolId;

    private Long estadoId;
    private LocalDateTime creadoEn;
    private LocalDateTime editadoEn;
    private Long creadoPor;
    private Long editadoPor;

}
