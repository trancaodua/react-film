import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { createToken, makeFavoriteMovie } from "../app/themoviedbApi";
import LoadingScreens from "../components/LoadingScreens";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function CreateFavoritaMoviePage() {
    let [searchParams, setSearchParams] = useSearchParams();
    let [error, setError] = useState("");
    let [sucess, setSucess] = useState("");
    let [loading, setLoading] = useState(false);
    let { id } = useParams();
    useEffect(() => {
        const loading = async () => {
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
                        let { sucess, message } = await makeFavoriteMovie(id, requestToken);
                        if (sucess) {
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
        loading();
    }, [searchParams]);

    //useEffect(() => {}, []);

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
                <Typography color="text.primary">CREATE FAVORITE</Typography>
            </Breadcrumbs>
            {loading && <LoadingScreens />}
            {error && <Alert severity="error">{error}</Alert>}
            {sucess && <Alert>{sucess}</Alert>}
        </Stack>
    );
}

export default CreateFavoritaMoviePage;
