import React from 'react'
import s from './LoadMoreBtn.module.css'
const LoadMoreBtn = ({ onClick }) => {
  return <button onClick={onClick} className={s.btn}>Load more</button>;
}

export default LoadMoreBtn