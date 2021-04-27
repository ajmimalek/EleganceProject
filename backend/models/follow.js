const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let follow = new Schema(
  {
    UserFollowers: {
        type: Schema.Types.ObjectId,
      },
      UserFollowing: {
        type: Schema.Types.ObjectId,
       },
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