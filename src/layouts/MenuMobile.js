import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box, List, Link, Drawer, Collapse, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";

// config
import { NAVBAR, MENU_MOBILE_ICON_SIZE } from "../app/config";
import { PATH_FILM, path } from "../routes/paths";
// components
import Logo from "../components/Logo";
import Iconify from "../components/Iconify";
import Scrollbar from "../components/Scrollbar";
import { IconButtonAnimate } from "../components/animate";
import { NavSectionVertical } from "../components/nav-section";
import { ListItemTextStyle } from "../components/nav-section/vertical/style";

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
    ...theme.typography.body2,
    height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
    textTransform: "capitalize",
    color: theme.palette.text.secondary,
}));

MenuMobile.propTypes = {
    isOffset: PropTypes.bool,
    isHome: PropTypes.bool,
    navConfig: PropTypes.array,
};

export default function MenuMobile({ isOffset, isHome, navConfig }) {
    const { pathname } = useLocation();

    const [open, setOpen] = useState(false);

    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (drawerOpen) {
            handleDrawerClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
        <>
            <IconButtonAnimate
                onClick={handleDrawerOpen}
                sx={{
                    ml: 1,
                    ...(isHome && { color: "common.white" }),
                    ...(isOffset && { color: "text.primary" }),
                }}
            >
                <Iconify icon={"eva:menu-2-fill"} />
            </IconButtonAnimate>

            <Drawer
                open={drawerOpen}
                onClose={handleDrawerClose}
                ModalProps={{ keepMounted: true }}
                PaperProps={{ sx: { pb: 5, width: 260 } }}
            >
                <Scrollbar>
                    <Logo sx={{ mx: 2.5, my: 3 }} />

                    <List disablePadding>
                        <ListItemStyle
                            to="/"
                            component={RouterLink}
                            sx={{
                                "&.active": {
                                    color: "primary.main",
                                    fontWeight: "fontWeightMedium",
                                    bgcolor: (theme) =>
                                        alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
                                },
                            }}
                        >
                            <ListItemIcon>
                                <Iconify icon={"eva:home-fill"} {...MENU_MOBILE_ICON_SIZE} />
                            </ListItemIcon>
                            <ListItemText disableTypography primary="Home" />
                        </ListItemStyle>

                        <ListItemStyle
                            to={PATH_FILM.favorite}
                            component={RouterLink}
                            sx={{
                                "&.active": {
                                    color: "primary.main",
                                    fontWeight: "fontWeightMedium",
                                    bgcolor: (theme) =>
                                        alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
                                },
                            }}
                        >
                            <ListItemIcon>
                                <Iconify icon="mdi:movie-open-star" {...MENU_MOBILE_ICON_SIZE} />
                            </ListItemIcon>
                            <ListItemText disableTypography primary="Favorite" />
                        </ListItemStyle>
                        <MenuMobileItem title="Genres" items={navConfig} isOpen={open} onOpen={handleOpen} />
                    </List>
                </Scrollbar>
            </Drawer>
        </>
    );
}

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
    isOpen: PropTypes.bool,
    item: PropTypes.array,
    onOpen: PropTypes.func,
};

function MenuMobileItem({ title, items, isOpen, onOpen }) {
    return (
        <>
            <ListItemStyle onClick={onOpen}>
                <ListItemIcon>
                    <Iconify icon="bi:card-list" {...MENU_MOBILE_ICON_SIZE} />
                </ListItemIcon>
                <ListItemText disableTypography primary={title} />
                <Iconify
                    icon={isOpen ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
                    sx={{ width: 16, height: 16, ml: 1 }}
                />
            </ListItemStyle>

            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
                    <List disablePadding sx={{ px: 2 }}>
                        {items.map((item) => (
                            <ListItemStyle
                                key={item.id}
                                component={RouterLink}
                                to={path(PATH_FILM.genres, `/${item.id}`)}
                                sx={{
                                    "&.active": {
                                        color: "primary.main",
                                        fontWeight: "fontWeightMedium",
                                        bgcolor: (theme) =>
                                            alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
                                    },
                                }}
                            >
                                <ListItemTextStyle disableTypography primary={item.name} isCollapse={false} />
                            </ListItemStyle>
                        ))}
                    </List>
                </Box>
            </Collapse>
        </>
    );
}
