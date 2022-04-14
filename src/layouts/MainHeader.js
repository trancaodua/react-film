import useResponsive from "../hooks/useResponsive";
import useOffSetTop from "../hooks/useOffSetTop";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import IconButton from "@mui/material/IconButton";

import { HEADER } from "../app/config";
import { Toolbar, AppBar, Container, Box, Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LoginIcon from "@mui/icons-material/Login";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme, alpha } from "@mui/material/styles";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import { API_KEY } from "../app/config";
import { PATH_AUTH, path, PATH_FILM } from "../routes/paths";
import useAuth from "../hooks/useAuth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const BoxStyle = styled(Box)(({ theme }) => ({
    height: HEADER.MOBILE_HEIGHT,
    [theme.breakpoints.up("md")]: {
        height: HEADER.MAIN_DESKTOP_HEIGHT,
    },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    height: HEADER.MOBILE_HEIGHT,
    transition: theme.transitions.create(["height", "background-color"], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.up("md")]: {
        height: HEADER.MAIN_DESKTOP_HEIGHT,
    },
    backgroundColor: theme.palette.primary.main,
    padding: 0,
}));

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const MainHeader = () => {
    const isDesktop = useResponsive("up", "md");
    const auth = useAuth();
    const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
    const { pathname } = useLocation();
    const [genres, setGenres] = useState([]);
    let navigate = useNavigate();
    const isHome = pathname === "/";
    const { q } = useParams();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiService.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
                if (res.status === 200) {
                    setGenres([...res.data["genres"]]);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <BoxStyle
            sx={{
                height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
            }}
        >
            <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
                <ToolbarStyle
                    disableGutters
                    sx={{
                        height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
                    }}
                >
                    <Container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={genres} />}

                        {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={genres} />}
                        <Box sx={{ flexGrow: 1 }} />
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={(event) => {
                                event.preventDefault();
                                const search = event.target.elements.search.value;
                                if (search) {
                                    navigate(path(PATH_FILM.search, `/${event.target.elements.search.value}`));
                                }
                            }}
                        >
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    name="search"
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                        </Box>
                        {auth.isAuthenticated ? (
                            <>
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar alt="Remy Sharp" src="/images/avatar/1.jpg" />
                                </IconButton>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            auth.logout(() => navigate(pathname, { replace: true }));
                                        }}
                                    >
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                onClick={() => {
                                    navigate(PATH_AUTH.login, { replace: true });
                                }}
                                variant="contained"
                                startIcon={<LoginIcon />}
                            >
                                Login
                            </Button>
                        )}
                    </Container>
                </ToolbarStyle>
            </AppBar>
        </BoxStyle>
    );
};
export default MainHeader;
