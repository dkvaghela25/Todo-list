const express = require('express');

const { userRouter } = require('./routes/users');
const { todoRouter } = require('./routes/todo');

const apiRouter = express.Router();

apiRouter.use('/users', userRouter)
apiRouter.use('/todo', todoRouter)

module.exports = {
    apiRouter
}