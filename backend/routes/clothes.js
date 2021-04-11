var express = require('express');
var router = express.Router();
var mongoose=require("mongoose")
var Clothes =mongoose.model("Clothes") 
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
    const { id, sell } = req.body;
    Clothes.findByIdAndUpdate(
      id,
       { sell:  sell },   
      function(err) {  
       if (err) {  
       res.send(err);  
       return;  
       }  
       res.send({data:"Record has been Updated..!!"});  
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
    const files = await Clothes.find({});
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
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new Clothes({
        title,
        description,
        clothes_path: path,
        clothes_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
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


module.exports = router;
