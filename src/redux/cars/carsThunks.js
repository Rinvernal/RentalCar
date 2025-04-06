import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, { getState, rejectWithValue }) => {
    const { brand, price, mileage } = getState().cars.filters;
    const page = getState().cars.page;

    const params = new URLSearchParams();
    if (brand) params.append('brand', brand);
    if (price) params.append('rentalPrice', price);
    if (mileage.from) params.append('minMileage', mileage.from);
    if (mileage.to) params.append('maxMileage', mileage.to);
    params.append('page', page);
    params.append('limit', 12);

    try {
      const response = await axios.get(`https://car-rental-api.goit.global/cars?${params.toString()}`);
      return { cars: response.data };
      // return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "cars/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://car-rental-api.goit.global/brands");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCarDetails = createAsyncThunk(
  "cars/fetchCarDetails",
  async (carId, {rejectWithValue}) => {
    try {
      const response = await axios.get(`https://car-rental-api.goit.global/cars/${carId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)