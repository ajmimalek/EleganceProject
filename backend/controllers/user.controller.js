const User = require("../models/auth.model");
const expressJwt = require("express-jwt");

exports.readController = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      console.log("Error getting data : ", err);
      return res.status(400).json({
        error: "User not found",
      });
    }
    //setting password value to undefined
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.updateController = (req, res) => {
  console.log("UPDATE USER - req.user", req.user, "UPDATE DATA", req.body);

  const { FullName, email, Gender, city, Phone, image } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(req.user._id, { $set: req.body }, (err, data) => {
    if (err) {
      console.log("USER UPDATE ERROR", err);
      return res.status(400).json({
        error: "User update failed",
      });
    } else {
      res.json({
          _id,
          FullName,
          email,
          image,
          city,
          Phone,
          Gender,
      });
      console.log("Student updated successfully ! ", data);
    }
  });
};
