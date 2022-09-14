import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import MenuBar from '../../components/MenuBar/MenuBar';
import useSWR from 'swr';
import RequestList from '../../components/RequestList/RequestList';


const fetcher = (...args) => fetch(...args).then(res => res.json());

function useRequests() {
  const {data, error} = useSWR(`/api/requests`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

function HomePage() {
  const {data, isLoading, isError} = useRequests();

  return (
    <Container>
      <MenuBar />
      <main>
        { isLoading ? "loading" : data.urls }
      </main> 
    </Container>
  );
}

export default HomePage;
