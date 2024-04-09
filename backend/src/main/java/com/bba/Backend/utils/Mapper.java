package com.bba.Backend.utils;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.dto.InvoiceDto;
import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.models.Item;
import com.bba.Backend.projections.InvoiceProjection;
import com.bba.Backend.utils.mappers.DtoMapper;
import com.bba.Backend.models.Customer;
import com.bba.Backend.models.util.Address;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Objects;


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
                .customerName(customer.getName())
                .customerNumber(customer.getCustomerNumber())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .paidAmount(customer.getPaidAmount())
                .pendingAmount(customer.getTotalPurchaseAmount() - customer.getPaidAmount())
                .createdDate(new DateTime(customer.getCreatedDate()))
                .totalPurchaseAmount(customer.getTotalPurchaseAmount())
                .discount(customer.getDiscount())
                .duePeriod(customer.getDuePeriod())
                .addressDto(addressDto)
                .build();
    }

    /**
     * This method takes <b> Map< String, Object> </b> of Customer data and generate customerDto
     * @param customerWithAddressAndPurchaseStatus should not be null
     * @return customerDto - customerDto with address and purchase status
     */
    @Override
    public CustomerDto mapCustomerToCustomerDtoWithAddressAndPurchaseStatus (@NonNull Map<String, Object> customerWithAddressAndPurchaseStatus) {
        var pendingAmount = calculatePendingAmount(customerWithAddressAndPurchaseStatus.get("total_purchase_amount"),
                customerWithAddressAndPurchaseStatus.get("paid_amount"));

        var addressDto = buildAddressDto(customerWithAddressAndPurchaseStatus);

        return CustomerDto.builder()
                .id((Integer) customerWithAddressAndPurchaseStatus.get("id"))
                .customerName((String) customerWithAddressAndPurchaseStatus.get("customer_name"))
                .customerNumber((Integer) customerWithAddressAndPurchaseStatus.get("customer_number"))
                .email((String) customerWithAddressAndPurchaseStatus.get("email"))
                .phone((String) customerWithAddressAndPurchaseStatus.get("phone"))
                .paidAmount((Double) customerWithAddressAndPurchaseStatus.get("paid_amount"))
                .totalPurchaseAmount((Double) customerWithAddressAndPurchaseStatus.get("total_purchase_amount"))
                .pendingAmount(pendingAmount)
                .createdDate(new DateTime((Date) customerWithAddressAndPurchaseStatus.get("created_date")))
                .duePeriod((Integer) customerWithAddressAndPurchaseStatus.get("due_period"))
                .discount((Double) customerWithAddressAndPurchaseStatus.get("discount"))
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
                .area(address.getArea())
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


    /**
     * This method takes projection with invoice and customer details
     * @param invoiceProjection should not be null
     * @return InvoiceDto
     */
    @Override
    public InvoiceDto mapInvoiceProjectionToInvoiceDto(@NonNull InvoiceProjection invoiceProjection) {
        return InvoiceDto.builder()
                .id(invoiceProjection.getId())
                .invoiceNumber(invoiceProjection.getInvoice_number())
                .customerNumber(invoiceProjection.getCustomer_number())
                .customerName(invoiceProjection.getCustomer_name())
                .amount(invoiceProjection.getAmount())
                .generationDate(new DateTime(invoiceProjection.getGeneration_date()))
                .paymentMode(invoiceProjection.getPayment_mode())
                .customerAddressDto(buildAddressDto(invoiceProjection))
                .build();
    }


    /**
     * This method takes <b> Map< String, Object> </b> of Customer with Address and build addressDto
     * @param customerWithAddressAndPurchaseStatus should not be null
     * @return AddressDto
     */
    private AddressDto buildAddressDto(@NonNull Map<String, Object> customerWithAddressAndPurchaseStatus) {
        return AddressDto.builder()
                .blockNumber((String) customerWithAddressAndPurchaseStatus.get("block_number"))
                .customerNumber((Integer) customerWithAddressAndPurchaseStatus.get("customer_number"))
                .street((String) customerWithAddressAndPurchaseStatus.get("street"))
                .area((String) customerWithAddressAndPurchaseStatus.get("area"))
                .city((String) customerWithAddressAndPurchaseStatus.get("city"))
                .state((String) customerWithAddressAndPurchaseStatus.get("state"))
                .zipcode((String) customerWithAddressAndPurchaseStatus.get("zipcode"))
                .build();
    }

    /**
     * This method takes <b>InvoiceProjection</b> and returns build address of customer
     * @param invoiceProjection should not be null
     * @return AddressDto
     */

    private AddressDto buildAddressDto (@NonNull InvoiceProjection invoiceProjection) {
        return AddressDto.builder()
                .customerNumber(invoiceProjection.getCustomer_number())
                .area(invoiceProjection.getArea())
                .city(invoiceProjection.getCity())
                .state(invoiceProjection.getState())
                .build();
    }

    /**
     * This method calculate pendingAmount of customer
     * @param totalPurchaseAmount Object
     * @param paidAmount Object
     * @return Double
     */
    private Double calculatePendingAmount (Object totalPurchaseAmount, Object paidAmount) {
        return (Double) totalPurchaseAmount - (Double) paidAmount;
    }

}
