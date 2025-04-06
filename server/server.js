const express=require('express')
const cors=require('cors')
const app=express()
const path = require('path');

app.use(express.json())
app.use(cors())



app.use(express.static(path.join(__dirname, '../public')));





const user=[{username:'amin',password:'1234'}]
let ran_num=''

app.post('/login',(req,res)=>{
let valid
const {username,password}=req.body
const user_find=user.find(u=>u.username===username)
if(user_find){
    if(user_find.password===password) {
        res.json({validation:true,redirect:"../2fa.html"})
        ran_num=random_num().toString()
        //console.log(ran_num);
    }
    else res.json({validation:false})
}else res.json({validation:false})


})

function random_num(){
    let random_n= Math.floor(Math.random()*10000).toString()
    return String(random_n).padStart(4, '0'); 
}




app.post('/sendcode',(req,res)=>{
    
    const code=req.body
    
   if(code.code===ran_num) res.json({redirect:"./home.html"})
   else res.json({message:'the code not valid ,try agin.'})
    
    
    
    
})








app.listen(2000,()=>{
    console.log('the server running on port 2000')
})