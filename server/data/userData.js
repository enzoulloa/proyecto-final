const { User } = require("../src/db");
const users = require("./user.json");
const bcrpt = require("bcryptjs");

async function getUsers() {
  try {
    if (!(await User.findAll()).length) {
      users.map(async (user) => {
        const encript = user.password;
        const rounds = 10;
        let passwordEncripted = await bcrpt.hash(encript, rounds);
        await User.findOrCreate({
          where: {
            name: user.name,
            email: user.email,
            password: passwordEncripted ? passwordEncripted : user.password,
            cel: user.cel,
            role: user.role,
            photo: user.photo
              ? user.photo
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
          },
        });
      });
      
      console.log("Usuarios cargados a la db")
    } else {
      console.log("Usuarios obtenidos")
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getUsers,
};
