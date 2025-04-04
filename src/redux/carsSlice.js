import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, { getState, rejectWithValue }) => {
    const { brand, price, mileage } = getState().cars.filters;

    const params = new URLSearchParams();
    if (brand) params.append('brand', brand);
    if (price) params.append('rentalPrice', price);
    if (mileage.from) params.append('minMileage', mileage.from);
    if (mileage.to) params.append('maxMileage', mileage.to);

    try {
      const response = await axios.get(`https://car-rental-api.goit.global/cars?${params.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBrands = createAsyncThunk("cars/fetchBrands", async () => {
  const response = await axios.get("https://car-rental-api.goit.global/brands");
  return response.data;
});

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
        console.log("Fetched brands:", action.payload); // Логування для перевірки
        state.brands = action.payload; // Оновлюємо список брендів
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        console.error("Error fetching brands:", action.error);
      });
  }
});

export const { addToFavorites, removeFromFavorites, setFilters } = carsSlice.actions;

export default carsSlice.reducer;