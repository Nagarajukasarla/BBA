package controllers;


import dto.AddressDto;
import models.util.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.AddressService;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/address")
public class AddressController {

    @Autowired
    public AddressService addressService;

    @PostMapping(path = "/save-address")
    public ResponseEntity<AddressDto> addAddress (@RequestBody  AddressDto addressDto) {
        Address address = addressService.saveAddress(addressDto);
        AddressDto savedAddress = new AddressDto();
        savedAddress.setBlockNumber(address.getBlockNumber());
        savedAddress.setStreet(address.getStreet());
        savedAddress.setCity(address.getCity());
        savedAddress.setState(address.getState());
        savedAddress.setZipcode(address.getZipcode());
        savedAddress.setEmail(address.getEmail());
        return ResponseEntity.ok(savedAddress);
    }

}
