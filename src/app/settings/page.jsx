import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import UsersWindow from './UsersWindow';
import RolesWindow from './RolesWindow';

const SettingsPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom className='mt-4'>
        Settings
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <UsersWindow />
        </Grid>
        <Grid item xs={12} md={6}>
          <RolesWindow />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsPage;