const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const app = express();

//MIddleware
app.use(bodyparser.json())

////Connect to Mongo
const db = require('./config/Keys').mongoURI
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => console.log('MongoDB conectedd...'))
  .catch(err => console.log(err))

const items = require('./routes/api/itemss')
//Routes
app.use('/api/items' , items)

//Port listen
const port = process.env.PORT || 5000
app.listen(port , () => {
	console.log(`App listen on ${port} PORT`)
})