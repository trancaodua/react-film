import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignInOutPage from "../pages/SignInOutPage";
import HomePage from "../pages/HomePage";
import FilmPage from "../pages/FilmPage";
import CreateFavoriteMoviePage from "../pages/CreateFavoriteMoviePage";
import FavoriteMoviesPage from "../pages/FavoriteMoviesPage";
import GenresFilmPage from "../pages/GenresFilmPage";
import FilmSearchPage from "../pages/FilmSearchPage";

function index() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />}></Route>
                <Route path="auth/login" element={<SignInOutPage />} />
                <Route path="film/:id" element={<FilmPage />} />
                <Route path="film/favorite" element={<FavoriteMoviesPage />} />
                <Route path="film/create-favorite/:id" element={<CreateFavoriteMoviePage />} />
                <Route path="film/genres/:id" element={<GenresFilmPage />} />
                <Route path="film/search/:q" element={<FilmSearchPage />} />
                <Route path="*" element={<HomePage />}></Route>
            </Route>
        </Routes>
    );
}

export default index;
