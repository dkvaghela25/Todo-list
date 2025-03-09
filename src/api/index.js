const express = require('express');
const multer = require('multer');
const users = require('./controller/users')



// const { validate_user } = require('../middleware/validate')

const userRouter = express.Router();
const upload = multer();

userRouter.use(express.urlencoded({ extended: false }));

userRouter.get('/' , users.getUsers)
userRouter.post('/register', users.registerUser)
userRouter.post('/login', upload.none(), users.loginUser)
userRouter.patch('/update', upload.none(), users.updateUser)
userRouter.post('/logout', users.logoutUser)

module.exports = {
    userRouter
}