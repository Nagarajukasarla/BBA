package com.bba.Backend.implementation;

import com.bba.Backend.dto.InvoiceItemDto;
import com.bba.Backend.models.InvoiceItem;
import com.bba.Backend.repositories.InvoiceItemRepository;
import com.bba.Backend.repositories.ItemRepository;
import com.bba.Backend.services.InvoiceItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class InvoiceItemImplements implements InvoiceItemService {

    private final InvoiceItemRepository invoiceItemRepository;
    private final ItemRepository itemRepository;

    @Override
    public void saveInvoiceItem(String invoiceNumber, @NonNull List<InvoiceItemDto> itemDto) {
        itemDto.forEach(item -> {
            try {
                saveItem(invoiceNumber, item);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }

    private void saveItem(String invoiceNumber, @NonNull InvoiceItemDto invoiceItemDto) throws Exception {
        var invoiceItem = InvoiceItem.builder()
                .itemName(invoiceItemDto.itemName)
                .company(invoiceItemDto.company)
                .invoiceNumber(invoiceNumber)
                .itemBatchNumber(invoiceItemDto.itemBatchNumber)
                .quantity(invoiceItemDto.quantity)
                .rate(invoiceItemDto.rate)
                .discount(invoiceItemDto.discount)
                .price(invoiceItemDto.price)
                .build();

        invoiceItemRepository.save(invoiceItem);

        var item = itemRepository.findItemByCompanyAndBatchNumber(invoiceItemDto.company, invoiceItemDto.itemBatchNumber);
        if (item.isPresent()) {
            item.ifPresent(value -> value.setQuantity(value.getQuantity() - invoiceItemDto.quantity));
            itemRepository.save(item.get());
        }
        throw new Exception();
    }
}
