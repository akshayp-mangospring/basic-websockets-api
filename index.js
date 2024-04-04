const envConfig = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { getAllTodosInTodolist, createTodoInTodoList } = require('./controllers/todo_controller');
const { getAllTodolists, createTodoList } = require('./controllers/todolist_controller');

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

app.route('/todolists')
  .get((req, res) => {
    getAllTodolists()
      .then((todolists) => {
        res.send(todolists);
      })
      .catch((error) => {
        res.send({
          success: false,
        });
        console.error('Error:', error);
      });
  })
  .post((req, res) => {
    createTodoList(req.body.title)
      .then((todolist) => {
        res.send(todolist);
      })
      .catch((err) => {
        res.send({
          success: false,
        });
        console.error('Error:', err);
      });
  })
  .put((req, res) => {
    res.send('Update the book')
  });

app.route('/todolists/:id/todos')
  .get((req, res) => {
    const todolistId = req.params.id;

    getAllTodosInTodolist(todolistId)
      .then((todos) => {
        res.send(todos);
      })
      .catch((error) => {
        res.send({
          success: false,
        });
        console.error('Error:', error);
      });
  })
  .post((req, res) => {
    const title = 'Learn Financial Literacy';
    const todolistId = 1;

    createTodoInTodoList(title, todolistId)
      .then((todo) => {
        res.send(todo);
      })
      .catch((err) => {
        res.send({
          success: false,
        });
        console.error('Error:', err);
      });
  });

server.listen(PORT || 3000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
