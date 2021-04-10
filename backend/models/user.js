const mongoose=require('mongoose');
var Schema = mongoose.Schema;
const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
  });
 
var User = new Schema (
    {
        FullName : String,
        email : String,
        password : String,
        gender: {
            type: String,
            enum: Object.values(Genders),
          },
        preferences : String,
        image : String,
        Phone : Number,
        size : String,
        weight : Number,
        height : Number,
    }
);

module.exports = mongoose.model('user', User);