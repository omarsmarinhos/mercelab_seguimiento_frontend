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

import java.time.LocalDate;
import java.util.Optional;

@Controller
@RequestMapping("/seguimientos")
@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_LEER')")
public class SeguimientosController {

    @Value("${api.url}")
    private String apiUrl;

    @Autowired
    private SegUsuarioService usuarioService;

    @GetMapping({"", "/"})
    public String diagnosticosPage(Model model) {
        ControllerUtil.addUsuarioYMenusAlModelo(model, usuarioService);
        model.addAttribute("apiUrl", apiUrl);
        return "seguimientos";
    }

    @GetMapping("/listar")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_LEER')")
    public Mono<String> getDiagnosticos(
            @RequestParam Optional<String> q,
            @RequestParam Integer page,
            @RequestParam Optional<LocalDate> fechaDesde,
            @RequestParam Optional<LocalDate> fechaHasta
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/seguimiento")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .queryParamIfPresent("fechaDesde", fechaDesde)
                .queryParamIfPresent("fechaHasta", fechaHasta)
                .toUriString());
    }

    @GetMapping("/modal")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Inicio_PERMISO_LEER')")
    public Mono<String> getSeguimientosFechasMasProximasLimit(
    ) {
        return WebClientUtil.get("/seguimiento/modal");
    }

    @GetMapping("/pre/notificar/se/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_EDITAR')")
    public Mono<String> getDataModalNotificarSeguimientoExamen(
            @PathVariable Long id
    ) {
        return WebClientUtil.get("/seguimiento/pre/notificar/se/" + id);
    }

    @PutMapping("/notificar/se/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_EDITAR')")
    public Mono<String> notificarSeguimientoExamen(
            @PathVariable Long id,
            @RequestBody String respuesta
    ) {
        return WebClientUtil.putWithBody("/seguimiento/notificar/se/" + id, respuesta);
    }

    @GetMapping("/pre/notificar/sm/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_EDITAR')")
    public Mono<String> getDataModalNotificarSeguimientoMedicamento(
            @PathVariable Long id
    ) {
        return WebClientUtil.get("/seguimiento/pre/notificar/sm/" + id);
    }

    @PutMapping("/notificar/sm/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_EDITAR')")
    public Mono<String> notificarSeguimientoMedicamento(
            @PathVariable Long id,
            @RequestBody String respuesta
    ) {
        return WebClientUtil.putWithBody("/seguimiento/notificar/sm/" + id, respuesta);
    }

    @GetMapping("/pre/notificar/sv/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_EDITAR')")
    public Mono<String> getDataModalNotificarSeguimientoVacuna(
            @PathVariable Long id
    ) {
        return WebClientUtil.get("/seguimiento/pre/notificar/sv/" + id);
    }

    @PutMapping("/notificar/sv/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_EDITAR')")
    public Mono<String> notificarSeguimientoVacuna(
            @PathVariable Long id,
            @RequestBody String respuesta
    ) {
        return WebClientUtil.putWithBody("/seguimiento/notificar/sv/" + id, respuesta);
    }

    @GetMapping("/pre/notificar/ses/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_EDITAR')")
    public Mono<String> getDataModalNotificarSeguimientoEspecialidad(
            @PathVariable Long id
    ) {
        return WebClientUtil.get("/seguimiento/pre/notificar/ses/" + id);
    }

    @PutMapping("/notificar/ses/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Seguimiento_PERMISO_EDITAR')")
    public Mono<String> notificarSeguimientoEspecialidad(
            @PathVariable Long id,
            @RequestBody String respuesta
    ) {
        return WebClientUtil.putWithBody("/seguimiento/notificar/ses/" + id, respuesta);
    }

}
