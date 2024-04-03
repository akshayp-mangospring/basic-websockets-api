const envConfig = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');

const { parsed: { PORT } } = envConfig;
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    content: 'Hello, World!'
  });
});

server.listen(PORT || 3000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
