const mongoose = require('mongoose')

const mongoUrl = 'mongodb://localhost/bloglist'

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  }) 