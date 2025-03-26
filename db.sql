CREATE DATABASE IF NOT EXISTS votingsys;

USE votingsys;

-- Create the HAALETUS (votes) table
CREATE TABLE haaletus (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  vote TINYINT(1) CHECK (vote IN (0, 1)),
  INDEX idx_name (lastname, firstname),
  INDEX idx_vote (vote)
);

-- Create trigger to log updates to HAALETUS table
DELIMITER //
CREATE TRIGGER after_haaletus_update 
AFTER UPDATE ON haaletus
FOR EACH ROW 
BEGIN
	SET @latest_tulemused_id = (SELECT id FROM tulemused ORDER BY voting_start DESC LIMIT 1);

	IF NEW.vote IS NOT NULL AND OLD.vote IS NULL THEN
		INSERT INTO logi (vote_change, status, user_id, session_id)
		VALUES (NEW.vote, 'created', NEW.id, @latest_tulemused_id);

		UPDATE tulemused
			SET for_count = for_count + IF(NEW.vote = 1, 1, 0),
			against_count = against_count + IF(NEW.vote = 0, 1, 0)
			ORDER BY voting_start DESC LIMIT 1;

	ELSEIF NEW.vote IS NOT NULL AND OLD.vote IS NOT NULL AND OLD.vote != NEW.vote THEN
		-- Vote changed
		INSERT INTO logi (vote_change, status, user_id, session_id)
		VALUES (NEW.vote, 'updated', NEW.id, @latest_tulemused_id);
		
		-- Update the voting results
		UPDATE tulemused
		SET for_count = for_count + IF(NEW.vote = 1, 1, -1),
		against_count = against_count + IF(NEW.vote = 0, 1, -1)
		ORDER BY voting_start DESC LIMIT 1;
	END IF;
END//
DELIMITER ;

INSERT INTO haaletus (firstname, lastname, vote) VALUES 
('John', 'Doe', NULL),
('Jane', 'Smith', NULL),
('Michael', 'Johnson', NULL),
('Emily', 'Williams', NULL),
('Robert', 'Brown', NULL),
('Sarah', 'Jones', NULL),
('David', 'Miller', NULL),
('Jennifer', 'Davis', NULL),
('William', 'Garcia', NULL),
('Elizabeth', 'Rodriguez', NULL),
('James', 'Wilson', NULL);


-- Create the TULEMUSED (results) table
CREATE TABLE tulemused (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  voting_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  for_count INT UNSIGNED NOT NULL DEFAULT 0,
  against_count INT UNSIGNED NOT NULL DEFAULT 0,
  INDEX idx_voting_time (voting_start)
);


-- Create the LOGI (logs) table
CREATE TABLE logi (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED,
  session_id INT UNSIGNED,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  vote_change TINYINT(1) NOT NULL,
  status ENUM('updated', 'created') NOT NULL,
  FOREIGN KEY (user_id) REFERENCES haaletus(id),
  FOREIGN KEY (session_id) REFERENCES tulemused(id),
  INDEX idx_updated_at (updated_at)
);