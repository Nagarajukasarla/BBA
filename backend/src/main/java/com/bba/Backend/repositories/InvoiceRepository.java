package com.bba.Backend.repositories;

import com.bba.Backend.projections.InvoiceProjection;
import com.bba.Backend.models.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    @Query("SELECT nextval('_invoice_number_seq')")
    Integer getNextInvoiceNumber();

    @Query(value = "SELECT * FROM get_invoices()", nativeQuery = true)
    List<InvoiceProjection> getInvoices();
}
