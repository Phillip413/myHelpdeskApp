// file where you will create your tables and insert initial values

// establish a connection to the database
const db = require('./client');
const { createUser } = require('./users');

// create an array of user objects
const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  

// drop any existing tables
const dropTables = async () => {
  try {
      await db.query(`
      DROP TABLE IF EXISTS users;
      `);
  }
  catch(err) {
      throw err;
  }
}

// create tables
const createTables = async () => {
  try{
      await db.query(`
      CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) DEFAULT 'name',
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
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
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

// call the different functions defined above and close the connection to the database when seeding is complete
const seedDatabse = async () => {
  try {
      db.connect();
      await dropTables();
      await createTables();
      await insertUsers();
  }
  catch (err) {
      throw err;
  }
  finally {
      db.end();
  }
}

seedDatabse();

// use the seed file through the package.json