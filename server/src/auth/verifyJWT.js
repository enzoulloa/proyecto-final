const jwt = require("jsonwebtoken");

const verifyToken =  (token) => {
    try {
        return jwt.verify(token, process.env.SEED_AUTENTICATION);
    }catch(e) {
        console.log(e)
        return null
    }
}

module.exports = verifyToken;