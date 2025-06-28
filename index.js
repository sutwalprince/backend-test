import express from 'express'
import 'dotenv/config'
const app = express() ;
const port = process.env.PORT || 8080 

app.use(express.json())
let teaData = [] 
let nextId = 1 

app.post("/teas" , (req , res)=>{
    // req.body.price
    const {name , price} = req.body 
    const newTea = {
        id : nextId++ ,
        name ,
        price 
    }
    teaData.push(newTea)
     console.log(teaData)
    res.status(201).send(newTea)
})



app.get("/teas" , (req , res)=>{
    res.status(202).send(teaData)
   
})

app.get("/teas/:id" , (req , res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea) {
        return res.status(404).send("tea not found")
    }
    res.status(201).send(tea)
})

// update tea

app.put("/teas/:id" ,  (req , res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea) {
        return res.status(404).send("tea not found")
    }
    tea.name = req.body.name
    tea.price = req.body.price
    
    res.status(201).send(teaData)
})

// delete tea

app.delete("/teas/:id" , (req , res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1) {
        return res.status(404).send("tea not found")
    }
    
    teaData.splice(index , 1)
    
    res.status(201).send("tea deleted")
})

app.listen(port , ()=>{
    console.log(`server is running at port ${port}....`)
})