import { API_KEY } from "./config";
import apiService from "./apiService";
import { useParams, useSearchParams } from "react-router-dom";
import { TryRounded } from "@mui/icons-material";

export const createToken = async () => {
    let response = await apiService.get(`/authentication/token/new?api_key=${API_KEY}`);
    window.location.assign(
        `https://www.themoviedb.org/authenticate/${response["data"]["request_token"]}?redirect_to=${window.location.href}`
    );
};

const createSession = async (token) => {
    let res = await apiService.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`, {
        request_token: token,
    });

    return res;
};

const getAccount = async (session) => {
    let res = await apiService.get(`https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${session}`);
    return res;
};

const sendFavoriteMovie = async (movieId, data, sessionId) => {
    let res = await apiService.post(
        `https://api.themoviedb.org/3/account/${data["id"]}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
        {
            media_type: "movie",
            media_id: movieId,
            favorite: true,
        }
    );

    return res;
};

export const makeFavoriteMovie = async (movieId, token) => {
    try {
        let response = await createSession(token);
        if (!response.data.success) {
            return { sucess: false, message: "Error" };
        }

        let sessionId = response.data["session_id"];
        response = await getAccount(sessionId);
        if (!response.data) {
            return { sucess: false, message: "Error" };
        }

        response = await sendFavoriteMovie(movieId, response.data["id"], sessionId);
        return { sucess: true, message: "Make film is sucessfully" };
    } catch (error) {
        return { sucess: false, message: "Error" };
    }
};

export const getAcount = async (token) => {
    try {
        let response = await createSession(token);
        if (!response.data.success) {
            return { sucess: false, message: "Error" };
        }

        let sessionId = response.data["session_id"];
        response = await getAccount(sessionId);
        if (!response.data) {
            return { sucess: false, message: "Error" };
        }

        return {
            sucess: true,
            message: "Make film is sucessfully",
            account: { id: response["data"]["id"], sessionId },
        };
    } catch (error) {
        return { sucess: false, message: "Error" };
    }
};
