import { useForm } from "react-hook-form";
import { register as registerUser } from "../services/authService";
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      alert("Registration successful!");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("Username already exists. Please choose another.");
      } else {
        alert("Registration failed!");
        console.log(err);
      }
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
        width: 380,
        color: "white",
        boxShadow: "0 0 40px rgba(30,144,255,0.3)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 0 60px rgba(30,144,255,0.6)",
        },
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        <PersonAddIcon sx={{ color: "#1e90ff", mr: 1 }} />
        Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
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

        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          autoComplete="new-password"
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

        {/* Role */}
        <TextField
          select
          fullWidth
          label="Role"
          margin="normal"
          {...register("role")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon sx={{ color: "#1e90ff" }} />
              </InputAdornment>
            ),
            style: { color: "white" },
          }}
          sx={{
            label: { color: "#aaa" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1e90ff" },
              "&:hover fieldset": { borderColor: "#1e90ff" },
            },
            "& .MuiSvgIcon-root": { color: "white" },
          }}
        >
          <MenuItem value="ROLE_PATIENT">Patient</MenuItem>
          <MenuItem value="ROLE_DOCTOR">Doctor</MenuItem>
        </TextField>

        {/* Button */}
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
          REGISTER
        </Button>
      </form>
    </Paper>
  );
};

export default RegisterForm;
