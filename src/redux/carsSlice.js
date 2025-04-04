import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cars: [], // Список авто
  favorites: [], // Обрані авто
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://car-rental-api.goit.global/cars'); // Запит на API
      return response.data; // Повертаємо отримані авто
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Створюємо carsSlice
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
      });
  }
});

// Експортуємо екшени
export const { addToFavorites, removeFromFavorites, setFilters } = carsSlice.actions;

// Експортуємо редюсер
export default carsSlice.reducer;