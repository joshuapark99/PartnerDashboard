-- Create all the tables for the database
CREATE TABLE partner (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL
);


CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  partner_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  CONSTRAINT fk_partner 
    FOREIGN KEY(partner_id) 
    REFERENCES partner(id)
  ON DELETE CASCADE
);


CREATE TABLE work_hours (
  id SERIAL PRIMARY KEY,
  partner_id INTEGER NOT NULL,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL CHECK (start_time < end_time),
  end_time TIME NOT NULL,
  CONSTRAINT fk_partner 
    FOREIGN KEY(partner_id) 
    REFERENCES partner(id)
  ON DELETE CASCADE
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    partner_id INTEGER REFERENCES partner(id) ON DELETE CASCADE,
    test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    appointment_time TIMESTAMP NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Scheduled', 'Completed', 'Canceled')) DEFAULT 'Scheduled'
);


-- Insert mock data 
 
INSERT INTO partner (id,name, address) 
VALUES
  (1,'Joshua Partner', '123 Joshua St, Joshua City, CA 12345'),
  (2, 'Bad Partner', 'Very Bad Street, Bad City, BS 09212');

INSERT INTO tests (id,partner_id, name, price) 
VALUES
  (1, 1, 'DEXA', 100.00),
  (2, 1, 'VO2 Max', 149.99),
  (3, 2, 'DEXA', 9999.99);

INSERT INTO work_hours (partner_id, day_of_week, start_time, end_time)
VALUES
  (1, 0, '08:00:00', '13:00:00'),
  (1, 0, '14:00:00', '17:00:00'),
  (1, 1, '08:00:00', '17:00:00'),
  (1, 2, '08:00:00', '17:00:00'),
  (1, 3, '08:00:00', '17:00:00'),
  (1, 4, '08:00:00', '17:00:00'),
  (1, 5, '08:00:00', '17:00:00'),
  (1, 6, '08:00:00', '13:00:00'),
  (1, 6, '14:00:00', '17:00:00');

INSERT INTO appointments (partner_id, test_id, customer_name, appointment_time, status)
VALUES
  (1, 1, 'Person 1', '2025-07-10 10:00:00', 'Scheduled'),
  (1, 2, 'Second Person', '2025-05-01 11:00:00', 'Canceled'),
  (1, 1, '3rd Person', '2025-01-02 09:00:00', 'Completed'),
  (1, 2, 'Person of the fourth', '2025-12-02 14:00:00', 'Scheduled');


SELECT setval('tests_id_seq', (SELECT MAX(id) FROM tests) + 1);