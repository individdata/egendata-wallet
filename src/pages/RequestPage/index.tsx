import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.css';

function RequestPage() {
  const { id } = useParams();

  return (
    <div className={styles.RequestPage}>
      {`RequestPage (id: ${id})`}
    </div>
  );
}

export default RequestPage;
