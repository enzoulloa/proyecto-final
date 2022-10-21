const { Router } = require('express');
const api = Router();
const users = require('./users.js')
const ownerships = require('./ownerships.js')
const deleteUsers = require('./deleteUser.js')
const deleteOwnerships = require('./deleteOwnership.js')
const login = require('./login.js')
const logout = require('./logout.js')
const ownershipTypes = require('./ownershipTypes')
const admin = require('./createOrUpdate.js')
const payment = require('./payment')

api.use('/users', users)
api.use('/ownerships', ownerships)
api.use('/ownershipTypes', ownershipTypes)
api.use('/deleteUsers', deleteUsers)
api.use('/deleteOwnerships', deleteOwnerships)
api.use('/login', login)
api.use('/logout', logout)
api.use('/create', admin)
api.use('/payment', payment);


module.exports = api;
