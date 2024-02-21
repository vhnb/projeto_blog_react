import styles from './PostDetail.module.css'

import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {
  return (
    <div className={styles.post_detail}>
      <div className={styles.post_container_text}>
        <h2 style={{color:"#e3e3e3"}}>{post.title}</h2>
        <p style={{color:"#e3e3e3"}} className={styles.createdBy}>{post.createdBy}</p>
        <div className={styles.tags}>
          {post.tagsArray.map((tag) => (
              <p style={{color:"#e3e3e3"}} key={tag}><span style={{color:"white"}}>#</span>{tag}</p>
          ))}
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
      </div>
      <img src={post.image} alt={post.title} />
    </div>
  )
}

export default PostDetail
