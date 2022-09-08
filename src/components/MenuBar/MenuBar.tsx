import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  Drawer,
  ListItemText,
  List,
  ListItemButton,
  Tabs,
  Tab,
  Link,
  Divider,
  Button,
} from '@mui/material';
import {
  MenuIcon,
  GlobeIcon,
  ProfileIcon,
  ExitIcon,
} from '../../icons/icons';
import { RootState } from '../../store';
import { selectTab } from '../../slices/tabsSlice';
import { changeLang } from '../../slices/langSlice';

export default function MenuBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const lang = useSelector((state: RootState) => state.lang.lang);
  const isLoggedIn = user?.completed;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAvatarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages = [
    { state: 'inbox', path: '/home', textId: 'inbox_text' },
    { state: 'consent', path: '/consent', textId: 'consents_text' },
    { state: 'mydata', path: '/request', textId: 'my_data_text' },
  ];

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography sx={{ flexBasis: 0, flexGrow: 1 }}>
            Egendata
          </Typography>

          <Box sx={{ flexGrow: 1, placeContent: 'center', display: { xs: 'none', md: 'flex' } }}>
            <Tabs value={location.pathname}>
              {pages.map((page) => (
                <Tab
                  label={<FormattedMessage id={page.textId} />}
                  value={page.path}
                  component={Link}
                  onClick={() => {
                    dispatch(selectTab(page.state));
                    navigate(page.path);
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 1, placeContent: 'end', display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="top"
              variant="temporary"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Container>
                <Toolbar>
                  <Typography sx={{ flexGrow: 1 }}>
                    Egendata
                  </Typography>
                  <IconButton
                    size="large"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ExitIcon />
                  </IconButton>
                </Toolbar>

                <List sx={{ minHeight: '100vh' }} component="nav">
                  {pages.map((page) => (
                    <>
                      <ListItemButton
                        onClick={() => {
                          dispatch(selectTab(page.state));
                          navigate(page.path);
                        }}
                        sx={{ backgroundColor: 'transparent' }}
                      >
                        <ListItemText><FormattedMessage id={page.textId} /></ListItemText>
                      </ListItemButton>
                      <Divider />
                    </>
                  ))}
                  <ListItemButton sx={{ backgroundColor: 'transparent' }}>
                    <ListItemText>Account details</ListItemText>
                  </ListItemButton>
                  <ListItemButton sx={{ backgroundColor: 'transparent' }}>
                    <ListItemText>Language</ListItemText>
                  </ListItemButton>
                  <ListItemButton sx={{ backgroundColor: 'transparent' }}>
                    <ListItemText>Log out</ListItemText>
                  </ListItemButton>
                </List>
              </Container>
            </Drawer>
          </Box>

          <Box sx={{
            flexBasis: 0,
            flexGrow: 1,
            placeContent: 'end',
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
          >
            <Button
              size="large"
              color="inherit"
              startIcon={<GlobeIcon />}
              onClick={() => dispatch(changeLang())}
            >
              { lang === 'en' ? 'sv' : 'en' }
            </Button>

            {isLoggedIn && (
              <>
                <Button
                  size="large"
                  onClick={handleAvatarMenu}
                  startIcon={<ProfileIcon />}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  { user.name }
                </Button>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
