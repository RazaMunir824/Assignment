const express = require('express')
//const bodyparser = require('body-parser')
const mongoose = require('mongoose')


const path = require('path');
const config = require('config');

const app =express();

//MIddleware
app.use(express.json())



//DB config
//const db = require('./config/keys').mongoURI;
const db =config.get('mongoURI');

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true   })
  .then(() => console.log('MongoDB conectedd...'))
  .catch(err => console.log(err))

//Routes
app.use('/api/items' , require('./routes/api/items'))
app.use('/api/users' , require('./routes/api/users'))
app.use('/api/auth' , require('./routes/api/auth'))


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Port listen
const port = process.env.PORT || 5000

app.listen(port , () => {
	console.log(`port listen on ${port}`)
})