package com.bba.Backend.services;

import com.bba.Backend.dto.ItemDto;
import org.springframework.http.ResponseEntity;

public interface ItemService {
    ResponseEntity<ItemDto> getItem(ItemDto itemDto);

    ResponseEntity<String> saveItem(ItemDto itemDto);

}
