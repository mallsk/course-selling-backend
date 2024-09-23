const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decrypt = jwt.verify(token , JWT_USER_SECRET);

    if(decrypt){
        req.userId = decrypt.id;
        next()
    }
    else{
        res.json({
            message : "Please signin"
        })
    }
}

module.exports = {
    userMiddleware : userMiddleware
}