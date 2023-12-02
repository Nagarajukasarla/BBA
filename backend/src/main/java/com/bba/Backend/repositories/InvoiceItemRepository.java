package com.bba.Backend.repositories;

import com.bba.Backend.models.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Integer> {

}
