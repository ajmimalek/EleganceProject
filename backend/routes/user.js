
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")
var User = mongoose.model("user")
var Follow= mongoose.model("Follow")
const path = require('path');

/* post API follow user */
router.post('/follow', async (req, res) => {
  try {
    console.log("vvv", req.body);
    const { idUserConected,IdUserFollowing } = req.body;
    console.log("jjjj",idUserConected,IdUserFollowing);
    const follow = new Follow({
      UserFollowers: idUserConected,
      UserFollowing: IdUserFollowing,
      state:"Requested"
    
    });

    await follow.save((err, newContact) => {
      if (err)
        console.log("Error message : " + err);
      else {

        sortedByCreationDate = newContact;
        console.log(sortedByCreationDate);
        res.send(sortedByCreationDate);
      }
    });
  } catch (error) {
    res.status(400).send('Error while uploading file. Try fff again later.');
  }
},
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
//get api all follow
router.get('/getAllFollow/', async (req, res) => {
  try {
    const follow = await Follow.find({ 
      });
    const sortedByCreationDate = follow.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});


router.get('/getAllUser/:idUserConected', async (req, res) => {
    try {
      const user = await User.find({ "_id":{$ne:req.params.idUserConected}
        });
      const sortedByCreationDate = user.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      res.send(sortedByCreationDate);
    } catch (error) {
      res.status(400).send('Error while getting list of files. Try again later.');
    }
  });
  





module.exports = router;