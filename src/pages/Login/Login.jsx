import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import logo from "../../assets/FFC-logo.png";
import { useDispatch } from "react-redux";
import { userLogin } from "../../reducers/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await dispatch(userLogin());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={styles.LoginPage}>
      <Box className={styles.headText}>
        <img src={logo} alt="logo" />
        <Typography variant="h6" align="center" gutterBottom>
          Get Started with BETA Field Force
        </Typography>
      </Box>
      <Box className={styles.inputSection}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Mobile"
            variant="standard"
            fullWidth
            margin="normal"
            {...register("mobile", {
              required: "Mobile is required",
            })}
            error={!!errors.mobile}
            size="medium"
            helperText={errors.mobile ? errors.mobile.message : ""}
            inputProps={{ maxLength: 10, inputMode: "numeric" }}
          />

          <TextField
            label="Password"
            type="password"
            variant="standard"
            size="medium"
            fullWidth
            {...register("password", { required: "Password is required" })}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.button}
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {isSubmitting ? "Signing In" : "Sign In"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
