package com.bba.Backend.repositories;

import com.bba.Backend.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Optional<Item> findByName (String name);

    Optional<Item> findByIdAndShopId(@Param("id") Integer id, @Param("shop_id") Integer shopId);

    @Query("SELECT I FROM Item I WHERE I.company = :company AND I.batchNumber = :batchNumber")
    Optional<Item> findItemByCompanyAndBatchNumber(@Param("company") String company, @Param("batchNumber") String batchNumber);
}
