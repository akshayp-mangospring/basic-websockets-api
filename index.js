const envConfig = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const listEndpoints = require("express-list-endpoints");
const { createServer } = require('node:http');
const { parsed: { PORT } } = envConfig;
const todoListsRouter = require("./config/router/todo_lists");
const todosRouter = require("./config/router/todos");

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use('/todolists', todoListsRouter);
app.use('/todos', todosRouter);

app.get('/', (req, res) => {
  res.send({
    content: 'Hello, World!'
  });
});

console.log(listEndpoints(app));

server.listen(PORT || 3000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
