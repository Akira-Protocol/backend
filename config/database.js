const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Define your connection string
const client = new Client({
  user: 'akiradb',
  host: 'localhost',
  database: 'akiradb2',
  password: 'Akira_x991',
  port: 5432, // Default PostgreSQL port
});

async function connect() {
    if (!client._connected) {
      await client.connect();
      console.log('✅ PostgreSQL connection successful!');
    }
    return client;
  }

  async function runMigrations() {
    try {
        await client.connect();
        console.log("Connected to database");

        const migrationFiles = fs.readdirSync(path.join(__dirname, "migrations"));

        for (const file of migrationFiles) {
            const migrationPath = path.join(__dirname, "migrations", file);
            const migrationQuery = fs.readFileSync(migrationPath, "utf8");

            console.log(`Running migration: ${file}`);
            await client.query(migrationQuery);
        }

        console.log("Migrations completed successfully!");
    } catch (error) {
        console.error("Error running migrations:", error);
    } finally {
        await client.end();
    }
}

// Execute query helper function
async function query(text, params) {
    const client = await connect();
    try {
      return await client.query(text, params);
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }
  
  // Only run migrations when this file is executed directly
  if (require.main === module) {
    runMigrations()
      .then(() => client.end())
      .catch(console.error);
  }
  
  module.exports = {
    client,
    connect,
    query,
    runMigrations
  };