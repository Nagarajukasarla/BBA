CREATE OR REPLACE FUNCTION get_filtered_invoices(
	p_customer_number INTEGER, 
	p_payment_mode VARCHAR, 
	p_status VARCHAR
)
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
	payment_mode VARCHAR,
	status VARCHAR
)
AS $$
BEGIN
	RETURN QUERY
		SELECT
			I.id,
			I.number,
			I.customer_number,
			C.name,
			A.area,
			A.city,
			A.state,
			I.generation_date,
			I.amount,
			I.payment_mode,
			I.status
		FROM
			public._invoice I
		JOIN 
			public._customer C ON I.customer_number = C.customer_number
		JOIN
			public._address A ON C.customer_number = A.customer_number
		WHERE
			(p_customer_number IS NULL OR p_customer_number = I.customer_number) AND
			(p_payment_mode IS NULL OR p_payment_mode = I.payment_mode) AND
			(p_status IS NULL OR p_status = I.status);
END $$
LANGUAGE 'plpgsql';


SELECT * FROM get_filtered_invoices(59957, 'credit', 'paid');
