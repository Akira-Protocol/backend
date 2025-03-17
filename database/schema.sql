CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE campaign (
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
