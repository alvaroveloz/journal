import { StarOutline } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'


export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      borderRadius={3}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ 
        backgroundColor: 'primary.main',
        minHeight: 'calc(100vh - 110px)' 
    
    }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color='white' variant='h5'>
          Select or create an item
        </Typography>
      </Grid>
    </Grid>
  );
}
