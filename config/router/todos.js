const express = require('express');
const router = express.Router();
const {
  deleteTodoFromTodoList,
  updateTodoFromTodoList
} = require('../../controllers/todo_controller');

router.delete('/:id', (req, res) => {
  const todoId = req.params.id;

  deleteTodoFromTodoList(todoId)
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

router.put('/:id', (req, res) => {
  const todoId = req.params.id;
  const reqBody = req.body;

  updateTodoFromTodoList(todoId, reqBody)
    .then((todo) => {
      res.send(todo)
    })
    .catch((err) => {
      res.send({
        success: false,
      });
      console.error('Error:', err);
    });
});

module.exports = router;
