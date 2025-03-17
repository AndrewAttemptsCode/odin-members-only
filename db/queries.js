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


module.exports = { deserializeUser, getUser };