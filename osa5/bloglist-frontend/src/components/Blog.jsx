import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs => blogs.map(b => b.id === blog.id ? returnedBlog : b))
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs => blogs.filter(b => b.id !== blog.id))
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
        <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog