const Order = require('../Models/Order');

exports.saveOrderDetails = (req,res)=>{
    const {placedBy,placedByUserId,placedOn,items,Amount,restaurantId} = req.body;
    const ordersobj = new Order({
        placedBy,
        placedByUserId,
        placedOn,
        items,
        Amount,
        restaurantId
    });
    ordersobj.save()
     .then(response =>{
        res.status(200).json({
            message : "Orders Placed Successfully",
            Orders : response
        })
    })
    .catch(err =>{
        res.status(500).json({
            erroe : err
        })
    })
};

exports.getOrderByUserId = (req,res) => {
    const {userId} = req.params;
    Order.find({placedByUserId: userId})
    .then(response => {
        res.status(200).json({
            message : "Order Details Fetched Successfully",
            Orders : response
        })
    })
    .catch(err => {
        res.status(500).json({error : err})
    })
}
