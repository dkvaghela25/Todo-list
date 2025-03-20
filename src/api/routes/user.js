const express = require('express');
const multer = require('multer');
const users = require('../controller/user')
const { authToken } = require('../../middleware/authToken')

const userRouter = express.Router();

const upload = multer();

userRouter.use(express.urlencoded({ extended: false }));

userRouter.use(authToken);

userRouter.get('/:user_id' , users.getUsers)
userRouter.patch('/update/:user_id', upload.none(), users.updateUser)
userRouter.delete('/delete/:user_id', users.deleteUser)

module.exports = {
    userRouter
}