package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SegTratamientoExamenDto {

    private Long id;
    private Long tratamientoId;
    private Long examenId;

}
