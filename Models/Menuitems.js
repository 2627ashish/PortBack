const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuItemsSchema = new Schema ({
    restaurantId:{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Menuitems',MenuItemsSchema,'items');