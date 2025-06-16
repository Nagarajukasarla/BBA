package com.bba.Backend.config.appConfig;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitialization implements ApplicationRunner {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        executeNativeQuery("CREATE SEQUENCE IF NOT EXISTS \"_invoice_number_seq\" INCREMENT BY 1 START WITH 1879");
    }

    public void executeNativeQuery (String query) {
        entityManager.createNativeQuery(query).executeUpdate();
    }
}
