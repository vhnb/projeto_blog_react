import styles from './Search.module.css'

//Hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

import PostDetail from '../../components/PostDetail'

import { Link } from 'react-router-dom'

const Search = () => {      
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments("posts", search)

  return (
    <div className={styles.search_container}>
        <h2 style={{color:"white"}}>Resultado da pesquisa:</h2>
        <div>
            {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p style={{color:"#e3e3e3"}}>Não foram encontrados posts a partir da sua busca...</p>
                    <Link to="/Home" className="btn btn-dark">
                        Voltar
                    </Link>
                </div>
            )}
            {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        </div>
    </div>
  )
}

export default Search
