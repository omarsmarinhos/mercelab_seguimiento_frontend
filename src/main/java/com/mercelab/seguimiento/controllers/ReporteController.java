package com.mercelab.seguimiento.controllers;

import com.mercelab.seguimiento.data.services.SegUsuarioService;
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
@RequestMapping("/reportes")
@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Historial de seguimiento_PERMISO_LEER')")
public class ReporteController {

    @Value("${api.url}")
    private String apiUrl;

    @Autowired
    private SegUsuarioService usuarioService;

    @GetMapping({"", "/"})
    public String pacientesPage(Model model) {
        model.addAttribute("apiUrl", apiUrl);
        ControllerUtil.addUsuarioYMenusAlModelo(model, usuarioService);
        return "reportes";
    }

    @GetMapping("/paciente")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Historial de seguimiento_PERMISO_LEER')")
    public Mono<String> getPacientesConSeguimientoConcluido(
            @RequestParam Optional<String> q,
            @RequestParam Integer page
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/reporte/paciente")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .toUriString());
    }

    @GetMapping("/historial/{pacienteId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Historial de seguimiento_PERMISO_LEER')")
    public Mono<String> getHistorialDePaciente(
            @PathVariable Long pacienteId
    ) {
        return WebClientUtil.get("/reporte/historial/" + pacienteId);
    }

}
