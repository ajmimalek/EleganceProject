const mongoose=require('mongoose');
var Schema = mongoose.Schema;

var City =new Schema ({

    Id:Number,
    CityName:String,
    CityImage:String,

}
);
module.exports = mongoose.model('city', City);