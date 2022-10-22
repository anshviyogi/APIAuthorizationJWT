const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api',(req,res)=>{
    res.json({message:"Welcome to the API"})
})

app.post('/api/post',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({message:"Post created",authData})      
        }
    })
})


// Login Route...

app.post('/api/login',(req,res)=>{
    
    // Mock user
    const user = {
        id:1,
        username:"Ansh",
        email:"auni@gmail.com"
    }

    // Craeting a token
    jwt.sign({user},'secretkey',{expiresIn:"30s"},(err,token)=>{
        res.json({token})
    })
})

// Format of token
// Authorization: Bearer <TOKEN>

function verifyToken(req,res,next){
    // Get the auth header value
    const bearerHeader = req.headers['authorization']

    // Check if not undefined
    if(typeof bearerHeader !== undefined){
        const bearerToken = bearerHeader.split(' ')[1]

        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403)
    }
}

app.listen(5000,()=> console.log(`Server started at 5000`))