package com.mercelab.seguimiento;

import com.mercelab.seguimiento.data.services.SegUsuarioService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SeguimientoApplicationTests {

    @Autowired
    private SegUsuarioService usuarioService;

    @Test
    void contextLoads() {

    }

}
