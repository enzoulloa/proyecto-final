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
         role: user.role,
         photo: user.photo ? user.photo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg'
        }
      })
    })
}
catch(e){console.log(e)}
}

module.exports = {
    getUsers,
}