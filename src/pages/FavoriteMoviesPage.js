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
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { createToken, getAcount } from "../app/themoviedbApi";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import useLocalStorage from "../hooks/useLocalStorage";

const StyledPagination = styled(Pagination)(({ theme }) => ({
    marginTop: theme.spacing(2),
    "& .MuiPagination-ul": {
        justifyContent: "center",
    },
}));

function FavoriteMoviesPage() {
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useLocalStorage("account", null);
    let [sucess, setSucess] = useState("");
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1);
    let [searchParams, setSearchParams] = useSearchParams({ page: 1 });
    const currentPage = parseInt(searchParams.get("page"));

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiService.get(
                    `/account/${account.id}/favorite/movies?api_key=${API_KEY}&session_id=${account.sessionId}&page=${currentPage}`
                );
                if (response.status === 200) {
                    setTotalPages(response["data"]["total_pages"] <= 50 ? response["data"]["total_pages"] : 50);
                    setFilms([...response["data"]["results"]]);
                    setError("");
                } else {
                    setTotalPages(0);
                    setFilms([]);
                }
            } catch (error) {
                console.log(error.response.data["status_message"]);
                setTotalPages(0);
                setFilms([]);
                setError(error.response.data["status_message"]);
            }
            setLoading(false);
        };

        if (account) {
            fetchData();
        }
    }, [currentPage, account]);

    useEffect(() => {
        const loadingAcount = async () => {
            let requestToken = searchParams.get("request_token");
            if (requestToken) {
                let denied = searchParams.get("denied");
                let approved = searchParams.get("approved");
                if (denied) {
                    setError("Request is denied");
                } else if (!approved) {
                    setError("Request token error");
                } else {
                    setLoading(true);
                    try {
                        let { sucess, message, account } = await getAcount(requestToken);
                        if (sucess) {
                            localStorage.setItem("acount", JSON.stringify(account));
                            setAccount(account);
                            setSucess(message);
                        } else {
                            setError(message);
                        }
                    } catch (error) {
                        console.log(error);
                        setError("Error");
                    }
                    setLoading(false);
                }
            } else {
                createToken();
            }
        };
        if (!account) {
            loadingAcount();
        }
    }, [searchParams]);

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
                <Typography color="text.primary">FAVORITE</Typography>
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
                        size="large"
                        variant="outlined"
                        color="primary"
                        onChange={(event, page) => {
                            setSearchParams({ page });
                        }}
                    />
                </>
            )}
        </Stack>
    );
}

export default FavoriteMoviesPage;
