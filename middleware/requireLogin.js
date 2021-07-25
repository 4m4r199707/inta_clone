const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const User = require('../models/User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {

        return res.status(401).json({ error: "you must be logged in authorization" })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in Jwt token"})
        }
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            User.findById(_id).then(userdata => {
                req.user = userdata
                next()
            })
            
        })
    })
}