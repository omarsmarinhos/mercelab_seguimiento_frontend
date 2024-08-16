package com.mercelab.seguimiento.data;

import lombok.Data;

import java.io.Serializable;

@Data
public class Usuario implements Serializable {

    private Long id;
    private String email;
    private String nombre;
    private String nombreCompleto;
    private String rol;
    private Long rolId;
}
