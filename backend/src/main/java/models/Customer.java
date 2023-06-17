package models;

import utils.DateTime;

import java.util.List;

public class Customer {
    private int id;
    private String name;
    private String email;
    private Address address;
    private List<Invoice> invoices;
    private long pendingAmount;
    private DateTime dueDate;
    private long totalPurchaseAmount;
}
