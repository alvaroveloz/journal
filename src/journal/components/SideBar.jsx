import { TurnedInNot } from '@mui/icons-material';
import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const SideBar = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent'
        open={true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Alvaro Veloz
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {['January', 'February', 'March', 'April', 'May'].map(
            (item) => (
              <ListItem key={item}>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container >
                    <ListItemText primary={item} />
                    <ListItemText secondary='Voluptate aliquip amet est esse nulla ipsum sunt.' />
                  </Grid>
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
};
