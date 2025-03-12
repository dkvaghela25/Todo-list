const express = require('express');

const { userRouter } = require('./routes/users');
const { todoRouter } = require('./routes/todo');
const { authRouter } = require('./routes/auth');

const { verifyToken } = require('../middleware/verifyToken')

const apiRouter = express.Router();

apiRouter.use('/todo', verifyToken)

apiRouter.use('/users', userRouter)
apiRouter.use('/todo', todoRouter)
apiRouter.use('/auth', authRouter)

module.exports = {
    apiRouter
}