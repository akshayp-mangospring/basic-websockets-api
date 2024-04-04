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
  createTodoInTodoList: async (title, todolistId) => {
    try {
      const todos = await Todo.create({
        name: title,
        TodoListId: todolistId
      });
      return todos;
    } catch (error) {
      console.error('Error retrieving todos:', error);
      throw error;
    }
  }
};
