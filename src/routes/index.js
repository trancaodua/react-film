import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignInOutPage from "../pages/SignInOutPage";
import HomePage from "../pages/HomePage";
import FilmPage from "../pages/FilmPage";
import createFavoritaMovie from "../pages/CreateFavoritaMovie";

function index() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="login" element={<SignInOutPage />} />
        <Route path="film/:id" element={<FilmPage />} />
        <Routes path="favorite">
          <Route element={<createFavoritaMovie />} />
        </Routes>
      </Route>
    </Routes>
  );
}

export default index;
