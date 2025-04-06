import React from 'react'
import s from './LoadMoreBtn.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectPage } from '../../redux/cars/carsSelectors';
import { setPage } from '../../redux/cars/carsSlice';
const LoadMoreBtn = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage)
  const handleClick = () => {
    dispatch(setPage(page + 1));
  };
  return <button onClick={handleClick} className={s.btn}>Load more</button>;
}

export default LoadMoreBtn