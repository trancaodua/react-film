import React from "react";
import { Box, CircularProgress } from "@mui/material/";

function LoadingScreens() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingScreens;
