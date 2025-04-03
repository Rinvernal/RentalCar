import React from 'react'
import s from './HomePage.module.css'
import carImg from '../../img/RenderCar.jpg'
const HomePage = () => {
  return (
    <div style={{backgroundImage: `url(${carImg})`}} className={s.wrapper} >
      <div className={s.welcomeText}>
        <p className={s.text1}>Find your perfect rental car</p>
        <p className={s.text2}>Reliable and budget-friendly rentals for any journey</p>
        <button className={s.button}>View Catalog</button>
      </div>
      
    </div>
  )
}

export default HomePage