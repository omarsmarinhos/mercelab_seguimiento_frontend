package com.mercelab.seguimiento.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {

    @GetMapping({"", "/"})
    public String diagnosticosPage(Model model, String error, String logout) {
        if (error != null) {
            model.addAttribute("error", "Credenciales inválidas");
        }

        if (logout != null) {
            model.addAttribute("logout", "Has cerrado sesión exitosamente");
        }
        return "login";
    }
}
