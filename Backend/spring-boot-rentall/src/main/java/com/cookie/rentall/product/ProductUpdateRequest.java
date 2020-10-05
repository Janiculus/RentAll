package com.cookie.rentall.product;

import com.cookie.rentall.entity.Booking;
import com.cookie.rentall.entity.ProductCategory;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class ProductUpdateRequest {

    private Long id;

    private ProductCategory category;

    private List<Booking> booking;

    private String name;

    private String firstName;

    private String phone_number;

    private String description;

    private BigDecimal unitPrice;

    private String imageUrl;

    private boolean active;

    private Date dateCreated;

    private Date lastUpdated;

    private String city;

}
