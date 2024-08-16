package com.mercelab.seguimiento.data;

import lombok.Data;

import java.util.List;

@Data
public class Menu {

    private Long id;
    private String nombre;
    private String url;
    private String icono;
    private List<Menu> hijos;
}
