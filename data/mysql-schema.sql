CREATE TABLE IF NOT EXISTS enrolment_enquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  parent_name VARCHAR(150) NOT NULL,
  mobile VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL,
  child_age VARCHAR(50) NULL,
  intended_start_date VARCHAR(100) NULL,
  wants_tour VARCHAR(10) NULL,
  interests JSON NOT NULL,
  other_interest VARCHAR(255) NULL,
  decision_factors JSON NOT NULL,
  referral_source VARCHAR(100) NULL,
  consent_given TINYINT(1) NOT NULL DEFAULT 1,
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_enrolment_enquiries_submitted_at (submitted_at),
  KEY idx_enrolment_enquiries_email (email)
);
