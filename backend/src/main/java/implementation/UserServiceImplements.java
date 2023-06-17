package implementation;

import dto.PartnerDto;
import models.Partner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import repositories.PartnerRepository;
import services.PartnerService;


import java.util.stream.Stream;

@Service
public class UserServiceImplements implements PartnerService {

    @Autowired
    public PartnerRepository partnerRepository;

    @Override
    public Partner addPartner (PartnerDto partnerDto) {
        Partner newUser = new Partner();
        newUser.setOwner(false);
        newUser.setFirstName(partnerDto.getFirstName());
        newUser.setLastName(partnerDto.getLastName());
        newUser.setEmail(partnerDto.getEmail());
        newUser.setPassword(partnerDto.getPassword());
        newUser.setDateOfBirth(partnerDto.getDateOfBirth());
        newUser.setMobile(partnerDto.getMobile());
        newUser.setGender(partnerDto.getGender());
        partnerRepository.save(newUser);
        return newUser;
    }

    public ResponseEntity<Partner> findPartner (String email, String password) {
        Stream<Partner> partners = partnerRepository.findAll().stream();
        Partner validPartner = partners
                .filter(obj -> obj.getEmail().equals(email))
                .findFirst()
                .orElse(null);
        return validPartner.getPassword().equals(password)
                ? ResponseEntity.ok(validPartner)
                : ResponseEntity.notFound().build();
    }
}
