import { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = ({ setBlogs, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs => [...blogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`a new blog ${title} by ${author} added`)
    } catch (exception) {
      setNotification('error creating blog')
    }
  }

  return (
    <Togglable buttonLabel="create new blog">
      <div>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm 