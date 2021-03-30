const mongoose=require('mongoose');
var Schema = mongoose.Schema;
const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
  });
const 
var User = new Schema (
    {
        FullName : String,
        email : String,
        password : String,
        gender: {
            type: String,
            enum: Object.values(Genders),
          },
        preferences:String,
        image:String,
        Phone : Number
    }
);

Object.assign(PersonSchema.statics, {
    Genders,
  });

module.exports = mongoose.model('user', User);