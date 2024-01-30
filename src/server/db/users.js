const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;


// function that lets us insert a new row into the users table
const createUser = async({ name='first last', email, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
      const { rows: [user ] } = await db.query(`
      INSERT INTO users(name, email, password)
      VALUES($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
      RETURNING *`, [name, email, hashedPassword]);

      return user;
  } catch (err) {
      throw err;
  }
}

// function that allows us to get a spceic user out of the table if provided with a valid email/password combination
const getUser = async({email, password}) => {
  if(!email || !password) {
      return;
  }
  try {
      const user = await getUserByEmail(email);
      if(!user) return;
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
      if(!passwordsMatch) return;
      delete user.password;
      return user;
  } catch (err) {
      throw err;
  }
}

// function that allows us to look up a user by email
const getUserByEmail = async(email) => {
  try {
      const { rows: [ user ] } = await db.query(`
      SELECT * 
      FROM users
      WHERE email=$1;`, [ email ]);

      if(!user) {
          return;
      }
      return user;
  } catch (err) {
      throw err;
  }
}

// exporting functions so other backend files can access them
module.exports = {
  createUser,
  getUser,
  getUserByEmail
};