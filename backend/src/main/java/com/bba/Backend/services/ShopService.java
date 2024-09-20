package com.bba.Backend.services;

import com.bba.Backend.dto.ShopDto;
import org.springframework.http.ResponseEntity;

public interface ShopService {
    ResponseEntity<?> removeShop(ShopDto shopDto);
    ResponseEntity<?> getShop(ShopDto shopDto);
}
