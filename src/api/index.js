const express = require('express');

const { userRouter } = require('./routes/users');
const { todoRouter } = require('./routes/todo');
const { authRouter } = require('./routes/auth');

const { authToken } = require('../middleware/authToken')

const apiRouter = express.Router({mergeParams : true});

apiRouter.use('/todo', authToken)

apiRouter.use('/users', userRouter)
apiRouter.use('/todo', todoRouter)
apiRouter.use('/auth', authRouter)

module.exports = {
    apiRouter
}