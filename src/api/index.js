const express = require('express');
const multer = require('multer');
const users = require('./controller/users')
const todo = require('./controller/todo')



// const { validate_user } = require('../middleware/validate')

const userRouter = express.Router();
const todoRouter = express.Router();
const upload = multer();

userRouter.use(express.urlencoded({ extended: false }));

userRouter.get('/' , users.getUsers)
userRouter.post('/register', users.registerUser)
userRouter.post('/login', upload.none(), users.loginUser)
userRouter.patch('/update', upload.none(), users.updateUser)
userRouter.post('/logout', users.logoutUser)
userRouter.delete('/delete', users.deleteUser)

todoRouter.get('/', todo.showTask)
todoRouter.post('/create', upload.none() , todo.addTask)
todoRouter.post('/update', upload.none() , todo.updateTask)
todoRouter.delete('/delete', upload.none() , todo.deleteTask)

module.exports = {
    userRouter,
    todoRouter
}