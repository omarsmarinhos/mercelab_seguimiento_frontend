package com.mercelab.seguimiento.dtos;

import lombok.Data;

@Data
public class SegTratamientoMedicamentoDto {

    private Long id;
    private Long tratamientoId;
    private Long medicamentoId;
}
