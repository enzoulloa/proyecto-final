const { Router } = require('express');
const api = Router();
const users = require('./users.js')
const ownerships = require('./ownerships.js')
const deleteUsers = require('./deleteUser.js')
const deleteOwnerships = require('./deleteOwnership.js')
const login = require('./login.js')
const admin = require('./create.js')

api.use('/users', users)
api.use('/ownerships', ownerships)
api.use('/deleteUsers', deleteUsers)
api.use('/deleteOwnerships', deleteOwnerships)
api.use('/login', login)
api.use('/create', admin)

module.exports = api;
