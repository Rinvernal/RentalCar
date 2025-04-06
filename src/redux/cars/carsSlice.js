import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchCarDetails, fetchCars } from "./carsThunks";


const initialState = {
  cars: [],
  favorites: [],
  currentCar: null,
  brands: [],
  filters: {
    brand: '',
    price: '',
    mileage: { from: '', to: '' }
  },
  page: 1,
  totalPages: 10,
  isLoading: false,
  error: null
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(car => car.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        const newCars = action.payload.cars.cars;

        if (state.page === 1) {
          state.cars = newCars;
        } else {
          state.cars = [...state.cars, ...newCars];
        }

        if (newCars.length < 12) {
          state.totalPages = state.page;
        }
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        console.error("Error fetching brands:", action.error);
      })
      .addCase(fetchCarDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCar = action.payload;
      })
      .addCase(fetchCarDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { addToFavorites, removeFromFavorites, setFilters, setPage } = carsSlice.actions;
export default carsSlice.reducer;