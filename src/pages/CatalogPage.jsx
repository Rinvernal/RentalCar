import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../redux/carsSlice';
import ImageCard from '../components/ImageCard/ImageCard';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { cars = [], isLoading, error } = useSelector(state => state.cars);

  useEffect(() => {
    dispatch(fetchCars()); // Запускаємо запит при завантаженні сторінки
  }, [dispatch]);

  return (
    <div>
      <h1>Car Catalog</h1>
      
      {isLoading && <p>Loading cars...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        {cars.map(car => (
          <ImageCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage