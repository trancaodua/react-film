import { API_KEY } from "../app/config";
import apiService from "../app/apiService";
import { useParams, useSearchParams } from "react-router-dom";

export const createToken = async () => {
  try {
    let response = await apiService.get(
      `/authentication/token/new?api_key=${API_KEY}`
    );
    window.location.assign(
      `https://www.themoviedb.org/authenticate/${response["data"]["request_token"]}?redirect_to=${window.location.href}`
    );
    return { status: true };
  } catch (error) {
    return { status: false, data: error.response.data };
  }
};

const createSession = async (token) => {
  try {
    let res = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token: token,
        }),
      }
    );
    let data = await res.json();
  } catch (error) {}
};

const getAccount = async () => {
  let res = await fetch(
    `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${data["session_id"]}`
  );
  let data = await res.json();
};

const sendFavoritaMovie = async (id, data, sessionId) => {
  let res = await fetch(
    `https://api.themoviedb.org/3/account/${data["id"]}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: id,
        favorite: true,
      }),
    }
  );

  data = await res.json();
};
