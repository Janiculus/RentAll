package com.cookie.rentall.dao;

import com.cookie.rentall.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ClientRepository extends JpaRepository<Client, Long> {
}
