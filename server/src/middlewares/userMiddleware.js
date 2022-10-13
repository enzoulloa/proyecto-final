const { User } = require("../db.js");
const users = require('./user.json');


const getUsers = async () => {
  try{
    users.map(async (user) => {
      await User.findOrCreate({
        where:{
         name: user.name,
         email: user.email,
         password: user.password
        }
      })
    })
}
catch(e){console.log(e)}
}

module.exports = {
    getUsers,
}