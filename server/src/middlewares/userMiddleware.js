const { User } = require("../db.js");
const users = require('./user.json');
const bcrpt = require('bcryptjs')


const getUsers = async () => {
  try{
    users.map(async (user) => {
      const encript = user.password;
      const rounds = 10;
      let passwordEncripted = await bcrpt.hash(encript, rounds)
      await User.findOrCreate({
        where:{
         name: user.name,
         email: user.email,
         password: passwordEncripted ? passwordEncripted : user.password,
         cel: user.cel,
         role: user.role
        }
      })
    })
}
catch(e){console.log(e)}
}

module.exports = {
    getUsers,
}