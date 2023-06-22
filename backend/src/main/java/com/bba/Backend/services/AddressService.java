package services;

import dto.AddressDto;
import models.util.Address;
import org.springframework.http.ResponseEntity;

public interface AddressService {
    public Address saveAddress (AddressDto addressDto);
    public Address getAddress (String email);
}
