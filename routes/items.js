const Router = require('express').Router();
const mongoose = require('../db')()

Router.get('/',async  (req, res) => {
    try {
        const connection = (await mongoose).connection
        const collection = await connection.collection('foodData').find({}).toArray((err, docs) => err ? err : docs)
        res.json({items: collection})
    } catch (e) {
        console.log('error', e)
        res.status(500).json({error: 'Internal Server Error'})
    }
    
})

module.exports = Router