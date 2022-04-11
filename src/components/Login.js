import React from "react";
import { Grid, Paper, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import { Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, FTextField, FPassword } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const paperStyle = {
  padding: 20,
  height: "73vh",
  width: 300,
  marginTop: 20,
  boxShadow:
    "1px 1px 5px 3px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  username: "",
  password: "",
};

const Login = ({ handleChange }) => {
  let navigation = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 3000);
    });

    await promise.then((data) => {
      let from = location.state?.from?.pathname || "/";
      let username = data.username;
      auth.login(username, () => {
        navigation(from, { replace: true });
      });
    });
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            sx={{ color: "primary.main" }}
            variant="h5"
            component="h5"
          >
            Sign In
          </Typography>
          ;
        </Grid>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField name="username" label="Username" />
            <FPassword name="password" label="Passworld" />
            <LoadingButton
              type="submit"
              size="small"
              loading={isSubmitting}
              variant="outlined"
            >
              Sign In
            </LoadingButton>
          </Stack>
        </FormProvider>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="#" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
