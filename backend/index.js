const experss=require('express')
const { mongo, default: mongoose } = require('mongoose')
const { MONGOURI } = require('./keys')


const app=experss()
const cors=require('cors')
// Middleware
app.use(experss.json())
app.use(cors())


// DB Connection
mongoose.connect(MONGOURI,(err)=>{
    if(err)
    console.log(err)
    else
    console.log("DB Connected..")
})

// url's
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

const port=4000
app.listen(port,()=>console.log(`server is running at ${port}`))