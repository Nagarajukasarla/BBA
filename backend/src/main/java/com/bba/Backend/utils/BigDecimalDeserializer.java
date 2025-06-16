package com.bba.Backend.utils;

import com.bba.Backend.annotations.BigDecimalFormat;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.RoundingMode;

public class BigDecimalDeserializer extends JsonDeserializer<BigDecimal> {

    @Override
    public BigDecimal deserialize(JsonParser jsonParser, DeserializationContext context) throws IOException {
        String value = jsonParser.getText();
        try {

            // Parse the string as a BigDecimal
            BigDecimal bigDecimal = new BigDecimal(value);

            // Get the field from the parent object and check if it has DecimalFormat annotation
            Field field = context.getParser().getCurrentValue().getClass().getDeclaredField(jsonParser.currentName());

            if (field.isAnnotationPresent(BigDecimalFormat.class)) {
                return getBigDecimal(field, bigDecimal);
            }

            return bigDecimal;
        }
        catch (NoSuchFieldException e) {
            throw new IOException("Invalid field");
        }
        catch (NumberFormatException e) {
            throw  new IOException("Invalid BigDecimal format", e);
        }
    }

    private static @NotNull BigDecimal getBigDecimal(Field field, BigDecimal bigDecimal) throws IOException {
        BigDecimalFormat decimalFormat = field.getAnnotation(BigDecimalFormat.class);

        // Extract precision and scale from annotation
        int precision  = decimalFormat.precision();
        int scale = decimalFormat.scale();

        // Round value based on precision and scale
        BigDecimal roundedValue = bigDecimal.setScale(scale, RoundingMode.HALF_UP);

        if(roundedValue.precision() > precision) {
            throw new IOException("Value exceeds allowed precision for field" + field.getName());
        }
        return roundedValue;
    }
}
