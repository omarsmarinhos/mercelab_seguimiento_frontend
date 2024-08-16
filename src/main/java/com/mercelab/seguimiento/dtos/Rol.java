package com.mercelab.seguimiento.dtos;

import lombok.Data;

import java.util.List;

@Data
public class Rol {

    private String nombre;
    private Long id;
    private Boolean esAdmin;
    private List<Menu> menus;
}
