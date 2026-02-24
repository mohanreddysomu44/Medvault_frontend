import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";

export default function DoctorProfileForm({ userId, onCreated }) {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [contact, setContact] = useState("");
  const [hospital, setHospital] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("User ID:", userId);
     // 🔍 debug

     localStorage.getItem("user")

    try {
      const response = await axios.post("http://localhost:8080/doctor", {
        name,
        specialization,
        contact,
        hospital,
        user:{"id":userId}// ✅ correct for your entity
      });

      onCreated(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to create doctor profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #020617, #0f172a)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 4,
          backgroundColor: "#0f172a",
          color: "#fff",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
        >
          Create Doctor Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Specialization"
            fullWidth
            required
            margin="normal"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Contact Number"
            fullWidth
            required
            margin="normal"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Hospital"
            fullWidth
            required
            margin="normal"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            InputLabelProps={{ style: { color: "#94a3b8" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Profile"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}