package implementation;

import dto.AddressDto;
import models.util.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.AddressRepository;
import services.AddressService;


@Service
public class AddressServiceImplements implements AddressService {

    @Autowired
    public AddressRepository addressRepository;

    @Override
    public Address saveAddress (AddressDto addressDto) {
        Address address = new Address();
        address.setBlockNumber(addressDto.getBlockNumber());
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipcode(addressDto.getZipcode());
        address.setEmail(addressDto.getEmail());

        addressRepository.save(address);

        return address;
    }

    @Override
    public Address getAddress (String email) {
        return addressRepository
                .findAll()
                .stream()
                .filter(add -> add.getEmail().equals(email))
                .findFirst()
                .orElse(null);
    }
}
