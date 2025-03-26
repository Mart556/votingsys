CREATE DATABASE IF NOT EXISTS votingsys;

USE votingsys;

-- Create the HAALETUS (votes) table
CREATE TABLE HAALETUS (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  decision TINYINT(1) CHECK (decision IN (0, 1)),
  INDEX idx_name (lastname, firstname),
  INDEX idx_decision (decision)
);

-- Create the TULEMUSED (results) table
CREATE TABLE TULEMUSED (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  voting_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  for_count INT UNSIGNED NOT NULL DEFAULT 0,
  against_count INT UNSIGNED NOT NULL DEFAULT 0,
  INDEX idx_voting_time (voting_start)
);

-- Create the LOGI (logs) table
CREATE TABLE LOGI (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  change TINYINT(1) NOT NULL,
  status ENUM('updated', 'created') NOT NULL,
  INDEX idx_updated_at (updated_at)
);