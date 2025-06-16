package com.bba.Backend.repositories;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class OtpJdbcRepository {

    private final JdbcTemplate jdbcTemplate;
    private SimpleJdbcCall verifyOtpCall;

    @PostConstruct
    public void init() {
        this.verifyOtpCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("verify_otp")
                .declareParameters(
                        new SqlParameter("p_otp", Types.VARCHAR),
                        new SqlParameter("p_email", Types.VARCHAR),
                        new SqlOutParameter("is_valid", Types.BOOLEAN)
                );
    }

    public boolean verifyOtp(String email, String otp) {
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("p_otp", otp);
        inParams.put("p_email", email);

        Map<String, Object> out = verifyOtpCall.execute(inParams);
        Boolean isValid = (Boolean) out.get("is_valid");
        return isValid != null ? isValid : false;
    }

    // Use this kind of simple functions which returns single values
    private Double calculateDiscount(Double price) {
        String sql = "SELECT calculate_discount(?)";
        return jdbcTemplate.queryForObject(sql, Double.class, price);
    }
}
