import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import { Avatar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
/* <div className="topcorner">
                <img src={item.picture} alt="Google icon"/>
                <button
                onClick={logout}
                style={{
                    color: "red",
                    border: "1px solid gray",
                    backgroundColor: "white",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                }}
                >
                Logout
                </button>
            </div> */
const NavBar = (props) => { 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const item = JSON.parse(localStorage.getItem("user"));
    const logout = () => {
        localStorage.setItem("isHidden", "true");
        localStorage.removeItem("user");
        window.location.reload();
      };
        return (
            <>
            <AppBar position="static" style={{ background: '#EF8236' }}> 
                <Toolbar>
                    <Typography display='flex' flexGrow={1} component="a" href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}>
                        Stackoverflow
                    </Typography>
                    {!!props.user?.email ? (
                        <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                        <Avatar alt="Google icon" src={item.picture} />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="Log out of user"
                            aria-haspopup="true"
                            onClick={logout}
                            color="inherit"
                        >
                        <Logout />
                        </IconButton>
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
                        </div>
                    ) : (
                        <div>
                            <main style={{ display: "flex", gap: "1rem" }}>
                                <Link
                                to="/signup"
                                style={{
                                    textDecoration: "none",
                                    border: "1px solid gray",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "wheat",
                                    color: "#333",
                                }}
                                >
                                Sign Up
                                </Link>
                                <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    border: "1px solid gray",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "whitesmoke",
                                    color: "#333",
                                }}
                                >
                                Login
                                </Link>
                            </main>
                        </div>
                    )}
                </Toolbar>
            </AppBar> 
            </>
            
            ); 

};

export default NavBar;