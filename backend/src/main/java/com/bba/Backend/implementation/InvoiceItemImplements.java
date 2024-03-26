package com.bba.Backend.implementation;

import com.bba.Backend.dto.InvoiceItemDto;
import com.bba.Backend.models.InvoiceItem;
import com.bba.Backend.repositories.InvoiceItemRepository;
import com.bba.Backend.repositories.ItemRepository;
import com.bba.Backend.services.InvoiceItemService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;


@Service
@RequiredArgsConstructor
public class InvoiceItemImplements implements InvoiceItemService {

    private final InvoiceItemRepository invoiceItemRepository;
    private final ItemRepository itemRepository;
    private final ModelMapper modelMapper;

    private final Logger logger = Logger.getLogger(InvoiceItemService.class.getName());

    @Override
    public void saveInvoiceItems(String invoiceNumber, @NonNull List<InvoiceItemDto> itemDto) {
        itemDto.forEach(item -> saveItem(invoiceNumber, item));
    }

    @Override
    public ResponseEntity<?> getInvoiceItems(String invoiceNumber) {
        var invoiceItems = invoiceItemRepository.findAllByInvoiceNumber(invoiceNumber);
        logger.info("Items: " + invoiceItems.toString());
        return ResponseEntity.ok(invoiceItems);
    }

    private void saveItem(String invoiceNumber, @NonNull InvoiceItemDto invoiceItemDto) {
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
    }
}
