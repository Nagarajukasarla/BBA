
-- Displays customers with their address and purchase status. Used in customer list page --

-- DROP FUNCTION get_customers_with_address_and_purchase_status; --

CREATE OR REPLACE FUNCTION get_customers_with_address_and_purchase_status()
	RETURNS TABLE (
		id INTEGER,
		customer_name VARCHAR,
		customer_number INTEGER,
		email VARCHAR,
		phone VARCHAR,
		paid_amount DOUBLE PRECISION,
		total_purchase_amount DOUBLE PRECISION,
		created_date TIMESTAMP(6) WITHOUT TIME ZONE,
		discount DOUBLE PRECISION,
		due_period INTEGER,
		block_number VARCHAR,
		street VARCHAR,
		area VARCHAR,
		city VARCHAR,
		state VARCHAR,
		zipcode VARCHAR
	)
AS $$

BEGIN
	RETURN QUERY
	WITH total_purchases AS (
		SELECT INV.customer_number, SUM(amount) AS purchased_amount
		FROM public._invoice INV
		GROUP BY INV.customer_number
	)
	SELECT
		C.id,
		C.name,
		C.customer_number, 
		C.email,
		C.phone,
		C.paid_amount,
		TP.purchased_amount,
		C.created_date,
		C.discount,
		C.due_period,
		A.block_number, 
		A.street,
		A.area,
		A.city,
		A.state, 
		A.zipcode 
	FROM 
		public._invoice I
	JOIN 
		public._customer C ON C.customer_number = I.customer_number
	JOIN
		total_purchases TP ON TP.customer_number = C.customer_number
	JOIN
		public._address A ON C.customer_number = A.customer_number
	GROUP BY
		C.id,
		C.name,
		C.customer_number, 
		C.email,
		C.phone,
		C.paid_amount,
		TP.purchased_amount,
		C.created_date,
		C.discount,
		C.due_period,
		A.block_number, 
		A.street,
		A.area,
		A.city,
		A.state, 
		A.zipcode;
END $$
LANGUAGE 'plpgsql';

SELECT * FROM get_customers_with_address_and_purchase_status();
