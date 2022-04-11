import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingScreens from "../components/LoadingScreens";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import apiService from "../app/apiService";
import { API_KEY, HEMOVIEDB_IMAGE_URL } from "../app/config";
import { createToken } from "../hooks/makeFavoritaMovie";

function FilmPage() {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let [film, setFilm] = useState(null);
  let { id } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/${id}?api_key=${API_KEY}`
        );

        if (response.status === 200) {
          setFilm({ ...response.data });
        } else {
          setError("Sever error");
        }
        console.log(response);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingScreens />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        film && (
          <Stack
            sx={{
              maxWidth: 700,
              m: "auto",
              mt: 4,
              mb: 4,
              p: 4,
              borderRadius: 2,
              boxShadow:
                "1px 1px 5px 3px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image={`${HEMOVIEDB_IMAGE_URL}/${film["poster_path"]}`}
                  alt={film["title"]}
                />
              </Grid>
              <Grid item container xs={12} md={6} rowSpacing={0}>
                <Grid item xs={12}>
                  <Button onClick={createToken}>Like</Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ color: "primary.main" }}>
                    {film["title"]}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Overview: </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {film["overview"]}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>IMDb:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {film["vote_average"]}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Runtime:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {film["runtime"]}'
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Genres: </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Paper
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      flexWrap: "wrap",
                      listStyle: "none",
                      boxShadow: 0,
                      gap: 0.5,
                    }}
                  >
                    {film["genres"].map((item) => (
                      <Chip
                        color="primary"
                        key={item["name"]}
                        label={item["name"]}
                      />
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Production Companies: </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {film["production_companies"]
                      .map((item) => item["name"])
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Production Countries:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {film["production_countries"]
                      .map((item) => item["name"])
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Release date:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {film["release_date"]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        )
      )}
    </>
  );
}

export default FilmPage;
