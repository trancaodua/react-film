import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { FormProvider, FTextField, FPassword } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import Login from "../components/Login";

function SignInOutPage() {
  return <Login />;
}

export default SignInOutPage;
