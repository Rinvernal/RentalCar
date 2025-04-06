import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/carsThunks";
import s from './CataloPage.module.css'
import ImageCard from "../../components/ImageCard/ImageCard";
import FilterBar from "../../components/FilterBar/FilterBar";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { selectCars, selectError, selectFilters, selectIsLoading, selectPage } from "../../redux/cars/carsSelectors.js";
import { setPage } from "../../redux/cars/carsSlice.js"
const CatalogPage = () => {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const filters = useSelector(selectFilters);
  const totalPages = useSelector(state => state.cars.totalPages);

  useEffect(() => {
    dispatch(setPage(1));
  
    const isFiltersEmpty = Object.values(filters).every(value => {
      if (typeof value === 'object') {
        return Object.values(value).every(v => !v);
      }
      return !value;
    });
  
    if (isFiltersEmpty) {
      dispatch(fetchCars());
    }
  }, [dispatch]);
  

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchCars());
    }
  }, [dispatch, page]);

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

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
      {!isLoading && cars.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default CatalogPage