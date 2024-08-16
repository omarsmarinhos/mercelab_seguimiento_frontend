package com.mercelab.seguimiento.controllers;

import com.mercelab.seguimiento.data.services.SegUsuarioService;
import com.mercelab.seguimiento.dtos.SegPacienteDto;
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
@RequestMapping("/pacientes")
@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_LEER')")
public class PacienteController {

    @Value("${api.url}")
    private String apiUrl;

    @Autowired
    private SegUsuarioService usuarioService;

    @GetMapping({"", "/"})
    public String pacientesPage(Model model) {
        ControllerUtil.addUsuarioYMenusAlModelo(model, usuarioService);
        model.addAttribute("apiUrl", apiUrl);
        return "pacientes";
    }

    @GetMapping("/form/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_CREAR') " +
            "or hasAuthority('MENU_Pacientes_PERMISO_EDITAR')")
    public String pacientesFormPage(@PathVariable Long id, Model model) {
        ControllerUtil.addUsuarioYMenusAlModelo(model, usuarioService);
        model.addAttribute("apiUrl", apiUrl);
        if (id != null && id > 0) {
            model.addAttribute("pacienteId", id);
            return "pacientes-form";
        }
        return "pacientes-form";
    }

    @GetMapping("/listar")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_LEER')")
    public Mono<String> getPacientes(
            @RequestParam Integer page,
            @RequestParam Optional<String> q
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/paciente")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .toUriString());
    }

    @GetMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_LEER')")
    public Mono<String> getPacientePorId(@PathVariable String id) {
        return WebClientUtil.get("/paciente/" + id);
    }

    @GetMapping("/verificar/{nro}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_LEER')")
    public Mono<String> verificarSiExistePacientePorNroDocumento(@PathVariable String nro) {
        return WebClientUtil.get("/paciente/verificar/" + nro);
    }

    @PostMapping()
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_CREAR')")
    public Mono<String> crearPaciente(@RequestBody SegPacienteDto pacienteDto) {
        return WebClientUtil.post("/paciente", pacienteDto);
    }

    @PutMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_EDITAR')")
    public Mono<String> editarPaciente(
            @PathVariable Integer id,
            @RequestBody SegPacienteDto pacienteDto) {
        return WebClientUtil.putWithBody("/paciente/" + id, pacienteDto);
    }

    @PutMapping("/anular/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_ELIMINAR')")
    public Mono<String> anularPaciente(@PathVariable Integer id) {
        return WebClientUtil.putNoBody("/paciente/anular/" + id);
    }

    @GetMapping("/ubigeo")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_LEER')")
    public Mono<String> listarDistritos(@RequestParam Optional<String> q) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/ubigeo")
                .queryParamIfPresent("q", q)
                .toUriString());
    }

    @GetMapping("/ubigeo/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Pacientes_PERMISO_LEER')")
    public Mono<String> getDistritoPorId(@PathVariable Integer id) {
        return WebClientUtil.get("/ubigeo/" + id);
    }

}
