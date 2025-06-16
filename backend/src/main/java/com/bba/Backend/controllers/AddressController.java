package com.bba.Backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bba.Backend.services.AddressService;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/address")
@RequiredArgsConstructor
public class AddressController {
    private AddressService addressService;

//    @PostMapping(path = "/save")
//    public ResponseEntity<?> saveAddress (@RequestBody  AddressDto addressDto) {
//         return ResponseEntity.ok(addressService.saveAddress(addressDto));
//    }

    @GetMapping(path = "/get")
    public ResponseEntity<?> getAddress (@RequestBody Integer customerNumber) {
        return ResponseEntity.ok(addressService.getAddressOfCustomer(customerNumber));
    }
}
