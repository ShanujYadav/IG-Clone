const jwt =require('jsonwebtoken')
const { SECRETKEY } = require('../keys')
const User = require('../models/user')
module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({Error:"You must be logged in.."})
    }else{
        const token=authorization.replace("Bearer ","")
        jwt.verify(token,SECRETKEY,(err,payload)=>{
            if(err){
                return res.status(401).json({error:"You must be logged in.."})
            }else{
                // console.log(payload)
                const {id}=payload

                User.findById(id)
                .then(UserData=>{
                    UserData.password=undefined
                    // console.log(UserData)
                    req.user=UserData
                    next()
                })
            }
        })
    }

}
