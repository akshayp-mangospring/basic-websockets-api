const envConfig = require('dotenv').config();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pythonShell = require('python-shell').PythonShell;
const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const {
  getAllTodosInTodolist,
  createTodoInTodoList,
  deleteTodoFromTodoList,
  updateTodoFromTodoList
} = require('./controllers/todo_controller');
const { getAllTodolists, createTodoList, deleteTodoList } = require('./controllers/todolist_controller');
const { PythonShell } = require('python-shell');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage,
})

const { parsed: { PORT } } = envConfig;
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.post('/pdftodocx', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uplaoded');
    return;
  }

  const pyShell = new PythonShell('/convert_pdf_to_docx.py', {
    mode: 'text',
    pythonPath: 'python3',
    scriptPath: __dirname,
    args: [req.file.path]
  });

  pyShell.on('message', (msg) => {
    console.log(msg);
  });

  pyShell.end((err) => {
    if (err) {
      res.send(err);
      return;
    }

    const docxFile = req.file.path.replace('.pdf', '.docx');
    res.download(docxFile, 'converted.docx');
  });

  pyShell.on('error', (msg) => {
    console.log(msg);
    res.status(500).send('An error occurred');
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
    res.send('Update the book');
  });

app.route('/todolists/:id')
  .delete((req, res) => {
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

app.route('/todos/:id')
  .delete((req, res) => {
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
  })
  .put((req, res) => {
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

server.listen(PORT || 3000, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
