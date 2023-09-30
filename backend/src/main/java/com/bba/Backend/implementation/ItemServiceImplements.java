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
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemServiceImplements implements ItemService {

    private final ItemRepository itemRepository;

    private final ModelMapper modelMapper;

    // Just to fetch item
    public ItemDto fetchItem (ItemRequest request) {
        var item = itemRepository.findByName(request.getName());
        return item.map(value -> ItemDto.builder()
                .id(value.getId())
                .name(value.getName())
                .company(value.getCompany())
                .batchNumber(value.getBatchNumber())
                .quantity((value.getQuantity()))
                .manufacturingDate(value.getManufacturingDate())
                .expiryDate(value.getExpiryDate())
                .CGSTInPercent(value.getCGSTInPercent())
                .SGSTInPercent(value.getSGSTInPercent())
                .IGSTInPercent(value.getIGSTInPercent())
                .rate(value.getRate())
                .isFastMoving(value.getIsFastMoving())
                .build()).orElse(null);
    }

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
    public ResponseEntity<String> saveOrUpdateItem (ItemDto itemDto) {
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
            item.setCGSTInPercent(itemDto.getCGSTInPercent());
            item.setSGSTInPercent(itemDto.getSGSTInPercent());
            item.setIGSTInPercent(item.getIGSTInPercent());
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
                    .CGSTInPercent(itemDto.getCGSTInPercent())
                    .SGSTInPercent(itemDto.getSGSTInPercent())
                    .IGSTInPercent(itemDto.getIGSTInPercent())
                    .rate(itemDto.getRate())
                    .isFastMoving(itemDto.getIsFastMoving())
                    .build();
        }
        itemRepository.save(item);
        return ResponseEntity.ok(item.getName() + " is Successfully added !");
    }
}
