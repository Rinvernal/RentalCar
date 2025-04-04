import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/carsSlice";
import React from 'react'

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

  return (
    <div>
      <img src={car.img} alt={car.make} />
      <h3>{car.make} {car.model}, {car.year}</h3>
      <p>Price: ${car.price}</p>
      <p>Mileage: {car.mileage.toLocaleString()} km</p>
      <button>Read More</button>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? '❤️ Remove' : '🤍 Add to Favorites'}
      </button>
    </div>
  );
}

export default ImageCard