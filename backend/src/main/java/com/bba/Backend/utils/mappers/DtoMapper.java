package com.bba.Backend.utils.mappers;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.dto.InvoiceDto;
import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.models.Customer;
import com.bba.Backend.models.Item;
import com.bba.Backend.models.util.Address;
import com.bba.Backend.projections.InvoiceProjection;

import java.util.Map;

public interface DtoMapper {
    CustomerDto mapCustomerToCustomerDto(Customer customer, AddressDto addressDto);
    CustomerDto mapCustomerToCustomerDtoWithAddressAndPurchaseStatus(Map<String, Object> customerWithAddressAndPurchaseStatus);
    AddressDto mapAddressToAddressDto(Address address);
    ItemDto mapItemToItemDto(Item item);
    InvoiceDto mapInvoiceProjectionToInvoiceDto(InvoiceProjection invoiceProjection);
}
