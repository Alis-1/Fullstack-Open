import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUser = loginService.getStoredUser()
    if (loggedUser) {
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      )
    }
  }, [user])

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
  }

  return (
    <div>
      <Notification message={notification} />
      {user === null ? (
        <LoginForm setUser={setUser} setNotification={setNotification} />
      ) : (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogForm setBlogs={setBlogs} setNotification={setNotification} />
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
          )}
        </div>
      )}
    </div>
  )
}

export default App