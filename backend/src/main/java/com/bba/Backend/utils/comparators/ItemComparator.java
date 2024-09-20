package com.bba.Backend.utils.comparators;

import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.models.Item;
import com.bba.Backend.utils.DateTime;
import org.springframework.lang.NonNull;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

public class ItemComparator {
    private static @NonNull Map<String, Boolean> generateEqualityStatusMap (@NonNull Item item, @NonNull ItemDto itemDto) {
        Map<String, Boolean> equalityStatusMap = new HashMap<>();
        equalityStatusMap.put("shopId", Objects.equals(item.getShopId(), itemDto.getShopId()));
        equalityStatusMap.put("hsnNumber", Objects.equals(item.getHsnNumber(), itemDto.getHsnNumber()));
        equalityStatusMap.put("name", Objects.equals(item.getName(), itemDto.getName()));
        equalityStatusMap.put("company", Objects.equals(item.getCompany(), itemDto.getCompany()));
        equalityStatusMap.put("packingType", Objects.equals(item.getPackingType(), itemDto.getPackingType()));
        equalityStatusMap.put("quantity", Objects.equals(item.getQuantity(), itemDto.getQuantity()));
        equalityStatusMap.put("batchNumber", Objects.equals(item.getBatchNumber(), itemDto.getBatchNumber()));
        equalityStatusMap.put("rate", Objects.equals(item.getRate(), itemDto.getRate()));
        equalityStatusMap.put("cGstInPercent", Objects.equals(item.getCGstInPercent(), itemDto.getCGstInPercent()));
        equalityStatusMap.put("sGstInPercent", Objects.equals(item.getSGstInPercent(), itemDto.getSGstInPercent()));
        equalityStatusMap.put("iGstInPercent", Objects.equals(item.getIGstInPercent(), itemDto.getIGstInPercent()));
        equalityStatusMap.put("manufacturingDate", Objects.equals(new DateTime(item.getManufacturingDate()).getFormattedStringForDateGeneration(), itemDto.getManufacturingDate()));
        equalityStatusMap.put("expiryDate", Objects.equals(new DateTime(item.getExpiryDate()).getFormattedStringForDateGeneration(), itemDto.getExpiryDate()));
        equalityStatusMap.put("isFastMoving", Objects.equals(item.getIsFastMoving(), itemDto.getIsFastMoving()));
        equalityStatusMap.put("mrp", Objects.equals(item.getMrp(), itemDto.getMrp()));
        return equalityStatusMap;
    }

    /**
     * 
     * @param item  object from database
     * @param itemDto object form client
     * @param field specified field is not considered for equality checking
     * @return Boolean.TRUE if all fields matched except specified,Boolean.FALSE otherwise
     */
    
    public static Boolean compareAllFieldsExcept (@NonNull Item item, @NonNull ItemDto itemDto, String field) {
        Set<Map.Entry<String, Boolean>> entrySet = generateEqualityStatusMap(item, itemDto).entrySet();
        for (Map.Entry<String, Boolean> entry : entrySet) {
            if (!(entry.getKey().equals(field)) && !(entry.getValue())) {
                return Boolean.FALSE;
            }
        }
        return Boolean.TRUE;
    }

}