package com.mercelab.seguimiento.controllers;

import com.mercelab.seguimiento.data.services.SegUsuarioService;
import com.mercelab.seguimiento.utils.ControllerUtil;
import com.mercelab.seguimiento.utils.WebClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.util.Optional;


@Controller
@RequestMapping({"/home", "", "/"})
@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Inicio_PERMISO_LEER')")
public class HomeController {

    @Value("${api.url}")
    private String apiUrl;

    @Autowired
    private SegUsuarioService usuarioService;

    @GetMapping({"", "/"})
    public String diagnosticosPage(Model model) {
        ControllerUtil.addUsuarioYMenusAlModelo(model, usuarioService);
        model.addAttribute("apiUrl", apiUrl);
        return "home";
    }

    @GetMapping("/dashboard")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Inicio_PERMISO_LEER')")
    public Mono<String> getCounts() {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/dashboard").toUriString());
    }

    @GetMapping("/dashboard/grafico")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Inicio_PERMISO_LEER')")
    public Mono<String> getGrafico() {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/dashboard/grafico").toUriString());
    }

    @GetMapping("/dashboard/grafico/circular")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Inicio_PERMISO_LEER')")
    public Mono<String> getGraficoCircular() {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/dashboard/grafico/circular").toUriString());
    }
}
