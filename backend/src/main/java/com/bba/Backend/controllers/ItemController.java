package com.bba.Backend.controllers;


import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.dto.ItemRequest;
import com.bba.Backend.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping(path = "/get")
    public ResponseEntity<?> getProduct (@RequestBody ItemRequest request) {
        return itemService.getItem(request);
    }

    @GetMapping(path = "/get-items")
    public ResponseEntity<?> getAllProducts () {
        return itemService.getItems().isEmpty()
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("No items found!")
                : ResponseEntity.ok(itemService.getItems());
    }

    @PatchMapping(path = "/update-item")
    public ResponseEntity<?> updateMultipleItems (@RequestBody ItemDto item) {
        return itemService.updateItem(item);
    }
}
