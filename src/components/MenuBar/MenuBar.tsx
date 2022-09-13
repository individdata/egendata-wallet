import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
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
import { selectTab } from '../../store/slices/tabsSlice';
import { changeLang } from '../../store/slices/langSlice';
import useUser from '../../hooks/useUser';

export default function MenuBar() {
  const {data: session, status} = useSession();
  const { user, isLoading, isError } = useUser();

  const dispatch = useDispatch();
  const router = useRouter();
//  const user = useSelector((state: RootState) => state.auth.user);
  const lang = useSelector((state: RootState) => state.lang.lang);
  const isLoggedIn = session?.webid ?? false;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAvatarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages = [
    { state: 'inbox', path: '/home', text: 'Inbox' },
    { state: 'consent', path: '/consent', text: 'Consents' },
    { state: 'mydata', path: '/request', text: 'My Data' },
  ];

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography sx={{ flexBasis: 0, flexGrow: 1 }}>
            Egendata
          </Typography>

          <Box sx={{ flexGrow: 1, placeContent: 'center', display: { xs: 'none', md: 'flex' } }}>
            <Tabs value={router.query}>
              {pages.map((page) => (
                <Tab
                  label={page.text}
                  value={page.path}
                  component={Link}
                  onClick={(e) => {
                    e.preventDefault() // Maybe not needed?
                    dispatch(selectTab(page.state));
                    router.push(page.path);
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
                        onClick={(e) => {
                          e.preventDefault(); // Maybe not needed
                          dispatch(selectTab(page.state));
                          router.push(page.path);
                        }}
                        sx={{ backgroundColor: 'transparent' }}
                      >
                        <ListItemText>{page.text}</ListItemText>
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

            {user && (
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
