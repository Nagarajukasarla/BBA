package com.bba.Backend.annotations;

import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface BigDecimalFormat {
    int precision() default 10;
    int scale() default  3;
}
