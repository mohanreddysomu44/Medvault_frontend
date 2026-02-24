import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

export default function BookAppointmentPage() {
  const { patientId, doctorId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: "",
    date: "",
    timeSlot: "",
    report: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "report") {
      setForm({ ...form, report: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("patientId", patientId);
    formData.append("doctorId", doctorId);
    formData.append("description", form.description);
    formData.append("date", form.date);
    formData.append("timeSlot", form.timeSlot);
    if (form.report) formData.append("report", form.report);

    try {
      await axios.post(
        "http://localhost:8080/appointments/book",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Appointment booked successfully!");
      setError("");

      setTimeout(() => navigate("/patient-dashboard"), 1500);
    } catch (err) {
      setError("Failed to book appointment.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #021024, #020617 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
        <Paper
          sx={{
            p: 5,
            width: 450,
            borderRadius: 4,
            backdropFilter: "blur(25px)",
            background:
              "linear-gradient(145deg, rgba(0,191,255,0.15), rgba(255,255,255,0.05))",
            boxShadow: "0 0 40px rgba(0,191,255,0.35)",
            color: "white",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            Book Appointment
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Describe your problem"
              name="description"
              margin="normal"
              multiline
              rows={3}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#fff" } }}
            />

            <TextField
              fullWidth
              type="date"
              name="date"
              margin="normal"
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { color: "#fff" } }}
            />

            <TextField
              fullWidth
              label="Time Slot"
              name="timeSlot"
              margin="normal"
              onChange={handleChange}
              required
              placeholder="10:00 AM"
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#fff" } }}
            />

            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2, mb: 2 }}
            >
              Upload Report
              <input
                type="file"
                hidden
                name="report"
                onChange={handleChange}
              />
            </Button>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                background: "linear-gradient(45deg,#00bfff,#1e90ff)",
                boxShadow: "0 0 20px rgba(0,191,255,0.7)",
              }}
            >
              Book Appointment
            </Button>
          </form>

          {message && <Alert sx={{ mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Paper>
      </motion.div>
    </Box>
  );
}