import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
 
const EditPost = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {

    if(post) {
      setTitle(post.tile)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")

      setTags(textTags)
    }

  }, [post])

  const { user } = useAuthValue()

  const {updateDocument, response} = useUpdateDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    //Validar imagem URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    //Criar array das tags
    const tagsArray = tags.split(",").map((tags) => tags.trim().toLowerCase())

    //Chegar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos.")
    }

    if(formError) return

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    navigate("/Dashboard")

  }

  return (
    <div  className={styles.edit_post}>
      {post && (
        <>
          <h2 style={{color:"white"}}>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
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
            <p style={{color:"white"}} className={styles.preview_title}>Preview da imagem atual:</p>
            <img className={styles.image_preview} src={post.image} alt={post.tile}></img>
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
            {!response.loading && <button style={{marginTop:"0.4%", width:"100%"}} className="btn">Editar</button>}
            {response.loading && (
              <button style={{marginTop:"0.4%", width:"100%"}} className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form> 
        </>
      )}
    </div>
  )
}

export default EditPost
