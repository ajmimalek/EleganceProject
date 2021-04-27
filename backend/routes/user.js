
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")
var User = mongoose.model("user")
var Follow= mongoose.model("Follow")
const path = require('path');

//notif follow

router.get('/getAllNotifFollow/:iduser', async (req, res) => {
  try {
    const follow = await Follow.find({$and: [{ UserFollowers: req.params.iduser },{state:"Requested"}]});
    const sortedByCreationDate = follow.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

/* PUT API sell clothes */
router.post('/follow/:id', async (req, res) => {

  try {
    
   
    Follow.findByIdAndUpdate(
      req.params.id,
      { state: "accepted" },
      function (err) {
        if (err) {
          res.send(err);
          return;
        }
        res.send({ data: "Record has been Updated..!!" });
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


/* post API follow user */
router.post('/follow', async (req, res) => {
  try {
    console.log("vvv", req.body);
    const { idUserConected,IdUserFollowers,NameUserConected } = req.body;
    console.log("jjjj",idUserConected,IdUserFollowers);
    const follow = new Follow({
      UserFollowers: IdUserFollowers,
      UserFollowing: idUserConected,
      state:"Requested",
      NameUserFollowing:NameUserConected
    
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
//get api all UnFollow
router.post('/UnFollow', function (req, res, next) {
  Follow.deleteMany({ $and: [{  UserFollowing: req.body.idUserConected },{ UserFollowers: req.body.IdUserFollowers }] }).then(function(){
    console.log("Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});
  });
//get api all follow 
router.get('/getAllFollow/:iduser', async (req, res) => {
  try {
    const follow = await Follow.find({ UserFollowing: req.params.iduser });
    const sortedByCreationDate = follow.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});
//get api all follow 
router.get('/getUserFollow/:iduser', async (req, res) => {
  try {
    const follow = await Follow.find({$and: [{ UserFollowers: req.params.iduser },{state:"accepted"}]});
    const sortedByCreationDate = follow.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

/* DELETE API follow */
router.post('/UnFollow/:id', function (req, res, next) {
  console.log(req.params.id);
  Follow.findByIdAndRemove(
    req.params.id,
    function (err, data) {
      if (err) console.log(err);
      else res.send('clothes deleted.');
    }
  )
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