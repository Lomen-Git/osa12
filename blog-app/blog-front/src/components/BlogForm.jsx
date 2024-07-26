// Blogin luominen
import { useState } from 'react'

const BlogForm = ({ blogFormRef, setSuccessMessage, setErrorMessage, setBlogs, blogService }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      await blogService.create(newObject)
      blogFormRef.current.toggleVisibility()
      setSuccessMessage(`Blogi <${newObject.title}> Kirjoittaja <${newObject.author}> lisätty!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Epäonnistui')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setTitle('')
    setAuthor('')
    setUrl('')

    // Päivitä lista
    const lisätty = await blogService.getAll()
    setBlogs(lisätty)
  }

  return (
    <div>
      <h2>Lisää uusi blogi</h2>

      <form onSubmit={handleCreate}>

        <label>
          Title:
          <input
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br />
        <label>
          Url:
          <input
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />

        <button id='lisääNappi' onClick={handleCreate}>Lisää</button>
      </form>
    </div>
  )
}

export default BlogForm