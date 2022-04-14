import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { List, Collapse, ListItemText } from "@mui/material";

//
import { NavItemSub } from "./NavItem";
import { ListItemStyle, ListItemTextStyle } from "./style";
import { getActive } from "..";
import Iconify from "../../Iconify";
import { PATH_FILM, path } from "../../../routes/paths";

// ----------------------------------------------------------------------

NavListRoot.propTypes = {
    isCollapse: PropTypes.bool,
    list: PropTypes.array,
};

export function NavListRoot({ list, isCollapse, title }) {
    const { pathname } = useLocation();
    console.log(list);

    const active = getActive(path(PATH_FILM.root, PATH_FILM.genres), pathname);

    const [open, setOpen] = useState(active);

    return (
        <>
            <ListItemStyle
                onClick={() => {
                    setOpen(!open);
                }}
                activeRoot={active}
            >
                <ListItemText disableTypography primary={title} />
                <ArrowIcon open={open} />
            </ListItemStyle>
            
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 3 }}>
                    {list.map((item) => (
                        <NavItemSub key={item.id} item={item} />
                    ))}
                </List>
            </Collapse>
        </>
    );
}

// ----------------------------------------------------------------------
ArrowIcon.propTypes = {
    open: PropTypes.bool,
};

export function ArrowIcon({ open }) {
    return (
        <Iconify
            icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
            sx={{ width: 16, height: 16, ml: 1 }}
        />
    );
}
