const Todo = require('../models').Todo;

module.exports = {
  getAllTodosInTodolist: async (todolistId) => {
    try {
      const todos = await Todo.findAll({
        where: {
          todolistId: todolistId
        }
      });
      return todos;
    } catch (error) {
      console.error('Error retrieving todos:', error);
      throw error;
    }
  },
  createTodoInTodoList: async (title, todoListId) => {
    try {
      const todo = await Todo.create({
        name: title,
        completed: false,
        todoListId,
      });
      return todo;
    } catch (error) {
      console.error('Error in creating a todo:', error);
      throw error;
    }
  },
  deleteTodoFromTodoList: async (todoId) => {
    try {
      const todo = await Todo.destroy({
        where: {
          id: todoId,
        },
      });
      return todo;
    } catch (error) {
      console.error('Error in deleting a todo:', error);
      throw error;
    }
  },
  updateTodoFromTodoList: async (todoId, updatedData) => {
    try {
      const todo = await Todo.findOne({ where: { id: todoId } });
      const updatedTodo = await todo.update(updatedData).then(res => res);
      return updatedTodo;
    } catch (error) {
      console.error('Error in deleting a todo:', error);
      throw error;
    }
  }
};
