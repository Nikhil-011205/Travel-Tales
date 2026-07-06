const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "travel-tales",
    password: "Raaju#1218",
    port: 5432,
});

module.exports = pool;