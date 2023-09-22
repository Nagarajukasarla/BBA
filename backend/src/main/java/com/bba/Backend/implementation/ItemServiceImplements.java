package com.bba.Backend.implementation;


import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.dto.ItemRequest;
import com.bba.Backend.models.Item;
import com.bba.Backend.repositories.ItemRepository;
import com.bba.Backend.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemServiceImplements implements ItemService {

    private final ItemRepository itemRepository;

    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<?> getItem(ItemRequest request) {
        var item = itemRepository.findByName(request.getName());
        if (item.isPresent()) {
            var itemDto = ItemDto.builder()
                    .id(item.get().getId())
                    .name(item.get().getName())
                    .company(item.get().getCompany())
                    .batchNumber(item.get().getBatchNumber())
                    .quantity((item.get().getQuantity()))
                    .manufacturingDate(item.get().getManufacturingDate())
                    .expiryDate(item.get().getExpiryDate())
                    .CGSTInPercent(item.get().getCGSTInPercent())
                    .SGSTInPercent(item.get().getSGSTInPercent())
                    .IGSTInPercent(item.get().getIGSTInPercent())
                    .rate(item.get().getRate())
                    .isFastMoving(item.get().getIsFastMoving())
                    .build();

            return ResponseEntity.ok(itemDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
    }

    @Override
    public ResponseEntity<String> saveItem(ItemDto itemDto) {
        var item = Item.builder()
                .name(itemDto.getName())
                .company(itemDto.getCompany())
                .quantity(itemDto.getQuantity())
                .batchNumber(itemDto.getBatchNumber())
                .manufacturingDate(itemDto.getManufacturingDate())
                .expiryDate(itemDto.getExpiryDate())
                .CGSTInPercent(itemDto.getCGSTInPercent())
                .SGSTInPercent(itemDto.getSGSTInPercent())
                .IGSTInPercent(itemDto.getIGSTInPercent())
                .rate(itemDto.getRate())
                .isFastMoving(itemDto.getIsFastMoving())
                .build();

        itemRepository.save(item);
        return ResponseEntity.ok(item.getName() + " is Successfully added !");
    }
}
