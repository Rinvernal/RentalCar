import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarDetails } from '../../redux/cars/carsThunks';
import { useParams } from 'react-router-dom';

const CarDetailsPage = () => {
  const { id: carId } = useParams(); 
  const dispatch = useDispatch();
  const { currentCar, loading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCarDetails(carId));
  }, [carId, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentCar) return null;
  return (
    <div>
      <div>
        <img src={currentCar.img} alt="" />
        <p>{currentCar.description}</p>
      </div>
    </div>
  )
}

export default CarDetailsPage