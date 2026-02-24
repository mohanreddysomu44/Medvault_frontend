import { useForm } from "react-hook-form";
import { login } from "../services/authService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await login(data.username, data.password);
      loginUser(res);
      alert("Login successful!");
    } catch {
      alert("Login failed!");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "40px",
        width: 350,
        color: "white",
        boxShadow: "0 0 40px rgba(30,144,255,0.3)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 0 60px rgba(30,144,255,0.6)",
        },
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        <LockIcon sx={{ color: "#1e90ff", mr: 1 }} />
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          {...register("username")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#1e90ff" }} />
              </InputAdornment>
            ),
            style: { color: "white" },
          }}
          sx={{
            input: { color: "white" },
            label: { color: "#aaa" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1e90ff" },
              "&:hover fieldset": { borderColor: "#1e90ff" },
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register("password")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#1e90ff" }} />
              </InputAdornment>
            ),
            style: { color: "white" },
          }}
          sx={{
            input: { color: "white" },
            label: { color: "#aaa" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1e90ff" },
              "&:hover fieldset": { borderColor: "#1e90ff" },
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            background: "linear-gradient(45deg, #1e90ff, #00bfff)",
            fontWeight: "bold",
            boxShadow: "0 0 20px rgba(30,144,255,0.6)",
            "&:hover": {
              boxShadow: "0 0 30px rgba(30,144,255,1)",
            },
          }}
        >
          LOGIN
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
