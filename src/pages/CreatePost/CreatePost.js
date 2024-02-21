import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from '../../hooks/useInsertDocument' 
 
const CreatePost = () => {

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue()

  const {insertDocument, response} = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    const tagsArray = tags.split(",").map((tags) => tags.trim().toLowerCase())

    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos.")
    }

    if(formError) return

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    navigate("/Home")

  }

  return (
    <div  className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser compartilhar.</p>
      <form onSubmit={handleSubmit}>
          <input
          style={{color:"#e3e3e3"}}
          type='text'
          name='title'
          required
          placeholder='Escreva o título...'
          onChange={(e) => setTitle(e.target.value)} 
          value={title} 
          />
          <input
          style={{color:"#e3e3e3"}}
          type='text'
          name='image'
          required
          placeholder='Insira a URL da sua imagem...'
          onChange={(e) => setImage(e.target.value)} 
          value={image} 
          />
          <input
          style={{color:"#e3e3e3"}}
          name='body'
          required
          placeholder='Insira o conteúdo do post...'
          onChange={(e) => setBody(e.target.value)}
          value={body}>
          </input>
          <input
          style={{color:"#e3e3e3"}}
          type='text'
          name='tags'
          required
          placeholder='Insira as tags separadas por vírgula.'
          onChange={(e) => setTags(e.target.value)} 
          value={tags} 
          />
        {!response.loading && <button style={{marginTop:"0.4%", width:"100%"}} className="btn">Criar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p style={{marginTop:"0.4%", width:"100%"}} className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
