import styles from './Home.module.css';

//Hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import PostDetail from '../../components/PostDetail';

const Home = () => {
    const [query, setQuery] = useState("")
    const {documents: posts, loading} = useFetchDocuments("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(query){
            return navigate(`/search?q=${query}`)
        }
    }

    return (
        <div className={styles.home}>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                        <input style={{color:"#e3e3e3"}} type='text' placeholder='Ou busque por tags...' onChange={(e) => setQuery(e.target.value)}></input>
                        <button style={{
                            borderTopRightRadius:"2rem",
                            borderBottomRightRadius:"2rem",
                            borderTopLeftRadius:"0",
                            borderBottomLeftRadius:"0",
                            backgroundColor:"transparent",
                            color:"grey"
                        }} className='btn btn-dark'>Pesquisar</button>
            </form>
            <div>
                {loading && <p>Carregando...</p>}
                {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p style={{color:"#e3e3e3"}}>Não foram encontrados posts</p>
                        <Link to="/posts/create" className='btn'>Criar primeiro post</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;