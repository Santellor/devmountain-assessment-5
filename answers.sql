-- 1
SELECT email FROM customers ORDER BY email;

-- 2
SELECT id FROM orders 
WHERE customer_id = 
    (SELECT id FROM customers 
        WHERE fname = 'Elizabeth' 
        AND lname = 'Crocker');

-- 3
SELECT SUM(num_cupcakes) FROM orders WHERE processed != 't';

-- 4
SELECT DISTINCT name, SUM(num_cupcakes) FROM cupcakes 
    LEFT JOIN orders 
    ON (cupcakes.id = orders.cupcake_id)
        GROUP BY name
        ORDER BY name;

-- 5
SELECT email, SUM(num_cupcakes) AS total FROM customers 
    LEFT JOIN orders
    ON (customers.id = orders.customer_id)
        GROUP BY email
        ORDER BY total DESC;

-- 6
SELECT DISTINCT fname, lname, email FROM customers
    LEFT JOIN orders
    ON (customers.id = orders.customer_id)
    LEFT JOIN cupcakes
    ON (cupcakes.id = orders.cupcake_id)
        WHERE name = 'funfetti' AND processed = 't';
