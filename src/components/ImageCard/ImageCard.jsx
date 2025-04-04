  import { useDispatch, useSelector } from "react-redux";
  import { addToFavorites, removeFromFavorites } from "../../redux/carsSlice";
  import React from 'react'
  import s from './ImageCard.module.css'
import { useNavigate } from "react-router-dom";


  const ImageCard = ({car}) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.cars.favorites);
    const isFavorite = favorites.some(favCar => favCar.id === car.id);

    const handleFavoriteClick = () => {
      if (isFavorite) {
        dispatch(removeFromFavorites(car.id));
      } else {
        dispatch(addToFavorites(car));
      }
    };

    const navigate = useNavigate()
    const handleClick = () => {
      navigate('/catalog/:id')
    }

    const addressParts = car.address.split(", ");
    const city = addressParts[addressParts.length - 2] || "";
    const country = addressParts[addressParts.length - 1] || "";

    return (
      <div className={s.wrapper}>
        <img src={car.img} alt={car.make} className={s.img}/>
        <div className={s.mainInfo}>
          <div className={s.info}>
            <p className={s.textInfo}>{car.brand}</p>
            <p className={s.textInfo} style={{color:'#3470FF'}}>{car.model}<span style={{color:"black"}}>,</span></p>
            <p className={s.textInfo}>{car.year}</p>
          </div>
          <p className={s.textInfo}>${car.rentalPrice}</p>
        </div>
        <div className={s.description}>
          <p className={s.text}>
            {city} <span className={s.separator}> | </span> {country} <span className={s.separator}> | </span> {car.rentalCompany}
          </p>
          <p className={s.text}>
            {car.type} <span className={s.separator}>|</span> {car.mileage.toLocaleString()} km
          </p>
        </div>
        <button className={s.button} onClick={handleClick}>Read More</button>
        <button
        className={`${s.favoriteButton} ${isFavorite ? s.active : ""}`}
        onClick={handleFavoriteClick}
      >
        <svg className={s.heartIcon}>
          <use href="/icons/symbol-defs.svg#icon-heart" />
        </svg>
      </button>
      </div>
    );
  }

  export default ImageCard