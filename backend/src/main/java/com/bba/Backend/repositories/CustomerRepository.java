package com.bba.Backend.repositories;

import com.bba.Backend.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@EnableJpaRepositories
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByCustomerNumber (Integer customerNumber);

    @Query("SELECT nextval('_customer_number_seq')")
    Integer getNextCustomerNumber ();

    @Query(value = "SELECT * FROM get_customers_with_address_and_purchase_status()", nativeQuery = true)
    List<Map<String, Object>> getCustomersWithAddressAndPurchaseStatus();


}
