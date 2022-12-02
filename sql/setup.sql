-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  description VARCHAR,
  urgency INT,
  completed BOOLEAN NOT NULL DEFAULT(false),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO 
  users (email, password_hash, first_name, last_name)
VALUES
  (
    'jimotheena@whargarbl.skynet',
    'possw0rdican',
    'Heyy',
    'Mulliganman'
  ),
  (
    'supertest@cular.org',
    'fishsquits89',
    'Turkmenicles',
    'Parthnopheles'
  ),
  (
    'jerry@rick.prune',
    'furgleburglerz!',
    'Gunther',
    'Shmorgles'
  );

INSERT INTO 
  items (user_id, description, urgency, completed)
VALUES
  (1, 'test item #1', 3, true),
  (2, 'so many items, and you choose crytems', 5, true),
  (3, 'testy westerson', 2, false);