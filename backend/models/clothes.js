const mongoose=require('mongoose');
var Schema = mongoose.Schema;

var Clothes =new Schema ({

    IdClothes : Number,
    brand : String,
    clothesImage : String,
    undersized : Boolean,


}
);
module.exports = mongoose.model('clothes', Clothes);