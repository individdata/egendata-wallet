import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';
import { RootState } from '../../store';
import styles from './index.module.css';
import { getRequestsContent } from '../requests/requestSlice';

function RequestPage() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/home" replace />;
  }

  const requestState = useSelector((state: RootState) => state.requests[id]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequestsContent());
  }, []);

  if (requestState) {
    return (
      <div className={styles.RequestPage}>
        {`RequestPage (id: ${id})`}
        <div>
          {requestState.content.documentType}
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
}

export default RequestPage;
