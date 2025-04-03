import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../img/Logo.svg'
import s from './Header.module.css'
const Header = () => {
  return (
    <div className={s.wrapper}>
      <img src={Logo} alt="Logo" className={s.logo}/>
      <div className={s.links}>
        <NavLink to="/" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : s.link}>Home</NavLink>
        <NavLink to="/catalog" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : s.link}>Catalog</NavLink>
      </div>
    </div>
  )
}

export default Header