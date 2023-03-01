const express = require('express')

//require the router
const router = express.Router()

//require the Person model
const Person= require('../models/Person')

//create a new user
router.post("/newuser", async (req, res) => {
    const {name, age, favoriteFoods} = req.body 
    //desctructuring
    try {
        const person = new Person ({name, age, favoriteFoods})
        await person.save()
        return res.status(200).send(person)
    } catch (error) {
        return res.status(500).send({msg: 'Server error'})
    }
})

//Create Many Records with model.create()
router.post("/add-many", async (req, res) => {
    try {
        const person = await Person.create(req.body)
        return res.status(200).send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Use model.find() to Search Your Database
router.get("/user/:name", async (req, res) => {
    try {
        const person = await Person.find({name: req.params.name}) 
        return res.status(200).send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Use model.findOne() to Return a Single Matching Document from Your Database
router.get ("/user/:food", (req, res) => {
    //promise
    Person.findOne({favoriteFoods: req.params.food}) 
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error))
})

//Use model.findById() to Search Your Database By _id
router.get("/user/:id", async (req, res) => {
    try {
        const person = await findById (req.params.id)
        return res.status (200).send(person)
    }
catch (error) {
    res.status(500).send(error)
}
})

//Perform Classic Updates by Running Find, Edit, then Save
router.put ("/update/:id", (req,res)=> {
    Person.findById({_id: req.params.id}, (err, person) => {
        if (err) return console.log(err)
        //Adding "hamburger" to the list of the person's favoriteFoods using Array.push()
        person.favoriteFoods.push(req.body.favoriteFoods)
        //saving the updated person using save()
        person.save()
        .then((result) => res.status(200).send(result))
        .catch((error) => res.status(500).send(error) )
    })

})

//Perform New Updates on a Document Using model.findOneAndUpdate()
router.put("/edit/:name", async (req, res) => {
    try {
        const person = await Person.findOneAndUpdate({name: req.params.name}, {age: req.body.age}, {new: true})
        res.status(200).send(person)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Delete One Document Using model.findByIdAndRemove
router.delete('/user/delete/:userId', async (req,res)=>{
    try {
        const person= await Person.findByIdAndRemove(req.params.userId)
        res.status(200).send(person)
    }
    catch (error) {
        res.status(500).send("error occured while deleting")
    }
})

//MongoDB and Mongoose - Delete Many Documents with model.remove()
app.get('/deleteAllMary', async (req,res)=>{
    try{
        const person= await  Person.remove({"name":"Mary"})
        res.status(200).send(person)
    }
    catch (error) {
        res.status(500).send("error occured while deleting")}
    })

    //Chain Search Query Helpers to Narrow Search Results
    app.get('/LikeBurrito', (req,res)=>{
        Person.find({"favoriteFoods":{$in:"burritos"}})
        .sort('name')
        .limit(2)
        .select('-age')
        .exec((err, data)=> {
            if(err){
            console.log(err)
            res.json({msg:'error'})
            }else{
                res.json(data)
            }})
        })

module.exports= router
