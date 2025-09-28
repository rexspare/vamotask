import { useEffect, useState } from 'react'
import './navbar.css'
import logo from '../../assets/images/order-tracking.png'
import { MenuIcon } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const [sticky, setsticky] = useState(false)
    const [mobileMenu, setmobileMenu] = useState(false)

    useEffect(() => {
        const subscribe = window.addEventListener("scroll", () => {
            setsticky(window.scrollY > 700)
        })

        return subscribe
    }, [])

    const toggleMenu = () => {
        setmobileMenu((prev) => !prev)
    }

    const closeMobileMenu = () => {
        setmobileMenu(false)
    }


    return (
        <nav className={`container-index ${sticky && "dark-nav"}`}>

            <RouterLink to="/">
                <img src={logo} alt='' className='logo' />
            </RouterLink>
            
            <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
                <li><RouterLink to="/" onClick={closeMobileMenu}>Home</RouterLink></li>
            </ul>

            <MenuIcon color='white' className='menu-icon' onClick={toggleMenu} />

        </nav>
    )
}

export default Navbar