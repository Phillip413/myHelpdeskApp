// client.js to make sure we can connect to our database

// pulling out the client objeact from postgres
const { Client } = require('pg');

// creating a connection string, which connects us to our database
// localhost:5432 is our postgres port
const connectionString = process.env.DATABASE_URL || 'http://localhost:5432/helpData';
// helpData is what our database is going to be called

// creating a client object out of the CLient class
const client = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;