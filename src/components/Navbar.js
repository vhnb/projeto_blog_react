import { NavLink } from "react-router-dom"

import { useAuthentication } from "../hooks/useAuthentication"

import { useAuthValue } from "../context/AuthContext"

import styles from './Navbar.module.css'

//icons
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
    const {user} = useAuthValue()
    const {logout} = useAuthentication()

    return <nav className={styles.navbar}>
        <NavLink to="/Home" className={styles.brand}>
            <span>K</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to="/Home" className={({isActive}) => (isActive ? styles.active : "") }>Home</NavLink>
            </li>
            {!user && (
                <>
                    <li>
                        <NavLink to="/Login" className={({isActive}) => (isActive ? styles.active : "") }>Entrar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Register" className={({isActive}) => (isActive ? styles.active : "") }>Cadastrar</NavLink>
                    </li>
                </>
            )}
            {user && (
                <>
                <li>
                    <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : "") }>Novo post</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : "") }>Dashboard</NavLink>
                </li>
            </>
            )}
            {user && (
                <li>
                    <button style={{
                        color:"white"
                    }} className="btn-logout" onClick={logout}><IoIosLogOut className="icon-logout" /></button>
                </li>
            )}
        </ul>
    </nav>
    }

export default Navbar
