const mongoose=require('mongoose');
var Schema = mongoose.Schema;
const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
<<<<<<< HEAD
  }); 
=======
  });
 
>>>>>>> cf2459e7aee40f80635084fd2fe938a0f6b399cf
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