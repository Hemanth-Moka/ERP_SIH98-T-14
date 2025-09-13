// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://erp_sih_user:XFnlaTgB0pm0CCVzmKY5BknWlRgbOnmh@dpg-d32sqnruibrs73a5f980-a.oregon-postgres.render.com/erp_sih',
  ssl: {
    rejectUnauthorized: false, // required for some hosted DBs like Render
  },
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

module.exports = pool;
