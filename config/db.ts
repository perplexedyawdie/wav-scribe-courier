import mysql from 'mysql2/promise'

export function dbConnection() {
    
    const conn = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        ssl: {
            rejectUnauthorized: false
        }
    });

    return conn;
}