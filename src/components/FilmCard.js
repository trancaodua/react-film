import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import { HEMOVIEDB_IMAGE_URL } from "../app/config";
import { styled, alpha } from "@mui/material/styles";
import GradeIcon from "@mui/icons-material/Grade";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  transform: "translate(-50%,-50%)",
  backgroundColor: alpha(theme.palette.success.lighter, 0.2),
  display: "none",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  "&:hover > .MuiCardContent-root": {
    display: "block",
  },
  margin: "auto",
}));

const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  position: "absolute",
  bottom: 0,
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.lighter, 0.2),
}));
function FilmCard({ film }) {
  let navigation = useNavigate();
  return (
    <StyledCard sx={{ maxWidth: 345, position: "relative" }}>
      <StyledBadge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        badgeContent={<GradeIcon sx={{ color: "primary.darker" }} />}
      >
        <Typography
          sx={{
            color: "primary.darker",
            borderRadius: "50%",
            backgroundColor: "success.lighter",
            padding: 0.5,
            minWidth: "30px",
            textAlign: "center",
          }}
        >
          {film["vote_average"]}
        </Typography>
      </StyledBadge>
      <CardMedia
        component="img"
        image={`${HEMOVIEDB_IMAGE_URL}/${film["poster_path"]}`}
        alt={film["title"]}
      />

      <StyledTitleTypography variant="h6" component="h6">
        {film["original_title"]}
      </StyledTitleTypography>
      <StyledCardContent>
        <Stack alignItems="center">
          <Button
            onClick={(event) => {
              navigation(`/film/${film["id"]}`);
            }}
            variant="contained"
          >
            Details
          </Button>
        </Stack>
      </StyledCardContent>
    </StyledCard>
  );
}

export default FilmCard;
