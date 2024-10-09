const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    IId : {type:Number,required : true},
    IName: {type:String,required : true},
    IDescription: {type : String},
    IImage: {type : String},
    IDate : { type: Date, default: Date.now }
});

const collectionSchema = new mongoose.Schema({
    CId : {type:Number,required : true, unique: true},
    CName: {type:String,required : true},
    Items: [itemSchema] 
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;