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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;
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

    @Override
    public ResponseEntity<?> updateItems(List<ItemDto> items) {
        try {
            boolean allItemsUpdated = true;
            List<String> failedItems = new ArrayList<>();

            for (ItemDto item : items) {
                Optional<Item> itemOptional = itemRepository.findByIdAndShopId(item.getId(), item.getShopId());
                if (itemOptional.isPresent()) {
                    if (item.getHsnNumber() != null) {
                        itemOptional.get().setHsnNumber(item.getHsnNumber());
                    }
                    if (item.getName() != null) {
                        itemOptional.get().setName(item.getName());
                    }
                    if (item.getBatchNumber() != null) {
                        itemOptional.get().setBatchNumber(item.getBatchNumber());
                    }
                    if (item.getQuantity() != null) {
                        itemOptional.get().setQuantity(item.getQuantity());
                    }
                    if (item.getCompany() != null) {
                        itemOptional.get().setCompany(item.getCompany());
                    }
                    if (item.getManufacturingDate() != null) {
                        itemOptional.get().setManufacturingDate(DateTime.formatDate(item.getManufacturingDate()));
                    }
                    if (item.getExpiryDate() != null) {
                        itemOptional.get().setExpiryDate(DateTime.formatDate(item.getExpiryDate()));
                    }
                    if (item.getMrp() != null) {
                        itemOptional.get().setMrp(item.getMrp());
                    }
                    if (item.getRate() != null) {
                        itemOptional.get().setRate(item.getRate());
                    }
                    if (item.getCGstInPercent() != null) {
                        itemOptional.get().setCGstInPercent(item.getCGstInPercent());
                    }
                    if (item.getSGstInPercent() != null) {
                        itemOptional.get().setCGstInPercent(item.getSGstInPercent());
                    }
                    if (item.getIGstInPercent() != null) {
                        itemOptional.get().setCGstInPercent(item.getIGstInPercent());
                    }
                    if (item.getPackingType() != null) {
                        itemOptional.get().setPackingType(item.getPackingType());
                    }
                    itemRepository.save(itemOptional.get());
                }
                else {
                    allItemsUpdated = false;
                    failedItems.add(item.getId().toString());
                }
            }

            if (!allItemsUpdated) {
                return ResponseEntity
                        .status(HttpStatus.PARTIAL_CONTENT)
                        .body("Some items failed to update: " + String.join(", ", failedItems));
            }
            return ResponseEntity.ok("All items saved successfully");
        }
        catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating items");
        }
    }

    /**
     * This method saves items. If the item is already present, it compares all fields.
     * If they match, the quantity is incremented; otherwise, it's saved as a new item.
     *
     * @param itemDto should not be null
     * @return ResponseEntity representing the status of operation
     */
    @Deprecated
    /*
    * About to remove, saving item based on invoice is already implemented
    */
    @Override
    public ResponseEntity<String> saveItem (@NonNull ItemDto itemDto) {
        var item = itemRepository.findItemByCompanyAndBatchNumber(itemDto.getCompany(), itemDto.getBatchNumber());
        if (item.isPresent()) {
            if (ItemComparator.compareAllFieldsExcept(item.get(), itemDto, "quantity")) {
                item.get().setQuantity(item.get().getQuantity() + itemDto.getQuantity());
                itemRepository.save(item.get());
            } else {
                save(itemDto);
            }
            return ResponseEntity.ok(item.get().getName() + " is successfully saved");
        }
        save(itemDto);
        return ResponseEntity.ok(itemDto.getName() + " is successfully saved");
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
                .shopId(itemDto.getShopId())
                .hsnNumber(itemDto.getHsnNumber())
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