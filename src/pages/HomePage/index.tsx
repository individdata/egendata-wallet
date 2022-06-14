/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { RequestBox } from '../../components/requestBox';
// import { getRequestsContent } from '../../slices/requestsSlice';
import Header from '../../components/header';
import styles from './index.module.css';
import { subjectRequestThunks } from '../../slices/requests/subjectRequestsSlice';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const storage = useSelector((state: RootState) => state.auth.user?.storage);
  const subjectRequests = useSelector((state: RootState) => state.subjectRequests);
  useEffect(() => {
    if (user) {
      // dispatch(getRequestsContent());
      dispatch(subjectRequestThunks.getContent({ storage, currentResources: Object.keys(subjectRequests) }));
    }
  }, [user]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.main} id="landingPage">
          <Header />
          <div className={styles.body}>
            <RequestBox />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default HomePage;
