package com.mercelab.seguimiento.utils;

import com.mercelab.seguimiento.data.Usuario;
import com.mercelab.seguimiento.data.services.SegUsuarioService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;

public class ControllerUtil {

    public static void addUsuarioYMenusAlModelo(Model model, SegUsuarioService usuarioService) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Usuario usuario = (Usuario) authentication.getPrincipal();
            model.addAttribute("email", usuario.getEmail());
            model.addAttribute("user", usuario);
            model.addAttribute("menus", usuarioService.obtenerMenuCompleto(usuario.getRolId()));
        }
    }
}
