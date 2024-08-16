package com.mercelab.seguimiento.controllers;

import com.mercelab.seguimiento.utils.WebClientUtil;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Controller
@RequestMapping("/servicios")
public class ServiciosController {

    @GetMapping("/medicamento/listar")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getAllMedicamentos(
            @RequestParam Optional<String> value,
            @RequestParam Integer page
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/medicamento")
                .queryParam("page", page)
                .queryParamIfPresent("value", value)
                .toUriString());
    }

    @GetMapping("/medicamento/buscar/{id}")
    @ResponseBody
    @PreAuthorize(
            "hasAuthority('ADMIN') or " +
            "hasAuthority('MENU_Diagnóstico_PERMISO_LEER') or " +
            "hasAuthority('MENU_Home_PERMISO_LEER')")
    public Mono<String> getMedicamentoPorId(
            @PathVariable Integer id
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/medicamento/" + id).toUriString());
    }

    @GetMapping("/reniec/{dni}")
    @ResponseBody
    @PreAuthorize(
            "hasAuthority('ADMIN') or " +
            "hasAuthority('MENU_Pacientes_PERMISO_CREAR') or " +
            "hasAuthority('MENU_Pacientes_PERMISO_EDITAR')")
    public Mono<String> getPersonaPorDni(
            @PathVariable Integer dni
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/reniec/" + dni).toUriString());
    }


}
