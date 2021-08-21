const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

// app server 
const app = express();

// db
mongoose.connect(process.env.DATABASE_CLOUD, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(() =>  console.log('DB Connected'))
.catch(err => {
  console.log(err);
})


// middelware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// cors
if(process.env.NODE_ENV === 'developement') {
  app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

// routes middelware 
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// routes 
app.get('/api', (req, res) => {
  res.json({time: Date().toString()}) 
})

// port 
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
})
