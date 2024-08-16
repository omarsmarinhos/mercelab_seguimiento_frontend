package com.mercelab.seguimiento.controllers;

import com.mercelab.seguimiento.data.services.SegUsuarioService;
import com.mercelab.seguimiento.dtos.Rol;
import com.mercelab.seguimiento.utils.ControllerUtil;
import com.mercelab.seguimiento.utils.WebClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Controller
@RequestMapping("/permisos")
@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Permisos y Roles_PERMISO_LEER')")
public class PermisosRolesController {

    @Value("${api.url}")
    private String apiUrl;

    @Autowired
    private SegUsuarioService usuarioService;

    @GetMapping({"", "/"})
    public String usuariosPage(Model model) {
        model.addAttribute("apiUrl", apiUrl);
        ControllerUtil.addUsuarioYMenusAlModelo(model, usuarioService);
        return "permisos-roles";
    }

    @GetMapping("/roles")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Permisos y Roles_PERMISO_LEER')")
    public Mono<String> getRoles(
            @RequestParam Integer page,
            @RequestParam Optional<String> q
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/permisos/roles")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .toUriString());
    }

    @GetMapping("/menus")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Permisos y Roles_PERMISO_CREAR') " +
            "or hasAuthority('MENU_Permisos y Roles_PERMISO_EDITAR')")
    public Mono<String> getMenus() {
        return WebClientUtil.get("/permisos/menus");
    }

    @PostMapping("/rol")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Permisos y Roles_PERMISO_CREAR')")
    public Mono<String> guardarRol(@RequestBody Rol rol) {
        return WebClientUtil.post("/permisos/rol", rol);
    }
}
