const experss=require('express')
const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { SECRETKEY } = require('../keys')
const requireLogin = require('../middleware/requireLogin')
const router =experss.Router()

//signup
router.post("/signup",(req,res)=>{
    const {name,email,password,pic}=req.body
    if(!email || !name || !password){
        res.status(422).json({error:"Please fill All the Fields !"})
    }else{
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                res.status(422).json({error:"User Already Exists.."})
            }
            else{
                bcrypt.hash(password,12)
                .then(hashedPassword=>{
                    const user=new User({
                        name,
                        email,
                        password:hashedPassword,
                        pic
                    })
                    user.save()
                    .then(user=>{
                        res.status(200).json({msg:"Added Successfully.."})
                    })              
                })
            }
        })
    }
})
// login
router.post("/login",(req,res)=>{
    const {email,password}=req.body
    if(!email  || !password){
        return res.status(422).json({error:"Please add email and Password.."})
    }
    else{
        User.findOne({email:email})
       .then(dbUser=>{
            if(!dbUser){
                return res.status(422).json({error:"Invalied Email.."})
            }else{
                bcrypt.compare(password,dbUser.password)
                    .then(doMatch =>{
                        if(doMatch){
                            const token=jwt.sign({id:dbUser._id},SECRETKEY)
                            return res.json(token)
                        }else{
                            return res.status(422).json({error:"Invalied Password.."})
                        }
                    })
            }
        })
    }
})
 
router.get("/protected",requireLogin,(req,res)=>{
        res.json(req.user)
})
module.exports=router
