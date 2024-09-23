const jwt = require('jsonwebtoken');
const JWT_CREATOR_SECRET = process.env.JWT_CREATOR_SECRET;

async function creatorMiddleware(req,res,next)
{
    const token = req.headers.token;
    const creator = await jwt.decode(token, JWT_CREATOR_SECRET);

    if(creator){
        req.creatorId = creator.id
        next();
    }
    else{
        res.json({
            message : "Please signin"
        })
    }
}

module.exports = {
    creatorMiddleware : creatorMiddleware
}
