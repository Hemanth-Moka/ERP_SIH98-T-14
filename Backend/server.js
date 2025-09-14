const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRoute = require('./api/login');
const studentRoute = require('./api/student'); // singular matches filename

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/login', loginRoute);
app.use('/api/students', studentRoute); // mount student route at /api/students

app.get('/', (req, res) => {
  res.send('Backend running with PostgreSQL!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
