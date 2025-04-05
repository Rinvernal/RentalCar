import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/carsThunks";
import s from './CataloPage.module.css'
import ImageCard from "../../components/ImageCard/ImageCard";
import FilterBar from "../../components/FilterBar/FilterBar";
const CatalogPage = () => {
  const dispatch = useDispatch();
  const { cars = [], isLoading, error } = useSelector(state => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      
      {isLoading && <p>Loading cars...</p>}
      {error && <p>Error: {error}</p>}

      <FilterBar />

      <div className={s.wrapperCard}>
        {cars.map(car => (
          <ImageCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage