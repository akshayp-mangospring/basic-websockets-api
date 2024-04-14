const TodoList = require('../models').TodoList;

module.exports = {
  createTodoList: async (title) => {
    try {
      return await TodoList.create({ title });
    } catch (err) {
      console.error('Error creating todo list:', err);
      throw err;
    }
  },
  getAllTodolists: async () => {
    try {
      return await TodoList.findAll();
    } catch (err) {
      console.error('Error retrieving todo lists:', err);
      throw err;
    }
  },
  deleteTodoList: async (todoListId) => {
    try {
      const todo = await TodoList.destroy({
        where: {
          id: todoListId,
        },
      });
      return todo;
    } catch (error) {
      console.error('Error in deleting a todo list:', error);
      throw error;
    }
  },
};
