package com.bba.Backend.dto;
import com.bba.Backend.models.Invoice;
import com.bba.Backend.models.util.Address;

import java.util.Date;
import java.util.List;

public class CustomerDto {

    private int id;

    private String name;

    private String email;

    private Address address;

    private List<Invoice> invoices;

    private long pendingAmount;

    private Date dueDate;

    private long totalPurchaseAmount;

}