package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.util.List;

@Data
public class SeguimientoMedicamentoListWrapper {

    private List<SegSeguimientoMedicamentoDto> seguimientoMedicamentoList;

}
