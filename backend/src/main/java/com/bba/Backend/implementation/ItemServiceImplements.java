package com.bba.Backend.implementation;

import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.dto.ItemRequest;
import com.bba.Backend.models.Item;
import com.bba.Backend.repositories.ItemRepository;
import com.bba.Backend.services.ItemService;
import com.bba.Backend.utils.DateTime;
import com.bba.Backend.utils.comparators.ItemComparator;
import com.bba.Backend.utils.mappers.DtoMapper;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImplements implements ItemService {

    private final ItemRepository itemRepository;

    private final DtoMapper mapper;

    private static final Logger logger = Logger.getLogger(ItemServiceImplements.class.getName());

    // To fetch item
    public ItemDto fetchItem (@NonNull ItemRequest request) {
        var item = itemRepository.findByName(request.getName());
        return item.map(value -> ItemDto.builder()
                .id(value.getId())
                .name(value.getName())
                .company(value.getCompany())
                .packingType(value.getPackingType())
                .batchNumber(value.getBatchNumber())
                .quantity((value.getQuantity()))
                .manufacturingDate(new DateTime(value.getManufacturingDate()))
                .expiryDate(new DateTime(value.getExpiryDate()))
                .cGstInPercent(value.getCGstInPercent())
                .sGstInPercent(value.getSGstInPercent())
                .iGstInPercent(value.getIGstInPercent())
                .rate(value.getRate())
                .mrp(value.getMrp())
                .isFastMoving(value.getIsFastMoving())
                .build()).orElse(null);
    }

    @Override
    public ResponseEntity<?> getItem (@NonNull ItemRequest request) {
        var item = itemRepository.findByName(request.getName());
        logger.info(item.toString());
        if (item.isPresent()) {
            var itemDto = ItemDto.builder()
                    .id(item.get().getId())
                    .name(item.get().getName())
                    .company(item.get().getCompany())
                    .packingType(item.get().getPackingType())
                    .batchNumber(item.get().getBatchNumber())
                    .quantity((item.get().getQuantity()))
                    .manufacturingDate(new DateTime(item.get().getManufacturingDate()))
                    .expiryDate(new DateTime(item.get().getExpiryDate()))
                    .cGstInPercent(item.get().getCGstInPercent())
                    .sGstInPercent(item.get().getSGstInPercent())
                    .iGstInPercent(item.get().getIGstInPercent())
                    .rate(item.get().getRate())
                    .mrp(item.get().getMrp())
                    .isFastMoving(item.get().getIsFastMoving())
                    .build();
            return ResponseEntity.ok(itemDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
    }

    /**
     * This method saves items. If the item is already present, it compares all fields.
     * If they match, the quantity is incremented; otherwise, it's saved as a new item.
     *
     * @param itemDto should not be null
     * @return ResponseEntity representing the status of operation
     */

    @Override
    public ResponseEntity<String> saveItem (@NonNull ItemDto itemDto) {
        var item = itemRepository.findItemByCompanyAndBatchNumber(itemDto.getCompany(), itemDto.getBatchNumber());
        if (item.isPresent()) {
            Boolean status = ItemComparator.compareAllFieldsExcept(item.get(), itemDto, "quantity");
            if (status) {
                item.get().setQuantity(item.get().getQuantity() + itemDto.getQuantity());
                itemRepository.save(item.get());
            } else {
                save(itemDto);
            }
            return ResponseEntity.ok("\"" + item.get().getName() + "\" is successfully saved");
        }
        save(itemDto);
        return ResponseEntity.ok("\"" + itemDto.getName() + "\" is successfully saved");
    }

    @Override
    public List<ItemDto> getItems() {
        return itemRepository.findAll()
                .parallelStream()
                .map(mapper::mapItemToItemDto)
                .collect(Collectors.toList());
    }

    private void save (@NonNull ItemDto itemDto) {
        var item = Item.builder()
                .name(itemDto.getName())
                .company(itemDto.getCompany())
                .packingType(itemDto.getPackingType())
                .quantity(itemDto.getQuantity())
                .batchNumber(itemDto.getBatchNumber())
                .manufacturingDate(DateTime.formatDate(itemDto.getManufacturingDate()))
                .expiryDate(DateTime.formatDate(itemDto.getExpiryDate()))
                .cGstInPercent(itemDto.getCGstInPercent())
                .sGstInPercent(itemDto.getSGstInPercent())
                .iGstInPercent(itemDto.getIGstInPercent())
                .rate(itemDto.getRate())
                .mrp(itemDto.getMrp())
                .isFastMoving(itemDto.getIsFastMoving())
                .build();
        var obj = itemRepository.save(item);
        logger.info("\"" + obj.getName() + "\" is saved successfully");
    }
}