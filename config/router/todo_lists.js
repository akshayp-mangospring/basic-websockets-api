const express = require('express');
const router = express.Router();
const { getAllTodolists, createTodoList, deleteTodoList } = require('../../controllers/todolist_controller');
const {
  getAllTodosInTodolist,
  createTodoInTodoList,
} = require('../../controllers/todo_controller');

router.get('/', (req, res) => {
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
});

router.post('/', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
  const todoListId = req.params.id;

  deleteTodoList(todoListId)
    .then(() => {
      res.send({ success: true })
    })
    .catch((err) => {
      res.send({
        success: false,
      });
      console.error('Error:', err);
    });
});

router.get('/:id/todos', (req, res) => {
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

router.post('/:id/todos', (req, res) => {
  const title = req.body.title;
  const todolistId = req.params.id;

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

module.exports = router;
