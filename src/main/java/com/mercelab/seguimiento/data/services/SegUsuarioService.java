package com.mercelab.seguimiento.data.services;

import com.mercelab.seguimiento.data.Menu;
import com.mercelab.seguimiento.data.entities.SegMenu;
import com.mercelab.seguimiento.data.entities.SegMenuRoles;
import com.mercelab.seguimiento.data.entities.SegUsuario;
import com.mercelab.seguimiento.data.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SegUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<SegUsuario> getUserByEmail(String email) {
        return usuarioRepository.getByEmail(email);
    }

    public List<String> getPermisosByRolId(Long rolId) {
        List<SegMenuRoles> menuRoles = usuarioRepository.getPermisos(rolId);
        List<String> permisos = new ArrayList<>();
        menuRoles.forEach(e -> {
            if (e.getCrear()) {
                permisos.add("MENU_" + e.getMenu().getNombre() + "_PERMISO_CREAR");
            }
            if (e.getLeer()) {
                permisos.add("MENU_" + e.getMenu().getNombre() + "_PERMISO_LEER");
            }
            if (e.getEditar()) {
                permisos.add("MENU_" + e.getMenu().getNombre() + "_PERMISO_EDITAR");
            }
            if (e.getEliminar()) {
                permisos.add("MENU_" + e.getMenu().getNombre() + "_PERMISO_ELIMINAR");
            }
        });
        return permisos;
    }

    public List<Menu> obtenerMenuCompleto(Long rolId) {
        if (rolId == 1) { // Si es admin
            List<SegMenu> menuEntities = usuarioRepository.getMenus();
            return construirMenuRecursivo(menuEntities, null);

        }

        List<SegMenu> menuEntities = usuarioRepository.getPermisos(rolId)
                .stream()
                .map(SegMenuRoles::getMenu)
                .toList();
        return construirMenuRecursivo(menuEntities, null);


    }

    private List<Menu> construirMenuRecursivo(List<SegMenu> menuEntities, Long parentId) {
        List<Menu> menus = new ArrayList<>();

        for (SegMenu menuEntity : menuEntities) {
            if (Objects.equals(menuEntity.getPadreId(), parentId)) {
                Menu menu = new Menu();
                menu.setId(menuEntity.getId());
                menu.setNombre(menuEntity.getNombre());
                menu.setUrl(menuEntity.getUrl());
                menu.setIcono(menuEntity.getIcono());

                List<Menu> subMenus = construirMenuRecursivo(menuEntities, menuEntity.getId());
                menu.setHijos(subMenus);

                menus.add(menu);
            }
        }

        return menus;
    }



}
