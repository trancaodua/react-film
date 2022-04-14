import React from "react";
import { Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { FormProvider, FTextField, FPassword } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import Login from "../components/Login";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function SignInOutPage() {
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
                <Typography color="text.primary">LOGIN</Typography>
            </Breadcrumbs>
            <Login />
        </Stack>
    );
}

export default SignInOutPage;
