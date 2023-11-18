package com.bba.Backend.services;

import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.dto.ItemRequest;
import com.bba.Backend.models.Item;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ItemService {
    ResponseEntity<?> getItem(ItemRequest itemRequest);

    ResponseEntity<String> saveItem(ItemDto itemDto);

    List<ItemDto> getItems();
}
