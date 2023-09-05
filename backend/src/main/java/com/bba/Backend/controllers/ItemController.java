package com.bba.Backend.controllers;


import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/product/")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;
    @GetMapping
    public ResponseEntity<ItemDto> getProduct (@RequestBody ItemDto itemDto) {
        return itemService.getItem(itemDto);
    }

    @PostMapping
    public ResponseEntity<String> saveProduct (@RequestBody ItemDto itemDto) {
        return itemService.saveItem(itemDto);
    }
}
