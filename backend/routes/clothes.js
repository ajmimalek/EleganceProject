
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")
var Clothes = mongoose.model("Clothes")
const path = require('path');
const multer = require('multer');


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './clothesPicture');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|jfif)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, jfif  format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});


/* PUT API sell clothes */
router.post('/sellClothes', async (req, res) => {

  try {
    const { Id, sell } = req.body;
    Clothes.findByIdAndUpdate(
      Id,
      { sell: sell },
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

/* PUT API sell clothes */
router.post('/CompleteNewClothes', async (req, res) => {

  try {
    console.log("vvv", req.body);
    const { title, description, type, size, brand, id } = req.body;
    console.log("jjjj", title, description, type, size, brand);
    Clothes.findByIdAndUpdate(
      id,
      { title: title, description: description, type: type, size: size, brand: brand },
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


router.get('/getAllClothes', async (req, res) => {
  try {
    const files = await Clothes.find({ $or: [{ sell: null }] });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

//get all sell clothes user conected 
router.get('/getAllSellClothesUser', async (req, res) => {
  try {
    const files = await Clothes.find({
      $and: [{ sell: { $exists: true } }, {
        user: {
          "_id": "607d9a859a2f7e09344ffb1b"
        }
      }
      ]
    });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});
//getAllSellClothes
router.get('/getAllSellClothes', async (req, res) => {
  try {
    const files = await Clothes.find({ sell: { $exists: true } });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

router.get('/getAllSellClothes/:max/:min', async (req, res) => {
  try {
    const files = await Clothes.find({ sell: { $gte: req.params.min, $lte: req.params.max } });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});
//  
router.get('/getAllSellClothes/:max/:min/:size', async (req, res) => {
  try {
    const files = await Clothes.find({ $and: [{ sell: { $gte: req.params.min, $lte: req.params.max } }, { size: req.params.size }] });

    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});
//get All Sell Clothes ByClothing 
router.post('/getAllSellClothesByClothing/:max/:min/', async (req, res) => {
  try {

    const files = await Clothes.find({ $and: [{ sell: { $gte: req.params.min, $lte: req.params.max } }, { type: { $in: req.body } }] });
    console.log("eee");
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});
//get All Sell Clothes ByClothing and size
router.post('/getAllSellClothesByClothingAndSize/:max/:min/:size', async (req, res) => {
  try {
    console.log("clothing", req.body);
    const files = await Clothes.find({ $and: [{ sell: { $gte: req.params.min, $lte: req.params.max } }, { size: req.params.size }, { type: { $in: req.body } }] });

    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});


router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      var sortedByCreationDate = null;
      const { path, mimetype } = req.file;
      const file = new Clothes({
        user: {
          "_id": "607d9a859a2f7e09344ffb1b",
          "FullName": "Mahmoud Hadidi",
          "email": "mahmoud.hadidi1@esprit.tn",
          "role": "user"
        },
        clothes_path: path,
        clothes_mimetype: mimetype
      });

      await file.save((err, newContact) => {
        if (err)
          console.log("Error message : " + err);
        else {

          sortedByCreationDate = newContact;
          console.log(sortedByCreationDate);
          res.send(sortedByCreationDate);
        }
      });
      console.log("bbb");

    } catch (error) {
      console.log("error");
      res.status(400).send('Error while uploading file. Try fff again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

router.get('/download/:id', async (req, res) => {
  try {
    const file = await Clothes.findById(req.params.id);
    res.set({
      'Content-Type': file.clothes_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.clothes_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

/* DELETE API clothes */
router.post('/delete/:id', function (req, res, next) {
  Clothes.findByIdAndRemove(
    req.params.id,
    function (err, data) {
      if (err) console.log(err);
      else res.send('clothes deleted.');
    }
  )
});
module.exports = router;

