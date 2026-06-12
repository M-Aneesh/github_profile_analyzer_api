import mysql from "mysql2/promise";
import env from "dotenv";

env.config();
// create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  //connection wait for free connection
  waitForConnections: true,
  //10 connections present
  connectionLimit: 10,
  //unlimited request queue , if 11th req pops up , then req gets added to queue and after connection gets free ,  11th req gets attended and executed
  queueLimit: 0
});

export default pool;