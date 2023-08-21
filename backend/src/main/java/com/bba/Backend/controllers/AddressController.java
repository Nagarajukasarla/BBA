package com.bba.Backend.controllers;


import com.bba.Backend.dto.AddressDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bba.Backend.services.AddressService;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/address")
@RequiredArgsConstructor
public class AddressController {


    private AddressService addressService;

    @PostMapping(path = "/save")
    public ResponseEntity<AddressDto> addAddress (@RequestBody  AddressDto addressDto) {
         return addressService.saveAddress(addressDto);
    }

    @GetMapping(path = "/get")
    public ResponseEntity<?> getAddress (@RequestBody String email) {
        return addressService.getAddress(email);
    }
}
