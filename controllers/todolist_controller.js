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
  }
};
