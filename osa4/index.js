const express = require('express')
require('./config/mongo')
const blogController = require('./controllers/blogController')

const app = express()

app.use(express.json())

app.get('/api/blogs', blogController.getAllBlogs)
app.post('/api/blogs', blogController.createBlog)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 