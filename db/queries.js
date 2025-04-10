const pool = require('./pool');

const deserializeUser = async (userID) => {
  const startTime = Date.now();
  const { rows } = await pool.query(`
    SELECT id, username, member_status, admin 
    FROM users
    WHERE id = $1
    `, [userID]
  );
  console.log(`deserializeUser took ${Date.now() - startTime}ms`);
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

const getUserByEmail = async (email) => {
  const { rows } = await pool.query(`
    SELECT * FROM users
    WHERE email = $1
    `, [email]
  );
  return rows[0];
}

const getUserByUsername = async (username) => {
  const { rows } = await pool.query(`
    SELECT * FROM users
    WHERE username = $1
    `, [username]
  );
  return rows[0];
}

const updateMemberStatus = async (userID) => {
  await pool.query(`
    UPDATE users
    SET member_status = 't'
    WHERE id = $1
    `, [userID]
  );
}

const createMessage = async (userID, messageTitle, messageText) => {
  await pool.query(`
    INSERT INTO messages (user_id, title, text)
    VALUES ($1, $2, $3)
    `, [userID, messageTitle, messageText]
  );
}

const getAllMessages = async () => {
  const { rows } = await pool.query(`
    SELECT messages.*, users.username
    FROM messages
    INNER JOIN users
    ON messages.user_id = users.id
    ORDER BY messages.id DESC
    `
  );
  return rows;
}

const deleteMessage = async (messageID) => {
  await pool.query(`
    DELETE FROM messages
    WHERE id = $1
    `, [messageID]
  );
}

const addAdmin = async (username) => {
  await pool.query(`
    UPDATE users
    SET admin = 't'
    WHERE username = $1
    `, [username]
  );
}

module.exports = { deserializeUser, getUser, createUser, getUserByUsername, getUserByEmail, updateMemberStatus, createMessage, getAllMessages, deleteMessage, addAdmin };