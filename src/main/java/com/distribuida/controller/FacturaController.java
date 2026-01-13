package com.distribuida.controller;

import com.distribuida.service.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/factura")

public class FacturaController {

 @Autowired
    private FacturaService facturaService;

}
