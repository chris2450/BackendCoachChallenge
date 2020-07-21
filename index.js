const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('./user.model');
require('./config/passportConfig');
const app = express()

const uri = "mongodb+srv://Hona27:2450chris@cluster0.iy7pc.mongodb.net/Cluster0?retryWrites=true&w=majority" 

const rtsIndex = require('./routes/index.router');

const PORT = 3000

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);



mongoose.connect(uri, { useNewUrlParser: true },(err,client) =>{
  if (err) throw err;
  console.log('Successfully connected to DB server');
})

// error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
      var valErrors = [];
      Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
      res.status(422).send(valErrors)
  }
});

//start server
app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`)
})


