package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SegTratamientoVacunaDto {

    private Long id;
    private Long tratamientoId;
    private Long vacunaId;

}
