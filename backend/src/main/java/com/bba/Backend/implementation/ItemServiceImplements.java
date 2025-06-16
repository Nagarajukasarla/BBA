package com.bba.Backend.implementation;

import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.dto.ItemRequest;
import com.bba.Backend.repositories.ItemRepository;
import com.bba.Backend.services.ItemService;
import com.bba.Backend.utils.DateTime;
import com.bba.Backend.utils.mappers.DtoMapper;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.SQLGrammarException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
                    .mrp(item.get().getMrp())
                    .isFastMoving(item.get().getIsFastMoving())
                    .build();
            return ResponseEntity.ok(itemDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
    }


    // Just call the procedure with
    // required params and handle exceptions properly
    
    @Override
    public ResponseEntity<?> updateItem(ItemDto item) {
        try {
            itemRepository.updateItemCascade(
                    item.getId(),
                    item.getShopId(),
                    item.getQuantity(),
                    item.getFreeQuantity(),
                    item.getCostPrice(),
                    item.getSellingPrice(),
                    item.getMrp(),
                    item.getHsnNumber(),
                    item.getName(),
                    item.getCompany(),
                    item.getBatchNumber(),
                    DateTime.formatDate(item.getManufacturingDate()),
                    DateTime.formatDate(item.getExpiryDate()),
                    item.getCGstInPercent(),
                    item.getSGstInPercent(),
                    item.getIGstInPercent(),
                    item.getPackingType(),
                    item.getScheme()
            );
            return ResponseEntity.ok("Update Successful");
//            Optional<Item> itemOptional = itemRepository.findByIdAndShopId(item.getId(), item.getShopId());
//                if (itemOptional.isPresent()) {
//
//                    return ResponseEntity.ok("Update Successful");
//                }
//                else {
//                    return ResponseEntity
//                            .status(HttpStatus.NOT_FOUND)
//                            .body("Item not found");
//                }
        }
        catch (Exception e) {
            Throwable rootCause = e.getCause();
            // Check if the root cause is a SQLException
            if (rootCause instanceof SQLGrammarException sqlEx) {
                String errorMessage = sqlEx.getMessage();

                // Handle the custom error codes from the procedure
                if (errorMessage.contains("P00011")) {
                    return ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body("Item not found: " + item.getName());
                }
                else if (errorMessage.contains("P00012")) {
                    return ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body("Invoice not found for item: " + item.getName());
                }
            }

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred");
        }
    }

    @Override
    public List<ItemDto> getItems() {
        return itemRepository.findAll()
                .parallelStream()
                .map(mapper::mapItemToItemDto)
                .collect(Collectors.toList());
    }
}