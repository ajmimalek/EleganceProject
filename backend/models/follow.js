const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let follow = new Schema(
  {
    user: [{
        type: Schema.Types.ObjectId,
        ref: "UserFollowers",
  
      }],
      user: [{
        type: Schema.Types.ObjectId,
        ref: "UserFollowing",
  
      }],
      state: {
        type: String,
        required: false,
        trim: false
      }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('Follow', follow);