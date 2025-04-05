import { configureStore } from "@reduxjs/toolkit";
import carsReducer from './cars/carsSlice.js';

export const store = configureStore({
  reducer: {
    cars: carsReducer
  }
});