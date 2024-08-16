package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.util.List;

@Data
public class EnfermedadListWrapper {

    private List<SegEnfermedadDto> enfermedades;

}