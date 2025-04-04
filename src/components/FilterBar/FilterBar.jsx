import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchCars } from "../../redux/cars/carsThunks";
import { setFilters } from "../../redux/cars/carsSlice";
import s from "./FilterBar.module.css"

const FilterBar = () => {
  const dispatch = useDispatch();
  const { brands, filters } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
    dispatch(fetchCars());
  };

  return (
    <div className={s.wrapper}>
      <select
        value={filters.brand}
        onChange={(e) => handleFilterChange("brand", e.target.value)}
        className={s.box}
      >
        <option value="">Choose a brand</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        value={filters.price}
        onChange={(e) => handleFilterChange("price", e.target.value)}
        className={s.box}
      >
        <option value="">Choose a price</option>
        {[30, 40, 50, 60, 70, 80].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="From"
        value={filters.mileage?.from || ""}
        onChange={(e) =>
          handleFilterChange("mileage", { ...filters.mileage, from: e.target.value })
        }
        className={s.box}
      />
      <input
        type="number"
        placeholder="To"
        value={filters.mileage?.to || ""}
        onChange={(e) =>
          handleFilterChange("mileage", { ...filters.mileage, to: e.target.value })
        }
        className={s.box}
      />
    </div>
  );
};

export default FilterBar;