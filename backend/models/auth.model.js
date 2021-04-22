const mongoose = require("mongoose");
const crypto = require("crypto");

// user Schema
var Schema = mongoose.Schema;
//Object.freeze() permet de geler un objet, c'est-à-dire qu'on empêche d'ajouter de nouvelles propriétés, de supprimer ou d'éditer des propriétés existantes.
const Genders = Object.freeze({
  Male: "Male",
  Female: "Female",
});
var userSchema = new Schema(
  {
    FullName: {
      type: String,
      trim: true,
      //trim : eliminate extra spaces in the beginning and end of word
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    // save password as hash after encrypt it will build function to encrypt.
    hashed_password: {
      type: String,
      required: true,
    },
    // A salt is added to the hashing process to force their uniqueness, increase their complexity without increasing user requirements, and to mitigate password attacks like hash tables.
    salt: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      //We have 2 roles User and Admin
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    Gender: {
      type: String,
      enum: Object.values(Genders),
    },
    preferences: String,
    image: String,
    Phone: Number,
    city: String,
  },
  {
    // The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema.
    timestamps: true,
  }
);

// Object.assign(PersonSchema.statics, {
//   Genders,
// });

// Virtual Password
userSchema
  .virtual("password")
  .set(function (password) {
    // set password -> normal function not arrow function
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  // Compare password between plain get from user and hashed_password
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  //Encrypt Password
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  // Generate Salt
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("user", userSchema);
