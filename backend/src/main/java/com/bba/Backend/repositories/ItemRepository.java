package com.bba.Backend.repositories;

import com.bba.Backend.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Optional<Item> findByName (String name);
    Optional<Item> findByIdAndShopId(Long itemId, Long shopId);

    @Procedure(procedureName = "update_item_cascade")
    void updateItemCascade(
            Long itemId,
            Long shopId,
            BigDecimal quantity,
            BigDecimal freeQuantity,
            BigDecimal costPrice,
            BigDecimal selling_price,
            BigDecimal mrp,
            String hsnNumber,
            String name,
            String company,
            String batchNumber,
            Date manufacturingDate,
            Date expriyDate,
            BigDecimal cGstInPercent,
            BigDecimal sGstInPercent,
            BigDecimal iGstInPercent,
            String packingType,
            String scheme
    );

    @Query("SELECT I FROM Item I WHERE I.company = :company AND I.batchNumber = :batchNumber")
    Optional<Item> findItemByCompanyAndBatchNumber(@Param("company") String company, @Param("batchNumber") String batchNumber);
}
