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
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import DoctorProfileForm from "./DoctorProfileForm";
// import {
//   Box,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { motion } from "framer-motion";

// export default function DoctorDashboard() {
//   const { user } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");

//   const [doctor, setDoctor] = useState(null);
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [error, setError] = useState("");

//   // 🔹 Fetch doctor
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const docRes = await axios.get(
//           `http://localhost:8080/doctor/user/${userId}`
//         );

//         if (!docRes.data) {
//           setProfileMissing(true);
//           return;
//         }

//         const doctorData = docRes.data;
//         setDoctor(doctorData);

//         const patRes = await axios.get(
//           `http://localhost:8080/doctor/${doctorData.id}/patients`
//         );
//         setPatients(patRes.data);

//         const appRes = await axios.get(
//           `http://localhost:8080/appointments/doctor/${doctorData.id}`
//         );
//         setAppointments(appRes.data);
//       } catch (err) {
//         console.error(err);
//         setProfileMissing(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchData();
//   }, [userId]);

//   // 🔹 Show profile form
//   if (profileMissing) {
//     return (
//       <DoctorProfileForm
//         userId={userId}
//         onCreated={(doc) => {
//           setDoctor(doc);
//           setProfileMissing(false);
//         }}
//       />
//     );
//   }

//   if (loading)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress size={60} />
//       </Box>
//     );

//   if (error)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top, #021024, #020617 60%)",
//         color: "#fff",
//         p: 4,
//       }}
//     >
//       {/* 👨‍⚕️ Doctor Profile */}
//       <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
//         <Paper
//           sx={{
//             p: 5,
//             mb: 5,
//             textAlign: "center",
//             borderRadius: 4,
//             backdropFilter: "blur(20px)",
//             background:
//               "linear-gradient(145deg, rgba(0,191,255,0.2), rgba(255,255,255,0.05))",
//             boxShadow: "0 0 50px rgba(0,191,255,0.35)",
//           }}
//         >
//           <Avatar
//             sx={{
//               width: 120,
//               height: 120,
//               margin: "auto",
//               mb: 2,
//               bgcolor: "#00e5ff",
//               fontSize: 40,
//               boxShadow: "0 0 30px rgba(0,229,255,0.8)",
//             }}
//           >
//             {doctor?.name?.charAt(0)}
//           </Avatar>

//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: "bold",
//               color: "#ffffff",
//               textShadow: "0 0 10px rgba(0,229,255,0.9)",
//             }}
//           >
//             Dr. {doctor?.name}
//           </Typography>

//           <Typography sx={{ color: "#e0f7ff", mt: 1 }}>
//             {doctor?.specialization}
//           </Typography>
//           <Typography sx={{ color: "#e0f7ff" }}>📞 {doctor?.contact}</Typography>
//           <Typography sx={{ color: "#e0f7ff" }}>🏥 {doctor?.hospital}</Typography>
//         </Paper>
//       </motion.div>

//       {/* 📊 Stats */}
//       <Grid container spacing={3}>
//         {[
//           { title: "Patients", value: patients.length },
//           { title: "Appointments", value: appointments.length },
//           { title: "Access Requests", value: 0 },
//         ].map((card, i) => (
//           <Grid item xs={12} md={4} key={i}>
//             <Card sx={{ textAlign: "center", p: 3, borderRadius: 3 }}>
//               <Typography variant="h6">{card.title}</Typography>
//               <Typography variant="h3">{card.value}</Typography>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* 👥 Patients */}
//       <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
//         Assigned Patients
//       </Typography>

//       <Grid container spacing={2}>
//         {patients.map((p) => (
//           <Grid item xs={12} md={4} key={p.id}>
//             <Card sx={{ textAlign: "center", p: 2 }}>
//               <Avatar sx={{ margin: "auto", bgcolor: "#00bcd4" }}>
//                 {p.name?.charAt(0)}
//               </Avatar>
//               <Typography>{p.name}</Typography>
//               <Typography>ID: {p.id}</Typography>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }




// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import DoctorProfileForm from "./DoctorProfileForm";
// import {
//   Box,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Divider,
// } from "@mui/material";
// import { motion } from "framer-motion";

// export default function DoctorDashboard() {
//   const { user } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");

//   const [doctor, setDoctor] = useState(null);
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [error, setError] = useState("");

//   // 🔹 Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const docRes = await axios.get(
//           `http://localhost:8080/doctor/user/${userId}`
//         );

//         if (!docRes.data) {
//           setProfileMissing(true);
//           return;
//         }

//         const doctorData = docRes.data;
//         setDoctor(doctorData);

//         const patRes = await axios.get(
//           `http://localhost:8080/doctor/${doctorData.id}/patients`
//         );
//         setPatients(patRes.data);

//         const appRes = await axios.get(
//           `http://localhost:8080/appointments/doctor/${doctorData.id}`
//         );
//         setAppointments(appRes.data);
//       } catch (err) {
//         console.error(err);
//         setProfileMissing(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchData();
//   }, [userId]);

//   const acceptAppointment = async (id) => {
//     await axios.put(`http://localhost:8080/appointments/${id}/approve`);
//     setAppointments((prev) =>
//       prev.map((a) => (a.id === id ? { ...a, status: "APPROVED" } : a))
//     );
//   };

//   const rejectAppointment = async (id) => {
//     await axios.put(`http://localhost:8080/appointments/${id}/reject`);
//     setAppointments((prev) => prev.filter((a) => a.id !== id));
//   };

//   if (profileMissing) {
//     return (
//       <DoctorProfileForm
//         userId={userId}
//         onCreated={(doc) => {
//           setDoctor(doc);
//           setProfileMissing(false);
//         }}
//       />
//     );
//   }

//   if (loading)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress size={60} />
//       </Box>
//     );

//   const pending = appointments.filter((a) => a.status === "PENDING");
//   const approved = appointments.filter((a) => a.status === "APPROVED");

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(135deg,#020617,#021024,#020617)",
//         color: "#ffffff",
//         p: 4,
//       }}
//     >
//       {/* 👨‍⚕️ PROFILE */}
//       <Paper
//         sx={{
//           p: 5,
//           mb: 5,
//           textAlign: "center",
//           borderRadius: 4,
//           background: "rgba(255,255,255,0.08)",
//           backdropFilter: "blur(25px)",
//           boxShadow: "0 0 40px rgba(0,191,255,0.35)",
//           color: "#fff",
//         }}
//       >
//         <Avatar
//           sx={{
//             width: 120,
//             height: 120,
//             margin: "auto",
//             mb: 2,
//             bgcolor: "#00e5ff",
//             fontSize: 40,
//           }}
//         >
//           {doctor?.name?.charAt(0)}
//         </Avatar>

//         <Typography variant="h4" fontWeight="bold">
//           Dr. {doctor?.name}
//         </Typography>
//         <Typography color="#80d8ff">{doctor?.specialization}</Typography>
//         <Typography>📞 {doctor?.contact}</Typography>
//         <Typography>🏥 {doctor?.hospital}</Typography>
//       </Paper>

//       {/* 📊 STATS */}
//       <Grid container spacing={3}>
//         {[
//           { title: "Patients", value: patients.length },
//           { title: "Appointments", value: appointments.length },
//           { title: "Pending", value: pending.length },
//         ].map((card, i) => (
//           <Grid item xs={12} md={4} key={i}>
//             <Card
//               sx={{
//                 p: 3,
//                 textAlign: "center",
//                 borderRadius: 4,
//                 background: "rgba(255,255,255,0.08)",
//                 color: "#fff",
//                 backdropFilter: "blur(20px)",
//                 boxShadow: "0 0 20px rgba(0,191,255,0.2)",
//               }}
//             >
//               <Typography variant="h6">{card.title}</Typography>
//               <Typography variant="h3" fontWeight="bold">
//                 {card.value}
//               </Typography>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* 📅 PENDING */}
//       <Typography variant="h5" sx={{ mt: 5, mb: 2, color: "#00e5ff" }}>
//         Pending Requests
//       </Typography>

//       <Grid container spacing={3}>
//         {pending.map((appt) => (
//           <Grid item xs={12} md={4} key={appt.id}>
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Card
//                 sx={{
//                   p: 3,
//                   borderRadius: 4,
//                   background: "rgba(255,255,255,0.10)",
//                   color: "#fff",
//                   backdropFilter: "blur(20px)",
//                 }}
//               >
//                 <Typography variant="h6">
//                   {appt.patient?.name}
//                 </Typography>

//                 <Chip label={`Age: ${appt.patient?.age}`} sx={{ mt: 1, mr: 1 }} />
//                 <Chip label={appt.timeSlot} color="info" sx={{ mt: 1 }} />

//                 <Typography sx={{ mt: 2 }}>
//                   📝 {appt.description}
//                 </Typography>

//                 <Typography sx={{ mt: 1 }}>
//                   📄 {appt.report || "No report"}
//                 </Typography>

//                 <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
//                   <Button
//                     variant="contained"
//                     color="success"
//                     onClick={() => acceptAppointment(appt.id)}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => rejectAppointment(appt.id)}
//                   >
//                     Reject
//                   </Button>
//                 </Box>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>

//       {/* ✅ APPROVED */}
//       <Typography variant="h5" sx={{ mt: 6, mb: 2, color: "#00ff9c" }}>
//         Approved Appointments
//       </Typography>

//       <Grid container spacing={3}>
//         {approved.map((appt) => (
//           <Grid item xs={12} md={4} key={appt.id}>
//             <Card
//               sx={{
//                 p: 3,
//                 borderRadius: 4,
//                 background: "rgba(0,255,150,0.10)",
//                 color: "#fff",
//                 backdropFilter: "blur(20px)",
//                 boxShadow: "0 0 25px rgba(0,255,150,0.25)",
//               }}
//             >
//               <Typography variant="h6">
//                 {appt.patient?.name}
//               </Typography>
//               <Divider sx={{ my: 1, borderColor: "#00ff9c" }} />
//               <Typography>Age: {appt.patient?.age}</Typography>
//               <Typography>DOB: {appt.patient?.dob}</Typography>
//               <Typography>Time: {appt.timeSlot}</Typography>
//               <Typography>Description: {appt.description}</Typography>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }



// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import DoctorProfileForm from "./DoctorProfileForm";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Divider,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import LogoutIcon from "@mui/icons-material/Logout";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import EventIcon from "@mui/icons-material/Event";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PersonIcon from "@mui/icons-material/Person";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// // ── Inject styles ──────────────────────────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .doc-overlay {
//     position: fixed; inset: 0;
//     background: rgba(26,31,54,.18);
//     backdrop-filter: blur(3px);
//     z-index: 199;
//     animation: overlayIn .2s ease;
//   }
//   @keyframes overlayIn { from{opacity:0}to{opacity:1} }

//   .doc-sidebar {
//     width: 260px; background: #ffffff;
//     border-right: 1px solid #e8ecf5;
//     display: flex; flex-direction: column;
//     padding: 20px 14px 24px;
//     position: fixed; top: 0; left: 0;
//     height: 100vh; z-index: 200;
//     box-shadow: 4px 0 28px rgba(79,110,247,.12);
//     transition: transform .28s cubic-bezier(.22,1,.36,1);
//   }
//   .doc-sidebar.closed { transform: translateX(-100%); }
//   .doc-sidebar.open   { transform: translateX(0); }

//   .doc-sidebar-top {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 0 6px 20px;
//   }
//   .doc-logo {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.4rem; font-weight: 700; color: #4f6ef7;
//     display: flex; align-items: center; gap: 9px;
//   }
//   .doc-logo-icon {
//     width: 32px; height: 32px; border-radius: 9px;
//     background: linear-gradient(135deg, #4f6ef7, #7c3aed);
//     display: flex; align-items: center; justify-content: center;
//     color: #fff; font-size: .85rem; flex-shrink: 0;
//   }
//   .doc-logo-accent { color: #7c3aed; }
//   .doc-close-btn {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #8892b0; transition: all .15s;
//   }
//   .doc-close-btn:hover { background: #eef1fe; color: #4f6ef7; border-color: rgba(79,110,247,.2); }

//   .doc-nav-label {
//     font-size: .67rem; text-transform: uppercase; letter-spacing: 1.2px;
//     color: #b0b8d0; font-weight: 600; padding: 0 10px; margin: 4px 0 6px;
//   }
//   .doc-nav-item {
//     display: flex; align-items: center; gap: 11px;
//     padding: 10px 12px; border-radius: 11px; cursor: pointer;
//     font-size: .875rem; font-weight: 500; color: #4a5278;
//     transition: all .18s ease; border: 1px solid transparent;
//     margin-bottom: 3px; user-select: none;
//   }
//   .doc-nav-item:hover { background: #eef1fe; color: #4f6ef7; }
//   .doc-nav-item.active { background: #eef1fe; color: #4f6ef7; font-weight: 600; border-color: rgba(79,110,247,.18); }
//   .doc-nav-item.active .doc-nav-icon { background: #4f6ef7 !important; color: #fff !important; }
//   .doc-nav-icon {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f0f2f8; display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0; transition: all .18s; color: #4a5278;
//   }
//   .doc-sidebar-spacer { flex: 1; }
//   .doc-user-card {
//     display: flex; align-items: center; gap: 11px;
//     padding: 12px; border-radius: 14px;
//     background: #f5f7ff; border: 1px solid #e8ecf5; margin-bottom: 10px;
//   }
//   .doc-user-av {
//     width: 36px; height: 36px; border-radius: 10px;
//     background: linear-gradient(135deg, #4f6ef7, #7c3aed);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Cormorant Garamond', serif; font-weight: 700; color: #fff; font-size: 1.1rem;
//   }

//   /* top bar */
//   .doc-topbar {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 13px 24px; background: #fff;
//     border-bottom: 1px solid #e8ecf5;
//     box-shadow: 0 1px 8px rgba(79,110,247,.07);
//     position: sticky; top: 0; z-index: 100;
//   }
//   .doc-topbar-left { display: flex; align-items: center; gap: 14px; }
//   .doc-hamburger {
//     width: 38px; height: 38px; border-radius: 10px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #4f6ef7; transition: all .18s;
//   }
//   .doc-hamburger:hover { background: #eef1fe; border-color: rgba(79,110,247,.2); }

//   /* blobs */
//   .doc-blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
//   .doc-blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
//   .doc-blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }

//   /* hero */
//   .doc-hero {
//     background: linear-gradient(135deg,#fff 55%,#eef1fe 100%) !important;
//     border: 1px solid #e8ecf5 !important; border-radius: 20px !important;
//     box-shadow: 0 2px 16px rgba(79,110,247,.08) !important;
//     padding: 36px 40px !important; position: relative; overflow: hidden;
//     display: flex; align-items: center; gap: 28px; margin-bottom: 28px;
//   }
//   .doc-hero::after { content:'✦'; position:absolute; right:40px; bottom:10px; font-size:5rem; color:rgba(79,110,247,.04); line-height:1; pointer-events:none; }

//   /* stat cards */
//   .doc-stat {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-radius: 18px !important; box-shadow: 0 1px 6px rgba(79,110,247,.06) !important;
//     padding: 24px 28px; position: relative; overflow: hidden;
//     transition: box-shadow .2s, transform .2s !important;
//   }
//   .doc-stat:hover { box-shadow: 0 6px 24px rgba(79,110,247,.13) !important; transform: translateY(-2px); }
//   .doc-stat-value { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; line-height:1; }
//   .doc-stat-label { font-size:.72rem; color:#8892b0; text-transform:uppercase; letter-spacing:1px; font-weight:600; margin-bottom:8px; }
//   .doc-stat-icon  { position:absolute; right:20px; top:50%; transform:translateY(-50%); font-size:2.4rem; opacity:.07; }

//   /* light card */
//   .doc-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-radius: 18px !important;
//     box-shadow: 0 1px 4px rgba(79,110,247,.06), 0 2px 12px rgba(0,0,0,.04) !important;
//     transition: box-shadow .22s, border-color .22s, transform .22s !important;
//   }
//   .doc-card:hover { box-shadow: 0 4px 24px rgba(79,110,247,.12) !important; border-color: #d4daf0 !important; }

//   /* pending card accent */
//   .doc-pending-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-left: 4px solid #f59e0b !important;
//     border-radius: 18px !important;
//     box-shadow: 0 1px 6px rgba(245,158,11,.08) !important;
//     transition: box-shadow .22s, transform .22s !important;
//   }
//   .doc-pending-card:hover { box-shadow: 0 6px 24px rgba(245,158,11,.14) !important; transform: translateY(-3px); }

//   /* approved card accent */
//   .doc-approved-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-left: 4px solid #059669 !important;
//     border-radius: 18px !important;
//     box-shadow: 0 1px 6px rgba(5,150,105,.08) !important;
//     transition: box-shadow .22s, transform .22s !important;
//   }
//   .doc-approved-card:hover { box-shadow: 0 6px 24px rgba(5,150,105,.14) !important; transform: translateY(-3px); }

//   /* section heading */
//   .doc-sec-heading {
//     font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700; color:#1a1f36;
//     display:flex; align-items:center; gap:12px; margin-bottom:16px;
//   }
//   .doc-sec-heading::after { content:''; flex:1; height:1px; background:#e8ecf5; }

//   .av-blue   { background: linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-violet { background: linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
//   .av-teal   { background: linear-gradient(135deg,#0891b2,#22d3ee) !important; }
//   .av-amber  { background: linear-gradient(135deg,#d97706,#fbbf24) !important; }
//   .av-green  { background: linear-gradient(135deg,#059669,#34d399) !important; }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation: fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
// `;

// if (!document.getElementById("doctor-portal-styles")) {
//   const s = document.createElement("style");
//   s.id = "doctor-portal-styles";
//   s.textContent = globalStyles;
//   document.head.appendChild(s);
// }

// // ── NavItem ────────────────────────────────────────────────────────────────────
// function NavItem({ icon, label, active, onClick }) {
//   return (
//     <div className={`doc-nav-item ${active ? "active" : ""}`} onClick={onClick}>
//       <div className="doc-nav-icon">{icon}</div>
//       {label}
//     </div>
//   );
// }

// // ── StatCard ───────────────────────────────────────────────────────────────────
// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="doc-stat fu">
//       <div className="doc-stat-label">{label}</div>
//       <div className="doc-stat-value" style={{ color }}>{value}</div>
//       <div className="doc-stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── Main ───────────────────────────────────────────────────────────────────────
// export default function DoctorDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [doctor,         setDoctor]         = useState(null);
//   const [patients,       setPatients]       = useState([]);
//   const [appointments,   setAppointments]   = useState([]);
//   const [loading,        setLoading]        = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [sidebarOpen,    setSidebarOpen]    = useState(false);
//   const [view,           setView]           = useState("dashboard");

//   // ── UNCHANGED fetch ──
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const docRes = await axios.get(`http://localhost:8080/doctor/user/${userId}`);
//         if (!docRes.data) { setProfileMissing(true); return; }
//         const doctorData = docRes.data;
//         setDoctor(doctorData);
//         const [patRes, appRes] = await Promise.all([
//           axios.get(`http://localhost:8080/doctor/${doctorData.id}/patients`),
//           axios.get(`http://localhost:8080/appointments/doctor/${doctorData.id}`),
//         ]);
//         setPatients(patRes.data);
//         setAppointments(appRes.data);
//       } catch (err) {
//         console.error(err);
//         setProfileMissing(true);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (userId) fetchData();
//   }, [userId]);

//   // ── UNCHANGED handlers ──
//   const acceptAppointment = async (id) => {
//     await axios.put(`http://localhost:8080/appointments/${id}/approve`);
//     setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "APPROVED" } : a)));
//   };

//   const rejectAppointment = async (id) => {
//     await axios.put(`http://localhost:8080/appointments/${id}/reject`);
//     setAppointments((prev) => prev.filter((a) => a.id !== id));
//   };

//   const handleLogout = () => { logout(); navigate("/"); };
//   const handleNavClick = (key) => { setView(key); setSidebarOpen(false); };

//   // ── Profile missing ──
//   if (profileMissing) {
//     return (
//       <DoctorProfileForm userId={userId} onCreated={(doc) => { setDoctor(doc); setProfileMissing(false); }} />
//     );
//   }

//   if (loading) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <CircularProgress sx={{ color:"#4f6ef7" }} />
//     </Box>
//   );

//   const pending  = appointments.filter((a) => a.status === "PENDING");
//   const approved = appointments.filter((a) => a.status === "APPROVED");

//   const menuItems = [
//     { key: "dashboard", label: "Dashboard",           icon: <DashboardIcon   sx={{ fontSize:18 }} /> },
//     { key: "pending",   label: "Pending Requests",    icon: <EventIcon       sx={{ fontSize:18 }} /> },
//     { key: "approved",  label: "Approved Appointments", icon: <CheckCircleIcon sx={{ fontSize:18 }} /> },
//     { key: "profile",   label: "My Profile",          icon: <PersonIcon      sx={{ fontSize:18 }} /> },
//   ];

//   return (
//     <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
//       <div className="doc-blob doc-blob-1" />
//       <div className="doc-blob doc-blob-2" />

//       {/* Overlay */}
//       {sidebarOpen && <div className="doc-overlay" onClick={() => setSidebarOpen(false)} />}

//       {/* ── Sidebar ── */}
//       <div className={`doc-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="doc-sidebar-top">
//           <div className="doc-logo">
//             <div className="doc-logo-icon">✦</div>
//             Med<span className="doc-logo-accent">Vault</span>
//           </div>
//           <div className="doc-close-btn" onClick={() => setSidebarOpen(false)}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </div>
//         </div>

//         <div className="doc-nav-label">Navigation</div>

//         {menuItems.map((item) => (
//           <NavItem key={item.key} icon={item.icon} label={item.label}
//             active={view === item.key} onClick={() => handleNavClick(item.key)} />
//         ))}

//         <div className="doc-sidebar-spacer" />

//         <div className="doc-user-card">
//           <div className="doc-user-av">{doctor?.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>Dr. {doctor?.name}</Typography>
//             <Typography sx={{ fontSize:".72rem", color:"#8892b0" }}>{doctor?.specialization}</Typography>
//           </Box>
//         </div>

//         <button onClick={handleLogout}
//           style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11,
//                    cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48",
//                    border:"1px solid transparent", background:"none", width:"100%",
//                    fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
//           onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.borderColor="transparent"; }}>
//           <div className="doc-nav-icon" style={{ background:"#fff1f3", color:"#e11d48" }}>
//             <LogoutIcon sx={{ fontSize:16 }} />
//           </div>
//           Sign Out
//         </button>
//       </div>

//       {/* ── Top bar ── */}
//       <div className="doc-topbar">
//         <div className="doc-topbar-left">
//           <div className="doc-hamburger" onClick={() => setSidebarOpen(true)}>
//             <MenuIcon sx={{ fontSize:20 }} />
//           </div>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#4f6ef7" }}>
//             Med<span style={{ color:"#7c3aed" }}>Vault</span>
//           </Typography>
//         </div>
//         <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
//           sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none",
//                 borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>
//           Logout
//         </Button>
//       </div>

//       {/* ── Page content ── */}
//       <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view}
//             initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
//             exit={{ opacity:0, y:-20 }} transition={{ duration:0.3 }}>

//             {/* ── DASHBOARD ── */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Welcome, Dr. {doctor?.name?.split(" ")[0]} 👨‍⚕️
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     Here's your practice overview for today
//                   </Typography>
//                 </Box>

//                 {/* Hero */}
//                 <div className="doc-hero">
//                   <Avatar className="av-blue"
//                     sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem",
//                           fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
//                           boxShadow:"0 8px 24px rgba(79,110,247,.3)", flexShrink:0 }}>
//                     {doctor?.name?.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>
//                       Dr. {doctor?.name}
//                     </Typography>
//                     <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>{doctor?.specialization}</Typography>
//                     <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
//                       {[`📞 ${doctor?.contact}`, `🏥 ${doctor?.hospital}`].map((v, i) => (
//                         <Chip key={i} label={v} size="small"
//                           sx={{ background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.18)", fontWeight:500, fontSize:".75rem" }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </div>

//                 {/* Stats */}
//                 <Grid container spacing={2.5} sx={{ mb:4 }}>
//                   <Grid item xs={12} sm={4}><StatCard label="Total Patients"      value={patients.length}     icon="👥" color="#4f6ef7" /></Grid>
//                   <Grid item xs={12} sm={4}><StatCard label="Total Appointments"  value={appointments.length} icon="📅" color="#7c3aed" /></Grid>
//                   <Grid item xs={12} sm={4}><StatCard label="Pending Requests"    value={pending.length}      icon="⏳" color="#d97706" /></Grid>
//                 </Grid>

//                 {/* Recent pending preview */}
//                 {pending.length > 0 && (
//                   <>
//                     <div className="doc-sec-heading">Pending Requests</div>
//                     <Grid container spacing={2.5}>
//                       {pending.slice(0, 3).map((appt, i) => (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{ scale:1.02 }}>
//                             <Card className="doc-pending-card">
//                               <CardContent sx={{ p:"22px !important" }}>
//                                 <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                                   <Avatar className="av-amber"
//                                     sx={{ width:44, height:44, borderRadius:"12px", fontSize:"1rem", fontWeight:700 }}>
//                                     {appt.patient?.name?.charAt(0)}
//                                   </Avatar>
//                                   <Box>
//                                     <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                     <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                   </Box>
//                                 </Box>
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📝 {appt.description}</Typography>
//                                 <Box sx={{ display:"flex", gap:1 }}>
//                                   <Button size="small" variant="contained"
//                                     onClick={() => acceptAppointment(appt.id)}
//                                     sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"8px",
//                                           textTransform:"none", fontWeight:600, fontSize:".78rem",
//                                           boxShadow:"0 2px 8px rgba(5,150,105,.25)" }}>
//                                     Accept
//                                   </Button>
//                                   <Button size="small" variant="outlined"
//                                     onClick={() => rejectAppointment(appt.id)}
//                                     sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"8px",
//                                           textTransform:"none", fontWeight:600, fontSize:".78rem",
//                                           "&:hover":{ background:"#fff1f3", borderColor:"#e11d48" } }}>
//                                     Reject
//                                   </Button>
//                                 </Box>
//                               </CardContent>
//                             </Card>
//                           </motion.div>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </>
//                 )}
//               </>
//             )}

//             {/* ── PENDING ── */}
//             {view === "pending" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Pending Requests
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     {pending.length} request{pending.length !== 1 ? "s" : ""} awaiting your response
//                   </Typography>
//                 </Box>

//                 {pending.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🎉</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No pending requests!</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {pending.map((appt) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }}>
//                           <Card className="doc-pending-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className="av-amber"
//                                   sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                 </Box>
//                                 <Chip label="Pending" size="small"
//                                   sx={{ ml:"auto", background:"#fffbeb", color:"#d97706", border:"1px solid rgba(217,119,6,.2)", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>📝 {appt.description}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:2 }}>📄 {appt.report || "No report attached"}</Typography>
//                               <Box sx={{ display:"flex", gap:1 }}>
//                                 <Button variant="contained" onClick={() => acceptAppointment(appt.id)}
//                                   sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"9px",
//                                         textTransform:"none", fontWeight:600, fontSize:".83rem",
//                                         boxShadow:"0 3px 10px rgba(5,150,105,.25)", flex:1 }}>
//                                   ✓ Accept
//                                 </Button>
//                                 <Button variant="outlined" onClick={() => rejectAppointment(appt.id)}
//                                   sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"9px",
//                                         textTransform:"none", fontWeight:600, fontSize:".83rem", flex:1,
//                                         "&:hover":{ background:"#fff1f3", borderColor:"#e11d48" } }}>
//                                   ✕ Reject
//                                 </Button>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ── APPROVED ── */}
//             {view === "approved" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Approved Appointments
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     {approved.length} confirmed appointment{approved.length !== 1 ? "s" : ""}
//                   </Typography>
//                 </Box>

//                 {approved.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>📋</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No approved appointments yet.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {approved.map((appt, i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }}>
//                           <Card className="doc-approved-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className="av-green"
//                                   sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                 </Box>
//                                 <Chip label="Approved" size="small"
//                                   sx={{ ml:"auto", background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🎂 DOB: {appt.patient?.dob || "—"}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278" }}>📝 {appt.description}</Typography>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ── PROFILE ── */}
//             {view === "profile" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     My Profile
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Your professional details</Typography>
//                 </Box>
//                 <Card className="doc-card" sx={{ p:4 }}>
//                   <Box sx={{ display:"flex", alignItems:"center", gap:2.5, mb:3 }}>
//                     <Avatar className="av-blue"
//                       sx={{ width:76, height:76, borderRadius:"22px", fontSize:"2rem",
//                             fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
//                             boxShadow:"0 6px 20px rgba(79,110,247,.25)" }}>
//                       {doctor?.name?.charAt(0)}
//                     </Avatar>
//                     <Box>
//                       <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:700, color:"#1a1f36" }}>
//                         Dr. {doctor?.name}
//                       </Typography>
//                       <Typography sx={{ fontSize:".82rem", color:"#8892b0", mt:.5 }}>Doctor Account · Active</Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[
//                       ["Full Name",       `Dr. ${doctor?.name}`],
//                       ["Specialization",  doctor?.specialization],
//                       ["Contact",         doctor?.contact],
//                       ["Hospital",        doctor?.hospital],
//                       ["Doctor ID",       `#${doctor?.id}`],
//                     ].map(([label, val]) => (
//                       <Grid item xs={12} sm={6} key={label}>
//                         <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1.1px", color:"#8892b0", fontWeight:600, mb:.6 }}>
//                           {label}
//                         </Typography>
//                         <Typography sx={{ fontSize:".95rem", fontWeight:500, color:"#1a1f36" }}>{val || "—"}</Typography>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Card>
//               </>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </Box>
//     </Box>
//   );
// }


// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import DoctorProfileForm from "./DoctorProfileForm";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Divider,
//   Modal,
//   IconButton,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import LogoutIcon from "@mui/icons-material/Logout";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import EventIcon from "@mui/icons-material/Event";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PersonIcon from "@mui/icons-material/Person";
// import FolderSharedIcon from "@mui/icons-material/FolderShared";
// import DescriptionIcon from "@mui/icons-material/Description";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .doc-overlay {
//     position: fixed; inset: 0;
//     background: rgba(26,31,54,.18); backdrop-filter: blur(3px);
//     z-index: 199; animation: overlayIn .2s ease;
//   }
//   @keyframes overlayIn { from{opacity:0}to{opacity:1} }

//   .doc-sidebar {
//     width: 260px; background: #ffffff;
//     border-right: 1px solid #e8ecf5;
//     display: flex; flex-direction: column;
//     padding: 20px 14px 24px;
//     position: fixed; top: 0; left: 0;
//     height: 100vh; z-index: 200;
//     box-shadow: 4px 0 28px rgba(79,110,247,.12);
//     transition: transform .28s cubic-bezier(.22,1,.36,1);
//   }
//   .doc-sidebar.closed { transform: translateX(-100%); }
//   .doc-sidebar.open   { transform: translateX(0); }

//   .doc-sidebar-top {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 0 6px 20px;
//   }
//   .doc-logo {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.4rem; font-weight: 700; color: #4f6ef7;
//     display: flex; align-items: center; gap: 9px;
//   }
//   .doc-logo-icon {
//     width: 32px; height: 32px; border-radius: 9px;
//     background: linear-gradient(135deg, #4f6ef7, #7c3aed);
//     display: flex; align-items: center; justify-content: center;
//     color: #fff; font-size: .85rem; flex-shrink: 0;
//   }
//   .doc-logo-accent { color: #7c3aed; }
//   .doc-close-btn {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #8892b0; transition: all .15s;
//   }
//   .doc-close-btn:hover { background: #eef1fe; color: #4f6ef7; border-color: rgba(79,110,247,.2); }

//   .doc-nav-label {
//     font-size: .67rem; text-transform: uppercase; letter-spacing: 1.2px;
//     color: #b0b8d0; font-weight: 600; padding: 0 10px; margin: 4px 0 6px;
//   }
//   .doc-nav-item {
//     display: flex; align-items: center; gap: 11px;
//     padding: 10px 12px; border-radius: 11px; cursor: pointer;
//     font-size: .875rem; font-weight: 500; color: #4a5278;
//     transition: all .18s ease; border: 1px solid transparent;
//     margin-bottom: 3px; user-select: none;
//   }
//   .doc-nav-item:hover { background: #eef1fe; color: #4f6ef7; }
//   .doc-nav-item.active { background: #eef1fe; color: #4f6ef7; font-weight: 600; border-color: rgba(79,110,247,.18); }
//   .doc-nav-item.active .doc-nav-icon { background: #4f6ef7 !important; color: #fff !important; }
//   .doc-nav-icon {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f0f2f8; display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0; transition: all .18s; color: #4a5278;
//   }
//   .doc-sidebar-spacer { flex: 1; }
//   .doc-user-card {
//     display: flex; align-items: center; gap: 11px;
//     padding: 12px; border-radius: 14px;
//     background: #f5f7ff; border: 1px solid #e8ecf5; margin-bottom: 10px;
//   }
//   .doc-user-av {
//     width: 36px; height: 36px; border-radius: 10px;
//     background: linear-gradient(135deg, #4f6ef7, #7c3aed);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Cormorant Garamond', serif; font-weight: 700; color: #fff; font-size: 1.1rem;
//   }

//   .doc-topbar {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 13px 24px; background: #fff;
//     border-bottom: 1px solid #e8ecf5;
//     box-shadow: 0 1px 8px rgba(79,110,247,.07);
//     position: sticky; top: 0; z-index: 100;
//   }
//   .doc-topbar-left { display: flex; align-items: center; gap: 14px; }
//   .doc-hamburger {
//     width: 38px; height: 38px; border-radius: 10px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #4f6ef7; transition: all .18s;
//   }
//   .doc-hamburger:hover { background: #eef1fe; border-color: rgba(79,110,247,.2); }

//   .doc-blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
//   .doc-blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
//   .doc-blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }

//   .doc-hero {
//     background: linear-gradient(135deg,#fff 55%,#eef1fe 100%) !important;
//     border: 1px solid #e8ecf5 !important; border-radius: 20px !important;
//     box-shadow: 0 2px 16px rgba(79,110,247,.08) !important;
//     padding: 36px 40px !important; position: relative; overflow: hidden;
//     display: flex; align-items: center; gap: 28px; margin-bottom: 28px;
//   }
//   .doc-hero::after { content:'✦'; position:absolute; right:40px; bottom:10px; font-size:5rem; color:rgba(79,110,247,.04); line-height:1; pointer-events:none; }

//   .doc-stat {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-radius: 18px !important; box-shadow: 0 1px 6px rgba(79,110,247,.06) !important;
//     padding: 24px 28px; position: relative; overflow: hidden;
//     transition: box-shadow .2s, transform .2s !important;
//   }
//   .doc-stat:hover { box-shadow: 0 6px 24px rgba(79,110,247,.13) !important; transform: translateY(-2px); }
//   .doc-stat-value { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; line-height:1; }
//   .doc-stat-label { font-size:.72rem; color:#8892b0; text-transform:uppercase; letter-spacing:1px; font-weight:600; margin-bottom:8px; }
//   .doc-stat-icon  { position:absolute; right:20px; top:50%; transform:translateY(-50%); font-size:2.4rem; opacity:.07; }

//   .doc-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-radius: 18px !important;
//     box-shadow: 0 1px 4px rgba(79,110,247,.06), 0 2px 12px rgba(0,0,0,.04) !important;
//     transition: box-shadow .22s, border-color .22s, transform .22s !important;
//   }
//   .doc-card:hover { box-shadow: 0 4px 24px rgba(79,110,247,.12) !important; border-color: #d4daf0 !important; }

//   .doc-pending-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-left: 4px solid #f59e0b !important; border-radius: 18px !important;
//     box-shadow: 0 1px 6px rgba(245,158,11,.08) !important;
//     transition: box-shadow .22s, transform .22s !important;
//   }
//   .doc-pending-card:hover { box-shadow: 0 6px 24px rgba(245,158,11,.14) !important; transform: translateY(-3px); }

//   .doc-approved-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-left: 4px solid #059669 !important; border-radius: 18px !important;
//     box-shadow: 0 1px 6px rgba(5,150,105,.08) !important;
//     transition: box-shadow .22s, transform .22s !important;
//   }
//   .doc-approved-card:hover { box-shadow: 0 6px 24px rgba(5,150,105,.14) !important; transform: translateY(-3px); }

//   /* ── Patient record card ── */
//   .doc-patient-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-left: 4px solid #4f6ef7 !important; border-radius: 18px !important;
//     box-shadow: 0 1px 6px rgba(79,110,247,.08) !important;
//     transition: box-shadow .22s, transform .22s, border-color .22s !important;
//     cursor: pointer;
//   }
//   .doc-patient-card:hover { box-shadow: 0 6px 28px rgba(79,110,247,.16) !important; transform: translateY(-3px); border-color: #c7cee8 !important; }

//   /* ── Report badge ── */
//   .report-badge {
//     display: inline-flex; align-items: center; gap: 5px;
//     padding: 4px 10px; border-radius: 8px;
//     font-size: .75rem; font-weight: 500;
//     background: #eef1fe; color: #4f6ef7;
//     border: 1px solid rgba(79,110,247,.18);
//     text-decoration: none; cursor: pointer;
//     transition: all .15s;
//   }
//   .report-badge:hover { background: #e0e8ff; }
//   .report-badge.no-report { background: #f5f7ff; color: #8892b0; border-color: #e8ecf5; cursor: default; }

//   /* ── Modal ── */
//   .patient-modal-box {
//     position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
//     width: 90%; max-width: 540px;
//     background: #fff; border-radius: 22px;
//     border: 1px solid #e8ecf5;
//     box-shadow: 0 20px 60px rgba(79,110,247,.18);
//     padding: 36px; outline: none;
//     max-height: 90vh; overflow-y: auto;
//   }
//   .modal-field-label {
//     font-size: .68rem; text-transform: uppercase; letter-spacing: 1px;
//     color: #8892b0; font-weight: 600; margin-bottom: 5px;
//   }
//   .modal-field-value {
//     font-size: .92rem; font-weight: 500; color: #1a1f36; margin-bottom: 16px;
//   }

//   .doc-sec-heading {
//     font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700; color:#1a1f36;
//     display:flex; align-items:center; gap:12px; margin-bottom:16px;
//   }
//   .doc-sec-heading::after { content:''; flex:1; height:1px; background:#e8ecf5; }

//   .av-blue   { background: linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-violet { background: linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
//   .av-teal   { background: linear-gradient(135deg,#0891b2,#22d3ee) !important; }
//   .av-amber  { background: linear-gradient(135deg,#d97706,#fbbf24) !important; }
//   .av-green  { background: linear-gradient(135deg,#059669,#34d399) !important; }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation: fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
// `;

// if (!document.getElementById("doctor-portal-styles")) {
//   const s = document.createElement("style");
//   s.id = "doctor-portal-styles";
//   s.textContent = globalStyles;
//   document.head.appendChild(s);
// }

// function NavItem({ icon, label, active, onClick }) {
//   return (
//     <div className={`doc-nav-item ${active ? "active" : ""}`} onClick={onClick}>
//       <div className="doc-nav-icon">{icon}</div>
//       {label}
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="doc-stat fu">
//       <div className="doc-stat-label">{label}</div>
//       <div className="doc-stat-value" style={{ color }}>{value}</div>
//       <div className="doc-stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── Patient Detail Modal ───────────────────────────────────────────────────────
// function PatientModal({ appt, open, onClose }) {
//   if (!appt) return null;
//   const p = appt.patient;
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="patient-modal-box">
//         {/* Header */}
//         <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:3 }}>
//           <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
//             <Avatar className="av-blue"
//               sx={{ width:54, height:54, borderRadius:"16px", fontSize:"1.4rem",
//                     fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
//                     boxShadow:"0 4px 14px rgba(79,110,247,.25)" }}>
//               {p?.name?.charAt(0)}
//             </Avatar>
//             <Box>
//               <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#1a1f36" }}>
//                 {p?.name}
//               </Typography>
//               <Typography sx={{ fontSize:".78rem", color:"#8892b0" }}>Patient Record</Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={onClose} size="small"
//             sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px",
//                   "&:hover":{ background:"#eef1fe", color:"#4f6ef7" } }}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </IconButton>
//         </Box>

//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         {/* Patient details */}
//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:700, color:"#1a1f36", mb:2 }}>
//           Patient Information
//         </Typography>
//         <Grid container spacing={2} sx={{ mb:3 }}>
//           {[
//             ["Full Name",    p?.name],
//             ["Age",          p?.age ? `${p.age} years` : "—"],
//             ["Gender",       p?.gender],
//             ["Date of Birth",p?.dob],
//             ["Contact",      p?.contact],
//           ].map(([label, val]) => (
//             <Grid item xs={6} key={label}>
//               <div className="modal-field-label">{label}</div>
//               <div className="modal-field-value">{val || "—"}</div>
//             </Grid>
//           ))}
//         </Grid>

//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         {/* Appointment details */}
//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:700, color:"#1a1f36", mb:2 }}>
//           Appointment Details
//         </Typography>
//         <Grid container spacing={2} sx={{ mb:3 }}>
//           {[
//             ["Date",        appt.date],
//             ["Time Slot",   appt.timeSlot],
//             ["Status",      appt.status],
//           ].map(([label, val]) => (
//             <Grid item xs={6} key={label}>
//               <div className="modal-field-label">{label}</div>
//               <div className="modal-field-value">{val || "—"}</div>
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <div className="modal-field-label">Description / Symptoms</div>
//             <div className="modal-field-value">{appt.description || "—"}</div>
//           </Grid>
//         </Grid>

//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         {/* Report */}
//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:700, color:"#1a1f36", mb:2 }}>
//           Medical Report
//         </Typography>
//         {appt.report ? (
//           <a
//             href={`http://localhost:8080/appointments/report/${appt.report}`}
//             target="_blank"
//             rel="noreferrer"
//             className="report-badge"
//             style={{ display:"inline-flex" }}
//           >
//             <DescriptionIcon sx={{ fontSize:15 }} />
//             View / Download Report
//           </a>
//         ) : (
//           <span className="report-badge no-report">
//             <DescriptionIcon sx={{ fontSize:15 }} />
//             No report attached
//           </span>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ── Main Component ─────────────────────────────────────────────────────────────
// export default function DoctorDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [doctor,         setDoctor]         = useState(null);
//   const [appointments,   setAppointments]   = useState([]);
//   const [loading,        setLoading]        = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [sidebarOpen,    setSidebarOpen]    = useState(false);
//   const [view,           setView]           = useState("dashboard");
//   const [selectedAppt,   setSelectedAppt]   = useState(null);  // for modal

//   // ── UNCHANGED fetch ──
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const docRes = await axios.get(`http://localhost:8080/doctor/user/${userId}`);
//         if (!docRes.data) { setProfileMissing(true); return; }
//         setDoctor(docRes.data);
//         const appRes = await axios.get(`http://localhost:8080/appointments/doctor/${docRes.data.id}`);
//         setAppointments(appRes.data);
//       } catch (err) {
//         console.error(err);
//         setProfileMissing(true);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (userId) fetchData();
//   }, [userId]);

//   // ── UNCHANGED handlers ──
//   const acceptAppointment = async (id) => {
//     await axios.put(`http://localhost:8080/appointments/${id}/approve`);
//     setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "APPROVED" } : a)));
//   };

//   const rejectAppointment = async (id) => {
//     await axios.put(`http://localhost:8080/appointments/${id}/reject`);
//     setAppointments((prev) => prev.filter((a) => a.id !== id));
//   };

//   const handleLogout = () => { 
//     // const item=localStorage.getItem("user")
//     // console.log(item);
//      localStorage.removeItem("user")
//     // logout();
//      navigate("/"); 
//   };
//   const handleNavClick = (key) => { setView(key); setSidebarOpen(false); };

//   if (profileMissing) {
//     return <DoctorProfileForm userId={userId} onCreated={(doc) => { setDoctor(doc); setProfileMissing(false); }} />;
//   }
//   if (loading) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <CircularProgress sx={{ color:"#4f6ef7" }} />
//     </Box>
//   );

//   const pending  = appointments.filter((a) => a.status === "PENDING");
//   const approved = appointments.filter((a) => a.status === "APPROVED");

//   // ✅ Patient count = number of unique approved patients
//   const uniquePatientCount = new Set(approved.map((a) => a.patient?.id)).size;

//   const menuItems = [
//     { key: "dashboard",  label: "Dashboard",             icon: <DashboardIcon    sx={{ fontSize:18 }} /> },
//     { key: "pending",    label: "Pending Requests",      icon: <EventIcon        sx={{ fontSize:18 }} /> },
//     { key: "approved",   label: "Approved Appointments", icon: <CheckCircleIcon  sx={{ fontSize:18 }} /> },
//     { key: "records",    label: "Patient Records",       icon: <FolderSharedIcon sx={{ fontSize:18 }} /> },
//     { key: "profile",    label: "My Profile",            icon: <PersonIcon       sx={{ fontSize:18 }} /> },
//   ];

//   return (
//     <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
//       <div className="doc-blob doc-blob-1" />
//       <div className="doc-blob doc-blob-2" />

//       {sidebarOpen && <div className="doc-overlay" onClick={() => setSidebarOpen(false)} />}

//       {/* ── Sidebar ── */}
//       <div className={`doc-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="doc-sidebar-top">
//           <div className="doc-logo">
//             <div className="doc-logo-icon">✦</div>
//             Med<span className="doc-logo-accent">Vault</span>
//           </div>
//           <div className="doc-close-btn" onClick={() => setSidebarOpen(false)}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </div>
//         </div>

//         <div className="doc-nav-label">Navigation</div>
//         {menuItems.map((item) => (
//           <NavItem key={item.key} icon={item.icon} label={item.label}
//             active={view === item.key} onClick={() => handleNavClick(item.key)} />
//         ))}

//         <div className="doc-sidebar-spacer" />

//         <div className="doc-user-card">
//           <div className="doc-user-av">{doctor?.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>Dr. {doctor?.name}</Typography>
//             <Typography sx={{ fontSize:".72rem", color:"#8892b0" }}>{doctor?.specialization}</Typography>
//           </Box>
//         </div>

//         <button onClick={handleLogout}
//           style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11,
//                    cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48",
//                    border:"1px solid transparent", background:"none", width:"100%",
//                    fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
//           onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.borderColor="transparent"; }}>
//           <div className="doc-nav-icon" style={{ background:"#fff1f3", color:"#e11d48" }}>
//             <LogoutIcon sx={{ fontSize:16 }} />
//           </div>
//           Sign Out
//         </button>
//       </div>

//       {/* ── Top bar ── */}
//       <div className="doc-topbar">
//         <div className="doc-topbar-left">
//           <div className="doc-hamburger" onClick={() => setSidebarOpen(true)}>
//             <MenuIcon sx={{ fontSize:20 }} />
//           </div>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#4f6ef7" }}>
//             Med<span style={{ color:"#7c3aed" }}>Vault</span>
//           </Typography>
//         </div>
//         <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
//           sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none",
//                 borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>
//           Logout
//         </Button>
//       </div>

//       {/* ── Page content ── */}
//       <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view}
//             initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
//             exit={{ opacity:0, y:-20 }} transition={{ duration:0.3 }}>

//             {/* ── DASHBOARD ── */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Welcome, Dr. {doctor?.name?.split(" ")[0]} 👨‍⚕️
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     Here's your practice overview for today
//                   </Typography>
//                 </Box>

//                 <div className="doc-hero">
//                   <Avatar className="av-blue"
//                     sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem",
//                           fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
//                           boxShadow:"0 8px 24px rgba(79,110,247,.3)", flexShrink:0 }}>
//                     {doctor?.name?.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>
//                       Dr. {doctor?.name}
//                     </Typography>
//                     <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>{doctor?.specialization}</Typography>
//                     <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
//                       {[`📞 ${doctor?.contact}`, `🏥 ${doctor?.hospital}`].map((v, i) => (
//                         <Chip key={i} label={v} size="small"
//                           sx={{ background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.18)", fontWeight:500, fontSize:".75rem" }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </div>

//                 {/* Stats — patient count = approved unique patients */}
//                 <Grid container spacing={2.5} sx={{ mb:4 }}>
//                   <Grid item xs={12} sm={4}>
//                     <StatCard label="Patients" value={uniquePatientCount} icon="👥" color="#4f6ef7" />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                     <StatCard label="Total Appointments" value={appointments.length} icon="📅" color="#7c3aed" />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                     <StatCard label="Pending Requests" value={pending.length} icon="⏳" color="#d97706" />
//                   </Grid>
//                 </Grid>

//                 {pending.length > 0 && (
//                   <>
//                     <div className="doc-sec-heading">Pending Requests</div>
//                     <Grid container spacing={2.5}>
//                       {pending.slice(0, 3).map((appt, i) => (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{ scale:1.02 }}>
//                             <Card className="doc-pending-card">
//                               <CardContent sx={{ p:"22px !important" }}>
//                                 <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                                   <Avatar className="av-amber" sx={{ width:44, height:44, borderRadius:"12px", fontSize:"1rem", fontWeight:700 }}>
//                                     {appt.patient?.name?.charAt(0)}
//                                   </Avatar>
//                                   <Box>
//                                     <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                     <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                   </Box>
//                                 </Box>
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📝 {appt.description}</Typography>
//                                 <Box sx={{ display:"flex", gap:1 }}>
//                                   <Button size="small" variant="contained" onClick={() => acceptAppointment(appt.id)}
//                                     sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"8px",
//                                           textTransform:"none", fontWeight:600, fontSize:".78rem" }}>
//                                     ✓ Accept
//                                   </Button>
//                                   <Button size="small" variant="outlined" onClick={() => rejectAppointment(appt.id)}
//                                     sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"8px",
//                                           textTransform:"none", fontWeight:600, fontSize:".78rem",
//                                           "&:hover":{ background:"#fff1f3" } }}>
//                                     ✕ Reject
//                                   </Button>
//                                 </Box>
//                               </CardContent>
//                             </Card>
//                           </motion.div>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </>
//                 )}
//               </>
//             )}

//             {/* ── PENDING ── */}
//             {view === "pending" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Pending Requests</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{pending.length} request{pending.length !== 1 ? "s" : ""} awaiting your response</Typography>
//                 </Box>
//                 {pending.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🎉</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No pending requests!</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {pending.map((appt) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }}>
//                           <Card className="doc-pending-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className="av-amber" sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                 </Box>
//                                 <Chip label="Pending" size="small"
//                                   sx={{ ml:"auto", background:"#fffbeb", color:"#d97706", border:"1px solid rgba(217,119,6,.2)", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>📝 {appt.description}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:2 }}>📄 {appt.report || "No report attached"}</Typography>
//                               <Box sx={{ display:"flex", gap:1 }}>
//                                 <Button variant="contained" onClick={() => acceptAppointment(appt.id)}
//                                   sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"9px",
//                                         textTransform:"none", fontWeight:600, fontSize:".83rem",
//                                         boxShadow:"0 3px 10px rgba(5,150,105,.25)", flex:1 }}>
//                                   ✓ Accept
//                                 </Button>
//                                 <Button variant="outlined" onClick={() => rejectAppointment(appt.id)}
//                                   sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"9px",
//                                         textTransform:"none", fontWeight:600, fontSize:".83rem", flex:1,
//                                         "&:hover":{ background:"#fff1f3", borderColor:"#e11d48" } }}>
//                                   ✕ Reject
//                                 </Button>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ── APPROVED ── */}
//             {view === "approved" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Approved Appointments</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{approved.length} confirmed appointment{approved.length !== 1 ? "s" : ""}</Typography>
//                 </Box>
//                 {approved.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>📋</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No approved appointments yet.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {approved.map((appt, i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }}>
//                           <Card className="doc-approved-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className="av-green" sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                 </Box>
//                                 <Chip label="Approved" size="small"
//                                   sx={{ ml:"auto", background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🎂 DOB: {appt.patient?.dob || "—"}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278" }}>📝 {appt.description}</Typography>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ── PATIENT RECORDS ── */}
//             {view === "records" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Patient Records
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     {uniquePatientCount} patient{uniquePatientCount !== 1 ? "s" : ""} · click a card to view full details & report
//                   </Typography>
//                 </Box>

//                 {approved.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🗂️</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No patient records yet. Approve appointments to see records here.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {approved.map((appt, i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }} onClick={() => setSelectedAppt(appt)}>
//                           <Card className="doc-patient-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               {/* Patient row */}
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className={["av-blue","av-violet","av-teal","av-green"][i % 4]}
//                                   sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box sx={{ flex:1 }}>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>
//                                     {appt.patient?.gender} · Age {appt.patient?.age}
//                                   </Typography>
//                                 </Box>
//                                 <Chip label="Approved" size="small"
//                                   sx={{ background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>

//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />

//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.5 }}>🕐 {appt.timeSlot} &nbsp;·&nbsp; 📅 {appt.date}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }} noWrap>📝 {appt.description}</Typography>

//                               {/* Report badge */}
//                               <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                                 <span className={`report-badge ${appt.report ? "" : "no-report"}`}>
//                                   <DescriptionIcon sx={{ fontSize:14 }} />
//                                   {appt.report ? "Report attached" : "No report"}
//                                 </span>
//                                 <Typography sx={{ fontSize:".76rem", color:"#4f6ef7", fontWeight:600, cursor:"pointer" }}>
//                                   View details →
//                                 </Typography>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ── PROFILE ── */}
//             {view === "profile" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>My Profile</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Your professional details</Typography>
//                 </Box>
//                 <Card className="doc-card" sx={{ p:4 }}>
//                   <Box sx={{ display:"flex", alignItems:"center", gap:2.5, mb:3 }}>
//                     <Avatar className="av-blue"
//                       sx={{ width:76, height:76, borderRadius:"22px", fontSize:"2rem",
//                             fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
//                             boxShadow:"0 6px 20px rgba(79,110,247,.25)" }}>
//                       {doctor?.name?.charAt(0)}
//                     </Avatar>
//                     <Box>
//                       <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:700, color:"#1a1f36" }}>
//                         Dr. {doctor?.name}
//                       </Typography>
//                       <Typography sx={{ fontSize:".82rem", color:"#8892b0", mt:.5 }}>Doctor Account · Active</Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[
//                       ["Full Name",      `Dr. ${doctor?.name}`],
//                       ["Specialization", doctor?.specialization],
//                       ["Contact",        doctor?.contact],
//                       ["Hospital",       doctor?.hospital],
//                       ["Doctor ID",      `#${doctor?.id}`],
//                     ].map(([label, val]) => (
//                       <Grid item xs={12} sm={6} key={label}>
//                         <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1.1px", color:"#8892b0", fontWeight:600, mb:.6 }}>{label}</Typography>
//                         <Typography sx={{ fontSize:".95rem", fontWeight:500, color:"#1a1f36" }}>{val || "—"}</Typography>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Card>
//               </>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </Box>

//       {/* ── Patient detail modal ── */}
//       <PatientModal
//         appt={selectedAppt}
//         open={Boolean(selectedAppt)}
//         onClose={() => setSelectedAppt(null)}
//       />
//     </Box>
//   );
// }



// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import DoctorProfileForm from "./DoctorProfileForm";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Divider,
//   Modal,
//   IconButton,
// } from "@mui/material";
// import MenuIcon           from "@mui/icons-material/Menu";
// import CloseIcon          from "@mui/icons-material/Close";
// import LogoutIcon         from "@mui/icons-material/Logout";
// import DashboardIcon      from "@mui/icons-material/Dashboard";
// import EventIcon          from "@mui/icons-material/Event";
// import CheckCircleIcon    from "@mui/icons-material/CheckCircle";
// import PersonIcon         from "@mui/icons-material/Person";
// import FolderSharedIcon   from "@mui/icons-material/FolderShared";
// import DescriptionIcon    from "@mui/icons-material/Description";
// import OpenInNewIcon      from "@mui/icons-material/OpenInNew";
// import DownloadIcon       from "@mui/icons-material/Download";
// import VisibilityIcon     from "@mui/icons-material/Visibility";
// import VisibilityOffIcon  from "@mui/icons-material/VisibilityOff";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// // ── BASE URL for reports ───────────────────────────────────────────────────────
// const BASE = "http://localhost:8080";

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .doc-overlay {
//     position: fixed; inset: 0;
//     background: rgba(26,31,54,.18); backdrop-filter: blur(3px);
//     z-index: 199; animation: overlayIn .2s ease;
//   }
//   @keyframes overlayIn { from{opacity:0}to{opacity:1} }

//   .doc-sidebar {
//     width: 260px; background: #ffffff;
//     border-right: 1px solid #e8ecf5;
//     display: flex; flex-direction: column;
//     padding: 20px 14px 24px;
//     position: fixed; top: 0; left: 0;
//     height: 100vh; z-index: 200;
//     box-shadow: 4px 0 28px rgba(79,110,247,.12);
//     transition: transform .28s cubic-bezier(.22,1,.36,1);
//   }
//   .doc-sidebar.closed { transform: translateX(-100%); }
//   .doc-sidebar.open   { transform: translateX(0); }
//   .doc-sidebar-top {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 0 6px 20px;
//   }
//   .doc-logo {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.4rem; font-weight: 700; color: #4f6ef7;
//     display: flex; align-items: center; gap: 9px;
//   }
//   .doc-logo-icon {
//     width: 32px; height: 32px; border-radius: 9px;
//     background: linear-gradient(135deg, #4f6ef7, #7c3aed);
//     display: flex; align-items: center; justify-content: center;
//     color: #fff; font-size: .85rem; flex-shrink: 0;
//   }
//   .doc-logo-accent { color: #7c3aed; }
//   .doc-close-btn {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #8892b0; transition: all .15s;
//   }
//   .doc-close-btn:hover { background: #eef1fe; color: #4f6ef7; border-color: rgba(79,110,247,.2); }
//   .doc-nav-label {
//     font-size: .67rem; text-transform: uppercase; letter-spacing: 1.2px;
//     color: #b0b8d0; font-weight: 600; padding: 0 10px; margin: 4px 0 6px;
//   }
//   .doc-nav-item {
//     display: flex; align-items: center; gap: 11px;
//     padding: 10px 12px; border-radius: 11px; cursor: pointer;
//     font-size: .875rem; font-weight: 500; color: #4a5278;
//     transition: all .18s ease; border: 1px solid transparent;
//     margin-bottom: 3px; user-select: none;
//   }
//   .doc-nav-item:hover { background: #eef1fe; color: #4f6ef7; }
//   .doc-nav-item.active { background: #eef1fe; color: #4f6ef7; font-weight: 600; border-color: rgba(79,110,247,.18); }
//   .doc-nav-item.active .doc-nav-icon { background: #4f6ef7 !important; color: #fff !important; }
//   .doc-nav-icon {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f0f2f8; display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0; transition: all .18s; color: #4a5278;
//   }
//   .doc-sidebar-spacer { flex: 1; }
//   .doc-user-card {
//     display: flex; align-items: center; gap: 11px;
//     padding: 12px; border-radius: 14px;
//     background: #f5f7ff; border: 1px solid #e8ecf5; margin-bottom: 10px;
//   }
//   .doc-user-av {
//     width: 36px; height: 36px; border-radius: 10px;
//     background: linear-gradient(135deg, #4f6ef7, #7c3aed);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Cormorant Garamond', serif; font-weight: 700; color: #fff; font-size: 1.1rem;
//   }
//   .doc-topbar {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 13px 24px; background: #fff;
//     border-bottom: 1px solid #e8ecf5;
//     box-shadow: 0 1px 8px rgba(79,110,247,.07);
//     position: sticky; top: 0; z-index: 100;
//   }
//   .doc-topbar-left { display: flex; align-items: center; gap: 14px; }
//   .doc-hamburger {
//     width: 38px; height: 38px; border-radius: 10px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #4f6ef7; transition: all .18s;
//   }
//   .doc-hamburger:hover { background: #eef1fe; border-color: rgba(79,110,247,.2); }
//   .doc-blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
//   .doc-blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
//   .doc-blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }
//   .doc-hero {
//     background: linear-gradient(135deg,#fff 55%,#eef1fe 100%) !important;
//     border: 1px solid #e8ecf5 !important; border-radius: 20px !important;
//     box-shadow: 0 2px 16px rgba(79,110,247,.08) !important;
//     padding: 36px 40px !important; position: relative; overflow: hidden;
//     display: flex; align-items: center; gap: 28px; margin-bottom: 28px;
//   }
//   .doc-hero::after { content:'✦'; position:absolute; right:40px; bottom:10px; font-size:5rem; color:rgba(79,110,247,.04); line-height:1; pointer-events:none; }
//   .doc-stat {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-radius: 18px !important; box-shadow: 0 1px 6px rgba(79,110,247,.06) !important;
//     padding: 24px 28px; position: relative; overflow: hidden;
//     transition: box-shadow .2s, transform .2s !important;
//   }
//   .doc-stat:hover { box-shadow: 0 6px 24px rgba(79,110,247,.13) !important; transform: translateY(-2px); }
//   .doc-stat-value { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; line-height:1; }
//   .doc-stat-label { font-size:.72rem; color:#8892b0; text-transform:uppercase; letter-spacing:1px; font-weight:600; margin-bottom:8px; }
//   .doc-stat-icon  { position:absolute; right:20px; top:50%; transform:translateY(-50%); font-size:2.4rem; opacity:.07; }
//   .doc-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-radius: 18px !important;
//     box-shadow: 0 1px 4px rgba(79,110,247,.06), 0 2px 12px rgba(0,0,0,.04) !important;
//     transition: box-shadow .22s, border-color .22s, transform .22s !important;
//   }
//   .doc-card:hover { box-shadow: 0 4px 24px rgba(79,110,247,.12) !important; border-color: #d4daf0 !important; }
//   .doc-pending-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-left: 4px solid #f59e0b !important; border-radius: 18px !important;
//     box-shadow: 0 1px 6px rgba(245,158,11,.08) !important;
//     transition: box-shadow .22s, transform .22s !important;
//   }
//   .doc-pending-card:hover { box-shadow: 0 6px 24px rgba(245,158,11,.14) !important; transform: translateY(-3px); }
//   .doc-approved-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-left: 4px solid #059669 !important; border-radius: 18px !important;
//     box-shadow: 0 1px 6px rgba(5,150,105,.08) !important;
//     transition: box-shadow .22s, transform .22s !important;
//   }
//   .doc-approved-card:hover { box-shadow: 0 6px 24px rgba(5,150,105,.14) !important; transform: translateY(-3px); }
//   .doc-patient-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-left: 4px solid #4f6ef7 !important; border-radius: 18px !important;
//     box-shadow: 0 1px 6px rgba(79,110,247,.08) !important;
//     transition: box-shadow .22s, transform .22s, border-color .22s !important;
//     cursor: pointer;
//   }
//   .doc-patient-card:hover { box-shadow: 0 6px 28px rgba(79,110,247,.16) !important; transform: translateY(-3px); border-color: #c7cee8 !important; }

//   /* ── Report badge on cards ── */
//   .report-badge {
//     display: inline-flex; align-items: center; gap: 5px;
//     padding: 4px 10px; border-radius: 8px;
//     font-size: .75rem; font-weight: 500;
//     background: #eef1fe; color: #4f6ef7;
//     border: 1px solid rgba(79,110,247,.18);
//     cursor: pointer; transition: all .15s; text-decoration: none;
//   }
//   .report-badge:hover { background: #e0e8ff; }
//   .report-badge.no-report { background: #f5f7ff; color: #8892b0; border-color: #e8ecf5; cursor: default; pointer-events: none; }

//   /* ── Modal ── */
//   .patient-modal-box {
//     position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
//     width: 92%; max-width: 600px;
//     background: #fff; border-radius: 22px;
//     border: 1px solid #e8ecf5;
//     box-shadow: 0 20px 60px rgba(79,110,247,.18);
//     padding: 36px; outline: none;
//     max-height: 90vh; overflow-y: auto;
//   }
//   .modal-field-label {
//     font-size: .68rem; text-transform: uppercase; letter-spacing: 1px;
//     color: #8892b0; font-weight: 600; margin-bottom: 5px;
//   }
//   .modal-field-value {
//     font-size: .92rem; font-weight: 500; color: #1a1f36; margin-bottom: 16px;
//   }

//   /* ── Report viewer inside modal ── */
//   .report-viewer-box {
//     border: 1.5px dashed #d4daf0; border-radius: 14px;
//     background: #f8f9ff; padding: 22px;
//     display: flex; flex-direction: column; align-items: center; gap: 14px;
//     text-align: center;
//   }
//   .report-viewer-icon {
//     width: 52px; height: 52px; border-radius: 14px;
//     background: linear-gradient(135deg,#4f6ef7,#818cf8);
//     display: flex; align-items: center; justify-content: center;
//     color: #fff; box-shadow: 0 4px 14px rgba(79,110,247,.28);
//   }
//   .report-filename {
//     font-size: .82rem; font-weight: 500; color: #4a5278;
//     word-break: break-all; max-width: 100%;
//   }
//   .report-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
//   .report-btn-primary {
//     display: inline-flex; align-items: center; gap: 6px;
//     padding: 9px 18px; border-radius: 10px; cursor: pointer;
//     font-size: .84rem; font-weight: 600; text-decoration: none;
//     background: linear-gradient(135deg,#4f6ef7,#818cf8); color: #fff;
//     border: none; box-shadow: 0 3px 12px rgba(79,110,247,.26);
//     transition: all .18s; font-family: 'Outfit', sans-serif;
//   }
//   .report-btn-primary:hover { box-shadow: 0 5px 20px rgba(79,110,247,.38); transform: translateY(-1px); }
//   .report-btn-secondary {
//     display: inline-flex; align-items: center; gap: 6px;
//     padding: 9px 18px; border-radius: 10px; cursor: pointer;
//     font-size: .84rem; font-weight: 600; text-decoration: none;
//     background: #fff; color: #4f6ef7;
//     border: 1.5px solid rgba(79,110,247,.28);
//     transition: all .18s; font-family: 'Outfit', sans-serif;
//   }
//   .report-btn-secondary:hover { background: #eef1fe; border-color: #4f6ef7; }
//   .report-preview-wrap {
//     width: 100%; border-radius: 12px; overflow: hidden;
//     border: 1px solid #e8ecf5; margin-top: 4px;
//     animation: fadeUp .3s ease both;
//   }
//   .report-preview-wrap iframe { width: 100%; height: 400px; border: none; display: block; }
//   .report-preview-wrap img   { width: 100%; display: block; max-height: 440px; object-fit: contain; background: #f0f2f8; }
//   .no-report-box {
//     border: 1.5px dashed #e8ecf5; border-radius: 14px;
//     padding: 20px; background: #f5f7ff;
//     display: flex; align-items: center; gap: 12px;
//   }

//   .doc-sec-heading {
//     font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700; color:#1a1f36;
//     display:flex; align-items:center; gap:12px; margin-bottom:16px;
//   }
//   .doc-sec-heading::after { content:''; flex:1; height:1px; background:#e8ecf5; }

//   .av-blue   { background: linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-violet { background: linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
//   .av-teal   { background: linear-gradient(135deg,#0891b2,#22d3ee) !important; }
//   .av-amber  { background: linear-gradient(135deg,#d97706,#fbbf24) !important; }
//   .av-green  { background: linear-gradient(135deg,#059669,#34d399) !important; }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation: fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
// `;

// if (!document.getElementById("doctor-portal-styles")) {
//   const s = document.createElement("style");
//   s.id = "doctor-portal-styles";
//   s.textContent = globalStyles;
//   document.head.appendChild(s);
// }

// // ── Nav item ───────────────────────────────────────────────────────────────────
// function NavItem({ icon, label, active, onClick }) {
//   return (
//     <div className={`doc-nav-item ${active ? "active" : ""}`} onClick={onClick}>
//       <div className="doc-nav-icon">{icon}</div>
//       {label}
//     </div>
//   );
// }

// // ── Stat card ──────────────────────────────────────────────────────────────────
// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="doc-stat fu">
//       <div className="doc-stat-label">{label}</div>
//       <div className="doc-stat-value" style={{ color }}>{value}</div>
//       <div className="doc-stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── Report Viewer ─────────────────────────────────────────────────────────────
// // Shows file info + Preview / Open in Tab / Download buttons
// // For PDF and images it can render an inline preview
// function ReportViewer({ filename }) {
//   const [showPreview, setShowPreview] = useState(false);

//   if (!filename) {
//     return (
//       <div className="no-report-box">
//         <DescriptionIcon sx={{ fontSize: 30, color: "#c0c8e0", flexShrink: 0 }} />
//         <Box>
//           <Typography sx={{ fontWeight: 600, fontSize: ".88rem", color: "#4a5278" }}>
//             No report attached
//           </Typography>
//           <Typography sx={{ fontSize: ".76rem", color: "#b0b8d0", mt: .4 }}>
//             The patient did not upload a report for this appointment.
//           </Typography>
//         </Box>
//       </div>
//     );
//   }

//   const reportUrl = `${BASE}/appointments/report/${filename}`;
//   const lower     = filename.toLowerCase();
//   const isPdf     = lower.endsWith(".pdf");
//   const isImage   = lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp");
//   const canPreview = isPdf || isImage;

//   return (
//     <div className="report-viewer-box">
//       {/* Icon + filename */}
//       <div className="report-viewer-icon">
//         <DescriptionIcon sx={{ fontSize: 26 }} />
//       </div>
//       <div className="report-filename">{filename}</div>

//       {/* Action buttons */}
//       <div className="report-actions">
//         {/* Inline preview toggle (only for PDF / images) */}
//         {canPreview && (
//           <button
//             className="report-btn-primary"
//             onClick={() => setShowPreview((p) => !p)}
//           >
//             {showPreview
//               ? <><VisibilityOffIcon sx={{ fontSize: 16 }} /> Hide Preview</>
//               : <><VisibilityIcon    sx={{ fontSize: 16 }} /> Preview</>
//             }
//           </button>
//         )}

//         {/* Open in new browser tab */}
//         <a href={reportUrl} target="_blank" rel="noreferrer" className="report-btn-primary">
//           <OpenInNewIcon sx={{ fontSize: 16 }} />
//           Open in Tab
//         </a>

//         {/* Download */}
//         <a href={reportUrl} download={filename} className="report-btn-secondary">
//           <DownloadIcon sx={{ fontSize: 16 }} />
//           Download
//         </a>
//       </div>

//       {/* Inline preview panel */}
//       {showPreview && (
//         <div className="report-preview-wrap" style={{ width: "100%" }}>
//           {isPdf   && <iframe src={reportUrl} title="Report PDF"   />}
//           {isImage && <img    src={reportUrl} alt="Patient Report" />}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Patient Detail Modal ───────────────────────────────────────────────────────
// function PatientModal({ appt, open, onClose }) {
//   if (!appt) return null;
//   const p = appt.patient;

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="patient-modal-box">

//         {/* Header */}
//         <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:3 }}>
//           <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
//             <Avatar className="av-blue"
//               sx={{ width:54, height:54, borderRadius:"16px", fontSize:"1.4rem",
//                     fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
//                     boxShadow:"0 4px 14px rgba(79,110,247,.25)" }}>
//               {p?.name?.charAt(0)}
//             </Avatar>
//             <Box>
//               <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#1a1f36" }}>
//                 {p?.name}
//               </Typography>
//               <Typography sx={{ fontSize:".78rem", color:"#8892b0" }}>Patient Record</Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={onClose} size="small"
//             sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px",
//                   "&:hover":{ background:"#eef1fe", color:"#4f6ef7" } }}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </IconButton>
//         </Box>

//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         {/* Patient info */}
//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36", mb:2 }}>
//           Patient Information
//         </Typography>
//         <Grid container spacing={2} sx={{ mb:3 }}>
//           {[
//             ["Full Name",     p?.name],
//             ["Age",           p?.age ? `${p.age} years` : "—"],
//             ["Gender",        p?.gender],
//             ["Date of Birth", p?.dob],
//             ["Contact",       p?.contact],
//           ].map(([label, val]) => (
//             <Grid item xs={6} key={label}>
//               <div className="modal-field-label">{label}</div>
//               <div className="modal-field-value">{val || "—"}</div>
//             </Grid>
//           ))}
//         </Grid>

//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         {/* Appointment details */}
//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36", mb:2 }}>
//           Appointment Details
//         </Typography>
//         <Grid container spacing={2} sx={{ mb:3 }}>
//           {[
//             ["Date",      appt.date],
//             ["Time Slot", appt.timeSlot],
//             ["Status",    appt.status],
//           ].map(([label, val]) => (
//             <Grid item xs={6} key={label}>
//               <div className="modal-field-label">{label}</div>
//               <div className="modal-field-value">{val || "—"}</div>
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <div className="modal-field-label">Description / Symptoms</div>
//             <div className="modal-field-value">{appt.description || "—"}</div>
//           </Grid>
//         </Grid>

//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         {/* ✅ Medical Report — full viewer with preview + download */}
//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36", mb:2 }}>
//           Medical Report
//         </Typography>

//         {/* appt.report is the filename returned by @JsonProperty("report") in Appointment.java */}
//         <ReportViewer filename={appt.report} />

//       </Box>
//     </Modal>
//   );
// }

// // ── Main Component ─────────────────────────────────────────────────────────────
// export default function DoctorDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [doctor,         setDoctor]         = useState(null);
//   const [appointments,   setAppointments]   = useState([]);
//   const [loading,        setLoading]        = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [sidebarOpen,    setSidebarOpen]    = useState(false);
//   const [view,           setView]           = useState("dashboard");
//   const [selectedAppt,   setSelectedAppt]   = useState(null);  // controls modal

//   // ── UNCHANGED fetch ──
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const docRes = await axios.get(`${BASE}/doctor/user/${userId}`);
//         if (!docRes.data) { setProfileMissing(true); return; }
//         setDoctor(docRes.data);
//         const appRes = await axios.get(`${BASE}/appointments/doctor/${docRes.data.id}`);
//         setAppointments(appRes.data);
//       } catch (err) {
//         console.error(err);
//         setProfileMissing(true);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (userId) fetchData();
//   }, [userId]);

//   // ── UNCHANGED handlers ──
//   const acceptAppointment = async (id) => {
//     await axios.put(`${BASE}/appointments/${id}/approve`);
//     setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "APPROVED" } : a)));
//   };

//   const rejectAppointment = async (id) => {
//     await axios.put(`${BASE}/appointments/${id}/reject`);
//     setAppointments((prev) => prev.filter((a) => a.id !== id));
//   };

//   // ── UNCHANGED logout (preserving your exact version) ──
//   const handleLogout = () => {
//     // const item = localStorage.getItem("user");
//     // console.log(item);
//     localStorage.removeItem("user");
//     // logout();
//     navigate("/");
//   };

//   const handleNavClick = (key) => { setView(key); setSidebarOpen(false); };

//   if (profileMissing) {
//     return <DoctorProfileForm userId={userId} onCreated={(doc) => { setDoctor(doc); setProfileMissing(false); }} />;
//   }
//   if (loading) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <CircularProgress sx={{ color:"#4f6ef7" }} />
//     </Box>
//   );

//   const pending  = appointments.filter((a) => a.status === "PENDING");
//   const approved = appointments.filter((a) => a.status === "APPROVED");
//   const uniquePatientCount = new Set(approved.map((a) => a.patient?.id)).size;

//   const menuItems = [
//     { key: "dashboard",  label: "Dashboard",             icon: <DashboardIcon    sx={{ fontSize:18 }} /> },
//     { key: "pending",    label: "Pending Requests",      icon: <EventIcon        sx={{ fontSize:18 }} /> },
//     { key: "approved",   label: "Approved Appointments", icon: <CheckCircleIcon  sx={{ fontSize:18 }} /> },
//     { key: "records",    label: "Patient Records",       icon: <FolderSharedIcon sx={{ fontSize:18 }} /> },
//     { key: "profile",    label: "My Profile",            icon: <PersonIcon       sx={{ fontSize:18 }} /> },
//   ];

//   return (
//     <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
//       <div className="doc-blob doc-blob-1" />
//       <div className="doc-blob doc-blob-2" />

//       {sidebarOpen && <div className="doc-overlay" onClick={() => setSidebarOpen(false)} />}

//       {/* ── Sidebar ── */}
//       <div className={`doc-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="doc-sidebar-top">
//           <div className="doc-logo">
//             <div className="doc-logo-icon">✦</div>
//             Med<span className="doc-logo-accent">Vault</span>
//           </div>
//           <div className="doc-close-btn" onClick={() => setSidebarOpen(false)}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </div>
//         </div>

//         <div className="doc-nav-label">Navigation</div>
//         {menuItems.map((item) => (
//           <NavItem key={item.key} icon={item.icon} label={item.label}
//             active={view === item.key} onClick={() => handleNavClick(item.key)} />
//         ))}

//         <div className="doc-sidebar-spacer" />

//         <div className="doc-user-card">
//           <div className="doc-user-av">{doctor?.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>Dr. {doctor?.name}</Typography>
//             <Typography sx={{ fontSize:".72rem", color:"#8892b0" }}>{doctor?.specialization}</Typography>
//           </Box>
//         </div>

//         <button onClick={handleLogout}
//           style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11,
//                    cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48",
//                    border:"1px solid transparent", background:"none", width:"100%",
//                    fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
//           onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.borderColor="transparent"; }}>
//           <div className="doc-nav-icon" style={{ background:"#fff1f3", color:"#e11d48" }}>
//             <LogoutIcon sx={{ fontSize:16 }} />
//           </div>
//           Sign Out
//         </button>
//       </div>

//       {/* ── Top bar ── */}
//       <div className="doc-topbar">
//         <div className="doc-topbar-left">
//           <div className="doc-hamburger" onClick={() => setSidebarOpen(true)}>
//             <MenuIcon sx={{ fontSize:20 }} />
//           </div>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#4f6ef7" }}>
//             Med<span style={{ color:"#7c3aed" }}>Vault</span>
//           </Typography>
//         </div>
//         <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
//           sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none",
//                 borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>
//           Logout
//         </Button>
//       </div>

//       {/* ── Page content ── */}
//       <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view}
//             initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
//             exit={{ opacity:0, y:-20 }} transition={{ duration:0.3 }}>

//             {/* ──────────────────── DASHBOARD ──────────────────── */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Welcome, Dr. {doctor?.name?.split(" ")[0]} 👨‍⚕️
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     Here's your practice overview for today
//                   </Typography>
//                 </Box>

//                 <div className="doc-hero">
//                   <Avatar className="av-blue"
//                     sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem",
//                           fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
//                           boxShadow:"0 8px 24px rgba(79,110,247,.3)", flexShrink:0 }}>
//                     {doctor?.name?.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>
//                       Dr. {doctor?.name}
//                     </Typography>
//                     <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>{doctor?.specialization}</Typography>
//                     <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
//                       {[`📞 ${doctor?.contact}`, `🏥 ${doctor?.hospital}`].map((v, i) => (
//                         <Chip key={i} label={v} size="small"
//                           sx={{ background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.18)", fontWeight:500, fontSize:".75rem" }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </div>

//                 <Grid container spacing={2.5} sx={{ mb:4 }}>
//                   <Grid item xs={12} sm={4}><StatCard label="Patients"           value={uniquePatientCount}   icon="👥" color="#4f6ef7" /></Grid>
//                   <Grid item xs={12} sm={4}><StatCard label="Total Appointments" value={appointments.length} icon="📅" color="#7c3aed" /></Grid>
//                   <Grid item xs={12} sm={4}><StatCard label="Pending Requests"   value={pending.length}       icon="⏳" color="#d97706" /></Grid>
//                 </Grid>

//                 {pending.length > 0 && (
//                   <>
//                     <div className="doc-sec-heading">Pending Requests</div>
//                     <Grid container spacing={2.5}>
//                       {pending.slice(0, 3).map((appt) => (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{ scale:1.02 }}>
//                             <Card className="doc-pending-card">
//                               <CardContent sx={{ p:"22px !important" }}>
//                                 <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                                   <Avatar className="av-amber" sx={{ width:44, height:44, borderRadius:"12px", fontSize:"1rem", fontWeight:700 }}>
//                                     {appt.patient?.name?.charAt(0)}
//                                   </Avatar>
//                                   <Box>
//                                     <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                     <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                   </Box>
//                                 </Box>
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📝 {appt.description}</Typography>

//                                 {/* ✅ Report badge — click to open modal */}
//                                 {appt.report && (
//                                   <Box sx={{ mb:1.5 }}>
//                                     <span className="report-badge" onClick={() => setSelectedAppt(appt)}>
//                                       <DescriptionIcon sx={{ fontSize:13 }} />
//                                       View Report
//                                     </span>
//                                   </Box>
//                                 )}

//                                 <Box sx={{ display:"flex", gap:1 }}>
//                                   <Button size="small" variant="contained" onClick={() => acceptAppointment(appt.id)}
//                                     sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"8px",
//                                           textTransform:"none", fontWeight:600, fontSize:".78rem" }}>
//                                     ✓ Accept
//                                   </Button>
//                                   <Button size="small" variant="outlined" onClick={() => rejectAppointment(appt.id)}
//                                     sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"8px",
//                                           textTransform:"none", fontWeight:600, fontSize:".78rem",
//                                           "&:hover":{ background:"#fff1f3" } }}>
//                                     ✕ Reject
//                                   </Button>
//                                 </Box>
//                               </CardContent>
//                             </Card>
//                           </motion.div>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </>
//                 )}
//               </>
//             )}

//             {/* ──────────────────── PENDING ──────────────────── */}
//             {view === "pending" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Pending Requests</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{pending.length} request{pending.length !== 1 ? "s" : ""} awaiting your response</Typography>
//                 </Box>
//                 {pending.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🎉</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No pending requests!</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {pending.map((appt) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }}>
//                           <Card className="doc-pending-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className="av-amber" sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                 </Box>
//                                 <Chip label="Pending" size="small"
//                                   sx={{ ml:"auto", background:"#fffbeb", color:"#d97706", border:"1px solid rgba(217,119,6,.2)", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>📝 {appt.description}</Typography>

//                               {/* ✅ Report badge */}
//                               <Box sx={{ mb:2 }}>
//                                 {appt.report ? (
//                                   <span className="report-badge" onClick={() => setSelectedAppt(appt)}>
//                                     <DescriptionIcon sx={{ fontSize:13 }} />
//                                     View Patient Report
//                                   </span>
//                                 ) : (
//                                   <span className="report-badge no-report">
//                                     <DescriptionIcon sx={{ fontSize:13 }} />
//                                     No report uploaded
//                                   </span>
//                                 )}
//                               </Box>

//                               <Box sx={{ display:"flex", gap:1 }}>
//                                 <Button variant="contained" onClick={() => acceptAppointment(appt.id)}
//                                   sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"9px",
//                                         textTransform:"none", fontWeight:600, fontSize:".83rem",
//                                         boxShadow:"0 3px 10px rgba(5,150,105,.25)", flex:1 }}>
//                                   ✓ Accept
//                                 </Button>
//                                 <Button variant="outlined" onClick={() => rejectAppointment(appt.id)}
//                                   sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"9px",
//                                         textTransform:"none", fontWeight:600, fontSize:".83rem", flex:1,
//                                         "&:hover":{ background:"#fff1f3", borderColor:"#e11d48" } }}>
//                                   ✕ Reject
//                                 </Button>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ──────────────────── APPROVED ──────────────────── */}
//             {view === "approved" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Approved Appointments</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{approved.length} confirmed appointment{approved.length !== 1 ? "s" : ""}</Typography>
//                 </Box>
//                 {approved.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>📋</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No approved appointments yet.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {approved.map((appt) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }}>
//                           <Card className="doc-approved-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className="av-green" sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                 </Box>
//                                 <Chip label="Approved" size="small"
//                                   sx={{ ml:"auto", background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🎂 DOB: {appt.patient?.dob || "—"}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📝 {appt.description}</Typography>

//                               {/* ✅ Report badge */}
//                               {appt.report ? (
//                                 <span className="report-badge" onClick={() => setSelectedAppt(appt)}>
//                                   <DescriptionIcon sx={{ fontSize:13 }} />
//                                   View Patient Report
//                                 </span>
//                               ) : (
//                                 <span className="report-badge no-report">
//                                   <DescriptionIcon sx={{ fontSize:13 }} />
//                                   No report uploaded
//                                 </span>
//                               )}
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ──────────────────── PATIENT RECORDS ──────────────────── */}
//             {view === "records" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Patient Records
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     {uniquePatientCount} patient{uniquePatientCount !== 1 ? "s" : ""} · click any card to view full details & report
//                   </Typography>
//                 </Box>

//                 {approved.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🗂️</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No patient records yet. Approve appointments to see records here.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {approved.map((appt, i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }} onClick={() => setSelectedAppt(appt)}>
//                           <Card className="doc-patient-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className={["av-blue","av-violet","av-teal","av-green"][i % 4]}
//                                   sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box sx={{ flex:1 }}>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>
//                                     {appt.patient?.gender} · Age {appt.patient?.age}
//                                   </Typography>
//                                 </Box>
//                                 <Chip label="Approved" size="small"
//                                   sx={{ background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.5 }}>🕐 {appt.timeSlot} &nbsp;·&nbsp; 📅 {appt.date}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }} noWrap>📝 {appt.description}</Typography>
//                               <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                                 <span className={`report-badge ${appt.report ? "" : "no-report"}`}
//                                   onClick={(e) => { if (appt.report) { e.stopPropagation(); setSelectedAppt(appt); } }}>
//                                   <DescriptionIcon sx={{ fontSize:13 }} />
//                                   {appt.report ? "Report attached" : "No report"}
//                                 </span>
//                                 <Typography sx={{ fontSize:".76rem", color:"#4f6ef7", fontWeight:600 }}>
//                                   View details →
//                                 </Typography>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ──────────────────── PROFILE ──────────────────── */}
//             {view === "profile" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>My Profile</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Your professional details</Typography>
//                 </Box>
//                 <Card className="doc-card" sx={{ p:4 }}>
//                   <Box sx={{ display:"flex", alignItems:"center", gap:2.5, mb:3 }}>
//                     <Avatar className="av-blue"
//                       sx={{ width:76, height:76, borderRadius:"22px", fontSize:"2rem",
//                             fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
//                             boxShadow:"0 6px 20px rgba(79,110,247,.25)" }}>
//                       {doctor?.name?.charAt(0)}
//                     </Avatar>
//                     <Box>
//                       <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:700, color:"#1a1f36" }}>
//                         Dr. {doctor?.name}
//                       </Typography>
//                       <Typography sx={{ fontSize:".82rem", color:"#8892b0", mt:.5 }}>Doctor Account · Active</Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[
//                       ["Full Name",      `Dr. ${doctor?.name}`],
//                       ["Specialization", doctor?.specialization],
//                       ["Contact",        doctor?.contact],
//                       ["Hospital",       doctor?.hospital],
//                       ["Doctor ID",      `#${doctor?.id}`],
//                     ].map(([label, val]) => (
//                       <Grid item xs={12} sm={6} key={label}>
//                         <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1.1px", color:"#8892b0", fontWeight:600, mb:.6 }}>{label}</Typography>
//                         <Typography sx={{ fontSize:".95rem", fontWeight:500, color:"#1a1f36" }}>{val || "—"}</Typography>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Card>
//               </>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </Box>

//       {/* ── Patient detail + report modal ── */}
//       <PatientModal
//         appt={selectedAppt}
//         open={Boolean(selectedAppt)}
//         onClose={() => setSelectedAppt(null)}
//       />
//     </Box>
//   );
// }





import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import DoctorProfileForm from "./DoctorProfileForm";
import {
  Box, Typography, CircularProgress, Grid, Avatar, Card, CardContent,
  Button, Chip, Divider, Modal, IconButton, TextField,
} from "@mui/material";
import MenuIcon           from "@mui/icons-material/Menu";
import CloseIcon          from "@mui/icons-material/Close";
import LogoutIcon         from "@mui/icons-material/Logout";
import DashboardIcon      from "@mui/icons-material/Dashboard";
import EventIcon          from "@mui/icons-material/Event";
import CheckCircleIcon    from "@mui/icons-material/CheckCircle";
import PersonIcon         from "@mui/icons-material/Person";
import FolderSharedIcon   from "@mui/icons-material/FolderShared";
import DescriptionIcon    from "@mui/icons-material/Description";
import OpenInNewIcon      from "@mui/icons-material/OpenInNew";
import DownloadIcon       from "@mui/icons-material/Download";
import VisibilityIcon     from "@mui/icons-material/Visibility";
import VisibilityOffIcon  from "@mui/icons-material/VisibilityOff";
import LocalPharmacyIcon  from "@mui/icons-material/LocalPharmacy";
import EditNoteIcon       from "@mui/icons-material/EditNote";
import CheckIcon          from "@mui/icons-material/Check";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BASE = "http://localhost:8080";

// ── Styles ─────────────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
  body { font-family: 'Outfit', sans-serif !important; }

  .doc-overlay { position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease; }
  @keyframes overlayIn { from{opacity:0}to{opacity:1} }

  .doc-sidebar { width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1); }
  .doc-sidebar.closed { transform:translateX(-100%); }
  .doc-sidebar.open   { transform:translateX(0); }
  .doc-sidebar-top { display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px; }
  .doc-logo { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px; }
  .doc-logo-icon { width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0; }
  .doc-logo-accent { color:#7c3aed; }
  .doc-close-btn { width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s; }
  .doc-close-btn:hover { background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2); }
  .doc-nav-label { font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px; }
  .doc-nav-item { display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none; }
  .doc-nav-item:hover { background:#eef1fe;color:#4f6ef7; }
  .doc-nav-item.active { background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18); }
  .doc-nav-item.active .doc-nav-icon { background:#4f6ef7 !important;color:#fff !important; }
  .doc-nav-icon { width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278; }
  .doc-sidebar-spacer { flex:1; }
  .doc-user-card { display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px; }
  .doc-user-av { width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem; }
  .doc-topbar { display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100; }
  .doc-topbar-left { display:flex;align-items:center;gap:14px; }
  .doc-hamburger { width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s; }
  .doc-hamburger:hover { background:#eef1fe;border-color:rgba(79,110,247,.2); }
  .doc-blob { position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0; }
  .doc-blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
  .doc-blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }

  .doc-hero { background:linear-gradient(135deg,#fff 55%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;display:flex;align-items:center;gap:28px;margin-bottom:28px; }
  .doc-hero::after { content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none; }
  .doc-stat { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important; }
  .doc-stat:hover { box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px); }
  .doc-stat-value { font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1; }
  .doc-stat-label { font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px; }
  .doc-stat-icon  { position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07; }
  .doc-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important; }
  .doc-card:hover { box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important; }
  .doc-pending-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #f59e0b !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(245,158,11,.08) !important;transition:box-shadow .22s,transform .22s !important; }
  .doc-pending-card:hover { box-shadow:0 6px 24px rgba(245,158,11,.14) !important;transform:translateY(-3px); }
  .doc-approved-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #059669 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(5,150,105,.08) !important;transition:box-shadow .22s,transform .22s !important; }
  .doc-approved-card:hover { box-shadow:0 6px 24px rgba(5,150,105,.14) !important;transform:translateY(-3px); }
  .doc-patient-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.08) !important;transition:box-shadow .22s,transform .22s,border-color .22s !important;cursor:pointer; }
  .doc-patient-card:hover { box-shadow:0 6px 28px rgba(79,110,247,.16) !important;transform:translateY(-3px);border-color:#c7cee8 !important; }

  .report-badge { display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:8px;font-size:.75rem;font-weight:500;background:#eef1fe;color:#4f6ef7;border:1px solid rgba(79,110,247,.18);cursor:pointer;transition:all .15s;text-decoration:none; }
  .report-badge:hover { background:#e0e8ff; }
  .report-badge.no-report { background:#f5f7ff;color:#8892b0;border-color:#e8ecf5;cursor:default;pointer-events:none; }

  /* ── Modals ── */
  .patient-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:620px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
  .rx-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:560px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(5,150,105,.16);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
  .modal-field-label { font-size:.68rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px; }
  .modal-field-value { font-size:.92rem;font-weight:500;color:#1a1f36;margin-bottom:16px; }

  /* ── Report viewer ── */
  .report-viewer-box { border:1.5px dashed #d4daf0;border-radius:14px;background:#f8f9ff;padding:22px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center; }
  .report-viewer-icon { width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#4f6ef7,#818cf8);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 14px rgba(79,110,247,.28); }
  .report-filename { font-size:.82rem;font-weight:500;color:#4a5278;word-break:break-all;max-width:100%; }
  .report-actions { display:flex;gap:10px;flex-wrap:wrap;justify-content:center; }
  .report-btn-primary { display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;cursor:pointer;font-size:.84rem;font-weight:600;text-decoration:none;background:linear-gradient(135deg,#4f6ef7,#818cf8);color:#fff;border:none;box-shadow:0 3px 12px rgba(79,110,247,.26);transition:all .18s;font-family:'Outfit',sans-serif; }
  .report-btn-primary:hover { box-shadow:0 5px 20px rgba(79,110,247,.38);transform:translateY(-1px); }
  .report-btn-secondary { display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;cursor:pointer;font-size:.84rem;font-weight:600;text-decoration:none;background:#fff;color:#4f6ef7;border:1.5px solid rgba(79,110,247,.28);transition:all .18s;font-family:'Outfit',sans-serif; }
  .report-btn-secondary:hover { background:#eef1fe;border-color:#4f6ef7; }
  .report-preview-wrap { width:100%;border-radius:12px;overflow:hidden;border:1px solid #e8ecf5;margin-top:4px;animation:fadeUp .3s ease both; }
  .report-preview-wrap iframe { width:100%;height:400px;border:none;display:block; }
  .report-preview-wrap img   { width:100%;display:block;max-height:440px;object-fit:contain;background:#f0f2f8; }
  .no-report-box { border:1.5px dashed #e8ecf5;border-radius:14px;padding:20px;background:#f5f7ff;display:flex;align-items:center;gap:12px; }

  /* ── Prescription card ── */
  .rx-card { background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s; }
  .rx-card:hover { box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px); }

  /* ── Rx textarea override ── */
  .rx-modal-box .MuiOutlinedInput-root { border-radius:12px !important;background:#f8f9ff !important; }
  .rx-modal-box .MuiOutlinedInput-notchedOutline { border-color:#e8ecf5 !important; }
  .rx-modal-box .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color:#059669 !important; }

  .doc-sec-heading { font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px; }
  .doc-sec-heading::after { content:'';flex:1;height:1px;background:#e8ecf5; }

  .av-blue   { background:linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
  .av-violet { background:linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
  .av-teal   { background:linear-gradient(135deg,#0891b2,#22d3ee) !important; }
  .av-amber  { background:linear-gradient(135deg,#d97706,#fbbf24) !important; }
  .av-green  { background:linear-gradient(135deg,#059669,#34d399) !important; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
  .fu { animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
`;

if (!document.getElementById("doctor-portal-styles")) {
  const s = document.createElement("style");
  s.id = "doctor-portal-styles";
  s.textContent = globalStyles;
  document.head.appendChild(s);
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function NavItem({ icon, label, active, onClick }) {
  return (
    <div className={`doc-nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <div className="doc-nav-icon">{icon}</div>
      {label}
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="doc-stat fu">
      <div className="doc-stat-label">{label}</div>
      <div className="doc-stat-value" style={{ color }}>{value}</div>
      <div className="doc-stat-icon">{icon}</div>
    </div>
  );
}

// ── Report Viewer ─────────────────────────────────────────────────────────────
function ReportViewer({ filename }) {
  const [showPreview, setShowPreview] = useState(false);
  if (!filename) {
    return (
      <div className="no-report-box">
        <DescriptionIcon sx={{ fontSize:30, color:"#c0c8e0", flexShrink:0 }} />
        <Box>
          <Typography sx={{ fontWeight:600, fontSize:".88rem", color:"#4a5278" }}>No report attached</Typography>
          <Typography sx={{ fontSize:".76rem", color:"#b0b8d0", mt:.4 }}>The patient did not upload a report for this appointment.</Typography>
        </Box>
      </div>
    );
  }
  const reportUrl  = `${BASE}/appointments/report/${filename}`;
  const lower      = filename.toLowerCase();
  const isPdf      = lower.endsWith(".pdf");
  const isImage    = lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp");
  const canPreview = isPdf || isImage;
  return (
    <div className="report-viewer-box">
      <div className="report-viewer-icon"><DescriptionIcon sx={{ fontSize:26 }} /></div>
      <div className="report-filename">{filename}</div>
      <div className="report-actions">
        {canPreview && (
          <button className="report-btn-primary" onClick={() => setShowPreview(p => !p)}>
            {showPreview ? <><VisibilityOffIcon sx={{ fontSize:16 }} /> Hide Preview</> : <><VisibilityIcon sx={{ fontSize:16 }} /> Preview</>}
          </button>
        )}
        <a href={reportUrl} target="_blank" rel="noreferrer" className="report-btn-primary">
          <OpenInNewIcon sx={{ fontSize:16 }} /> Open in Tab
        </a>
        <a href={reportUrl} download={filename} className="report-btn-secondary">
          <DownloadIcon sx={{ fontSize:16 }} /> Download
        </a>
      </div>
      {showPreview && (
        <div className="report-preview-wrap" style={{ width:"100%" }}>
          {isPdf   && <iframe src={reportUrl} title="Report PDF"   />}
          {isImage && <img    src={reportUrl} alt="Patient Report" />}
        </div>
      )}
    </div>
  );
}

// ── Write Prescription Modal ───────────────────────────────────────────────────
function WritePrescriptionModal({ appt, open, onClose, onSaved }) {
  const [form, setForm] = useState({ diagnosis:"", medicines:"", instructions:"", tests:"", followUpDate:"" });
  const [loading, setLoading] = useState(false);
  const [saved,   setSaved]   = useState(false);

  // Pre-fill if prescription exists
  useEffect(() => {
    if (!open || !appt) return;
    axios.get(`${BASE}/prescriptions/appointment/${appt.id}`)
      .then(r => setForm({
        diagnosis:    r.data.diagnosis    || "",
        medicines:    r.data.medicines    || "",
        instructions: r.data.instructions || "",
        tests:        r.data.tests        || "",
        followUpDate: r.data.followUpDate || "",
      }))
      .catch(() => setForm({ diagnosis:"", medicines:"", instructions:"", tests:"", followUpDate:"" }));
    setSaved(false);
  }, [open, appt]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(`${BASE}/prescriptions/appointment/${appt.id}`, form);
      setSaved(true);
      onSaved(appt.id);
      setTimeout(() => { onClose(); setSaved(false); }, 1200);
    } catch (e) {
      alert("Failed to save prescription");
    } finally {
      setLoading(false);
    }
  };

  if (!appt) return null;
  const fieldSx = { "& .MuiOutlinedInput-root":{ borderRadius:"12px !important", background:"#f8f9ff !important" }, "& .MuiOutlinedInput-notchedOutline":{ borderColor:"#e8ecf5 !important" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{ borderColor:"#059669 !important" } };
  const labelSx = { fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600, mb:.75 };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="rx-modal-box">
        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:3 }}>
          <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
            <Box sx={{ width:46, height:46, borderRadius:"13px", background:"linear-gradient(135deg,#059669,#34d399)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(5,150,105,.3)" }}>
              <LocalPharmacyIcon sx={{ color:"#fff", fontSize:22 }} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#1a1f36" }}>
                Write Prescription
              </Typography>
              <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>
                For {appt.patient?.name} · {appt.date}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px", "&:hover":{ background:"#eef1fe" } }}>
            <CloseIcon sx={{ fontSize:16 }} />
          </IconButton>
        </Box>

        <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

        <Box sx={{ display:"flex", flexDirection:"column", gap:2 }}>
          <Box>
            <Typography sx={labelSx}>Diagnosis *</Typography>
            <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Hypertension Stage 1, Type 2 Diabetes"
              value={form.diagnosis} onChange={e => setForm({...form, diagnosis:e.target.value})} sx={fieldSx} />
          </Box>
          <Box>
            <Typography sx={labelSx}>Medicines &amp; Dosage *</Typography>
            <TextField fullWidth size="small" multiline rows={4} variant="outlined"
              placeholder={"e.g.\nTab. Metformin 500mg — 1-0-1 after meals\nTab. Amlodipine 5mg — 0-0-1\nSyr. Amoxicillin 250mg/5ml — 5ml thrice daily"}
              value={form.medicines} onChange={e => setForm({...form, medicines:e.target.value})} sx={fieldSx} />
          </Box>
          <Box>
            <Typography sx={labelSx}>Instructions / Advice</Typography>
            <TextField fullWidth size="small" multiline rows={2} variant="outlined"
              placeholder="e.g. Drink 2L water daily. Avoid salt. Rest for 3 days."
              value={form.instructions} onChange={e => setForm({...form, instructions:e.target.value})} sx={fieldSx} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Typography sx={labelSx}>Lab Tests Ordered</Typography>
              <TextField fullWidth size="small" variant="outlined" placeholder="e.g. CBC, Blood Sugar, Lipid Profile"
                value={form.tests} onChange={e => setForm({...form, tests:e.target.value})} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography sx={labelSx}>Follow-Up Date</Typography>
              <TextField fullWidth size="small" type="date" variant="outlined"
                value={form.followUpDate} onChange={e => setForm({...form, followUpDate:e.target.value})} sx={fieldSx} />
            </Grid>
          </Grid>

          <Button onClick={handleSave} variant="contained" disabled={loading || saved}
            startIcon={saved ? <CheckIcon /> : <LocalPharmacyIcon />}
            sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"12px",
                  textTransform:"none", fontWeight:700, fontSize:".92rem", py:1.4, mt:1,
                  boxShadow:"0 4px 14px rgba(5,150,105,.28)",
                  "&:hover":{ boxShadow:"0 6px 22px rgba(5,150,105,.40)" } }}>
            {saved ? "Prescription Saved!" : loading ? "Saving…" : "Save Prescription"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

// ── Patient Detail Modal ───────────────────────────────────────────────────────
function PatientModal({ appt, open, onClose, onWriteRx }) {
  if (!appt) return null;
  const p = appt.patient;
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="patient-modal-box">
        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:3 }}>
          <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
            <Avatar className="av-blue" sx={{ width:54, height:54, borderRadius:"16px", fontSize:"1.4rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 4px 14px rgba(79,110,247,.25)" }}>
              {p?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#1a1f36" }}>{p?.name}</Typography>
              <Typography sx={{ fontSize:".78rem", color:"#8892b0" }}>Patient Record</Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px", "&:hover":{ background:"#eef1fe", color:"#4f6ef7" } }}>
            <CloseIcon sx={{ fontSize:16 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

        <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36", mb:2 }}>Patient Information</Typography>
        <Grid container spacing={2} sx={{ mb:3 }}>
          {[["Full Name",p?.name],["Age",p?.age?`${p.age} years`:"—"],["Gender",p?.gender],["Date of Birth",p?.dob],["Contact",p?.contact]].map(([label,val]) => (
            <Grid item xs={6} key={label}>
              <div className="modal-field-label">{label}</div>
              <div className="modal-field-value">{val||"—"}</div>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

        <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36", mb:2 }}>Appointment Details</Typography>
        <Grid container spacing={2} sx={{ mb:3 }}>
          {[["Date",appt.date],["Time Slot",appt.timeSlot],["Status",appt.status]].map(([label,val]) => (
            <Grid item xs={6} key={label}>
              <div className="modal-field-label">{label}</div>
              <div className="modal-field-value">{val||"—"}</div>
            </Grid>
          ))}
          <Grid item xs={12}>
            <div className="modal-field-label">Description / Symptoms</div>
            <div className="modal-field-value">{appt.description||"—"}</div>
          </Grid>
        </Grid>
        <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

        <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36", mb:2 }}>Medical Report</Typography>
        <ReportViewer filename={appt.report} />

        {/* Write Prescription button (only for approved appointments) */}
        {appt.status === "APPROVED" && (
          <Button onClick={() => { onClose(); onWriteRx(appt); }} variant="contained" fullWidth
            startIcon={<EditNoteIcon />}
            sx={{ mt:3, background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"12px",
                  textTransform:"none", fontWeight:700, fontSize:".9rem",
                  boxShadow:"0 4px 14px rgba(5,150,105,.28)" }}>
            Write / Update Prescription
          </Button>
        )}
      </Box>
    </Modal>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function DoctorDashboard() {
  const { user } = useContext(AuthContext);
  const userId   = user?.id || localStorage.getItem("userId");
  const navigate = useNavigate();

  const [doctor,         setDoctor]         = useState(null);
  const [appointments,   setAppointments]   = useState([]);
  const [prescriptions,  setPrescriptions]  = useState([]);  // {appointmentId: Prescription}
  const [loading,        setLoading]        = useState(true);
  const [profileMissing, setProfileMissing] = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [view,           setView]           = useState("dashboard");
  const [selectedAppt,   setSelectedAppt]   = useState(null);
  const [rxAppt,         setRxAppt]         = useState(null);   // for write-rx modal

  useEffect(() => {
  const fetchData = async () => {
    // ── Step 1: load doctor (if this fails → show profile form)
    let doc;
    try {
      const docRes = await axios.get(`${BASE}/doctor/user/${userId}`);
      if (!docRes.data?.id) { setProfileMissing(true); setLoading(false); return; }
      doc = docRes.data;
      setDoctor(doc);
    } catch (err) {
      // Only show profile form on 404 (doctor doesn't exist yet)
      if (err.response?.status === 404) {
        setProfileMissing(true);
      }
      setLoading(false);
      return;
    }

    // ── Step 2: load appointments (non-fatal)
    try {
      const appRes = await axios.get(`${BASE}/appointments/doctor/${doc.id}`);
      setAppointments(appRes.data);
    } catch (err) {
      console.error("Failed to load appointments:", err);
    }

    // ── Step 3: load prescriptions (non-fatal — NEVER triggers profile form)
    try {
      const rxRes = await axios.get(`${BASE}/prescriptions/doctor/${doc.id}`);
      const rxMap = {};
      rxRes.data.forEach(rx => { rxMap[rx.appointment?.id] = rx; });
      setPrescriptions(rxMap);
    } catch (err) {
      console.error("Failed to load prescriptions:", err);
      // intentionally ignored — prescriptions are optional
    }

    setLoading(false);
  };

  if (userId) fetchData();
}, [userId]);

  const acceptAppointment = async (id) => {
    await axios.put(`${BASE}/appointments/${id}/approve`);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status:"APPROVED" } : a));
  };

  const rejectAppointment = async (id) => {
    await axios.put(`${BASE}/appointments/${id}/reject`);
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleNavClick = key => { setView(key); setSidebarOpen(false); };

  const handleRxSaved = (appointmentId) => {
    // Refetch prescriptions map
    axios.get(`${BASE}/prescriptions/doctor/${doctor.id}`)
      .then(r => {
        const rxMap = {};
        r.data.forEach(rx => { rxMap[rx.appointment?.id] = rx; });
        setPrescriptions(rxMap);
      }).catch(() => {});
  };

  if (profileMissing) {
    return <DoctorProfileForm userId={userId} onCreated={doc => { setDoctor(doc); setProfileMissing(false); }} />;
  }
  if (loading) return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
      <CircularProgress sx={{ color:"#4f6ef7" }} />
    </Box>
  );

  const pending  = appointments.filter(a => a.status === "PENDING");
  const approved = appointments.filter(a => a.status === "APPROVED");
  const uniquePatientCount = new Set(approved.map(a => a.patient?.id)).size;

  const menuItems = [
    { key:"dashboard",     label:"Dashboard",             icon:<DashboardIcon    sx={{ fontSize:18 }} /> },
    { key:"pending",       label:"Pending Requests",      icon:<EventIcon        sx={{ fontSize:18 }} /> },
    { key:"approved",      label:"Approved Appointments", icon:<CheckCircleIcon  sx={{ fontSize:18 }} /> },
    { key:"records",       label:"Patient Records",       icon:<FolderSharedIcon sx={{ fontSize:18 }} /> },
    { key:"prescriptions", label:"Prescriptions",         icon:<LocalPharmacyIcon sx={{ fontSize:18 }} /> },
    { key:"profile",       label:"My Profile",            icon:<PersonIcon       sx={{ fontSize:18 }} /> },
  ];

  return (
    <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
      <div className="doc-blob doc-blob-1" />
      <div className="doc-blob doc-blob-2" />

      {sidebarOpen && <div className="doc-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <div className={`doc-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="doc-sidebar-top">
          <div className="doc-logo">
            <div className="doc-logo-icon">✦</div>
            Med<span className="doc-logo-accent">Vault</span>
          </div>
          <div className="doc-close-btn" onClick={() => setSidebarOpen(false)}>
            <CloseIcon sx={{ fontSize:16 }} />
          </div>
        </div>
        <div className="doc-nav-label">Navigation</div>
        {menuItems.map(item => (
          <NavItem key={item.key} icon={item.icon} label={item.label}
            active={view === item.key} onClick={() => handleNavClick(item.key)} />
        ))}
        <div className="doc-sidebar-spacer" />
        <div className="doc-user-card">
          <div className="doc-user-av">{doctor?.name?.charAt(0)}</div>
          <Box>
            <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>Dr. {doctor?.name}</Typography>
            <Typography sx={{ fontSize:".72rem", color:"#8892b0" }}>{doctor?.specialization}</Typography>
          </Box>
        </div>
        <button onClick={handleLogout}
          style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11, cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48", border:"1px solid transparent", background:"none", width:"100%", fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
          onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.borderColor="transparent"; }}>
          <div className="doc-nav-icon" style={{ background:"#fff1f3", color:"#e11d48" }}><LogoutIcon sx={{ fontSize:16 }} /></div>
          Sign Out
        </button>
      </div>

      {/* ── Top bar ── */}
      <div className="doc-topbar">
        <div className="doc-topbar-left">
          <div className="doc-hamburger" onClick={() => setSidebarOpen(true)}><MenuIcon sx={{ fontSize:20 }} /></div>
          <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#4f6ef7" }}>
            Med<span style={{ color:"#7c3aed" }}>Vault</span>
          </Typography>
        </div>
        <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
          sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none", borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>
          Logout
        </Button>
      </div>

      {/* ── Content ── */}
      <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.3 }}>

            {/* ─────────────── DASHBOARD ─────────────── */}
            {view === "dashboard" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
                    Welcome, Dr. {doctor?.name?.split(" ")[0]} 👨‍⚕️
                  </Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Here's your practice overview</Typography>
                </Box>

                <div className="doc-hero">
                  <Avatar className="av-blue" sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 8px 24px rgba(79,110,247,.3)", flexShrink:0 }}>
                    {doctor?.name?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>Dr. {doctor?.name}</Typography>
                    <Typography sx={{ color:"#8892b0", fontSize:".82rem" }}>{doctor?.qualification} · {doctor?.specialization}</Typography>
                    <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
                      {[`📞 ${doctor?.contact}`, `🏥 ${doctor?.hospital}`, `${doctor?.experience} yrs exp`, `₹${doctor?.consultationFee} fee`].filter(v => !v.includes("undefined")).map((v,i) => (
                        <Chip key={i} label={v} size="small"
                          sx={{ background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.18)", fontWeight:500, fontSize:".75rem" }} />
                      ))}
                    </Box>
                  </Box>
                </div>

                <Grid container spacing={2.5} sx={{ mb:4 }}>
                  <Grid item xs={6} sm={3}><StatCard label="Patients"       value={uniquePatientCount}      icon="👥" color="#4f6ef7" /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Appointments"   value={appointments.length}    icon="📅" color="#7c3aed" /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Pending"        value={pending.length}          icon="⏳" color="#d97706" /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Prescriptions"  value={Object.keys(prescriptions).length} icon="💊" color="#059669" /></Grid>
                </Grid>

                {pending.length > 0 && (
                  <>
                    <div className="doc-sec-heading">Pending Requests</div>
                    <Grid container spacing={2.5}>
                      {pending.slice(0,3).map(appt => (
                        <Grid item xs={12} md={4} key={appt.id}>
                          <motion.div whileHover={{ scale:1.02 }}>
                            <Card className="doc-pending-card">
                              <CardContent sx={{ p:"22px !important" }}>
                                <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
                                  <Avatar className="av-amber" sx={{ width:44, height:44, borderRadius:"12px", fontSize:"1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
                                  <Box>
                                    <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
                                    <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
                                  </Box>
                                </Box>
                                <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
                                <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📝 {appt.description}</Typography>
                                {appt.report && (
                                  <Box sx={{ mb:1.5 }}>
                                    <span className="report-badge" onClick={() => setSelectedAppt(appt)}>
                                      <DescriptionIcon sx={{ fontSize:13 }} /> View Report
                                    </span>
                                  </Box>
                                )}
                                <Box sx={{ display:"flex", gap:1 }}>
                                  <Button size="small" variant="contained" onClick={() => acceptAppointment(appt.id)}
                                    sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"8px", textTransform:"none", fontWeight:600, fontSize:".78rem" }}>
                                    ✓ Accept
                                  </Button>
                                  <Button size="small" variant="outlined" onClick={() => rejectAppointment(appt.id)}
                                    sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"8px", textTransform:"none", fontWeight:600, fontSize:".78rem", "&:hover":{ background:"#fff1f3" } }}>
                                    ✕ Reject
                                  </Button>
                                </Box>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </>
            )}

            {/* ─────────────── PENDING ─────────────── */}
            {view === "pending" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Pending Requests</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{pending.length} request{pending.length !== 1?"s":""} awaiting your response</Typography>
                </Box>
                {pending.length === 0 ? (
                  <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
                    <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🎉</Typography>
                    <Typography sx={{ fontWeight:500 }}>No pending requests!</Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2.5}>
                    {pending.map(appt => (
                      <Grid item xs={12} md={4} key={appt.id}>
                        <motion.div whileHover={{ scale:1.02 }}>
                          <Card className="doc-pending-card">
                            <CardContent sx={{ p:"24px !important" }}>
                              <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
                                <Avatar className="av-amber" sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
                                <Box>
                                  <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
                                  <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
                                </Box>
                                <Chip label="Pending" size="small" sx={{ ml:"auto", background:"#fffbeb", color:"#d97706", border:"1px solid rgba(217,119,6,.2)", fontWeight:600, fontSize:".7rem" }} />
                              </Box>
                              <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
                              <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot}</Typography>
                              <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>📝 {appt.description}</Typography>
                              <Box sx={{ mb:2 }}>
                                {appt.report
                                  ? <span className="report-badge" onClick={() => setSelectedAppt(appt)}><DescriptionIcon sx={{ fontSize:13 }} /> View Patient Report</span>
                                  : <span className="report-badge no-report"><DescriptionIcon sx={{ fontSize:13 }} /> No report uploaded</span>
                                }
                              </Box>
                              <Box sx={{ display:"flex", gap:1 }}>
                                <Button variant="contained" onClick={() => acceptAppointment(appt.id)}
                                  sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".83rem", boxShadow:"0 3px 10px rgba(5,150,105,.25)", flex:1 }}>
                                  ✓ Accept
                                </Button>
                                <Button variant="outlined" onClick={() => rejectAppointment(appt.id)}
                                  sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".83rem", flex:1, "&:hover":{ background:"#fff1f3", borderColor:"#e11d48" } }}>
                                  ✕ Reject
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* ─────────────── APPROVED ─────────────── */}
            {view === "approved" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Approved Appointments</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{approved.length} confirmed</Typography>
                </Box>
                {approved.length === 0 ? (
                  <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
                    <Typography sx={{ fontSize:"2.5rem", mb:1 }}>📋</Typography>
                    <Typography sx={{ fontWeight:500 }}>No approved appointments yet.</Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2.5}>
                    {approved.map(appt => {
                      const hasPrescription = !!prescriptions[appt.id];
                      return (
                        <Grid item xs={12} md={4} key={appt.id}>
                          <motion.div whileHover={{ scale:1.02 }}>
                            <Card className="doc-approved-card">
                              <CardContent sx={{ p:"24px !important" }}>
                                <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
                                  <Avatar className="av-green" sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
                                  <Box>
                                    <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
                                    <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
                                  </Box>
                                  <Chip label="Approved" size="small" sx={{ ml:"auto", background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }} />
                                </Box>
                                <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
                                <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
                                <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📝 {appt.description}</Typography>
                                <Box sx={{ display:"flex", gap:1, flexWrap:"wrap" }}>
                                  {appt.report
                                    ? <span className="report-badge" onClick={() => setSelectedAppt(appt)}><DescriptionIcon sx={{ fontSize:13 }} /> Report</span>
                                    : <span className="report-badge no-report"><DescriptionIcon sx={{ fontSize:13 }} /> No report</span>
                                  }
                                  <Button size="small" variant={hasPrescription?"outlined":"contained"} onClick={() => setRxAppt(appt)}
                                    startIcon={<EditNoteIcon sx={{ fontSize:14 }} />}
                                    sx={{ borderRadius:"8px", textTransform:"none", fontWeight:600, fontSize:".75rem",
                                          background: hasPrescription ? "transparent" : "linear-gradient(135deg,#059669,#34d399)",
                                          border: hasPrescription ? "1px solid rgba(5,150,105,.35)" : "none",
                                          color: hasPrescription ? "#059669" : "#fff",
                                          boxShadow: hasPrescription ? "none" : "0 2px 8px rgba(5,150,105,.25)" }}>
                                    {hasPrescription ? "Edit Rx" : "Write Rx"}
                                  </Button>
                                </Box>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </>
            )}

            {/* ─────────────── PATIENT RECORDS ─────────────── */}
            {view === "records" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Patient Records</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{uniquePatientCount} patient{uniquePatientCount!==1?"s":""} · click any card to view details</Typography>
                </Box>
                {approved.length === 0 ? (
                  <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
                    <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🗂️</Typography>
                    <Typography sx={{ fontWeight:500 }}>No patient records yet.</Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2.5}>
                    {approved.map((appt,i) => (
                      <Grid item xs={12} md={4} key={appt.id}>
                        <motion.div whileHover={{ scale:1.02 }} onClick={() => setSelectedAppt(appt)}>
                          <Card className="doc-patient-card">
                            <CardContent sx={{ p:"24px !important" }}>
                              <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
                                <Avatar className={["av-blue","av-violet","av-teal","av-green"][i%4]} sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
                                  {appt.patient?.name?.charAt(0)}
                                </Avatar>
                                <Box sx={{ flex:1 }}>
                                  <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
                                  <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>{appt.patient?.gender} · Age {appt.patient?.age}</Typography>
                                </Box>
                                <Chip label="Approved" size="small" sx={{ background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }} />
                              </Box>
                              <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
                              <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.5 }}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
                              <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }} noWrap>📝 {appt.description}</Typography>
                              <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                                <span className={`report-badge ${appt.report?"":"no-report"}`}
                                  onClick={e => { if (appt.report) { e.stopPropagation(); setSelectedAppt(appt); } }}>
                                  <DescriptionIcon sx={{ fontSize:13 }} /> {appt.report?"Report attached":"No report"}
                                </span>
                                <Typography sx={{ fontSize:".76rem", color:"#4f6ef7", fontWeight:600 }}>View details →</Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* ─────────────── PRESCRIPTIONS VIEW ─────────────── */}
            {view === "prescriptions" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Prescriptions</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{Object.keys(prescriptions).length} prescription{Object.keys(prescriptions).length!==1?"s":""} written</Typography>
                </Box>
                {Object.keys(prescriptions).length === 0 ? (
                  <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
                    <Typography sx={{ fontSize:"2.5rem", mb:1 }}>💊</Typography>
                    <Typography sx={{ fontWeight:500 }}>No prescriptions written yet.</Typography>
                    <Typography sx={{ fontSize:".83rem", mt:.5 }}>Go to Approved Appointments to write a prescription.</Typography>
                  </Box>
                ) : (
                  Object.values(prescriptions).map(rx => {
                    const appt = approved.find(a => a.id === rx.appointment?.id);
                    return (
                      <div key={rx.id} className="rx-card">
                        <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.5 }}>
                          <Box sx={{ width:46, height:46, borderRadius:"13px", flexShrink:0, background:"#ecfdf5", border:"1px solid rgba(5,150,105,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <LocalPharmacyIcon sx={{ color:"#059669", fontSize:22 }} />
                          </Box>
                          <Box sx={{ flex:1 }}>
                            <Box sx={{ display:"flex", alignItems:"center", gap:1.5, flexWrap:"wrap", mb:.5 }}>
                              <Typography sx={{ fontWeight:700, fontSize:".95rem", color:"#1a1f36" }}>{appt?.patient?.name || "Patient"}</Typography>
                              <Chip label={rx.issuedDate || "—"} size="small" sx={{ background:"#f5f7ff", color:"#8892b0", fontSize:".68rem", height:20 }} />
                            </Box>
                            <Typography sx={{ fontSize:".82rem", color:"#059669", fontWeight:600, mb:.5 }}>🩺 {rx.diagnosis}</Typography>
                            {rx.medicines && (
                              <Box sx={{ background:"#f8f9ff", borderRadius:"10px", p:1.5, my:1, border:"1px solid #e8ecf5" }}>
                                <Typography sx={{ fontSize:".72rem", color:"#8892b0", fontWeight:600, textTransform:"uppercase", letterSpacing:".8px", mb:.5 }}>Medicines</Typography>
                                <Typography sx={{ fontSize:".83rem", color:"#1a1f36", whiteSpace:"pre-line" }}>{rx.medicines}</Typography>
                              </Box>
                            )}
                            {rx.instructions && <Typography sx={{ fontSize:".8rem", color:"#4a5278" }}>📋 {rx.instructions}</Typography>}
                            {rx.tests && <Typography sx={{ fontSize:".8rem", color:"#7c3aed", mt:.4 }}>🔬 Tests: {rx.tests}</Typography>}
                            {rx.followUpDate && <Typography sx={{ fontSize:".8rem", color:"#d97706", mt:.4 }}>📅 Follow-up: {rx.followUpDate}</Typography>}
                          </Box>
                          <Button size="small" variant="outlined" onClick={() => setRxAppt(appt)}
                            startIcon={<EditNoteIcon sx={{ fontSize:14 }} />}
                            sx={{ borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".75rem", borderColor:"rgba(5,150,105,.3)", color:"#059669", flexShrink:0, "&:hover":{ background:"#ecfdf5" } }}>
                            Edit
                          </Button>
                        </Box>
                      </div>
                    );
                  })
                )}
              </>
            )}

            {/* ─────────────── PROFILE ─────────────── */}
            {view === "profile" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>My Profile</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Your professional details</Typography>
                </Box>
                <Card className="doc-card" sx={{ p:4 }}>
                  <Box sx={{ display:"flex", alignItems:"center", gap:2.5, mb:3 }}>
                    <Avatar className="av-blue" sx={{ width:76, height:76, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 6px 20px rgba(79,110,247,.25)" }}>
                      {doctor?.name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:700, color:"#1a1f36" }}>Dr. {doctor?.name}</Typography>
                      <Typography sx={{ fontSize:".82rem", color:"#8892b0", mt:.5 }}>Doctor Account · Active</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />
                  <Grid container spacing={3}>
                    {[
                      ["Full Name",       `Dr. ${doctor?.name}`],
                      ["Gender",          doctor?.gender],
                      ["Email",           doctor?.email],
                      ["Phone",           doctor?.contact],
                      ["Specialization",  doctor?.specialization],
                      ["Qualification",   doctor?.qualification],
                      ["Experience",      doctor?.experience ? `${doctor.experience} years` : "—"],
                      ["Consultation Fee",doctor?.consultationFee ? `₹${doctor.consultationFee}` : "—"],
                      ["Hospital",        doctor?.hospital],
                      ["Doctor ID",       `#${doctor?.id}`],
                    ].map(([label,val]) => (
                      <Grid item xs={12} sm={6} key={label}>
                        <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1.1px", color:"#8892b0", fontWeight:600, mb:.6 }}>{label}</Typography>
                        <Typography sx={{ fontSize:".95rem", fontWeight:500, color:"#1a1f36" }}>{val||"—"}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </Box>

      {/* ── Modals ── */}
      <PatientModal appt={selectedAppt} open={Boolean(selectedAppt)} onClose={() => setSelectedAppt(null)} onWriteRx={appt => setRxAppt(appt)} />
      <WritePrescriptionModal appt={rxAppt} open={Boolean(rxAppt)} onClose={() => setRxAppt(null)} onSaved={handleRxSaved} />
    </Box>
  );
}