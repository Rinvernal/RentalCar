import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import carsReducer from './carsSlice.js';



export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://car-rental-api.goit.global/cars');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const store = configureStore({
  reducer: {
    cars: carsReducer
  }
});