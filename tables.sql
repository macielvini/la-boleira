CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(55) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(11) NOT NULL
);

CREATE TABLE cakes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(55) NOT NULL,
  price INT NOT NULL,
  image VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES "clients"("id") NOT NULL,
  cake_id INT REFERENCES "cakes"("id") NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_price INT NOT NULL
);

CREATE TABLE flavours (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

ALTER TABLE
  cakes
ADD
  flavour_id INT REFERENCES "flavours"("id") NOT NULL;