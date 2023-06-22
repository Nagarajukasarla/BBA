package controllers;

import dto.PartnerDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import services.PartnerService;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private PartnerService partnerService;

    @PostMapping(path = "/save")
    public ResponseEntity<PartnerDto> saveUser (@RequestBody PartnerDto partnerDto) {
        return partnerService.addPartner(partnerDto);
    }

    @GetMapping(path = "/get")
    public ResponseEntity<PartnerDto> getUser (@RequestParam Map<String, String> data) {
        return partnerService.findPartner(data.get("email"), data.get("password"));
    }

}
