package com.bba.Backend.utils;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.models.Item;
import com.bba.Backend.utils.mappers.DtoMapper;
import com.bba.Backend.models.Customer;
import com.bba.Backend.models.util.Address;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;


@Service
public class Mapper implements DtoMapper {

    /**
     * This method create new CustomerDto by mapping all fields of Customer
     * @param customer should be NotNull
     * @param addressDto should be NotNull
     * @return new CustomerDto
     */
    @Override
    public CustomerDto mapCustomerToCustomerDto(@NonNull Customer customer, @NonNull AddressDto addressDto) {
        return CustomerDto.builder()
                .id(customer.getId())
                .name(customer.getName())
                .customerNumber(customer.getCustomerNumber())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .pendingAmount(customer.getPendingAmount())
                .createdDate(new DateTime(customer.getCreatedDate()))
                .totalPurchaseAmount(customer.getTotalPurchaseAmount())
                .addressDto(addressDto)
                .build();
    }

    /**
     * This method used to convert Address to AddressDto by mapping respective fields.
     * @param address should be NotNull
     * @return new AddressDto
     */
    @Override
    public AddressDto mapAddressToAddressDto(@NonNull Address address) {
        return AddressDto.builder()
                .id(address.getId())
                .blockNumber(address.getBlockNumber())
                .customerNumber(address.getCustomerNumber())
                .partnerEmail(address.getPartnerEmail())
                .street(address.getStreet())
                .city(address.getCity())
                .state(address.getState())
                .zipcode(address.getZipcode())
                .build();
    }

    /**
     * This method used to convert Item to ItemDto by mapping all fields.
     * @param item should be NotNull
     * @return new ItemDto
     */
    @Override
    public ItemDto mapItemToItemDto(@NonNull Item item) {
        return ItemDto.builder()
                .id(item.getId())
                .name(item.getName())
                .company(item.getCompany())
                .quantity(item.getQuantity())
                .packingType(item.getPackingType())
                .batchNumber(item.getBatchNumber())
                .rate(item.getRate())
                .sGstInPercent(item.getSGstInPercent())
                .cGstInPercent(item.getCGstInPercent())
                .iGstInPercent(item.getIGstInPercent())
                .manufacturingDate(new DateTime(item.getManufacturingDate()))
                .expiryDate(new DateTime(item.getExpiryDate()))
                .isFastMoving(item.getIsFastMoving())
                .mrp(item.getMrp())
                .build();
    }
}
