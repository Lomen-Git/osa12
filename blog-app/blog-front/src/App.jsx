import { useEffect, useRef, useState } from 'react'

import './App.css'

import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .then(blogs => 
        setBlogs(blogs)
      )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.sessionId)
      console.log(user.sessionId)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return (
    <>
      <div>
        <Notification message={successMessage} />
        <ErrorNotification message={errorMessage} />
      </div>
      <div>
      <BlogList blogs={blogs} />
      </div>
      <div>
        <BlogForm
          blogFormRef={blogFormRef}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setBlogs={setBlogs}
          blogService={blogService}
        />
      </div>
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    </>
  )
}

export default App
