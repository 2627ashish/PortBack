const Menuitems = require('../Models/Menuitems');

exports.getMenuitemsByResId = (req,res)=>{
    const {resid} = req.params;
    Menuitems.find({restaurantId:resid})
    .then(response =>{
        res.status(200).json({
            message : "Menu Items Fetched Successfully",
            menuitems : response
        })
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })
}
// exports.getMenuitemsByResId= (req, res) => {
//     const { resid } = req.params;
//     Menuitems.findById(resid)
//         .then(response => {
//             res.status(200).json(
//                 {
//                     message: "Restaurants Fetched Succesfully",
//                     menuitems: response
//                 }
//             )
//         })
//         .catch(err => {
//             res.status(500).json({ error: err })
//         })
// };