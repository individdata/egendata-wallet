import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RequestBox } from '../../components/requestBox';
import { getRequestsContent } from '../requests/requestSlice';
import styles from './index.module.css';

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequestsContent());
  });

  return (
    <div className={styles.HomePage}>
      HomePage
      <RequestBox />
    </div>
  );
}

export default HomePage;
