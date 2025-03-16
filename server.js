require('dotenv').config();
const app = require('./src/app');

app.listen(8080, () =>
  console.log('Server started on: http://localhost:8080')
);
