const express = require('express')
const router = express.Router()
const ktangle = require('../ktangle')
//const mongoose = require("mongoose")
//const New_Adventure = mongoose.model("new_adventure")

router.get('/', (req, res)=>{
    var volume = ktangle.volume
    res.render('index', {volume: volume})
})
// router.post('/email', (req, res)=>{
//     const data = {
//         email: req.body.email, 
//         subject: req.body.subject, 
//         text: req.body.text
//     }
//     res.redirect('/')
// })

module.exports = router