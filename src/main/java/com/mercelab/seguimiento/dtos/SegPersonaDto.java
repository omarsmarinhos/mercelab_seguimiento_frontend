package com.mercelab.seguimiento.dtos;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class SegPersonaDto {

    private Long id;
    private Integer tipoDocumento;
    private String numeroDocumento;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String nombres;
    private String telefono;
    private Long distritoId;
    private String direccion;
    private String email;
    private String sexo;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaNacimiento;
}
