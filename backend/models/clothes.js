const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Clothes = new Schema(
  {
    title: {
      type: String,
      required: false,
      trim: false
    },
    description: {
      type: String,
      required: false,
      trim: false
    },
    type: {
      type: String,
      required: false,
      trim: false
    },
     testLend: {
      type: String,
      required: false,
      trim: false
    },
    color: {
      type: String,
      required: false,
      trim: false
    },
    size: {
      type: String,
      required: false,
      trim: false
    },
    brand: {
      type: String,
      required: false,
      trim: false
    },
    userlend: {
      type: String,
      required: false,
      trim: false
    },
    lend: {
      type: Schema.Types.ObjectId,
    },
    sell: {
      type: Number,
      required: false,
      trim: false
    },
    user: [{
      type: Schema.Types.ObjectId,
      ref: "User",

    }],
    clothes_path: {
      type: String,
      required: true
    },
    clothes_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Clothes', Clothes);