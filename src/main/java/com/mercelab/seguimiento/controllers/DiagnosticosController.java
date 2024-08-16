package com.mercelab.seguimiento.controllers;

import com.mercelab.seguimiento.data.services.SegUsuarioService;
import com.mercelab.seguimiento.dtos.*;
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
@RequestMapping("/diagnosticos")
@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
public class DiagnosticosController {

    @Value("${api.url}")
    private String apiUrl;

    @Autowired
    private SegUsuarioService usuarioService;

    @GetMapping({"", "/"})
    public String diagnosticosPage(Model model) {
        ControllerUtil.addUsuarioYMenusAlModelo(model, usuarioService);
        model.addAttribute("apiUrl", apiUrl);
        return "diagnosticos";
    }

    @GetMapping("/listar")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getDiagnosticos(
            @RequestParam Optional<String> q,
            @RequestParam Integer page,
            @RequestParam Optional<Boolean> esCronico
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/diagnostico")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .queryParamIfPresent("esCronico", esCronico)
                .toUriString());
    }

    @PutMapping("/anular/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR')")
    public Mono<String> anularDiagnosticos(@PathVariable Integer id) {
        return WebClientUtil.putNoBody("/diagnostico/anular/" + id);
    }

    @GetMapping("/enfermedad/cie10")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getAllCie10(
            @RequestParam Optional<String> q,
            @RequestParam Integer page
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/enfermedad/cie10")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .toUriString());
    }

    @PostMapping("/enfermedad")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> agregarEnfermedadesAPaciente(
            @RequestBody EnfermedadListWrapper enfermedadListWrapper) {
        return WebClientUtil.post("/enfermedad", enfermedadListWrapper);
    }

    @GetMapping("/tratamiento/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> verTratamientoPorId(
            @PathVariable Integer id) {
        return WebClientUtil.get("/tratamiento/" + id);
    }

    @PostMapping("/tratamiento")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> crearTratamiento(
            @RequestBody SegTratamientoDto tratamientoDto) {
        return WebClientUtil.post("/tratamiento", tratamientoDto);
    }

    @PutMapping("/tratamiento/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_EDITAR')")
    public Mono<String> editarTratamiento(
            @RequestBody SegTratamientoDto tratamientoDto,
            @PathVariable Integer id
    ) {
        return WebClientUtil.putWithBody("/tratamiento/" + id, tratamientoDto);
    }

    @GetMapping("/examen/listar")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getAllExamenes(
            @RequestParam Optional<String> q,
            @RequestParam Integer page
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/tratamiento/examen")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .toUriString());
    }

    @GetMapping("/tratamiento/examen/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getExamenesAsignados(
            @PathVariable Integer id) {
        return WebClientUtil.get("/tratamiento/examen/" + id);
    }

    @PostMapping("/tratamiento/examen")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> guardarExamen(
            @RequestBody SegTratamientoExamenDto tratamientoExamenDto) {
        return WebClientUtil.post("/tratamiento/examen", tratamientoExamenDto);
    }

    @PutMapping("/tratamiento/examen/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR')")
    public Mono<String> anularExamen(
            @PathVariable Integer id
    ) {
        return WebClientUtil.putNoBody("/tratamiento/examen/" + id);
    }

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
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getMedicamentoPorId(
            @PathVariable Integer id
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/medicamento/" + id).toUriString());
    }

    @GetMapping("/tratamiento/medicamento/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getMedicamentosAsignados(
            @PathVariable Integer id) {
        return WebClientUtil.get("/tratamiento/medicamento/" + id);
    }

    @PostMapping("/tratamiento/medicamento")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> guardarMedicamento(
            @RequestBody SegTratamientoMedicamentoDto tratamientoMedicamentoDto) {
        return WebClientUtil.post("/tratamiento/medicamento", tratamientoMedicamentoDto);
    }

    @PutMapping("/tratamiento/medicamento/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR')")
    public Mono<String> anularMedicamento(
            @PathVariable Integer id
    ) {
        return WebClientUtil.putNoBody("/tratamiento/medicamento/" + id);
    }

    @GetMapping("/vacuna/listar")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getAllVacunas(
            @RequestParam Optional<String> q,
            @RequestParam Integer page
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/tratamiento/vacuna")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .toUriString());
    }

    @GetMapping("/tratamiento/vacuna/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getVacunasAsignados(
            @PathVariable Integer id) {
        return WebClientUtil.get("/tratamiento/vacuna/" + id);
    }

    @PostMapping("/tratamiento/vacuna")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> guardarVacuna(
            @RequestBody SegTratamientoVacunaDto tratamientoVacunaDto) {
        return WebClientUtil.post("/tratamiento/vacuna", tratamientoVacunaDto);
    }

    @PutMapping("/tratamiento/vacuna/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR')")
    public Mono<String> anularVacuna(
            @PathVariable Integer id
    ) {
        return WebClientUtil.putNoBody("/tratamiento/vacuna/" + id);
    }

    @GetMapping("/especialidad/listar")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getAllEspecialidades(
            @RequestParam Optional<String> q,
            @RequestParam Integer page
    ) {
        return WebClientUtil.get(UriComponentsBuilder.fromPath("/tratamiento/especialidad")
                .queryParam("page", page)
                .queryParamIfPresent("q", q)
                .toUriString());
    }

    @GetMapping("/tratamiento/especialidad/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getEspecialidadesAsignados(
            @PathVariable Integer id) {
        return WebClientUtil.get("/tratamiento/especialidad/" + id);
    }

    @PostMapping("/tratamiento/especialidad")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> guardarEspecialidad(
            @RequestBody SegTratamientoEspecialidadDto tratamientoEspecialidadDto) {
        return WebClientUtil.post("/tratamiento/especialidad", tratamientoEspecialidadDto);
    }

    @PutMapping("/tratamiento/especialidad/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR')")
    public Mono<String> anularEspecialidad(
            @PathVariable Integer id
    ) {
        return WebClientUtil.putNoBody("/tratamiento/especialidad/" + id);
    }

    @GetMapping("/pre/seguimiento/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> verSeguimientoPorId(
            @PathVariable Integer id) {
        return WebClientUtil.get("/pre/seguimiento/" + id);
    }

    @PostMapping("/pre/seguimiento")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> crearSeguimiento(
            @RequestBody SegSeguimientoDto seguimientoDto) {
        return WebClientUtil.post("/pre/seguimiento", seguimientoDto);
    }

    @PutMapping("/pre/seguimiento/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_EDITAR')")
    public Mono<String> editarSeguimiento(
            @PathVariable Integer id,
            @RequestBody SegSeguimientoDto seguimientoDto) {
        return WebClientUtil.putWithBody("/pre/seguimiento/" + id, seguimientoDto);
    }

    @PostMapping("/pre/seguimiento/examen")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> guardarTratamientosExamenes(
            @RequestBody SeguimientoExamenListWrapper listWrapper) {
        return WebClientUtil.post("/pre/seguimiento/examen", listWrapper);
    }

    @GetMapping("/pre/seguimiento/examen/{seguimientoId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getTratamientosExamenesUnicosAsignados(
            @PathVariable Integer seguimientoId) {
        return WebClientUtil.get("/pre/seguimiento/examen/" + seguimientoId);
    }

    @GetMapping("/pre/seguimiento/examen/{seguimientoId}/{tratamientoExamenId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getTratamientosExamenesAsignados(
            @PathVariable Integer seguimientoId,
            @PathVariable Integer tratamientoExamenId
    ) {
        return WebClientUtil.get("/pre/seguimiento/examen/" + seguimientoId + "/" + tratamientoExamenId);
    }

    @PutMapping("/pre/seguimiento/anular/examen/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR') or " +
            "hasAuthority('MENU_Seguimiento_PERMISO_ELIMINAR')")
    public Mono<String> anularSeguimientoExamen(
            @PathVariable Integer id) {
        return WebClientUtil.putNoBody("/pre/seguimiento/anular/examen/" + id);
    }

    @PutMapping("/pre/seguimiento/anular/examenes/{seguimientoId}/{tratamientoId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR')")
    public Mono<String> anularTodoTratamientoExamen(
            @PathVariable Integer seguimientoId,
            @PathVariable Integer tratamientoId
    ) {
        return WebClientUtil.putNoBody("/pre/seguimiento/anular/examenes/" + seguimientoId + "/" + tratamientoId);
    }

    @PostMapping("/pre/seguimiento/medicamento")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> guardarTratamientosMedicamentos(
            @RequestBody SeguimientoMedicamentoListWrapper listWrapper) {
        return WebClientUtil.post("/pre/seguimiento/medicamento", listWrapper);
    }

    @GetMapping("/pre/seguimiento/medicamento/{seguimientoId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getTratamientosMedicamentosUnicosAsignados(
            @PathVariable Integer seguimientoId) {
        return WebClientUtil.get("/pre/seguimiento/medicamento/" + seguimientoId);
    }

    @GetMapping("/pre/seguimiento/medicamento/{seguimientoId}/{tratamientoMedicamentoId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getTratamientosMedicamentosAsignados(
            @PathVariable Integer seguimientoId,
            @PathVariable Integer tratamientoMedicamentoId
    ) {
        return WebClientUtil.get("/pre/seguimiento/medicamento/" + seguimientoId + "/" + tratamientoMedicamentoId);
    }

    @PutMapping("/pre/seguimiento/anular/medicamento/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR') or " +
                         "hasAuthority('MENU_Seguimiento_PERMISO_ELIMINAR')")
    public Mono<String> anularSeguimientoMedicamento(
            @PathVariable Integer id) {
        return WebClientUtil.putNoBody("/pre/seguimiento/anular/medicamento/" + id);
    }

    @PutMapping("/pre/seguimiento/anular/medicamentos/{seguimientoId}/{tratamientoId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR')")
    public Mono<String> anularTodoTratamientoMedicamento(
            @PathVariable Integer seguimientoId,
            @PathVariable Integer tratamientoId
    ) {
        return WebClientUtil.putNoBody("/pre/seguimiento/anular/medicamentos/" + seguimientoId + "/" + tratamientoId);
    }

    @PostMapping("/pre/seguimiento/vacuna")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> guardarTratamientosVacunas(
            @RequestBody SeguimientoVacunaListWrapper listWrapper) {
        return WebClientUtil.post("/pre/seguimiento/vacuna", listWrapper);
    }

    @GetMapping("/pre/seguimiento/vacuna/{seguimientoId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getTratamientosVacunasUnicosAsignados(
            @PathVariable Integer seguimientoId) {
        return WebClientUtil.get("/pre/seguimiento/vacuna/" + seguimientoId);
    }

    @GetMapping("/pre/seguimiento/vacuna/{seguimientoId}/{tratamientoVacunaId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getTratamientosVacunasAsignados(
            @PathVariable Integer seguimientoId,
            @PathVariable Integer tratamientoVacunaId
    ) {
        return WebClientUtil.get("/pre/seguimiento/vacuna/" + seguimientoId + "/" + tratamientoVacunaId);
    }

    @PutMapping("/pre/seguimiento/anular/vacuna/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR') or " +
            "hasAuthority('MENU_Seguimiento_PERMISO_ELIMINAR')")
    public Mono<String> anularSeguimientoVacuna(
            @PathVariable Integer id) {
        return WebClientUtil.putNoBody("/pre/seguimiento/anular/vacuna/" + id);
    }

    @PutMapping("/pre/seguimiento/anular/vacunas/{seguimientoId}/{tratamientoId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR')")
    public Mono<String> anularTodoTratamientoVacuna(
            @PathVariable Integer seguimientoId,
            @PathVariable Integer tratamientoId
    ) {
        return WebClientUtil.putNoBody("/pre/seguimiento/anular/vacunas/" + seguimientoId + "/" + tratamientoId);
    }

    @PostMapping("/pre/seguimiento/especialidad")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_CREAR')")
    public Mono<String> guardarTratamientosEspecialidades(
            @RequestBody SeguimientoEspecialidadListWrapper listWrapper) {
        return WebClientUtil.post("/pre/seguimiento/especialidad", listWrapper);
    }

    @GetMapping("/pre/seguimiento/especialidad/{seguimientoId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getTratamientosEspecialidadesUnicosAsignados(
            @PathVariable Integer seguimientoId) {
        return WebClientUtil.get("/pre/seguimiento/especialidad/" + seguimientoId);
    }

    @GetMapping("/pre/seguimiento/especialidad/{seguimientoId}/{tratamientoEspecialidadId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_LEER')")
    public Mono<String> getTratamientosEspecialidadesAsignados(
            @PathVariable Integer seguimientoId,
            @PathVariable Integer tratamientoEspecialidadId
    ) {
        return WebClientUtil.get("/pre/seguimiento/especialidad/" + seguimientoId + "/" + tratamientoEspecialidadId);
    }

    @PutMapping("/pre/seguimiento/anular/especialidad/{id}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR') or " +
            "hasAuthority('MENU_Seguimiento_PERMISO_ELIMINAR')")
    public Mono<String> anularSeguimientoEspecialidad(
            @PathVariable Integer id) {
        return WebClientUtil.putNoBody("/pre/seguimiento/anular/especialidad/" + id);
    }

    @PutMapping("/pre/seguimiento/anular/especialidades/{seguimientoId}/{tratamientoId}")
    @ResponseBody
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('MENU_Diagnóstico_PERMISO_ELIMINAR')")
    public Mono<String> anularTodoTratamientoEspecialidad(
            @PathVariable Integer seguimientoId,
            @PathVariable Integer tratamientoId
    ) {
        return WebClientUtil.putNoBody("/pre/seguimiento/anular/especialidades/" + seguimientoId + "/" + tratamientoId);
    }
}
