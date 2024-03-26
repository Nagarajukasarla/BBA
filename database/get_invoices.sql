
-- Displays All Invoices. Used in Invoices Page -- 

-- DROP FUNCTION get_invoices(); --

CREATE OR REPLACE FUNCTION get_invoices()
	RETURNS TABLE (
		invoice_number VARCHAR,
		customer_name VARCHAR,
		customer_number INTEGER,
		generated_date TIMESTAMP(6) WITHOUT TIME ZONE,
		amount DOUBLE PRECISION
	)
AS $$
BEGIN
	RETURN QUERY
	SELECT I.number, C.name, C.customer_number, I.generation_date, I.amount
	FROM public._invoice I
	JOIN public._customer C
	ON C.customer_number = I.customer_number;
END $$ 
LANGUAGE 'plpgsql';

SELECT * FROM public.get_invoices();