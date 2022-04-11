import React, { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
import Grid from "@mui/material/Grid";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import LoadingScreens from "../components/LoadingScreens";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPagination-ul": {
    justifyContent: "center",
  },
}));

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("addd");
  const [totalPages, setTotalPages] = useState(0);
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/popular?api_key=${API_KEY}&page=${page}`
        );
        if (response.status === 200) {
          setTotalPages(
            response["data"]["total_pages"] <= 50
              ? response["data"]["total_pages"] <= 50
              : 50
          );
          setFilms([...response["data"]["results"]]);
          setError("");
        } else {
          setTotalPages(0);
          setFilms([]);
          setError("Server error");
        }
      } catch (error) {
        setTotalPages(0);
        setFilms([]);
        setError("Server error");
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  return (
    <Stack sx={{ p: 4 }} spacing={4}>
      {loading ? (
        <LoadingScreens />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container spacing={6}>
            {films.map((film) => (
              <Grid key={film["id"]} item xs={12} sm={6} md={4} lg={3}>
                <FilmCard film={film} />
              </Grid>
            ))}
          </Grid>
          <StyledPagination
            count={totalPages}
            size="large"
            variant="outlined"
            color="primary"
            onChange={(event, page) => {
              setPage(page);
            }}
          />
        </>
      )}
    </Stack>
  );
}

export default HomePage;
