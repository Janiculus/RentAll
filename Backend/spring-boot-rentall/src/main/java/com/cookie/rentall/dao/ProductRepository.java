package com.cookie.rentall.dao;

import com.cookie.rentall.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    // equals to SELECT * FROM product where category_id=?

    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    // equals to Select * FROM Product p WHERE p.name LIKE CONCAT('%', :name , '$')
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

    Page<Product> findByCityContaining(@RequestParam("city") String city, Pageable pageable);

    @Query("select p from Product p left join Booking b on p.id = b.product.id where b.returnDate is not null or b.id is null")
    Page<Product> findFree(Pageable pageable);

    @Query("select p from Product p left join Booking b on p.id = b.product.id where b.createDate is not null and b.bookingDate is null and p.userId = :userId")
    Page<Product> findUserReserved(Long userId, Pageable pageable);

    @Query("select p from Product p left join Booking b on p.id = b.product.id where b.createDate is not null and b.bookingDate is null  and b.userId = :userId")
    Page<Product> findUserReservations(Long userId, Pageable pageable);
}
