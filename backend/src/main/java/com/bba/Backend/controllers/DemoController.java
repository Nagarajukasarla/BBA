package com.bba.Backend.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class DemoController {

    @GetMapping("/demo-controller")
    public ResponseEntity<String> sayHello () {
        return ResponseEntity.ok("Hello from secured end point!");
    }
}
