package models;

import java.util.List;
import utils.DateTime;

public class Customer {
	private int id;
    private String name;
    private Location location;
    private List<Invoice> invoices;
    private long pendingAmount;
    private DateTime dueDate;
    private long totalPurchaseAmount;
}
