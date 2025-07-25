const mysql = require("mysql2");
const path = require("path");

// Load .env from the root directory
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "sampana2006_",
  database: process.env.DB_NAME || "ownbeauty_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  // timeout: 60000
});

const promisePool = pool.promise();

async function testConnection() {
  try {
    const [rows] = await promisePool.execute("SELECT 1 + 1 AS result");
    console.log("Database connection successful!");
    console.log("Test result:", rows[0].result);
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  }
}

module.exports = {
  pool: promisePool,
  testConnection,
};
