package com.bba.Backend.repositories;

import com.bba.Backend.models.Invoice;
import com.bba.Backend.projections.InvoiceProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@EnableJpaRepositories
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    @Query("SELECT nextval('_invoice_number_seq')")
    Integer getNextInvoiceNumber();

    @Query(value = "SELECT * FROM get_invoices() ORDER BY generation_date DESC", nativeQuery = true)
    List<InvoiceProjection> getInvoices();

    @Query(value = "SELECT * FROM get_filtered_invoices(:p_customer_number, :p_payment_mode, :p_status, :p_start_date, :p_end_date) ORDER BY generation_date DESC", nativeQuery = true)
    List<InvoiceProjection> getFilteredInvoices(
            @Param("p_customer_number") Integer customerNumber,
            @Param("p_payment_mode") String paymentMode,
            @Param("p_status") String status,
            @Param("p_start_date") Date startDate,
            @Param("p_end_date") Date endDate
    );

    @Procedure(procedureName = "create_invoice_with_items")
    void saveInvoiceWithItems(
            String p_invoice_number,
            Date p_invoice_generation_date,
            Date p_billed_date,
            Date p_due_date,
            Integer p_customer_number,
            String p_invoice_payment_mode,
            Integer p_shop_id,
            String p_invoice_type,
            String p_items
    );

}
