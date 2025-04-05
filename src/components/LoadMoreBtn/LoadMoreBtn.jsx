import React from 'react'
import s from './LoadMoreBtn.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCars } from '../../redux/cars/carsThunks';
import { selectPage } from '../../redux/cars/carsSelectors';
const LoadMoreBtn = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage)
  const handleClick = () => {
    dispatch(selectPage(page+1));
    dispatch(fetchCars())
  }
  return <button onClick={handleClick} className={s.btn}>Load more</button>;
}

export default LoadMoreBtn