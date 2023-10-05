package com.bba.Backend.implementation;

import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.dto.ItemRequest;
import com.bba.Backend.models.Item;
import com.bba.Backend.repositories.ItemRepository;
import com.bba.Backend.services.ItemService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class ItemServiceImplements implements ItemService {

    private final ItemRepository itemRepository;

    private final ModelMapper modelMapper;

    private static final Logger logger = Logger.getLogger(ItemServiceImplements.class.getName());

    // Just to fetch item
    public ItemDto fetchItem (@NonNull ItemRequest request) {
        var item = itemRepository.findByName(request.getName());
        return item.map(value -> ItemDto.builder()
                .id(value.getId())
                .name(value.getName())
                .company(value.getCompany())
                .batchNumber(value.getBatchNumber())
                .quantity((value.getQuantity()))
                .manufacturingDate(value.getManufacturingDate())
                .expiryDate(value.getExpiryDate())
                .cGstInPercent(value.getCGstInPercent())
                .sGstInPercent(value.getSGstInPercent())
                .iGstInPercent(value.getIGstInPercent())
                .rate(value.getRate())
                .isFastMoving(value.getIsFastMoving())
                .build()).orElse(null);
    }

    @Override
    public ResponseEntity<?> getItem(@NonNull ItemRequest request) {
        var item = itemRepository.findByName(request.getName());

        logger.info(item.toString());

        if (item.isPresent()) {
            var itemDto = ItemDto.builder()
                    .id(item.get().getId())
                    .name(item.get().getName())
                    .company(item.get().getCompany())
                    .batchNumber(item.get().getBatchNumber())
                    .quantity((item.get().getQuantity()))
                    .manufacturingDate(item.get().getManufacturingDate())
                    .expiryDate(item.get().getExpiryDate())
                    .cGstInPercent(item.get().getCGstInPercent())
                    .sGstInPercent(item.get().getSGstInPercent())
                    .iGstInPercent(item.get().getIGstInPercent())
                    .rate(item.get().getRate())
                    .isFastMoving(item.get().getIsFastMoving())
                    .build();
            logger.info(itemDto.toString());
            return ResponseEntity.ok(itemDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
    }

    @Override
    public ResponseEntity<String> saveOrUpdateItem (@NonNull ItemDto itemDto) {
        var itemOptional = itemRepository.findByName(itemDto.getName());
        Item item;
        if (itemOptional.isPresent()) {
            item = itemOptional.get();
            itemDto.setId(item.getId());
            item.setBatchNumber(itemDto.getBatchNumber());
            item.setCompany(itemDto.getCompany());
            item.setQuantity(itemDto.getQuantity());
            item.setManufacturingDate(itemDto.getManufacturingDate());
            item.setExpiryDate(itemDto.getExpiryDate());
            item.setCGstInPercent(itemDto.getCGstInPercent());
            item.setSGstInPercent(itemDto.getSGstInPercent());
            item.setIGstInPercent(itemDto.getIGstInPercent());
            item.setRate(itemDto.getRate());
            item.setId(itemDto.getId());
        }
        else {
            item = Item.builder()
                    .name(itemDto.getName())
                    .company(itemDto.getCompany())
                    .quantity(itemDto.getQuantity())
                    .batchNumber(itemDto.getBatchNumber())
                    .manufacturingDate(itemDto.getManufacturingDate())
                    .expiryDate(itemDto.getExpiryDate())
                    .cGstInPercent(itemDto.getCGstInPercent())
                    .sGstInPercent(itemDto.getSGstInPercent())
                    .iGstInPercent(itemDto.getIGstInPercent())
                    .rate(itemDto.getRate())
                    .isFastMoving(itemDto.getIsFastMoving())
                    .build();
        }
        itemRepository.save(item);
        return ResponseEntity.ok(item.getName() + " is Successfully added !");
    }

    @Override
    public ResponseEntity<?> getItems() {
        List<?> items = itemRepository.findAll();
        if (!items.isEmpty()) {
            return ResponseEntity.ok(items.stream().map(item -> modelMapper.map(item, ItemDto.class)));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No items");
    }
}
