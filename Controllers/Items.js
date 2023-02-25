const Items = require('../Models/Items');

exports.getItems = (req,res)=>{
    Items.find()
    .then(response =>{
        res.status(200).json({
            message : "Items Fetched Successfully",
            Items : response
        })
    })
    .catch(err =>{
        res.status(500).json({
            erroe : err
        })
    })
}