const mealtypes = require('../Models/mealtypes');

exports.getmealtypes = (req,res)=>{
    mealtypes.find()
    .then(response =>{
        res.status(200).json({
            message : "Meal Types Fetched Successfully",
            Meals : response
        })
    })
    .catch(err =>{
        res.status(500).json({
            erroe : err
        })
    })
}