const express = require('express');
const multer = require('multer');
const auth = require('../controller/auth')
const { validate_user } = require('../../helper/validate')

const authRouter = express.Router();

const upload = multer();

authRouter.use(express.urlencoded({ extended: false }));

authRouter.use('/register', upload.none(), validate_user)

authRouter.post('/register', auth.registerUser)
authRouter.post('/login', upload.none(), auth.loginUser)
authRouter.post('/logout', auth.logoutUser)

module.exports = {
    authRouter
}