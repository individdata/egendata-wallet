import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
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
  Divider,
  Button,
  Badge,
} from "@mui/material";
import Link from "../../lib/Link";
import { MenuIcon, GlobeIcon, ProfileIcon, ExitIcon } from "../../icons/icons";
import { RootState } from "../../store/store";
import { selectTab } from "../../store/slices/tabsSlice";
import { changeLang } from "../../store/slices/langSlice";
import useUser from "../../hooks/useUser";
import { FormattedMessage } from "react-intl";

export default function MenuBar() {
  const { data: session, status } = useSession();
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
    {
      state: "inbox",
      path: "/home",
      status: 3,
      message: (
        <FormattedMessage
          id="edtIll"
          defaultMessage="Inbox"
          description="Menubar inbox tab."
        />
      ),
    },
    {
      state: "consent",
      path: "/consent",
      status: false,
      message: (
        <FormattedMessage
          id="Yy59up"
          defaultMessage="Contents"
          description="Menubar consents tab."
        />
      ),
    },
    {
      state: "mydata",
      path: "/request",
      status: false,
      message: (
        <FormattedMessage
          id="1aMDvI"
          defaultMessage="My data"
          description="Menubar my data tab."
        />
      ),
    },
  ];

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography sx={{ flexBasis: 0, flexGrow: 1 }}>Egendata</Typography>

          {/* Centered tab menu, desktop. */}
          <Box
            sx={{
              flexGrow: 0,
              placeContent: "center",
              display: { xs: "none", md: "flex" },
            }}
            paddingTop={1}
          >
            <Tabs value={router.route}>
              {pages.map((page) => (
                <Tab
                  key={page.path}
                  label={
                    <Badge
                      color="warning"
                      badgeContent={page.status}
                      invisible={!page.status}
                      overlap="rectangular"
                    >
                      <Typography paddingLeft={1} paddingRight={1}>
                        {page.message}
                      </Typography>
                    </Badge>
                  }
                  value={page.path}
                  component={Link.Link}
                  onClick={(evt: any) => {
                    evt.preventDefault(); // Maybe not needed?
                    dispatch(selectTab(page.state));
                    router.push(page.path);
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Container for menus. */}
          <Box
            sx={{
              flexGrow: 1,
              placeContent: "end",
              display: { xs: "flex", md: "none" },
            }}
          >
            {/* Full screen drawer menu, mobile. */}
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
              <Container sx={{ height: "100vh" }}>
                <Toolbar>
                  <Typography sx={{ flexGrow: 1 }}>Egendata</Typography>
                  <IconButton size="large" onClick={() => setDrawerOpen(false)}>
                    <ExitIcon />
                  </IconButton>
                </Toolbar>

                <List component="nav">
                  {pages.map((page) => (
                    <>
                      <ListItemButton
                        onClick={(e) => {
                          e.preventDefault(); // Maybe not needed
                          dispatch(selectTab(page.state));
                          router.push(page.path);
                        }}
                        sx={{ backgroundColor: "transparent" }}
                      >
                        <ListItemText>{page.message}</ListItemText>
                      </ListItemButton>
                      <Divider />
                    </>
                  ))}
                  <ListItemButton
                    key="accountDetails"
                    sx={{ backgroundColor: "transparent" }}
                  >
                    <ListItemText>
                      <FormattedMessage
                        id="VR+Zu1"
                        defaultMessage="Account details"
                        description="Menu alternative for account details."
                      />
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton
                    key="language"
                    sx={{ backgroundColor: "transparent" }}
                  >
                    <ListItemText>
                      <FormattedMessage
                        id="oINMVj"
                        defaultMessage="Change language"
                        description="Menu alternative for language selection."
                      />
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton
                    key="logout"
                    sx={{ backgroundColor: "transparent" }}
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <ListItemText>
                      <FormattedMessage
                        id="lEEJQP"
                        defaultMessage="Log out"
                        description="Menu alternative for log out."
                      />
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Container>
            </Drawer>
          </Box>

          {/* Drop down menu, desktop. */}
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 1,
              placeContent: "end",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Button
              size="large"
              color="inherit"
              startIcon={<GlobeIcon />}
              onClick={() => dispatch(changeLang())}
            >
              {lang === "en" ? "sv" : "en"}
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
                  {user.name}
                </Button>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <FormattedMessage
                      id="RgYSBk"
                      defaultMessage="Profile"
                      description="Menubar profile button."
                    />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <FormattedMessage
                      id="5r5uWQ"
                      defaultMessage="Account details"
                      description="Menubar account details button."
                    />
                  </MenuItem>
                  <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                    <FormattedMessage
                      id="lEEJQP"
                      defaultMessage="Log out"
                      description="Menu alternative for log out."
                    />
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
