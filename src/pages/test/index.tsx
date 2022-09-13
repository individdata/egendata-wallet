import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import MenuBar from '../../components/MenuBar/MenuBar';

function HomePage() {
  const {data: session, status} = useSession();
  
  useEffect(() => {
    if (!session)
      return;

  }, [session]);

  return (
    <Container>
      <MenuBar />
      <main>
        Hello
      </main> 
    </Container>
  );
}

export default HomePage;
