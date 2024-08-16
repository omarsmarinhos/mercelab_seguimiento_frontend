package com.mercelab.seguimiento.dtos;

import lombok.Data;

@Data
public class Permiso {

    private Boolean leer;
    private Boolean crear;
    private Boolean editar;
    private Boolean eliminar;
}
