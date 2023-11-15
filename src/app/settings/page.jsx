import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import UsersWindow from './UsersWindow';
import RolesWindow from './RolesWindow';

const SettingsPage = () => {
  return (
    <Container maxWidth="lg" className=' bg-neutral-800'>
      <Typography variant="h4" gutterBottom className='mt-4'>
        Settings
      </Typography>
      <Grid>
        <Grid className=' mb-4'>
          <UsersWindow/>
        </Grid>
        <Grid>
          <RolesWindow />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsPage;