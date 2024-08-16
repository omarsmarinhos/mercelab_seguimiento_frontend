package com.mercelab.seguimiento.settings;

import com.mercelab.seguimiento.data.Usuario;
import com.mercelab.seguimiento.data.entities.SegUsuario;
import com.mercelab.seguimiento.data.services.SegUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private SegUsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String pwd = authentication.getCredentials().toString();
        List<GrantedAuthority> authorities = new ArrayList<>();

        Optional<SegUsuario> usuarioOptional = usuarioService.getUserByEmail(email);

        if (usuarioOptional.isEmpty()) {
            throw new BadCredentialsException("Email o Contraseña incorrecta");
        }
        Usuario usuario = getUsuario(usuarioOptional);

        if (!passwordEncoder.matches(pwd, usuarioOptional.get().getPassword())) {
            throw new BadCredentialsException("Email o Contraseña incorrecta");
        }

        if (usuarioOptional.get().getRol().getEsAdmin()) {
            authorities.add(new SimpleGrantedAuthority("ADMIN"));
            return new UsernamePasswordAuthenticationToken(usuario, pwd, authorities);
        }

        List<String> permisos = usuarioService.getPermisosByRolId(usuarioOptional.get().getRol().getId());
        permisos.forEach(e -> {
            authorities.add(new SimpleGrantedAuthority(e));
        });

        return new UsernamePasswordAuthenticationToken(usuario, pwd, authorities);
    }

    private Usuario getUsuario(Optional<SegUsuario> usuarioOptional) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioOptional.get().getId());
        usuario.setNombre(usuarioOptional.get().getPersona().getNombres());
        usuario.setNombreCompleto(usuarioOptional.get().getPersona().getNombres().concat(" ")
                .concat(usuarioOptional.get().getPersona().getApellidoPaterno()).concat(" ")
                .concat(usuarioOptional.get().getPersona().getApellidoMaterno()));
        usuario.setEmail(usuarioOptional.get().getPersona().getEmail());
        usuario.setRol(usuarioOptional.get().getRol().getNombre());
        usuario.setRolId(usuarioOptional.get().getRol().getId());
        return usuario;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}

