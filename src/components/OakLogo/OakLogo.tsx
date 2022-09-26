import Image from 'next/image';
import { Box } from '@mui/material';

function OakLogo() {
  return (
    <Box sx={{
      display: 'flex',
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: '28px',
      color: '#FFFFFF',
      marginLeft: '15px',
      marginTop: '0px',
      '>img': {
        marginRight: '10px',
        width: '26px',
        height: '40px',
      }
    }}>
      <Image src="/images/oak-green.png" alt="logo" width="27" height="40" />
      Project
      <Box color="white">OAK</Box>
    </Box>
  );
}

export default OakLogo;
