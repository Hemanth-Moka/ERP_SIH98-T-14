const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRoute = require('./api/login');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/login', loginRoute);

app.get('/', (req, res) => {
  res.send('Backend running with PostgreSQL!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
