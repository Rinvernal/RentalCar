import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCarDetails } from '../../redux/cars/carsThunks';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import s from './CarDetails.module.css'
const CarDetails = () => {
  const { id: carId } = useParams(); 
  const dispatch = useDispatch();
  const { currentCar, loading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCarDetails(carId));
  }, [carId, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentCar) return null;

  const address = currentCar.address.split(",");
  const city = address[address.length - 2] || "";
  const country = address[address.length - 1] || ""

  return (
    <div className={s.wrapper}>
      <div className={s.box}>
        <img src={currentCar.img} alt="car" className={s.img}/>
        <FeedbackForm/>
      </div>
      <div>

        <div>
          <div>
            <div className={s.carName}>
              <h2 className={s.text}>{currentCar.brand} {currentCar.model}, {currentCar.year}</h2>
            </div>
            <div className={s.carDetails}>
              <svg className={s.icon}>
                <use href="/icons/symbol-defs.svg#icon-location"/>
              </svg>
              <p className={s.text}>{city}, {country}</p>
              <p className={s.text}>Mileage: {currentCar.mileage.toLocaleString()} km</p>
            </div>
            <p className={s.price}>$ {currentCar.rentalPrice}</p>
          </div>
          <p className={s.description}>{currentCar.description}</p>
        </div>

        <div className={s.wrapperBox}>
          <h3 className={s.h3}>Rental Conditions:</h3>
          <ul className={s.rentalList}>
            {currentCar.rentalConditions.map((condition, index) => (
              <li key={index} className={s.list}>
                <svg className={s.icon}>
                  <use href="/icons/symbol-defs.svg#icon-check-circle"/>
                </svg>
                <p className={s.condition}>{condition}</p>
              </li>))}
          </ul>
        </div>
          
        <div className={s.wrapperBox}>
            <h3 className={s.h3}>Car Specifications:</h3>
            <div className={s.iconWithText}>
              <svg className={s.icon}><use href="/icons/symbol-defs.svg#icon-calendar"/></svg>
              <p className={s.text}>Year: {currentCar.year}</p>
            </div>
            <div className={s.iconWithText}>
              <svg className={s.icon}><use href="/icons/symbol-defs.svg#icon-car"/></svg>
              <p  className={s.text}>Type: {currentCar.type}</p>
            </div>
            <div className={s.iconWithText}>
              <svg className={s.icon}><use href="/icons/symbol-defs.svg#icon-fuel-pump"/></svg>
              <p  className={s.text}>Fuel Consumption: {currentCar.fuelConsumption}</p>
            </div>
            <div className={s.iconWithText}>
              <svg className={s.icon}><use href="/icons/symbol-defs.svg#icon-gear"/></svg>
              <p  className={s.text}>Engine Size: {currentCar.engineSize}</p>
            </div>
        </div>

        <div>
          <h3 className={s.h3}>Accessories and functionalities:</h3>
          <ul className={s.rentalList}>
            {[...currentCar.accessories, ...currentCar.functionalities].map((condition, index) => (
              <li key={index} className={s.list}>
                <svg className={s.icon}>
                  <use href="/icons/symbol-defs.svg#icon-check-circle"/>
                </svg>
                <p className={s.condition}>{condition}</p>
              </li>))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CarDetails