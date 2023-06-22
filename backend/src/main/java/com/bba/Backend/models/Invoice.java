package models;

import java.util.List;

public class Invoice extends Shop {
    private String id;
    private int number;
    private String generationDate;
    private List<Item> items;
    private Customer customer;
}