-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Campaign Table
CREATE TABLE IF NOT EXISTS campaign (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    campaign_name VARCHAR(100) NOT NULL UNIQUE,
    campaign_goals TEXT[],
    target_audience JSONB NOT NULL,
    budget NUMERIC(10, 2) CHECK (budget >= 0),
    campaign_duration VARCHAR(50) NOT NULL,
    bidding_strategy VARCHAR(100),
    ad_creative VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Add this to your existing migration file
CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  goals JSONB NOT NULL,
  target_audience JSONB NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USDT',
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  bidding_strategy VARCHAR(100),
  ad_type VARCHAR(50) NOT NULL,
  ad_content JSONB,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'draft'
);

CREATE INDEX campaigns_user_id_idx ON campaigns(user_id);
CREATE INDEX campaigns_status_idx ON campaigns(status);