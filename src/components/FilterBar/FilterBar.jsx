import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchCars } from "../../redux/cars/carsThunks";
import { setFilters } from "../../redux/cars/carsSlice";
import s from "./FilterBar.module.css";

const FilterBar = () => {
  const dispatch = useDispatch();
  const { brands, filters } = useSelector((state) => state.cars);
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(null); // 'brand' | 'price' | null
const brandDropdownRef = useRef();
const priceDropdownRef = useRef();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
    dispatch(fetchCars());
  };

  return (
    <div className={s.wrapper}>
      {/* Car Brand */}
      <div className={s.filterGroup}>
  <label className={s.label}>Car brand</label>
  <div className={s.dropdownWrapper} ref={brandDropdownRef}>
    <div
      className={s.dropdownToggle}
      onClick={() => setShowDropdown((prev) => prev === "brand" ? null : "brand")}
    >
      {filters.brand || "Choose a brand"}
      <span className={`${s.arrow} ${showDropdown === "brand" ? s.arrowOpen : ""}`}>
        <svg width='16px' height='16px'>
          <use href="/icons/symbol-defs.svg#icon-arrow-app"/>
        </svg>
      </span>
    </div>
    {showDropdown === "brand" && (
      <div className={s.dropdownMenu}>
        {brands.map((brand) => (
          <div
            key={brand}
            className={s.dropdownItem}
            onClick={() => {
              handleFilterChange("brand", brand);
              setShowDropdown(null);
            }}
          >
            {brand}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

      {/* Price */}
      <div className={s.filterGroup}>
  <label className={s.label}>Price / 1 hour</label>
  <div className={s.dropdownWrapper} ref={priceDropdownRef}>
    <div
      className={s.dropdownToggle}
      onClick={() => setShowDropdown((prev) => prev === "price" ? null : "price")}
    >
      {filters.price || "Choose a price"}
      <span className={`${s.arrow} ${showDropdown === "price" ? s.arrowOpen : ""}`}>
        <svg width='16px' height='16px'>
          <use href="/icons/symbol-defs.svg#icon-arrow-app"/>
        </svg>
      </span>
    </div>
    {showDropdown === "price" && (
      <div className={s.dropdownMenu}>
        {[30, 40, 50, 60, 70, 80].map((price) => (
          <div
            key={price}
            className={s.dropdownItem}
            onClick={() => {
              handleFilterChange("price", price);
              setShowDropdown(null);
            }}
          >
            {price}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

      {/* Mileage */}
      <div className={s.filterGroup}>
        <label className={s.label}>Car mileage / km</label>
        <div className={s.mileageInputs}>
          <input
            type="number"
            placeholder="From"
            value={filters.mileage?.from || ""}
            onChange={(e) =>
              handleFilterChange("mileage", {
                ...filters.mileage,
                from: e.target.value,
              })
            }
            className={s.box}
          />
          <input
            type="number"
            placeholder="To"
            value={filters.mileage?.to || ""}
            onChange={(e) =>
              handleFilterChange("mileage", {
                ...filters.mileage,
                to: e.target.value,
              })
            }
            className={`${s.box} ${s.to}`}
          />
        </div>
      </div>

      {/* Search button */}
      <button className={s.searchButton}>Search</button>
    </div>
  );
};

export default FilterBar;
