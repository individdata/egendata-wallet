import { Container, Grid, Typography } from "@mui/material";
import MenuBar from "../../components/MenuBar/MenuBar";

const MyData = () => {
  return (
    <Container>
      <MenuBar />
      <main>
        <Grid container sx={{ justifyContent: 'center', backgroundColor: '#222429' }}>
          <Typography component="h1" variant="h4">My data</Typography>
        </Grid>
      </main>
  </Container>
  );
}

export default MyData;