const express = require('express');
const multer = require('multer');
const todo = require('../controller/todo')

const todoRouter = express.Router({mergeParams : true});

const upload = multer();

todoRouter.get('/', todo.showTask)
todoRouter.post('/create', upload.none() , todo.addTask)
todoRouter.patch('/update/:todo_id', upload.none() , todo.updateTask)
todoRouter.delete('/delete/:todo_id', upload.none() , todo.deleteTask)

module.exports = {
    todoRouter
}