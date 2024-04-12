
-- Displays All Invoices. Used in Invoices Page -- 

DROP FUNCTION get_invoices(); --

CREATE OR REPLACE FUNCTION get_invoices()
	RETURNS TABLE (
		id INTEGER,
		invoice_number VARCHAR,
		customer_number INTEGER,
		customer_name VARCHAR,
		area VARCHAR,
		city VARCHAR,
		state VARCHAR,
		generation_date TIMESTAMP(6) WITHOUT TIME ZONE,
		amount DOUBLE PRECISION,
		payment_mode VARCHAR
	)
AS $$

BEGIN
	RETURN QUERY
		SELECT 
			I.id, 
			I.number, 
			C.customer_number, 
			C.name,
			A.area, 
			A.city,
			A.state,
			I.generation_date, 
			I.amount,
			I.payment_mode
	FROM 
		public._invoice I
	JOIN 
		public._customer C ON C.customer_number = I.customer_number
	JOIN
		public._address A ON C.customer_number = A.customer_number;
END $$ 
LANGUAGE 'plpgsql';
