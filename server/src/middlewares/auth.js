const verifyToken = require('../auth/verifyJWT.js')

const checkAuth = async (req,res,next) => {
    try{
        const token = req.headers.authorization;
        const tokenData = verifyToken(token);
        if(tokenData.id){
            req.userId = tokenData.id;
            next();
        } else {
        return res.status(409).send({ error: 'Does not have the corresponding permits'})
        }
    }
    catch(err){
        console.log(err)
        return res.status(409).send({ error: 'Does not have the corresponding permits'})
    }
}

const isUser = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const tokenData = verifyToken(token);
        if (tokenData.id && tokenData.role >= 1) {
            next();
        } else {
            res.status(409);
            res.send({ error: 'Does not have the corresponding permits, must be user, employee or admin'});
        }
    }
    catch (e) {
        res.status(409);
        res.send({ error: 'Does not have the corresponding permits, must be user, employee or admin' });
    }
}

const isEmployee = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const tokenData = verifyToken(token);
        if (tokenData.id && tokenData.role >= 2) {
            next();
        } else {
            res.status(409);
            res.send({ error: 'Does not have the corresponding permits, must be employee or admin' });
        }
    }
    catch (e) {
        res.status(409);
        res.send({ error: 'Does not have the corresponding permits, must be employee or admin' });
    }
}

const isAdmin = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const tokenData = verifyToken(token);
        if (tokenData.id && tokenData.role >= 3) {
            next();
        } else {
            res.status(409);
            res.send({ error: 'Does not have the corresponding permits, only admins' });
        }
    }
    catch (e) {
        res.status(409);
        res.send({ error: 'Does not have the corresponding permits, only admins' });
    }
}

module.exports = {
    checkAuth,
    isUser,
    isEmployee,
    isAdmin
};