const pg = require('pg');
const { Client } = pg;

const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 10000,
    max: 1,
});

client.connect();

async function query(query, args) {
    return await client.query(query, args);
}

module.exports = query;
