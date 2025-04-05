import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchCars } from "./carsThunks";


const initialState = {
  cars: [],
  favorites: [],
  brands: [],
  filters: {
    brand: '',
    price: '',
    mileage: { from: '', to: '' }
  },
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
        state.cars = action.payload.cars;
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
      });
  }
});

export const { addToFavorites, removeFromFavorites, setFilters } = carsSlice.actions;
export default carsSlice.reducer;