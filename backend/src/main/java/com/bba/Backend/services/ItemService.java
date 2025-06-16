package com.bba.Backend.services;

import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.dto.ItemRequest;
import com.bba.Backend.models.Item;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ItemService {
    ResponseEntity<?> getItem(ItemRequest itemRequest);

    List<ItemDto> getItems();

    ResponseEntity<?> updateItem(ItemDto item);
}
