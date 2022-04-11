import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function NavigateMenu({ anchorEl, onClose, onClick }) {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      <MenuItem onClick={onClick}>
        <Typography textAlign="center">Home</Typography>
      </MenuItem>
      <MenuItem onClick={onClick}>
        <Typography textAlign="center">Genres</Typography>
        <ArrowForwardIosIcon fontSize="small" />
      </MenuItem>
    </Menu>
  );
}

export default NavigateMenu;
