package implementation;

import dto.PartnerDto;
import models.Partner;
import models.util.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import repositories.AddressRepository;
import repositories.PartnerRepository;
import services.PartnerService;


import java.util.stream.Stream;

@Service
public class UserServiceImplements implements PartnerService {

    @Autowired
    public PartnerRepository partnerRepository;
    @Autowired
    public AddressRepository addressRepository;

    @Override
    public ResponseEntity<PartnerDto> addPartner (PartnerDto partnerDto) {
        Partner newUser = new Partner();
        Address userAddress = partnerDto.getAddress();

        newUser.setOwner(false);
        newUser.setFirstName(partnerDto.getFirstName());
        newUser.setLastName(partnerDto.getLastName());
        newUser.setEmail(partnerDto.getEmail());
        newUser.setPassword(partnerDto.getPassword());
        newUser.setDateOfBirth(partnerDto.getDateOfBirth());
        newUser.setMobile(partnerDto.getMobile());
        newUser.setGender(partnerDto.getGender());

        partnerRepository.save(newUser);
        addressRepository.save(userAddress);

        PartnerDto responsePartnerDto = new PartnerDto();
        responsePartnerDto.setFirstName(newUser.getFirstName());
        responsePartnerDto.setLastName(newUser.getLastName());
        responsePartnerDto.setEmail(newUser.getEmail());
        responsePartnerDto.setPassword("*********");
        responsePartnerDto.setGender(newUser.getGender());
        responsePartnerDto.setMobile(newUser.getMobile());
        responsePartnerDto.setDateOfBirth(newUser.getDateOfBirth());
        return ResponseEntity.ok(responsePartnerDto);
    }

    public ResponseEntity<PartnerDto> findPartner (String email, String password) {
        Partner validPartner =  partnerRepository.findAll()
                .stream()
                .filter(obj -> obj.getEmail().equals(email))
                .findFirst()
                .orElse(null);

        Address validAddress = addressRepository.findAll()
                .stream()
                .filter(address -> address.getEmail().equals(email))
                .findFirst()
                .orElse(null);

        PartnerDto responsePartnerDto = new PartnerDto();
        assert validPartner != null;
        responsePartnerDto.setFirstName(validPartner.getFirstName());
        responsePartnerDto.setLastName(validPartner.getLastName());
        responsePartnerDto.setEmail(validPartner.getEmail());
        responsePartnerDto.setPassword("*********");
        responsePartnerDto.setGender(validPartner.getGender());
        responsePartnerDto.setMobile(validPartner.getMobile());
        responsePartnerDto.setDateOfBirth(validPartner.getDateOfBirth());
        responsePartnerDto.setAddress(validAddress);

        return ResponseEntity.ok(responsePartnerDto);
    }
}
