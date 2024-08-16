package com.mercelab.seguimiento.controllers;

import com.mercelab.seguimiento.data.services.SegUsuarioService;
import com.mercelab.seguimiento.dtos.SegPacienteDto;
import com.mercelab.seguimiento.dtos.SegUsuarioRequestDto;
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
@RequestMapping("/usuarios")
@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Usuarios_PERMISO_LEER')")
public class UsuarioController {

    @Value("${api.url}")
    private String apiUrl;

    @Autowired
    private SegUsuarioService usuarioService;

    @GetMapping({"", "/"})
    public String usuariosPage(Model model) {
        model.addAttribute("apiUrl", apiUrl);
        ControllerUtil.addUsuarioYMenusAlModelo(model, usuarioService);
        return "usuarios";
    }

    @GetMapping("/form/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Usuarios_PERMISO_CREAR') " +
            "or hasAuthority('MENU_Usuarios_PERMISO_EDITAR')")
    public String pacientesFormPage(@PathVariable Long id, Model model) {
        ControllerUtil.addUsuarioYMenusAlModelo(model, usuarioService);
        model.addAttribute("apiUrl", apiUrl);
        if (id != null && id > 0) {
            model.addAttribute("usuarioId", id);
            return "usuarios-form";
        }
        return "usuarios-form";
    }

    @GetMapping("/listar")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Usuarios_PERMISO_LEER')")
    public Mono<String> getUsuarios(
            @RequestParam Integer page,
            @RequestParam Optional<String> q
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/usuario")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .toUriString());
    }

    @GetMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Usuarios_PERMISO_LEER')")
    public Mono<String> getUsuarioPorId(@PathVariable String id) {
        return WebClientUtil.get("/usuario/" + id);
    }

    @PutMapping("/anular/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Usuarios_PERMISO_ELIMINAR')")
    public Mono<String> anularUsuario(@PathVariable Integer id) {
        return WebClientUtil.putNoBody("/usuario/anular/" + id);
    }

    @GetMapping("/roles")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Usuarios_PERMISO_LEER')")
    public Mono<String> getRoles() {
        return WebClientUtil.get("/usuario/roles");
    }

    @PostMapping()
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Usuarios_PERMISO_CREAR')")
    public Mono<String> crearUsuario(@RequestBody SegUsuarioRequestDto usuarioRequestDto) {
        return WebClientUtil.post("/usuario", usuarioRequestDto);
    }

    @PutMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Usuarios_PERMISO_EDITAR')")
    public Mono<String> editarUsuario(
            @PathVariable Integer id,
            @RequestBody SegUsuarioRequestDto usuarioRequestDto) {
        return WebClientUtil.putWithBody("/usuario/" + id, usuarioRequestDto);
    }
}
