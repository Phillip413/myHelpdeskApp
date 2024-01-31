// file where you will create your tables and insert initial values

// establish a connection to the database (grab client)
const client = require('./client');

const {users} = require('./data')

const { createUser } = require('./users');

// drop any existing tables
const dropTables = async () => {
  try {
    await client.query(`DROP TABLE IF EXISTS tickets;`)
    await client.query(`DROP TABLE IF EXISTS users;`)
  }
  catch(err) {
      throw err;
  }
}

// create tables
const createTables = async () => {
  try{
      await client.query(`
      CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) DEFAULT 'name',
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(255)
      )`);
      await client.query(`
      CREATE TABLE tickets(
          id SERIAL PRIMARY KEY,
          userID INTEGER REFERENCES users(id),
          content TEXT,
          ticketStatus VARCHAR(255),
          ticketDate DATE
      )`);
  }
  catch(err) {
    throw err;
  }
}

// insert values into the newly created table
const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password, role: user.role,});
    }
    console.log('Seed USER data inserted successfully.');
  } catch (error) {
    console.error('Error inserting USER seed data:', error);
  }
};

// call the different functions defined above and close the connection to the database when seeding is complete
const runSeed = async () => {
  try {
      // initialize connection to our database
      client.connect();

      await dropTables();
      console.log("dropped Tables...");
      await createTables();
      console.log("Created Tables...");
      await insertUsers();
      console.log("Inserted Users...")
  }
  catch (err) {
      throw err;
  }
  finally {
      client.end(); // shut down the connection to the db
  }
}

runSeed();

// use the seed file through the package.json