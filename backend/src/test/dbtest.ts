import { db } from '../config/db';

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT NOW() as now');
    console.log('✅ MySQL connected. Server time:', (rows as any)[0].now);
  } catch (err) {
    console.error('❌ MySQL connection error:', err);
  }
}

testConnection();
