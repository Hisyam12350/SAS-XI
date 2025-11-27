import mysql from "mysql2/promise";

let connection = null;

async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
       host: 'localhost',
      user: 'root',
      database: 'db_aas',
    });
  }
  return connection;
}

export default getConnection;