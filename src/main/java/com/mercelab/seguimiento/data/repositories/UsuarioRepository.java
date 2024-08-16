package com.mercelab.seguimiento.data.repositories;

import com.mercelab.seguimiento.data.entities.SegMenu;
import com.mercelab.seguimiento.data.entities.SegMenuRoles;
import com.mercelab.seguimiento.data.entities.SegUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<SegUsuario, Long> {

    @Query("SELECT u from SegUsuario u " +
            "WHERE u.persona.email =:email")
    Optional<SegUsuario> getByEmail(String email);

    @Query("SELECT mr FROM SegMenuRoles mr " +
            "WHERE mr.rol.id =:rolId and mr.estadoId = 1")
    List<SegMenuRoles> getPermisos(Long rolId);

    @Query("SELECT m FROM SegMenu m")
    List<SegMenu> getMenus();


}
