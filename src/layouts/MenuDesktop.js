import PropTypes from "prop-types";
import { m } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Link, Grid, List, Stack, Popover, ListItem, ListSubheader, CardActionArea } from "@mui/material";
// components
import Iconify from "../components/Iconify";

import { PATH_FILM } from "../routes/paths";

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(5),
    transition: theme.transitions.create("opacity", {
        duration: theme.transitions.duration.shorter,
    }),
    "&:hover": {
        opacity: 0.48,
        textDecoration: "none",
    },
}));

const ListItemStyle = styled(ListItem)(({ theme }) => ({
    ...theme.typography.body2,
    padding: 0,
    marginTop: theme.spacing(3),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create("color"),
    "&:hover": {
        color: theme.palette.text.primary,
    },
}));

// ----------------------------------------------------------------------

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            handleClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Stack direction="row">
            <LinkStyle
                to="/"
                component={RouterLink}
                sx={{
                    ...(isHome && { color: "common.white" }),
                    ...(isOffset && { color: "text.primary" }),
                }}
            >
                Home
            </LinkStyle>
            <LinkStyle
                to={PATH_FILM.favorite}
                component={RouterLink}
                sx={{
                    ...(isOffset && { color: "text.primary" }),
                }}
            >
                Favorite
            </LinkStyle>
            <MenuDesktopItem
                title="Genres"
                items={navConfig}
                isOpen={open}
                onOpen={handleOpen}
                onClose={handleClose}
                isOffset={isOffset}
                isHome={isHome}
            />
        </Stack>
    );
}

// ----------------------------------------------------------------------

IconBullet.propTypes = {
    type: PropTypes.oneOf(["item", "subheader"]),
};

function IconBullet({ type = "item" }) {
    return (
        <Box sx={{ width: 24, height: 16, display: "flex", alignItems: "center" }}>
            <Box
                component="span"
                sx={{
                    ml: "2px",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: "currentColor",
                    ...(type !== "item" && { ml: 0, width: 8, height: 2, borderRadius: 2 }),
                }}
            />
        </Box>
    );
}

// ----------------------------------------------------------------------

function MenuDesktopItem({ title, items, isHome, isOpen, isOffset, onOpen, onClose }) {
    return (
        <>
            <LinkStyle
                onClick={onOpen}
                sx={{
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    ...(isHome && { color: "common.white" }),
                    ...(isOffset && { color: "text.primary" }),
                    ...(isOpen && { opacity: 0.48 }),
                }}
            >
                {title}
                <Iconify
                    icon={isOpen ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill"}
                    sx={{ ml: 0.5, width: 16, height: 16 }}
                />
            </LinkStyle>

            <Popover
                open={isOpen}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 80, left: 0 }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        px: 3,
                        pt: 4,
                        pb: 4,
                        right: 16,
                        m: "auto",
                        borderRadius: 2,
                        maxWidth: (theme) => theme.breakpoints.values.lg,
                        boxShadow: (theme) => theme.customShadows.z24,
                    },
                }}
            >
                <Grid container direction="row" justifyContent="start" alignItems="center" flexWrap="wrap">
                    {items.map((item) => (
                        <Grid item xs={2} sm={3} md={3} key={item.id}>
                            <ListItemStyle
                                to={`${PATH_FILM.genres}/${item.id}`}
                                component={RouterLink}
                                underline="none"
                                sx={{
                                    "&.active": {
                                        color: "primary.main",
                                        typography: "subtitle2",
                                    },
                                }}
                            >
                                {item.name}
                            </ListItemStyle>
                        </Grid>
                    ))}
                </Grid>
            </Popover>
        </>
    );
}
