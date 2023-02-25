const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemsSchema = new Schema ({
    name:{
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    description :{
        type :String,
        required : true
    }
})

module.exports = mongoose.model('items',itemsSchema,'items');