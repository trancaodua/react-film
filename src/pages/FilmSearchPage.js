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
import { useParams, useSearchParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const StyledPagination = styled(Pagination)(({ theme }) => ({
    marginTop: theme.spacing(2),
    "& .MuiPagination-ul": {
        justifyContent: "center",
    },
    bgcolor: theme.palette.text.secondary,
}));

function FilmSearchPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [films, setFilms] = useState([]);
    let { q } = useParams();
    let [searchParams, setSearchParams] = useSearchParams({ page: 1 });
    const currentPage = parseInt(searchParams.get("page"));

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiService.get(`search/movie?api_key=${API_KEY}&query=${q}&page=${currentPage}`);
                if (response.status === 200) {
                    setTotalPages(response["data"]["total_pages"] <= 50 ? response["data"]["total_pages"] <= 50 : 50);
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
    }, [q, currentPage]);

    return (
        <Stack sx={{ p: 4 }}>
            <Breadcrumbs sx={{ marginBottom: 2 }} aria-label="breadcrumb">
                <Link
                    fontSize="inherit"
                    sx={{ display: "flex", alignItems: "center" }}
                    underline="hover"
                    color="inherit"
                    href="/"
                >
                    HOME
                </Link>
                <Typography color="text.primary">SEARCH</Typography>
            </Breadcrumbs>
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
                        page={currentPage}
                        count={totalPages}
                        color="primary"
                        size="medium"
                        variant="outlined"
                        onChange={(event, page) => {
                            setSearchParams({ page });
                        }}
                    />
                </>
            )}
        </Stack>
    );
}

export default FilmSearchPage;
