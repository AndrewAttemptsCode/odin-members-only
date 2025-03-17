const pool = require('./pool');

const deserializeUser = async (userID) => {
  const { rows } = await pool.query(`
    SELECT * FROM users
    WHERE id = $1
    `, [userID]
  );
  return rows[0];
}

const getUser = async (username) => {
  const { rows } = await pool.query(`
    SELECT * FROM users
    WHERE username = $1
    `, [username]
  );
  return rows[0];
}

const createUser = async (first_name, last_name, username, email, password) => {
  await pool.query(`
    INSERT INTO users (first_name, last_name, username, email, password)
    VALUES
      ($1, $2, $3, $4, $5)
    `, [first_name, last_name, username, email, password]
  );
}


module.exports = { deserializeUser, getUser, createUser };