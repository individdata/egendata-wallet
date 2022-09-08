/* eslint-disable react/jsx-props-no-spreading */
import { Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import RequestList from '../../components/RequestList/RequestList';
import { SubjectRequest } from '../../slices/requests/subjectRequestsSlice';
import MenuBar from '../../components/MenuBar/MenuBar';

function HomePage() {
  const navigate = useNavigate();

  const onRequestSelect = (request: SubjectRequest) => {
    navigate(`/request/${request.id}`);
  };

  return (
    <Container maxWidth="lg">
      <MenuBar />
      <main>
        <RequestList onRequestSelect={onRequestSelect} />
      </main>
    </Container>
  );
}

export default HomePage;
