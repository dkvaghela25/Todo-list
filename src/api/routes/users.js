const express = require('express');
const multer = require('multer');
const users = require('../controller/users')

const userRouter = express.Router();

const upload = multer();

userRouter.use(express.urlencoded({ extended: false }));

userRouter.get('/' , users.getUsers)
userRouter.patch('/update', upload.none(), users.updateUser)
userRouter.delete('/delete', users.deleteUser)

module.exports = {
    userRouter
}