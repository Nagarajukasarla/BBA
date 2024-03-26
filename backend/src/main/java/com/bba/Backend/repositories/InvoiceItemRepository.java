package com.bba.Backend.repositories;

import com.bba.Backend.projections.InvoiceItemProjection;
import com.bba.Backend.models.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Integer> {
    List<InvoiceItemProjection> findAllByInvoiceNumber(String invoiceNumber);
}
