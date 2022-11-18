const express = require('express');
const User = require('../models/user');
const Userrouter = express.Router();

Userrouter.get('/', async (req, res) => {
    try{
        const users= await User.getUser();
        res.send(users);
    } catch(err){
        res.status(401).send({message: error.message});
    }

})

.post('/login', async (req, res) =>{
    try{
        let user = await User.login(req.body);
        res.send({...User, password : undefined}) 
    } catch(err){
        res.status(401).send({message: err.message});
    }

});

module.exports = Userrouter;