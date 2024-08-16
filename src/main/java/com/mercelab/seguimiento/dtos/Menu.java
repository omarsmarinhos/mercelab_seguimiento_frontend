package com.mercelab.seguimiento.dtos;

import lombok.Data;

@Data
public class Menu {

    private Long id;
    private Integer estado;
    private Boolean accesoTotal;
    private Permiso permisos;

}
