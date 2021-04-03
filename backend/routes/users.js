var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Contact.find(
    (err, users )=>{
      if(err)
        console.log(err);
      else
        res.json(users);
        
    }
  )
});

/* POST API user */
router.post('/', function(req, res, next) {
  new user({
    
    // user

  }).save(
    (err, newUser) => {
      if (err)
        console.log("Error message : "+err);
      else{
        console.log(newUser);
        res.send(" New user added "+ newUser._id)
      }
    }
  )
});



module.exports = router;