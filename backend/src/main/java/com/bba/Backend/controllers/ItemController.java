package com.bba.Backend.controllers;


import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.dto.ItemRequest;
import com.bba.Backend.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping(path = "/get")
    public ResponseEntity<?> getProduct (@RequestBody ItemRequest request) {
        return itemService.getItem(request);
    }

    @PostMapping(path = "/save")
    public ResponseEntity<String> saveProduct (@RequestBody ItemDto itemDto) {
        return itemService.saveItem(itemDto);
    }

    @GetMapping(path = "/get-items")
    public ResponseEntity<?> getAllProducts () {
        return itemService.getItems().isEmpty()
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("No items found!")
                : ResponseEntity.ok(itemService.getItems());
    }
}
