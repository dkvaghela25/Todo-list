const express = require('express');
const multer = require('multer');
const auth = require('../controller/auth')

const authRouter = express.Router({mergeParams : true});

const upload = multer();

authRouter.use(express.urlencoded({ extended: false }));

authRouter.post('/register',upload.none(), auth.registerUser)
authRouter.post('/login', upload.none(), auth.loginUser)
authRouter.post('/logout', auth.logoutUser)

module.exports = {
    authRouter
}