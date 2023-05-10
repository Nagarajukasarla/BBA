package models;
import utils.Date;

public class Item {
    private int id;
    private String name;
    private String description;
    private int price;
    private int SGSTInPercent;
    private int CGSTInPercent;
    private int GSTInPercent;
    private Date manifacturingDate;
    private Date expiryDate;
    private boolean isFastMoving;
}