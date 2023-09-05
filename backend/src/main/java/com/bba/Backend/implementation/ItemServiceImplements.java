package com.bba.Backend.implementation;


import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.models.Item;
import com.bba.Backend.repositories.ItemRepository;
import com.bba.Backend.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemServiceImplements implements ItemService {

    private final ItemRepository itemRepository;

    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<ItemDto> getItem(ItemDto itemDto) {
        var item = itemRepository.findByName(itemDto.getName());
        return item.isPresent()
                ? ResponseEntity.ok(modelMapper.map(item, ItemDto.class))
                : null;
    }

    @Override
    public ResponseEntity<String> saveItem(ItemDto itemDto) {
        var item = Item.builder()
                .name(itemDto.getName())
                .company(itemDto.getCompany())
                .quantity(itemDto.getQuantity())
                .sGst(itemDto.get)
    }
}
