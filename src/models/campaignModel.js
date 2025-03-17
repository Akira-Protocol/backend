// models/campaignModel.js
const { Pool } = require('pg');
const pool = new Pool(); // This assumes you have connection details in your config

class Campaign {
  constructor(data) {
    this.name = data.name;
    this.goals = data.goals;
    this.target_audience = data.target_audience;
    this.budget = data.budget;
    this.currency = data.currency || 'USDT';
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.bidding_strategy = data.bidding_strategy;
    this.ad_type = data.ad_type;
    this.ad_content = data.ad_content;
    this.user_id = data.user_id;
    this.created_at = data.created_at || new Date();
    this.updated_at = data.updated_at || new Date();
    this.status = data.status || 'draft';
  }

  static async create(campaignData) {
    const query = `
      INSERT INTO campaigns (
        name, goals, target_audience, budget, currency, 
        start_date, end_date, bidding_strategy, ad_type, 
        ad_content, user_id, created_at, updated_at, status
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;
    
    const values = [
      campaignData.name,
      campaignData.goals,
      campaignData.target_audience,
      campaignData.budget,
      campaignData.currency || 'USDT',
      campaignData.start_date,
      campaignData.end_date,
      campaignData.bidding_strategy,
      campaignData.ad_type,
      campaignData.ad_content,
      campaignData.user_id,
      campaignData.created_at || new Date(),
      campaignData.updated_at || new Date(),
      campaignData.status || 'draft'
    ];

    try {
      const result = await pool.query(query, values);
      return new Campaign(result.rows[0]);
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM campaigns WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) return null;
      return new Campaign(result.rows[0]);
    } catch (error) {
      console.error('Error finding campaign:', error);
      throw error;
    }
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM campaigns WHERE user_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [userId]);
      return result.rows.map(row => new Campaign(row));
    } catch (error) {
      console.error('Error finding user campaigns:', error);
      throw error;
    }
  }

  async update(updatedData) {
    const query = `
      UPDATE campaigns
      SET name = $1, goals = $2, target_audience = $3, budget = $4,
          currency = $5, start_date = $6, end_date = $7, bidding_strategy = $8,
          ad_type = $9, ad_content = $10, updated_at = $11, status = $12
      WHERE id = $13
      RETURNING *
    `;
    
    const values = [
      updatedData.name || this.name,
      updatedData.goals || this.goals,
      updatedData.target_audience || this.target_audience,
      updatedData.budget || this.budget,
      updatedData.currency || this.currency,
      updatedData.start_date || this.start_date,
      updatedData.end_date || this.end_date,
      updatedData.bidding_strategy || this.bidding_strategy,
      updatedData.ad_type || this.ad_type,
      updatedData.ad_content || this.ad_content,
      new Date(),
      updatedData.status || this.status,
      this.id
    ];

    try {
      const result = await pool.query(query, values);
      return new Campaign(result.rows[0]);
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  }
}

module.exports = Campaign;