package com.cookie.rentall.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="booking")
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long userId;

    @ManyToOne
    @JoinColumn(name="product_id", nullable = false)
    private Product product;

    @Column(name = "pin_code")
    private int pinCode;
    @Column(name = "create_date")
    private Date createDate;
    @Column(name= "booking_date")
    private Date bookingDate;
    @Column(name="return_date")
    private Date returnDate;

}
