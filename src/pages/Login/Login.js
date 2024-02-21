import styles from './Login.module.css'

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

//Import toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entre em sua conta</h1>
      <p>Faça o login para utilizar o sistema.</p>
      <form onSubmit={handleSubmit}>
          <input
            style={{color:"#e3e3e3"}}
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            style={{color:"#e3e3e3"}}
            type="password"
            name="password"
            required
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        {!loading && <button style={{marginTop:"0.4%", width:"100%"}} className="btn">Entrar</button>}
        {loading && (
          <button style={{marginTop:"0.4%", width:"100%"}} className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
    
  )
}

export default Login
