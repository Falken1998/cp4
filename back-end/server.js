const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/garage', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


// Create a model and scheme for items in the museum: a title and a path to an image.
const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    user_name: String,
    user_email: String,
    path: String,
  })
)

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    }]
  })
)

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    path: req.body.path,
    user_name: req.body.user_name,
    user_email: req.body.user_email,
  });
  const user = new User({
    name: req.body.user_name,
    email: req.body.user_email,
  })
  try {
    await item.save();
    user.items.push(item)
    await user.save();
    console.log(user);
    console.log(item);
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Delete Item by id
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit Item by ID
app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id,
    });
    item.title = req.body.title;
    item.description = req.body.description;
    item.price = req.body.price;
    item.user_name = req.body.user_name;
    item.user_email = req.body.user_email;
    item.path = req.body.path;
    item.save();
  } catch (error) {
    console.log(error);
    res.statusMessage = error;
    res.sendStatus(500);
  }
})

app.get('/api/users', async(req,res)=> {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.statusMessage = error;
    res.sendStatus(500);
  }
})

// app.get('/api/user/:id', async(req,res)=> {
//   try {
//     let items = await (await User.findOne()).populated("comments");
//     console.log(items);
//     res.send(items);
//   } catch (error) {
//     console.log(error);
//     res.statusMessage = error;
//     res.sendStatus(500);
//   }
// })