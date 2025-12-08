import mysql from "mysql2/promise";

let connection = null;

async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST || 'localhost',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || 'db_aas',
    });
  }
  return connection;
}

export default getConnection;