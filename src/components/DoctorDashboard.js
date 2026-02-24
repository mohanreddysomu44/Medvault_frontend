// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// export default function DoctorDashboard() {
//   const { user } = useContext(AuthContext);

//   // ✅ Fallback if context lost after refresh
//   const userId = user?.id || localStorage.getItem("userId");

//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({
//     name: "",
//     specialization: "",
//     contact: "",
//   });

//   // 🔹 Fetch doctor profile
//   useEffect(() => {
//     console.log("Logged user:", user);
//     console.log("User ID:", userId);

//     if (!userId) {
//       setError("User ID missing. Please login again.");
//       setLoading(false);
//       return;
//     }

//     const fetchDoctor = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8080/doctor/user/${userId}`
//         );
//         setDoctor(res.data);
//       } catch (err) {
//         if (err.response?.status === 404) {
//           setDoctor(null); // show form
//         } else {
//           setError("Failed to load doctor profile.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, [userId, user]);

//   // 🔹 Form change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🔹 Create doctor profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       setError("User ID missing. Please login again.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:8080/doctor", {
//         name: form.name,
//         specialization: form.specialization,
//         contact: form.contact,
//         user: { id: Number(userId) }, // ✅ ensure number
//       });

//       setDoctor(res.data);
//       setError("");
//     } catch (err) {
//       console.error("POST error:", err.response?.data || err.message);
//       setError("Failed to create doctor profile.");
//     }
//   };

//   // 🔹 Loading UI
//   if (loading) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // 🔹 Error UI
//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   // 🔹 Show profile creation form
//   if (!doctor) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg,#020617,#020617,#0a1a2f)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Paper
//           elevation={12}
//           sx={{
//             p: 4,
//             width: 420,
//             backdropFilter: "blur(15px)",
//             background: "rgba(255,255,255,0.05)",
//             borderRadius: 4,
//             color: "white",
//             boxShadow: "0 0 30px rgba(30,144,255,0.3)",
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             Create Doctor Profile
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Doctor Name"
//               name="name"
//               margin="normal"
//               onChange={handleChange}
//               required
//               InputLabelProps={{ style: { color: "#aaa" } }}
//               InputProps={{ style: { color: "white" } }}
//             />

//             <TextField
//               fullWidth
//               label="Specialization"
//               name="specialization"
//               margin="normal"
//               onChange={handleChange}
//               required
//               InputLabelProps={{ style: { color: "#aaa" } }}
//               InputProps={{ style: { color: "white" } }}
//             />

//             <TextField
//               fullWidth
//               label="Contact"
//               name="contact"
//               margin="normal"
//               onChange={handleChange}
//               required
//               InputLabelProps={{ style: { color: "#aaa" } }}
//               InputProps={{ style: { color: "white" } }}
//             />

//             <Button
//               fullWidth
//               type="submit"
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 background: "linear-gradient(45deg,#00bfff,#1e90ff)",
//                 boxShadow: "0 0 15px rgba(30,144,255,0.6)",
//               }}
//             >
//               Save Profile
//             </Button>
//           </form>
//         </Paper>
//       </Box>
//     );
//   }

//   // 🔹 Doctor dashboard UI
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#020617,#020617,#0a1a2f)",
//         color: "white",
//         p: 4,
//       }}
//     >
//       <Paper
//         elevation={10}
//         sx={{
//           p: 4,
//           backdropFilter: "blur(15px)",
//           background: "rgba(255,255,255,0.05)",
//           borderRadius: 4,
//           boxShadow: "0 0 25px rgba(30,144,255,0.25)",
//         }}
//       >
//         <Typography variant="h4">Doctor Dashboard</Typography>
//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Welcome, {doctor.name}
//         </Typography>
//         <Typography>Specialization: {doctor.specialization}</Typography>
//         <Typography>Contact: {doctor.contact}</Typography>
//       </Paper>
//     </Box>
//   );
// }
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import DoctorProfileForm from "./DoctorProfileForm";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

export default function DoctorDashboard() {
  const { user } = useContext(AuthContext);
  const userId = user?.id || localStorage.getItem("userId");

  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileMissing, setProfileMissing] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch doctor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRes = await axios.get(
          `http://localhost:8080/doctor/user/${userId}`
        );

        if (!docRes.data) {
          setProfileMissing(true);
          return;
        }

        const doctorData = docRes.data;
        setDoctor(doctorData);

        const patRes = await axios.get(
          `http://localhost:8080/doctor/${doctorData.id}/patients`
        );
        setPatients(patRes.data);

        const appRes = await axios.get(
          `http://localhost:8080/appointments/doctor/${doctorData.id}`
        );
        setAppointments(appRes.data);
      } catch (err) {
        console.error(err);
        setProfileMissing(true);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  // 🔹 Show profile form
  if (profileMissing) {
    return (
      <DoctorProfileForm
        userId={userId}
        onCreated={(doc) => {
          setDoctor(doc);
          setProfileMissing(false);
        }}
      />
    );
  }

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #021024, #020617 60%)",
        color: "#fff",
        p: 4,
      }}
    >
      {/* 👨‍⚕️ Doctor Profile */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        <Paper
          sx={{
            p: 5,
            mb: 5,
            textAlign: "center",
            borderRadius: 4,
            backdropFilter: "blur(20px)",
            background:
              "linear-gradient(145deg, rgba(0,191,255,0.2), rgba(255,255,255,0.05))",
            boxShadow: "0 0 50px rgba(0,191,255,0.35)",
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              margin: "auto",
              mb: 2,
              bgcolor: "#00e5ff",
              fontSize: 40,
              boxShadow: "0 0 30px rgba(0,229,255,0.8)",
            }}
          >
            {doctor?.name?.charAt(0)}
          </Avatar>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              textShadow: "0 0 10px rgba(0,229,255,0.9)",
            }}
          >
            Dr. {doctor?.name}
          </Typography>

          <Typography sx={{ color: "#e0f7ff", mt: 1 }}>
            {doctor?.specialization}
          </Typography>
          <Typography sx={{ color: "#e0f7ff" }}>📞 {doctor?.contact}</Typography>
          <Typography sx={{ color: "#e0f7ff" }}>🏥 {doctor?.hospital}</Typography>
        </Paper>
      </motion.div>

      {/* 📊 Stats */}
      <Grid container spacing={3}>
        {[
          { title: "Patients", value: patients.length },
          { title: "Appointments", value: appointments.length },
          { title: "Access Requests", value: 0 },
        ].map((card, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ textAlign: "center", p: 3, borderRadius: 3 }}>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h3">{card.value}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 👥 Patients */}
      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
        Assigned Patients
      </Typography>

      <Grid container spacing={2}>
        {patients.map((p) => (
          <Grid item xs={12} md={4} key={p.id}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <Avatar sx={{ margin: "auto", bgcolor: "#00bcd4" }}>
                {p.name?.charAt(0)}
              </Avatar>
              <Typography>{p.name}</Typography>
              <Typography>ID: {p.id}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}