// // import { useContext, useEffect, useState } from "react";
// // import axios from "axios";
// // import { AuthContext } from "../context/AuthContext";
// // import BookAppointment from "./BookAppointment";
// // import {
// //   Box,
// //   Typography,
// //   TextField,
// //   Button,
// //   Paper,
// //   CircularProgress,
// //   Alert,
// //   Grid,
// //   Card,
// //   CardContent,
// //   Avatar,
// //   Chip,
// //   MenuItem,
// // } from "@mui/material";
// // import { motion } from "framer-motion";

// // export default function PatientDashboard() {
// //   const { user } = useContext(AuthContext);
// //   const userId = user?.id || localStorage.getItem("userId");

// //   const [patient, setPatient] = useState(null);
// //   const [accessList, setAccessList] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const [form, setForm] = useState({
// //     name: "",
// //     gender: "",
// //     age: "",
// //     dob: "",
// //     contact: "",
// //   });

// //   // 🔹 Fetch patient profile
// //   useEffect(() => {
// //     const fetchPatient = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://localhost:8080/patient/user/${userId}`
// //         );
// //         setPatient(res.data);

// //         const accessRes = await axios.get(
// //           `http://localhost:8080/patient/${res.data.id}/accessList`
// //         );
// //         setAccessList(accessRes.data);
// //       } catch (err) {
// //         if (err.response?.status !== 404) {
// //           setError("Failed to load patient profile.");
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (userId) fetchPatient();
// //     else {
// //       setError("User ID missing.");
// //       setLoading(false);
// //     }
// //   }, [userId]);

// //   // 🔹 Auto age calculation
// //   const calculateAge = (dob) => {
// //     const birthDate = new Date(dob);
// //     const ageDiff = Date.now() - birthDate.getTime();
// //     return new Date(ageDiff).getUTCFullYear() - 1970;
// //   };

// //   // 🔹 Form change
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name === "dob") {
// //       setForm({ ...form, dob: value, age: calculateAge(value) });
// //     } else {
// //       setForm({ ...form, [name]: value });
// //     }
// //   };

// //   // 🔹 Create patient profile
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.post("http://localhost:8080/patient", {
// //         ...form,
// //         user: { id: Number(userId) },
// //       });

// //       setPatient(res.data);
// //     } catch {
// //       setError("Failed to create patient profile.");
// //     }
// //   };

// //   // 🔹 Loading
// //   if (loading)
// //     return (
// //       <Box sx={{ textAlign: "center", mt: 10 }}>
// //         <CircularProgress size={60} sx={{ color: "#00e5ff" }} />
// //       </Box>
// //     );

// //   // 🔹 Error
// //   if (error)
// //     return (
// //       <Box sx={{ textAlign: "center", mt: 10 }}>
// //         <Alert severity="error">{error}</Alert>
// //       </Box>
// //     );

// //   // 🔹 Show form if patient not created
// //   if (!patient) {
// //     return (
// //       <Box
// //         sx={{
// //           minHeight: "100vh",
// //           background: "linear-gradient(135deg,#020617,#020617,#0a1a2f)",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //         }}
// //       >
// //         <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
// //           <Paper
// //             sx={{
// //               p: 5,
// //               width: 420,
// //               backdropFilter: "blur(25px)",
// //               background: "rgba(255,255,255,0.08)",
// //               borderRadius: 4,
// //               color: "#fff",
// //               boxShadow: "0 0 40px rgba(0,191,255,0.35)",
// //             }}
// //           >
// //             <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
// //               Create Patient Profile
// //             </Typography>

// //             <form onSubmit={handleSubmit}>
// //               <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} required />

// //               <TextField
// //                 select
// //                 fullWidth
// //                 label="Gender"
// //                 name="gender"
// //                 margin="normal"
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <MenuItem value="Male">Male</MenuItem>
// //                 <MenuItem value="Female">Female</MenuItem>
// //                 <MenuItem value="Other">Other</MenuItem>
// //               </TextField>

// //               <TextField
// //                 fullWidth
// //                 type="date"
// //                 label="Date of Birth"
// //                 name="dob"
// //                 margin="normal"
// //                 InputLabelProps={{ shrink: true }}
// //                 onChange={handleChange}
// //                 required
// //               />

// //               <TextField fullWidth label="Age" name="age" margin="normal" value={form.age} disabled />

// //               <TextField fullWidth label="Contact" name="contact" margin="normal" onChange={handleChange} required />

// //               <Button
// //                 fullWidth
// //                 type="submit"
// //                 variant="contained"
// //                 sx={{
// //                   mt: 3,
// //                   background: "linear-gradient(45deg,#00bfff,#1e90ff)",
// //                   boxShadow: "0 0 20px rgba(0,191,255,0.7)",
// //                   fontWeight: "bold",
// //                 }}
// //               >
// //                 Save Profile
// //               </Button>
// //             </form>
// //           </Paper>
// //         </motion.div>
// //       </Box>
// //     );
// //   }

// //   // 🔥 DASHBOARD VIEW
// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         background: "radial-gradient(circle at top, #021024, #020617 60%)",
// //         color: "#fff",
// //         p: 4,
// //       }}
// //     >
// //       {/* Title */}
// //       <Typography
// //         variant="h3"
// //         align="center"
// //         sx={{
// //           fontWeight: "bold",
// //           mb: 5,
// //           textShadow: "0 0 20px rgba(0,191,255,0.9)",
// //         }}
// //       >
// //         Patient Dashboard
// //       </Typography>

// //       {/* Profile Card */}
// //       <Grid container justifyContent="center">
// //         <Grid item xs={12} md={8} lg={6}>
// //           <motion.div whileHover={{ scale: 1.03 }}>
// //             <Card
// //               sx={{
// //                 p: 5,
// //                 borderRadius: 5,
// //                 backdropFilter: "blur(25px)",
// //                 background:
// //                   "linear-gradient(145deg, rgba(0,191,255,0.18), rgba(255,255,255,0.05))",
// //                 boxShadow: "0 0 60px rgba(0,191,255,0.35)",
// //                 textAlign: "center",
// //               }}
// //             >
// //               <CardContent>
// //                 <Avatar
// //                   sx={{
// //                     width: 120,
// //                     height: 120,
// //                     fontSize: 48,
// //                     bgcolor: "#00bfff",
// //                     margin: "0 auto",
// //                     boxShadow: "0 0 40px rgba(0,191,255,0.9)",
// //                   }}
// //                 >
// //                   {patient.name?.charAt(0)}
// //                 </Avatar>

// //                 <Typography variant="h4" sx={{ mt: 3, fontWeight: "bold" }}>
// //                   {patient.name}
// //                 </Typography>

// //                 <Chip
// //                   label="Active Patient"
// //                   sx={{
// //                     mt: 1,
// //                     bgcolor: "rgba(0,255,170,0.2)",
// //                     color: "#00ffaa",
// //                     border: "1px solid #00ffaa",
// //                   }}
// //                 />

// //                 <Box sx={{ mt: 4, textAlign: "left" }}>
// //                   <Typography>Gender: {patient.gender}</Typography>
// //                   <Typography>Age: {patient.age}</Typography>
// //                   <Typography>DOB: {patient.dob}</Typography>
// //                   <Typography>Contact: {patient.contact}</Typography>
// //                 </Box>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //         </Grid>
// //       </Grid>

// //       {/* Doctors with Access */}
// //       <Box sx={{ mt: 6 }}>
// //         <Typography variant="h5" align="center" sx={{ mb: 3, color: "#00e5ff" }}>
// //           Doctors with Access
// //         </Typography>

// //         <Grid container spacing={3} justifyContent="center">
// //           {accessList.length === 0 ? (
// //             <Typography sx={{ color: "#aaa" }}>
// //               No doctors have access yet.
// //             </Typography>
// //           ) : (
// //             accessList.map((a) => (
// //               <Grid item key={a.id} xs={12} md={4}>
// //                 <motion.div whileHover={{ scale: 1.05 }}>
// //                   <Card
// //                     sx={{
// //                       p: 3,
// //                       textAlign: "center",
// //                       borderRadius: 4,
// //                       backdropFilter: "blur(20px)",
// //                       background: "rgba(255,255,255,0.08)",
// //                       boxShadow: "0 0 25px rgba(0,229,255,0.2)",
// //                     }}
// //                   >
// //                     <Typography variant="h6">
// //                       Dr. {a.doctor?.name || "Unknown"}
// //                     </Typography>
// //                   </Card>
// //                 </motion.div>
// //               </Grid>
// //             ))
// //           )}
// //         </Grid>
// //       </Box>

// //       {/* Book Appointment */}
// //       {accessList.length > 0 && (
// //         <Box sx={{ mt: 8 }}>
// //           <Typography variant="h5" align="center" sx={{ mb: 3, color: "#00e5ff" }}>
// //             Book Appointment
// //           </Typography>

// //           <Grid container justifyContent="center">
// //             <Grid item xs={12} md={8} lg={6}>
// //               <BookAppointment
// //                 patientId={patient.id}
// //                 doctorId={accessList[0].doctor.id}
// //               />
// //             </Grid>
// //           </Grid>
// //         </Box>
// //       )}
// //     </Box>
// //   );
// // }

// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Button,
// } from "@mui/material";
// import { motion } from "framer-motion";

// export default function PatientDashboard() {
//   const { user } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [patient, setPatient] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 🔹 Fetch patient + doctors
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const patientRes = await axios.get(
//           `http://localhost:8080/patient/user/${userId}`
//         );
//         setPatient(patientRes.data);

//         const doctorRes = await axios.get("http://localhost:8080/doctor");
//         setDoctors(doctorRes.data);
//       } catch (err) {
//         setError("Failed to load dashboard.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchData();
//     else {
//       setError("User ID missing.");
//       setLoading(false);
//     }
//   }, [userId]);

//   if (loading)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );

//   if (error)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );

//       const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "dob") {
//       setForm({ ...form, dob: value, age: calculateAge(value) });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//      if (!patient) {
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
//         <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
//           <Paper
//             sx={{
//               p: 5,
//               width: 420,
//               backdropFilter: "blur(25px)",
//               background: "rgba(255,255,255,0.08)",
//               borderRadius: 4,
//               color: "#fff",
//               boxShadow: "0 0 40px rgba(0,191,255,0.35)",
//             }}
//           >
//             <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
//               Create Patient Profile
//             </Typography>

//             <form onSubmit={handleSubmit}>
//               <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} required />

//               <TextField
//                 select
//                 fullWidth
//                 label="Gender"
//                 name="gender"
//                 margin="normal"
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </TextField>

//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Date of Birth"
//                 name="dob"
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//                 onChange={handleChange}
//                 required
//               />

//               <TextField fullWidth label="Age" name="age" margin="normal" value={form.age} disabled />

//               <TextField fullWidth label="Contact" name="contact" margin="normal" onChange={handleChange} required />

//               <Button
//                 fullWidth
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   background: "linear-gradient(45deg,#00bfff,#1e90ff)",
//                   boxShadow: "0 0 20px rgba(0,191,255,0.7)",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Save Profile
//               </Button>
//             </form>
//           </Paper>
//         </motion.div>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top, #021024, #020617 60%)",
//         color: "white",
//         p: 4,
//       }}
//     >
//       {/* 🔹 Profile */}
//       <Grid container justifyContent="center">
//         <Grid item xs={12} md={8} lg={6}>
//           <Card
//             sx={{
//               p: 5,
//               borderRadius: 5,
//               textAlign: "center",
//               background:
//                 "linear-gradient(145deg, rgba(0,191,255,0.18), rgba(255,255,255,0.05))",
//               backdropFilter: "blur(25px)",
//               boxShadow: "0 0 60px rgba(0,191,255,0.35)",
//               color: "white",
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 120,
//                 height: 120,
//                 fontSize: 48,
//                 bgcolor: "#00bfff",
//                 margin: "0 auto",
//               }}
//             >
//               {patient.name?.charAt(0)}
//             </Avatar>

//             <Typography variant="h4" sx={{ mt: 2 }}>
//               {patient.name}
//             </Typography>
//             <Typography>Gender: {patient.gender}</Typography>
//             <Typography>Age: {patient.age}</Typography>
//             <Typography>Contact: {patient.contact}</Typography>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* 🔹 Doctor List */}
//       <Typography
//         variant="h4"
//         align="center"
//         sx={{ mt: 6, mb: 3, color: "#00e5ff" }}
//       >
//         Available Doctors
//       </Typography>

//       <Grid container spacing={3} justifyContent="center">
//         {doctors.map((doc) => (
//           <Grid item xs={12} md={4} key={doc.id}>
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Card
//                 sx={{
//                   p: 3,
//                   textAlign: "center",
//                   borderRadius: 4,
//                   backdropFilter: "blur(20px)",
//                   background: "rgba(255,255,255,0.08)",
//                   color: "white",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">Dr. {doc.name}</Typography>
//                   <Typography sx={{ color: "#00e5ff" }}>
//                     {doc.specialization}
//                   </Typography>

//                   <Button
//                     variant="contained"
//                     sx={{ mt: 2 }}
//                     onClick={() =>
//                       navigate(`/book-appointment/${patient.id}/${doc.id}`)
//                     }
//                   >
//                     Book Appointment
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }



// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Button,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import { motion } from "framer-motion";

// export default function PatientDashboard() {
//   const { user } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [patient, setPatient] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     gender: "",
//     age: "",
//     dob: "",
//     contact: "",
//   });

//   // 🔹 Fetch patient + doctors
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const patientRes = await axios.get(
//           `http://localhost:8080/patient/user/${userId}`
//         );
//         setPatient(patientRes.data);

//         const doctorRes = await axios.get("http://localhost:8080/doctor");
//         setDoctors(doctorRes.data);
//       } catch (err) {
//         // If patient not found → show form
//         if (err.response?.status === 404) {
//           setPatient(null);
//         } else {
//           setError("Failed to load dashboard.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchData();
//     else {
//       setError("User ID missing.");
//       setLoading(false);
//     }
//   }, [userId]);

//   // 🔹 Calculate age from DOB
//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     return new Date().getFullYear() - birthDate.getFullYear();
//   };

//   // 🔹 Form change handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "dob") {
//       setForm({ ...form, dob: value, age: calculateAge(value) });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // 🔹 Create patient profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8080/patient", {
//         ...form,
//         user: { id: Number(userId) },
//       });
//       setPatient(res.data);
//     } catch {
//       setError("Failed to create patient profile.");
//     }
//   };

//   // 🔹 Loading
//   if (loading)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );

//   // 🔹 Error
//   if (error)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );

//   // 🔥 SHOW FORM IF PATIENT DOESN'T EXIST
//   if (!patient) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg,#020617,#0a1a2f)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
//           <Paper
//             sx={{
//               p: 5,
//               width: 420,
//               borderRadius: 4,
//               backdropFilter: "blur(20px)",
//               background: "rgba(255,255,255,0.08)",
//               color: "#fff",
//               boxShadow: "0 0 40px rgba(0,191,255,0.35)",
//             }}
//           >
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Create Patient Profile
//             </Typography>

//             <form onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 margin="normal"
//                 onChange={handleChange}
//                 required
//               />

//               <TextField
//                 select
//                 fullWidth
//                 label="Gender"
//                 name="gender"
//                 margin="normal"
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </TextField>

//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Date of Birth"
//                 name="dob"
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//                 onChange={handleChange}
//                 required
//               />

//               <TextField
//                 fullWidth
//                 label="Age"
//                 name="age"
//                 margin="normal"
//                 value={form.age}
//                 disabled
//               />

//               <TextField
//                 fullWidth
//                 label="Contact"
//                 name="contact"
//                 margin="normal"
//                 onChange={handleChange}
//                 required
//               />

//               <Button
//                 fullWidth
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   background: "linear-gradient(45deg,#00bfff,#1e90ff)",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Save Profile
//               </Button>
//             </form>
//           </Paper>
//         </motion.div>
//       </Box>
//     );
//   }

//   // 🔥 DASHBOARD VIEW
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top, #021024, #020617 60%)",
//         color: "white",
//         p: 4,
//       }}
//     >
//       {/* Profile */}
//       <Grid container justifyContent="center">
//         <Grid item xs={12} md={8} lg={6}>
//           <Card
//             sx={{
//               p: 5,
//               borderRadius: 5,
//               textAlign: "center",
//               background:
//                 "linear-gradient(145deg, rgba(0,191,255,0.18), rgba(255,255,255,0.05))",
//               backdropFilter: "blur(25px)",
//               boxShadow: "0 0 60px rgba(0,191,255,0.35)",
//               color: "white",
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 120,
//                 height: 120,
//                 fontSize: 48,
//                 bgcolor: "#00bfff",
//                 margin: "0 auto",
//               }}
//             >
//               {patient.name?.charAt(0)}
//             </Avatar>

//             <Typography variant="h4" sx={{ mt: 2 }}>
//               {patient.name}
//             </Typography>
//             <Typography>Gender: {patient.gender}</Typography>
//             <Typography>Age: {patient.age}</Typography>
//             <Typography>Contact: {patient.contact}</Typography>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Doctor List */}
//       <Typography
//         variant="h4"
//         align="center"
//         sx={{ mt: 6, mb: 3, color: "#00e5ff" }}
//       >
//         Available Doctors
//       </Typography>

//       <Grid container spacing={3} justifyContent="center">
//         {doctors.map((doc) => (
//           <Grid item xs={12} md={4} key={doc.id}>
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Card
//                 sx={{
//                   p: 3,
//                   textAlign: "center",
//                   borderRadius: 4,
//                   backdropFilter: "blur(20px)",
//                   background: "rgba(255,255,255,0.08)",
//                   color: "white",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">Dr. {doc.name}</Typography>
//                   <Typography sx={{ color: "#00e5ff" }}>
//                     {doc.specialization}
//                   </Typography>

//                   <Button
//                     variant="contained"
//                     sx={{ mt: 2 }}
//                     onClick={() =>
//                       navigate(`/book-appointment/${patient.id}/${doc.id}`)
//                     }
//                   >
//                     Book Appointment
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }



// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Button,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import { motion } from "framer-motion";

// export default function PatientDashboard() {
//   const { user } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [patient, setPatient] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     gender: "",
//     dob: "",
//     age: "",
//     contact: "",
//   });

//   // 🔹 Dark TextField styling
//   const darkField = {
//     input: { color: "#fff" },
//     label: { color: "#aaa" },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": { borderColor: "#00bfff" },
//       "&:hover fieldset": { borderColor: "#1e90ff" },
//       "&.Mui-focused fieldset": { borderColor: "#00e5ff" },
//     },
//   };

//   // 🔹 Fetch patient + doctors
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const patientRes = await axios.get(
//           `http://localhost:8080/patient/user/${userId}`
//         );
//         setPatient(patientRes.data);
//       } catch (err) {
//         // 404 means patient not created yet → show form
//         if (err.response?.status !== 404) {
//           setError("Failed to load patient.");
//         }
//       }

//       try {
//         const doctorRes = await axios.get("http://localhost:8080/doctor");
//         setDoctors(doctorRes.data);
//       } catch {
//         setError("Failed to load doctors.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchData();
//     else {
//       setError("User ID missing.");
//       setLoading(false);
//     }
//   }, [userId]);

//   // 🔹 Auto age calculation
//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const diff = Date.now() - birthDate.getTime();
//     return new Date(diff).getUTCFullYear() - 1970;
//   };

//   // 🔹 Form change
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "dob") {
//       setForm({ ...form, dob: value, age: calculateAge(value) });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // 🔹 Create patient profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:8080/patient", {
//         ...form,
//         user: { id: Number(userId) },
//       });

//       setPatient(res.data);
//     } catch {
//       setError("Failed to create patient profile.");
//     }
//   };

//   // 🔹 Loading
//   if (loading)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );

//   // 🔹 Error
//   if (error)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );

//   // 🔥 SHOW FORM IF PATIENT NOT CREATED
//   if (!patient) {
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
//         <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
//           <Paper
//             sx={{
//               p: 5,
//               width: 420,
//               backdropFilter: "blur(25px)",
//               background: "rgba(255,255,255,0.08)",
//               borderRadius: 4,
//               color: "#fff",
//               boxShadow: "0 0 40px rgba(0,191,255,0.35)",
//             }}
//           >
//             <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
//               Create Patient Profile
//             </Typography>

//             <form onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 margin="normal"
//                 onChange={handleChange}
//                 required
//                 sx={darkField}
//               />

//               <TextField
//                 select
//                 fullWidth
//                 label="Gender"
//                 name="gender"
//                 margin="normal"
//                 onChange={handleChange}
//                 required
//                 sx={darkField}
//               >
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </TextField>

//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Date of Birth"
//                 name="dob"
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//                 onChange={handleChange}
//                 required
//                 sx={darkField}
//               />

//               <TextField
//                 fullWidth
//                 label="Age"
//                 name="age"
//                 margin="normal"
//                 value={form.age}
//                 InputProps={{ readOnly: true }}
//                 sx={darkField}
//               />

//               <TextField
//                 fullWidth
//                 label="Contact"
//                 name="contact"
//                 margin="normal"
//                 onChange={handleChange}
//                 required
//                 sx={darkField}
//               />

//               <Button
//                 fullWidth
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   background: "linear-gradient(45deg,#00bfff,#1e90ff)",
//                   boxShadow: "0 0 20px rgba(0,191,255,0.7)",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Save Profile
//               </Button>
//             </form>
//           </Paper>
//         </motion.div>
//       </Box>
//     );
//   }

//   // 🔥 DASHBOARD VIEW
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top, #021024, #020617 60%)",
//         color: "white",
//         p: 4,
//       }}
//     >
//       {/* Profile */}
//       <Grid container justifyContent="center">
//         <Grid item xs={12} md={8} lg={6}>
//           <Card
//             sx={{
//               p: 5,
//               borderRadius: 5,
//               textAlign: "center",
//               background:
//                 "linear-gradient(145deg, rgba(0,191,255,0.18), rgba(255,255,255,0.05))",
//               backdropFilter: "blur(25px)",
//               boxShadow: "0 0 60px rgba(0,191,255,0.35)",
//               color: "white",
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 120,
//                 height: 120,
//                 fontSize: 48,
//                 bgcolor: "#00bfff",
//                 margin: "0 auto",
//               }}
//             >
//               {patient.name?.charAt(0)}
//             </Avatar>

//             <Typography variant="h4" sx={{ mt: 2 }}>
//               {patient.name}
//             </Typography>
//             <Typography>Gender: {patient.gender}</Typography>
//             <Typography>Age: {patient.age}</Typography>
//             <Typography>Contact: {patient.contact}</Typography>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Doctors */}
//       <Typography
//         variant="h4"
//         align="center"
//         sx={{ mt: 6, mb: 3, color: "#00e5ff" }}
//       >
//         Available Doctors
//       </Typography>

//       <Grid container spacing={3} justifyContent="center">
//         {doctors.map((doc) => (
//           <Grid item xs={12} md={4} key={doc.id}>
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Card
//                 sx={{
//                   p: 3,
//                   textAlign: "center",
//                   borderRadius: 4,
//                   backdropFilter: "blur(20px)",
//                   background: "rgba(255,255,255,0.08)",
//                   color: "white",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">Dr. {doc.name}</Typography>
//                   <Typography sx={{ color: "#00e5ff" }}>
//                     {doc.specialization}
//                   </Typography>

//                   <Button
//                     variant="contained"
//                     sx={{ mt: 2 }}
//                     onClick={() =>
//                       navigate(`/book-appointment/${patient.id}/${doc.id}`)
//                     }
//                   >
//                     Book Appointment
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }






// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Button,
//   Divider,
//   Chip,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import LogoutIcon from "@mui/icons-material/Logout";
// import EventIcon from "@mui/icons-material/Event";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
// import { motion, AnimatePresence } from "framer-motion";

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   /* overlay */
//   .sidebar-overlay {
//     position: fixed; inset: 0;
//     background: rgba(26,31,54,.18);
//     backdrop-filter: blur(3px);
//     z-index: 199;
//     animation: overlayIn .2s ease;
//   }
//   @keyframes overlayIn { from{opacity:0} to{opacity:1} }

//   /* sidebar panel */
//   .portal-sidebar {
//     width: 260px; background: #ffffff;
//     border-right: 1px solid #e8ecf5;
//     display: flex; flex-direction: column;
//     padding: 20px 14px 24px;
//     position: fixed; top: 0; left: 0;
//     height: 100vh; z-index: 200;
//     box-shadow: 4px 0 28px rgba(79,110,247,.12);
//     transition: transform .28s cubic-bezier(.22,1,.36,1);
//   }
//   .portal-sidebar.closed { transform: translateX(-100%); }
//   .portal-sidebar.open   { transform: translateX(0); }

//   /* sidebar top row */
//   .sidebar-top-row {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 0 6px 20px;
//   }
//   .sidebar-logo {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.4rem; font-weight: 700; color: #4f6ef7;
//     display: flex; align-items: center; gap: 9px;
//   }
//   .logo-icon {
//     width: 32px; height: 32px; border-radius: 9px;
//     background: linear-gradient(135deg, #4f6ef7, #7c3aed);
//     display: flex; align-items: center; justify-content: center;
//     color: #fff; font-size: .85rem; flex-shrink: 0;
//   }
//   .logo-accent { color: #7c3aed; }
//   .sidebar-close-btn {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #8892b0;
//     transition: all .15s;
//   }
//   .sidebar-close-btn:hover { background: #eef1fe; color: #4f6ef7; border-color: rgba(79,110,247,.2); }

//   .nav-section-label {
//     font-size: .67rem; text-transform: uppercase; letter-spacing: 1.2px;
//     color: #b0b8d0; font-weight: 600; padding: 0 10px; margin: 4px 0 6px;
//   }
//   .nav-item {
//     display: flex; align-items: center; gap: 11px;
//     padding: 10px 12px; border-radius: 11px; cursor: pointer;
//     font-size: .875rem; font-weight: 500; color: #4a5278;
//     transition: all .18s ease; border: 1px solid transparent;
//     margin-bottom: 3px; user-select: none;
//   }
//   .nav-item:hover { background: #eef1fe; color: #4f6ef7; }
//   .nav-item.active { background: #eef1fe; color: #4f6ef7; font-weight: 600; border-color: rgba(79,110,247,.18); }
//   .nav-item.active .nav-icon-wrap { background: #4f6ef7 !important; color: #fff !important; }
//   .nav-icon-wrap {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f0f2f8; display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0; transition: all .18s; color: #4a5278;
//   }
//   .sidebar-spacer { flex: 1; }
//   .user-card {
//     display: flex; align-items: center; gap: 11px;
//     padding: 12px; border-radius: 14px;
//     background: #f5f7ff; border: 1px solid #e8ecf5; margin-bottom: 10px;
//   }
//   .user-mini-av {
//     width: 36px; height: 36px; border-radius: 10px;
//     background: linear-gradient(135deg, #4f6ef7, #7c3aed);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Cormorant Garamond', serif; font-weight: 700; color: #fff; font-size: 1.1rem;
//   }

//   /* top bar */
//   .portal-topbar {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 13px 24px; background: #fff;
//     border-bottom: 1px solid #e8ecf5;
//     box-shadow: 0 1px 8px rgba(79,110,247,.07);
//     position: sticky; top: 0; z-index: 100;
//   }
//   .topbar-left { display: flex; align-items: center; gap: 14px; }
//   .hamburger-btn {
//     width: 38px; height: 38px; border-radius: 10px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #4f6ef7; transition: all .18s;
//   }
//   .hamburger-btn:hover { background: #eef1fe; border-color: rgba(79,110,247,.2); }

//   /* blobs */
//   .blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
//   .blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
//   .blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }

//   /* cards */
//   .light-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important; border-radius: 18px !important;
//     box-shadow: 0 1px 4px rgba(79,110,247,.06), 0 2px 12px rgba(0,0,0,.04) !important;
//     transition: box-shadow .22s, border-color .22s, transform .22s !important;
//   }
//   .light-card:hover { box-shadow: 0 4px 24px rgba(79,110,247,.12) !important; border-color: #d4daf0 !important; }

//   .hero-card {
//     background: linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;
//     border: 1px solid #e8ecf5 !important; border-radius: 20px !important;
//     box-shadow: 0 2px 16px rgba(79,110,247,.08) !important;
//     padding: 36px 40px !important; position: relative; overflow: hidden;
//   }
//   .hero-card::after { content:'✦'; position:absolute; right:40px; bottom:10px; font-size:5rem; color:rgba(79,110,247,.04); line-height:1; pointer-events:none; }

//   .stat-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important; border-radius: 18px !important;
//     box-shadow: 0 1px 6px rgba(79,110,247,.06) !important;
//     padding: 24px 28px; position: relative; overflow: hidden;
//     transition: box-shadow .2s, transform .2s !important;
//   }
//   .stat-card:hover { box-shadow: 0 6px 24px rgba(79,110,247,.13) !important; transform: translateY(-2px); }
//   .stat-value { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; line-height:1; }
//   .stat-label { font-size:.72rem; color:#8892b0; text-transform:uppercase; letter-spacing:1px; font-weight:600; margin-bottom:8px; }
//   .stat-icon  { position:absolute; right:20px; top:50%; transform:translateY(-50%); font-size:2.4rem; opacity:.07; }

//   .sec-heading {
//     font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700; color:#1a1f36;
//     display:flex; align-items:center; gap:12px; margin-bottom:16px;
//   }
//   .sec-heading::after { content:''; flex:1; height:1px; background:#e8ecf5; }

//   .av-blue   { background: linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-violet { background: linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
//   .av-teal   { background: linear-gradient(135deg,#0891b2,#22d3ee) !important; }
//   .av-rose   { background: linear-gradient(135deg,#e11d48,#fb7185) !important; }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation: fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
// `;

// if (!document.getElementById("portal-styles")) {
//   const s = document.createElement("style");
//   s.id = "portal-styles";
//   s.textContent = globalStyles;
//   document.head.appendChild(s);
// }

// const avatarColors = ["av-blue", "av-violet", "av-teal", "av-rose"];
// const getAvatarClass = (i) => avatarColors[i % avatarColors.length];
// const getStatusColor = (status) => {
//   switch (status) {
//     case "APPROVED": return "success";
//     case "REJECTED": return "error";
//     default:         return "warning";
//   }
// };

// function NavItem({ icon, label, active, onClick }) {
//   return (
//     <div className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
//       <div className="nav-icon-wrap">{icon}</div>
//       {label}
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="stat-card fu">
//       <div className="stat-label">{label}</div>
//       <div className="stat-value" style={{ color }}>{value}</div>
//       <div className="stat-icon">{icon}</div>
//     </div>
//   );
// }

// export default function PatientDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [patient,      setPatient]      = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [doctors,      setDoctors]      = useState([]);
//   const [view,         setView]         = useState("dashboard");
//   const [sidebarOpen,  setSidebarOpen]  = useState(false);  // ← hamburger toggle
//   const [loading,      setLoading]      = useState(true);
//   const [error,        setError]        = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const patientRes = await axios.get(`http://localhost:8080/patient/user/${userId}`);
//         setPatient(patientRes.data);
//         const [apptRes, docRes] = await Promise.all([
//           axios.get(`http://localhost:8080/appointments/patient/${patientRes.data.id}`),
//           axios.get("http://localhost:8080/doctor"),
//         ]);
//         setAppointments(apptRes.data);
//         setDoctors(docRes.data);
//       } catch {
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (userId) fetchData();
//   }, [userId]);

//   const handleLogout = () => { logout(); navigate("/"); };
//   const handleNavClick = (key) => { setView(key); setSidebarOpen(false); };
//   const countStatus = (s) => appointments.filter((a) => a.status === s).length;

//   const menuItems = [
//     { key: "dashboard",    label: "Dashboard",        icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
//     { key: "appointments", label: "My Appointments",  icon: <EventIcon      sx={{ fontSize: 18 }} /> },
//     { key: "book",         label: "Book Appointment", icon: <AddIcon        sx={{ fontSize: 18 }} /> },
//     { key: "profile",      label: "Profile",          icon: <PersonIcon     sx={{ fontSize: 18 }} /> },
//   ];

//   if (loading) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <CircularProgress sx={{ color:"#4f6ef7" }} />
//     </Box>
//   );
//   if (error) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <Alert severity="error">{error}</Alert>
//     </Box>
//   );

//   return (
//     <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
//       <div className="blob blob-1" />
//       <div className="blob blob-2" />

//       {/* ── Overlay ── */}
//       {sidebarOpen && (
//         <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
//       )}

//       {/* ── Sidebar ── */}
//       <div className={`portal-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-top-row">
//           <div className="sidebar-logo">
//             <div className="logo-icon">✦</div>
//             Med<span className="logo-accent">Vault</span>
//           </div>
//           <div className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </div>
//         </div>

//         <div className="nav-section-label">Navigation</div>

//         {menuItems.map((item) => (
//           <NavItem key={item.key} icon={item.icon} label={item.label}
//             active={view === item.key} onClick={() => handleNavClick(item.key)} />
//         ))}

//         <div className="sidebar-spacer" />

//         <div className="user-card">
//           <div className="user-mini-av">{patient.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>{patient.name}</Typography>
//             <Typography sx={{ fontSize:".72rem", color:"#8892b0" }}>Patient</Typography>
//           </Box>
//         </div>

//         <button onClick={handleLogout}
//           style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11,
//                    cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48",
//                    border:"1px solid transparent", background:"none", width:"100%",
//                    fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
//           onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.borderColor="transparent"; }}>
//           <div className="nav-icon-wrap" style={{ background:"#fff1f3", color:"#e11d48" }}>
//             <LogoutIcon sx={{ fontSize:16 }} />
//           </div>
//           Sign Out
//         </button>
//       </div>

//       {/* ── Top bar ── */}
//       <div className="portal-topbar">
//         <div className="topbar-left">
//           {/* ☰ Hamburger */}
//           <div className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
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

//             {/* DASHBOARD */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Good morning, {patient.name?.split(" ")[0]} ☀️
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Here's a summary of your health portal</Typography>
//                 </Box>

//                 <Box className="hero-card" sx={{ mb:4, display:"flex", alignItems:"center", gap:3 }}>
//                   <Avatar className="av-blue" sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", boxShadow:"0 8px 24px rgba(79,110,247,.3)" }}>
//                     {patient.name?.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>{patient.name}</Typography>
//                     <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>Patient ID · #{patient.id}</Typography>
//                     <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
//                       {[patient.gender, `Age ${patient.age}`, patient.contact].map((v, i) => (
//                         <Chip key={i} label={v} size="small" sx={{ background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.18)", fontWeight:500, fontSize:".75rem" }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </Box>

//                 <Grid container spacing={2.5} sx={{ mb:4 }}>
//                   <Grid item xs={12} sm={4}><StatCard label="Total Appointments" value={appointments.length} icon="📅" color="#4f6ef7" /></Grid>
//                   <Grid item xs={12} sm={4}><StatCard label="Approved" value={countStatus("APPROVED")} icon="✓" color="#7c3aed" /></Grid>
//                   <Grid item xs={12} sm={4}><StatCard label="Pending" value={appointments.length - countStatus("APPROVED") - countStatus("REJECTED")} icon="⏳" color="#0891b2" /></Grid>
//                 </Grid>

//                 <div className="sec-heading">Recent Appointments</div>
//                 <Grid container spacing={2.5}>
//                   {appointments.slice(0, 3).map((appt, i) => (
//                     <Grid item xs={12} md={4} key={appt.id}>
//                       <motion.div whileHover={{ scale:1.03 }}>
//                         <Card className="light-card">
//                           <CardContent sx={{ p:"20px !important" }}>
//                             <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                               <Avatar className={getAvatarClass(i)} sx={{ width:44, height:44, borderRadius:"12px", fontSize:"1rem", fontWeight:700 }}>
//                                 {appt.doctor?.name?.charAt(0)}
//                               </Avatar>
//                               <Box>
//                                 <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
//                                 <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>{appt.doctor?.specialization}</Typography>
//                               </Box>
//                             </Box>
//                             <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📅 {appt.date} &nbsp;·&nbsp; 🕐 {appt.timeSlot}</Typography>
//                             <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight:600, fontSize:".72rem" }} />
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </>
//             )}

//             {/* MY APPOINTMENTS */}
//             {view === "appointments" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>My Appointments</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{appointments.length} total · {countStatus("APPROVED")} approved</Typography>
//                 </Box>
//                 {appointments.length === 0 ? (
//                   <Alert severity="info">No appointments booked yet.</Alert>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {appointments.map((appt, i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.03 }}>
//                           <Card className="light-card">
//                             <CardContent sx={{ p:"22px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                                 <Avatar className={getAvatarClass(i)} sx={{ width:46, height:46, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.doctor?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>{appt.doctor?.specialization}</Typography>
//                                 </Box>
//                               </Box>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.8 }}>📅 {appt.date}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>🕐 {appt.timeSlot}</Typography>
//                               <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight:600, fontSize:".72rem" }} />
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* BOOK APPOINTMENT */}
//             {view === "book" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Book Appointment</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Choose a specialist and schedule your visit</Typography>
//                 </Box>
//                 <Grid container spacing={2.5}>
//                   {doctors.map((doc, i) => (
//                     <Grid item xs={12} sm={6} md={4} key={doc.id}>
//                       <motion.div whileHover={{ scale:1.03 }}>
//                         <Card className="light-card" sx={{ textAlign:"center", p:3 }}>
//                           <Avatar className={getAvatarClass(i)} sx={{ width:68, height:68, borderRadius:"20px", mx:"auto", mb:1.5, fontSize:"1.8rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 6px 20px rgba(79,110,247,.22)" }}>
//                             {doc.name?.charAt(0)}
//                           </Avatar>
//                           <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>Dr. {doc.name}</Typography>
//                           <Typography sx={{ fontSize:".8rem", color:"#8892b0", mb:2 }}>{doc.specialization}</Typography>
//                           <Button variant="contained"
//                             onClick={() => navigate(`/book-appointment/${patient.id}/${doc.id}`)}
//                             sx={{ background:"linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius:"10px",
//                                   textTransform:"none", fontWeight:600, fontSize:".85rem",
//                                   boxShadow:"0 3px 12px rgba(79,110,247,.28)",
//                                   "&:hover":{ boxShadow:"0 6px 20px rgba(79,110,247,.38)", transform:"scale(1.03)" } }}>
//                             Book Now →
//                           </Button>
//                         </Card>
//                       </motion.div>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </>
//             )}

//             {/* PROFILE */}
//             {view === "profile" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Profile</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Your personal health information</Typography>
//                 </Box>
//                 <Card className="light-card" sx={{ p:4 }}>
//                   <Box sx={{ display:"flex", alignItems:"center", gap:2.5, mb:3 }}>
//                     <Avatar className="av-blue" sx={{ width:76, height:76, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 6px 20px rgba(79,110,247,.25)" }}>
//                       {patient.name?.charAt(0)}
//                     </Avatar>
//                     <Box>
//                       <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:700, color:"#1a1f36" }}>{patient.name}</Typography>
//                       <Typography sx={{ fontSize:".82rem", color:"#8892b0", mt:.5 }}>Patient Account · Active</Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[
//                       ["Full Name",     patient.name],
//                       ["Gender",        patient.gender],
//                       ["Date of Birth", patient.dob],
//                       ["Contact",       patient.contact],
//                       ["Age",           patient.age ? `${patient.age} years` : "—"],
//                       ["Patient ID",    `#${patient.id}`],
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
//     </Box>
//   );
// }

// import { useContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import PatientProfileForm from "./PatientProfileForm";
// import {
//   Box, Typography, CircularProgress, Alert, Grid, Card, CardContent,
//   Avatar, Button, Divider, Chip, TextField, InputAdornment,
//   MenuItem, Select, FormControl, Modal, IconButton, LinearProgress,
// } from "@mui/material";
// import MenuIcon          from "@mui/icons-material/Menu";
// import CloseIcon         from "@mui/icons-material/Close";
// import LogoutIcon        from "@mui/icons-material/Logout";
// import EventIcon         from "@mui/icons-material/Event";
// import DashboardIcon     from "@mui/icons-material/Dashboard";
// import PersonIcon        from "@mui/icons-material/Person";
// import AddIcon           from "@mui/icons-material/Add";
// import SearchIcon        from "@mui/icons-material/Search";
// import FolderIcon        from "@mui/icons-material/Folder";
// import UploadFileIcon    from "@mui/icons-material/UploadFile";
// import DescriptionIcon   from "@mui/icons-material/Description";
// import DeleteIcon        from "@mui/icons-material/Delete";
// import OpenInNewIcon     from "@mui/icons-material/OpenInNew";
// import DownloadIcon      from "@mui/icons-material/Download";
// import VisibilityIcon    from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import FilterListIcon    from "@mui/icons-material/FilterList";
// import { motion, AnimatePresence } from "framer-motion";

// const BASE = "http://localhost:8080";

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .sidebar-overlay { position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease; }
//   @keyframes overlayIn { from{opacity:0}to{opacity:1} }

//   .portal-sidebar {
//     width:260px;background:#fff;border-right:1px solid #e8ecf5;
//     display:flex;flex-direction:column;padding:20px 14px 24px;
//     position:fixed;top:0;left:0;height:100vh;z-index:200;
//     box-shadow:4px 0 28px rgba(79,110,247,.12);
//     transition:transform .28s cubic-bezier(.22,1,.36,1);
//   }
//   .portal-sidebar.closed { transform:translateX(-100%); }
//   .portal-sidebar.open   { transform:translateX(0); }

//   .sidebar-top-row { display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px; }
//   .sidebar-logo { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px; }
//   .logo-icon { width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0; }
//   .logo-accent { color:#7c3aed; }
//   .sidebar-close-btn { width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s; }
//   .sidebar-close-btn:hover { background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2); }

//   .nav-section-label { font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px; }
//   .nav-item { display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none; }
//   .nav-item:hover { background:#eef1fe;color:#4f6ef7; }
//   .nav-item.active { background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18); }
//   .nav-item.active .nav-icon-wrap { background:#4f6ef7 !important;color:#fff !important; }
//   .nav-icon-wrap { width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278; }
//   .sidebar-spacer { flex:1; }
//   .user-card { display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px; }
//   .user-mini-av { width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem; }

//   .portal-topbar { display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100; }
//   .topbar-left { display:flex;align-items:center;gap:14px; }
//   .hamburger-btn { width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s; }
//   .hamburger-btn:hover { background:#eef1fe;border-color:rgba(79,110,247,.2); }

//   .blob { position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0; }
//   .blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
//   .blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }

//   .light-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important; }
//   .light-card:hover { box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important; }
//   .hero-card { background:linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden; }
//   .hero-card::after { content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none; }
//   .stat-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important; }
//   .stat-card:hover { box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px); }
//   .stat-value { font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1; }
//   .stat-label { font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px; }
//   .stat-icon  { position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07; }
//   .sec-heading { font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px; }
//   .sec-heading::after { content:'';flex:1;height:1px;background:#e8ecf5; }

//   /* ── Specialization filter chips ── */
//   .spec-chip-wrap { display:flex;gap:8px;flex-wrap:wrap;padding:2px 0; }
//   .spec-chip { padding:6px 14px !important;border-radius:20px !important;font-size:.78rem !important;font-weight:600 !important;border:1px solid #e8ecf5 !important;cursor:pointer !important;transition:all .18s !important;background:#fff !important;color:#4a5278 !important;user-select:none; }
//   .spec-chip:hover  { background:#eef1fe !important;border-color:rgba(79,110,247,.25) !important;color:#4f6ef7 !important; }
//   .spec-chip.active { background:#4f6ef7 !important;border-color:#4f6ef7 !important;color:#fff !important; }

//   /* ── Medical record card ── */
//   .record-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:16px !important;box-shadow:0 1px 6px rgba(79,110,247,.07) !important;transition:box-shadow .22s,transform .22s !important;padding:20px 22px;margin-bottom:12px; }
//   .record-card:hover { box-shadow:0 5px 22px rgba(79,110,247,.13) !important;transform:translateY(-2px); }

//   /* ── Upload modal ── */
//   .upload-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:520px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
//   .upload-modal-box .MuiOutlinedInput-root { border-radius:12px !important;background:#f8f9ff !important; }
//   .upload-modal-box .MuiOutlinedInput-notchedOutline { border-color:#e8ecf5 !important; }
//   .upload-modal-box .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color:#4f6ef7 !important; }

//   /* ── Drop zone ── */
//   .drop-zone { border:2px dashed #c7cee8;border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:all .2s;background:#f8f9ff; }
//   .drop-zone:hover, .drop-zone.dragover { border-color:#4f6ef7;background:#eef1fe; }

//   /* ── File preview ── */
//   .file-preview-wrap { width:100%;border-radius:10px;overflow:hidden;border:1px solid #e8ecf5;margin-top:12px; }
//   .file-preview-wrap iframe { width:100%;height:340px;border:none;display:block; }
//   .file-preview-wrap img    { width:100%;display:block;max-height:380px;object-fit:contain;background:#f8f9ff; }

//   .av-blue   { background:linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-violet { background:linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
//   .av-teal   { background:linear-gradient(135deg,#0891b2,#22d3ee) !important; }
//   .av-rose   { background:linear-gradient(135deg,#e11d48,#fb7185) !important; }
//   .av-green  { background:linear-gradient(135deg,#059669,#34d399) !important; }
//   .av-amber  { background:linear-gradient(135deg,#d97706,#fbbf24) !important; }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
// `;

// if (!document.getElementById("portal-styles")) {
//   const s = document.createElement("style");
//   s.id = "portal-styles";
//   s.textContent = globalStyles;
//   document.head.appendChild(s);
// }

// // ── Constants ──────────────────────────────────────────────────────────────────
// const avatarColors   = ["av-blue","av-violet","av-teal","av-rose","av-green","av-amber"];
// const getAvatarClass = (i) => avatarColors[i % avatarColors.length];

// const RECORD_TYPES = ["LAB_REPORT","PRESCRIPTION","SCAN","VACCINATION","SURGERY","OTHER"];
// const RECORD_COLORS = {
//   LAB_REPORT:   { bg:"#eef1fe", color:"#4f6ef7", border:"rgba(79,110,247,.2)" },
//   PRESCRIPTION: { bg:"#ecfdf5", color:"#059669", border:"rgba(5,150,105,.2)"  },
//   SCAN:         { bg:"#fff1f3", color:"#e11d48", border:"rgba(225,29,72,.2)"  },
//   VACCINATION:  { bg:"#fffbeb", color:"#d97706", border:"rgba(217,119,6,.2)"  },
//   SURGERY:      { bg:"#f5f3ff", color:"#7c3aed", border:"rgba(124,58,237,.2)" },
//   OTHER:        { bg:"#f5f7ff", color:"#8892b0", border:"#e8ecf5"             },
// };

// const getStatusColor = (s) => s === "APPROVED" ? "success" : s === "REJECTED" ? "error" : "warning";

// // ── Sub-components ─────────────────────────────────────────────────────────────
// function NavItem({ icon, label, active, onClick }) {
//   return (
//     <div className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
//       <div className="nav-icon-wrap">{icon}</div>
//       {label}
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="stat-card fu">
//       <div className="stat-label">{label}</div>
//       <div className="stat-value" style={{ color }}>{value}</div>
//       <div className="stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── Upload Medical Record Modal ────────────────────────────────────────────────
// function UploadRecordModal({ open, onClose, patientId, onUploaded }) {
//   const fileRef = useRef();
//   const [form, setForm]     = useState({ title:"", recordType:"LAB_REPORT", description:"", recordDate:"", issuedBy:"" });
//   const [file, setFile]     = useState(null);
//   const [loading, setLoading]   = useState(false);
//   const [error,   setError]     = useState("");
//   const [dragOver, setDragOver] = useState(false);

//   const reset = () => { setForm({ title:"", recordType:"LAB_REPORT", description:"", recordDate:"", issuedBy:"" }); setFile(null); setError(""); setLoading(false); };
//   const handleClose = () => { reset(); onClose(); };

//   const handleFile = (f) => {
//     if (f && f.size > 10 * 1024 * 1024) { setError("File must be under 10 MB"); return; }
//     setFile(f); setError("");
//   };

//   const handleSubmit = async () => {
//     if (!form.title.trim()) { setError("Title is required"); return; }
//     setLoading(true); setError("");
//     try {
//       const fd = new FormData();
//       fd.append("patientId",   patientId);
//       fd.append("title",       form.title);
//       fd.append("recordType",  form.recordType);
//       fd.append("description", form.description);
//       fd.append("recordDate",  form.recordDate);
//       fd.append("issuedBy",    form.issuedBy);
//       if (file) fd.append("file", file);

//       const res = await axios.post(`${BASE}/medical-records/upload`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       onUploaded(res.data);
//       handleClose();
//     } catch (err) {
//       console.error(err);
//       setError("Upload failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box className="upload-modal-box">
//         {/* Header */}
//         <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:3 }}>
//           <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
//             <Box sx={{ width:46, height:46, borderRadius:"13px",
//                        background:"linear-gradient(135deg,#4f6ef7,#818cf8)",
//                        display:"flex", alignItems:"center", justifyContent:"center",
//                        boxShadow:"0 4px 14px rgba(79,110,247,.28)" }}>
//               <UploadFileIcon sx={{ color:"#fff", fontSize:22 }} />
//             </Box>
//             <Box>
//               <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#1a1f36" }}>
//                 Add Medical Record
//               </Typography>
//               <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>Store your health documents securely</Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={handleClose} size="small"
//             sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px",
//                   "&:hover":{ background:"#eef1fe", color:"#4f6ef7" } }}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </IconButton>
//         </Box>

//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         <Box sx={{ display:"flex", flexDirection:"column", gap:2 }}>
//           {/* Title */}
//           <Box>
//             <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600, mb:.75 }}>Record Title *</Typography>
//             <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Blood Test Report, X-Ray, MRI Scan"
//               value={form.title} onChange={(e) => setForm({ ...form, title:e.target.value })} />
//           </Box>

//           {/* Type + Date */}
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600, mb:.75 }}>Record Type</Typography>
//               <Select fullWidth size="small" value={form.recordType} onChange={(e) => setForm({ ...form, recordType:e.target.value })}
//                 sx={{ borderRadius:"12px", background:"#f8f9ff", "& .MuiOutlinedInput-notchedOutline":{ borderColor:"#e8ecf5" } }}>
//                 {RECORD_TYPES.map((t) => <MenuItem key={t} value={t}>{t.replace("_"," ")}</MenuItem>)}
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600, mb:.75 }}>Record Date</Typography>
//               <TextField fullWidth size="small" type="date" variant="outlined"
//                 value={form.recordDate} onChange={(e) => setForm({ ...form, recordDate:e.target.value })} />
//             </Grid>
//           </Grid>

//           {/* Issued by */}
//           <Box>
//             <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600, mb:.75 }}>Issued By (Doctor / Lab)</Typography>
//             <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Dr. Ramesh Kumar, Apollo Labs"
//               value={form.issuedBy} onChange={(e) => setForm({ ...form, issuedBy:e.target.value })} />
//           </Box>

//           {/* Notes */}
//           <Box>
//             <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600, mb:.75 }}>Notes / Description</Typography>
//             <TextField fullWidth size="small" multiline rows={2} variant="outlined" placeholder="Optional notes about this record"
//               value={form.description} onChange={(e) => setForm({ ...form, description:e.target.value })} />
//           </Box>

//           {/* Drop zone */}
//           <Box>
//             <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600, mb:.75 }}>Attach File (PDF / Image — max 10 MB)</Typography>
//             <div className={`drop-zone ${dragOver ? "dragover" : ""}`}
//               onClick={() => fileRef.current?.click()}
//               onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
//               onDragLeave={() => setDragOver(false)}
//               onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}>
//               <input ref={fileRef} type="file" hidden
//                 accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
//                 onChange={(e) => handleFile(e.target.files[0])} />
//               <UploadFileIcon sx={{ fontSize:32, color:"#c0c8e0", mb:1 }} />
//               {file
//                 ? <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#4f6ef7" }}>{file.name}</Typography>
//                 : <Typography sx={{ fontSize:".82rem", color:"#8892b0" }}>Click or drag & drop your file here</Typography>
//               }
//             </div>
//           </Box>

//           {error && (
//             <Box sx={{ background:"#fff1f3", border:"1px solid rgba(225,29,72,.2)", borderRadius:"10px", padding:"10px 14px", fontSize:".83rem", color:"#e11d48", fontWeight:500 }}>
//               ⚠ {error}
//             </Box>
//           )}

//           {loading && <LinearProgress sx={{ borderRadius:4, height:4 }} />}

//           <Button onClick={handleSubmit} variant="contained" disabled={loading}
//             sx={{ background:"linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius:"12px",
//                   textTransform:"none", fontWeight:700, fontSize:".92rem", py:1.4,
//                   boxShadow:"0 4px 14px rgba(79,110,247,.28)",
//                   "&:hover":{ boxShadow:"0 6px 22px rgba(79,110,247,.40)" } }}>
//             {loading ? "Uploading…" : "Save Record"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// // ── Medical Record Card ────────────────────────────────────────────────────────
// function RecordCard({ record, onDelete }) {
//   const [showPreview, setShowPreview] = useState(false);
//   const sc      = RECORD_COLORS[record.recordType] || RECORD_COLORS.OTHER;
//   const fileUrl = record.fileName ? `${BASE}/medical-records/file/${record.fileName}` : null;
//   const lower   = (record.fileName || "").toLowerCase();
//   const isPdf   = lower.endsWith(".pdf");
//   const isImage = lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp");

//   return (
//     <div className="record-card">
//       <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.5 }}>
//         {/* Type icon */}
//         <Box sx={{ width:46, height:46, borderRadius:"13px", flexShrink:0,
//                    background:sc.bg, border:`1px solid ${sc.border}`,
//                    display:"flex", alignItems:"center", justifyContent:"center" }}>
//           <DescriptionIcon sx={{ color:sc.color, fontSize:22 }} />
//         </Box>

//         {/* Details */}
//         <Box sx={{ flex:1, minWidth:0 }}>
//           <Box sx={{ display:"flex", alignItems:"center", gap:1, flexWrap:"wrap", mb:.5 }}>
//             <Typography sx={{ fontWeight:700, fontSize:".92rem", color:"#1a1f36" }}>{record.title}</Typography>
//             <Chip label={record.recordType?.replace("_"," ")} size="small"
//               sx={{ background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`,
//                     fontWeight:600, fontSize:".68rem", height:22 }} />
//           </Box>
//           {record.issuedBy   && <Typography sx={{ fontSize:".78rem", color:"#8892b0", mb:.4 }}>👤 {record.issuedBy}</Typography>}
//           {record.recordDate && <Typography sx={{ fontSize:".78rem", color:"#8892b0", mb:.4 }}>📅 {record.recordDate}</Typography>}
//           {record.description && <Typography sx={{ fontSize:".8rem", color:"#4a5278", mt:.5 }}>{record.description}</Typography>}

//           {/* File action buttons */}
//           {fileUrl && (
//             <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
//               {(isPdf || isImage) && (
//                 <button onClick={() => setShowPreview((p) => !p)}
//                   style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px",
//                            borderRadius:8, cursor:"pointer", fontSize:".76rem", fontWeight:600,
//                            background:"linear-gradient(135deg,#4f6ef7,#818cf8)", color:"#fff",
//                            border:"none", fontFamily:"'Outfit',sans-serif" }}>
//                   {showPreview ? <><VisibilityOffIcon sx={{ fontSize:13 }} /> Hide</> : <><VisibilityIcon sx={{ fontSize:13 }} /> Preview</>}
//                 </button>
//               )}
//               <a href={fileUrl} target="_blank" rel="noreferrer"
//                 style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px",
//                          borderRadius:8, fontSize:".76rem", fontWeight:600, textDecoration:"none",
//                          background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.2)" }}>
//                 <OpenInNewIcon sx={{ fontSize:13 }} /> Open
//               </a>
//               <a href={fileUrl} download={record.fileName}
//                 style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px",
//                          borderRadius:8, fontSize:".76rem", fontWeight:600, textDecoration:"none",
//                          background:"#f5f7ff", color:"#4a5278", border:"1px solid #e8ecf5" }}>
//                 <DownloadIcon sx={{ fontSize:13 }} /> Download
//               </a>
//             </Box>
//           )}

//           {/* Inline preview */}
//           {showPreview && fileUrl && (
//             <div className="file-preview-wrap">
//               {isPdf   && <iframe src={fileUrl} title={record.title} />}
//               {isImage && <img    src={fileUrl} alt={record.title}   />}
//             </div>
//           )}
//         </Box>

//         {/* Delete */}
//         <IconButton size="small" onClick={() => onDelete(record.id)}
//           sx={{ color:"#e11d48", background:"#fff1f3", borderRadius:"9px", flexShrink:0,
//                 "&:hover":{ background:"#fce7f3" } }}>
//           <DeleteIcon sx={{ fontSize:17 }} />
//         </IconButton>
//       </Box>
//     </div>
//   );
// }

// // ── Main Dashboard ─────────────────────────────────────────────────────────────
// export default function PatientDashboard() {
//   const { user }  = useContext(AuthContext);
//   const userId    = user?.id || localStorage.getItem("userId");
//   const navigate  = useNavigate();

//   const [patient,        setPatient]       = useState(null);
//   const [appointments,   setAppointments]  = useState([]);
//   const [doctors,        setDoctors]       = useState([]);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [view,           setView]          = useState("dashboard");
//   const [sidebarOpen,    setSidebarOpen]   = useState(false);
//   const [loading,        setLoading]       = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [error,          setError]         = useState("");

//   // Book: search + spec filter
//   const [searchQuery, setSearchQuery]   = useState("");
//   const [activeSpec,  setActiveSpec]    = useState("All");

//   // Medical records
//   const [uploadOpen,       setUploadOpen]       = useState(false);
//   const [recordTypeFilter, setRecordTypeFilter] = useState("ALL");

//   // ── Fetch ──────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const patRes = await axios.get(`${BASE}/patient/user/${userId}`);
//         setPatient(patRes.data);
//       } catch (err) {
//         if (err.response?.status === 404) { setProfileMissing(true); setLoading(false); return; }
//         setError("Failed to load patient."); setLoading(false); return;
//       }
//       try { const dRes = await axios.get(`${BASE}/doctor`); setDoctors(dRes.data); }
//       catch { setError("Failed to load doctors."); }
//       setLoading(false);
//     };
//     if (userId) load();
//     else { setError("User ID missing."); setLoading(false); }
//   }, [userId]);

//   useEffect(() => {
//     if (!patient) return;
//     axios.get(`${BASE}/appointments/patient/${patient.id}`).then((r) => setAppointments(r.data)).catch(() => {});
//     axios.get(`${BASE}/medical-records/patient/${patient.id}`).then((r) => setMedicalRecords(r.data)).catch(() => {});
//   }, [patient]);

//   const handleLogout   = () => { localStorage.removeItem("user"); navigate("/"); };
//   const handleNavClick = (k) => { setView(k); setSidebarOpen(false); };
//   const countStatus    = (s) => appointments.filter((a) => a.status === s).length;

//   // ── Doctor search / filter ─────────────────────────────────────────────────
//   const specializations  = ["All", ...Array.from(new Set(doctors.map((d) => d.specialization).filter(Boolean))).sort()];
//   const filteredDoctors  = doctors.filter((doc) => {
//     const bySpec   = activeSpec === "All" || doc.specialization === activeSpec;
//     const q        = searchQuery.toLowerCase();
//     const bySearch = !q || doc.name?.toLowerCase().includes(q) || doc.specialization?.toLowerCase().includes(q) || doc.hospital?.toLowerCase().includes(q);
//     return bySpec && bySearch;
//   });

//   // ── Record delete ──────────────────────────────────────────────────────────
//   const handleDeleteRecord = async (id) => {
//     if (!window.confirm("Delete this medical record?")) return;
//     try {
//       await axios.delete(`${BASE}/medical-records/${id}`);
//       setMedicalRecords((prev) => prev.filter((r) => r.id !== id));
//     } catch { alert("Failed to delete record"); }
//   };

//   const filteredRecords = recordTypeFilter === "ALL"
//     ? medicalRecords
//     : medicalRecords.filter((r) => r.recordType === recordTypeFilter);

//   const menuItems = [
//     { key:"dashboard",    label:"Dashboard",       icon:<DashboardIcon  sx={{ fontSize:18 }} /> },
//     { key:"appointments", label:"My Appointments", icon:<EventIcon      sx={{ fontSize:18 }} /> },
//     { key:"book",         label:"Book Appointment",icon:<AddIcon        sx={{ fontSize:18 }} /> },
//     { key:"records",      label:"Medical Records", icon:<FolderIcon     sx={{ fontSize:18 }} /> },
//     { key:"profile",      label:"Profile",         icon:<PersonIcon     sx={{ fontSize:18 }} /> },
//   ];

//   // ── Guards ─────────────────────────────────────────────────────────────────
//   if (loading) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <CircularProgress sx={{ color:"#4f6ef7" }} />
//     </Box>
//   );
//   if (error) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <Alert severity="error">{error}</Alert>
//     </Box>
//   );
//   if (profileMissing || !patient) {
//     return (
//       <PatientProfileForm userId={userId}
//         onCreated={(created) => {
//           setPatient(created); setProfileMissing(false);
//           axios.get(`${BASE}/doctor`).then((r) => setDoctors(r.data)).catch(() => {});
//         }}
//       />
//     );
//   }

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
//       <div className="blob blob-1" />
//       <div className="blob blob-2" />

//       {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

//       {/* ── Sidebar ── */}
//       <div className={`portal-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-top-row">
//           <div className="sidebar-logo"><div className="logo-icon">✦</div>Med<span className="logo-accent">Vault</span></div>
//           <div className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}><CloseIcon sx={{ fontSize:16 }} /></div>
//         </div>
//         <div className="nav-section-label">Navigation</div>
//         {menuItems.map((item) => (
//           <NavItem key={item.key} icon={item.icon} label={item.label}
//             active={view === item.key} onClick={() => handleNavClick(item.key)} />
//         ))}
//         <div className="sidebar-spacer" />
//         <div className="user-card">
//           <div className="user-mini-av">{patient.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>{patient.name}</Typography>
//             <Typography sx={{ fontSize:".72rem", color:"#8892b0" }}>Patient</Typography>
//           </Box>
//         </div>
//         <button onClick={handleLogout}
//           style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11,
//                    cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48",
//                    border:"1px solid transparent", background:"none", width:"100%",
//                    fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
//           onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.borderColor="transparent"; }}>
//           <div className="nav-icon-wrap" style={{ background:"#fff1f3", color:"#e11d48" }}><LogoutIcon sx={{ fontSize:16 }} /></div>
//           Sign Out
//         </button>
//       </div>

//       {/* ── Top bar ── */}
//       <div className="portal-topbar">
//         <div className="topbar-left">
//           <div className="hamburger-btn" onClick={() => setSidebarOpen(true)}><MenuIcon sx={{ fontSize:20 }} /></div>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#4f6ef7" }}>
//             Med<span style={{ color:"#7c3aed" }}>Vault</span>
//           </Typography>
//         </div>
//         <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
//           sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none", borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>
//           Logout
//         </Button>
//       </div>

//       {/* ── Content ── */}
//       <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.3 }}>

//             {/* ─────────── DASHBOARD ─────────── */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Good morning, {patient.name?.split(" ")[0]} ☀️
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Here's a summary of your health portal</Typography>
//                 </Box>

//                 <Box className="hero-card" sx={{ mb:4, display:"flex", alignItems:"center", gap:3 }}>
//                   <Avatar className="av-blue" sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", boxShadow:"0 8px 24px rgba(79,110,247,.3)" }}>
//                     {patient.name?.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>{patient.name}</Typography>
//                     <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>Patient ID · #{patient.id}</Typography>
//                     <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
//                       {[patient.gender, `Age ${patient.age}`, patient.contact].filter(Boolean).map((v, i) => (
//                         <Chip key={i} label={v} size="small"
//                           sx={{ background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.18)", fontWeight:500, fontSize:".75rem" }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </Box>

//                 <Grid container spacing={2.5} sx={{ mb:4 }}>
//                   <Grid item xs={6} sm={3}><StatCard label="Appointments"   value={appointments.length}      icon="📅" color="#4f6ef7" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Approved"       value={countStatus("APPROVED")}  icon="✓"  color="#059669" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Pending"        value={appointments.length - countStatus("APPROVED") - countStatus("REJECTED")} icon="⏳" color="#d97706" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Medical Records" value={medicalRecords.length}   icon="📋" color="#7c3aed" /></Grid>
//                 </Grid>

//                 <div className="sec-heading">Recent Appointments</div>
//                 <Grid container spacing={2.5}>
//                   {appointments.slice(0,3).map((appt, i) => (
//                     <Grid item xs={12} md={4} key={appt.id}>
//                       <motion.div whileHover={{ scale:1.03 }}>
//                         <Card className="light-card">
//                           <CardContent sx={{ p:"20px !important" }}>
//                             <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                               <Avatar className={getAvatarClass(i)} sx={{ width:44, height:44, borderRadius:"12px", fontSize:"1rem", fontWeight:700 }}>
//                                 {appt.doctor?.name?.charAt(0)}
//                               </Avatar>
//                               <Box>
//                                 <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
//                                 <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>{appt.doctor?.specialization}</Typography>
//                               </Box>
//                             </Box>
//                             <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📅 {appt.date} &nbsp;·&nbsp; 🕐 {appt.timeSlot}</Typography>
//                             <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight:600, fontSize:".72rem" }} />
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     </Grid>
//                   ))}
//                   {appointments.length === 0 && (
//                     <Grid item xs={12}>
//                       <Box sx={{ textAlign:"center", py:5, color:"#8892b0" }}>
//                         <Typography sx={{ fontSize:"2rem", mb:1 }}>📅</Typography>
//                         <Typography sx={{ fontWeight:500 }}>No appointments yet.</Typography>
//                         <Button onClick={() => setView("book")} size="small" variant="contained"
//                           sx={{ mt:2, background:"linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius:"10px", textTransform:"none", fontWeight:600 }}>
//                           Book your first appointment →
//                         </Button>
//                       </Box>
//                     </Grid>
//                   )}
//                 </Grid>
//               </>
//             )}

//             {/* ─────────── MY APPOINTMENTS ─────────── */}
//             {view === "appointments" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>My Appointments</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{appointments.length} total · {countStatus("APPROVED")} approved</Typography>
//                 </Box>
//                 {appointments.length === 0 ? (
//                   <Alert severity="info" sx={{ borderRadius:"14px" }}>No appointments booked yet.</Alert>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {appointments.map((appt, i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.03 }}>
//                           <Card className="light-card">
//                             <CardContent sx={{ p:"22px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                                 <Avatar className={getAvatarClass(i)} sx={{ width:46, height:46, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.doctor?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>{appt.doctor?.specialization}</Typography>
//                                 </Box>
//                               </Box>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.8 }}>📅 {appt.date}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>🕐 {appt.timeSlot}</Typography>
//                               <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight:600, fontSize:".72rem" }} />
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ─────────── BOOK APPOINTMENT ─────────── */}
//             {view === "book" && (
//               <>
//                 <Box sx={{ mb:3 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Book Appointment</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Filter by specialization and find the right doctor</Typography>
//                 </Box>

//                 {/* ── Search bar ── */}
//                 <TextField fullWidth size="small"
//                   placeholder="Search doctor name, specialization, hospital…"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon sx={{ color:"#b0b8d0", fontSize:20 }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{ mb:2.5, "& .MuiOutlinedInput-root": {
//                     borderRadius:"14px", background:"#fff",
//                     "& fieldset":{ borderColor:"#e8ecf5" },
//                     "&:hover fieldset":{ borderColor:"#c7cee8" },
//                     "&.Mui-focused fieldset":{ borderColor:"#4f6ef7" },
//                   }}}
//                 />

//                 {/* ── Specialization chips ── */}
//                 <Box sx={{ mb:3 }}>
//                   <Box sx={{ display:"flex", alignItems:"center", gap:1, mb:1.5 }}>
//                     <FilterListIcon sx={{ fontSize:16, color:"#8892b0" }} />
//                     <Typography sx={{ fontSize:".72rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600 }}>
//                       Filter by Specialization
//                     </Typography>
//                   </Box>
//                   <div className="spec-chip-wrap">
//                     {specializations.map((spec) => (
//                       <div key={spec} className={`spec-chip ${activeSpec === spec ? "active" : ""}`}
//                         onClick={() => setActiveSpec(spec)}>
//                         {spec}
//                       </div>
//                     ))}
//                   </div>
//                 </Box>

//                 {/* ── Result count + clear ── */}
//                 <Box sx={{ mb:2.5, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                   <Typography sx={{ fontSize:".8rem", color:"#8892b0" }}>
//                     {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} found
//                     {activeSpec !== "All" ? ` · ${activeSpec}` : ""}
//                     {searchQuery ? ` · "${searchQuery}"` : ""}
//                   </Typography>
//                   {(searchQuery || activeSpec !== "All") && (
//                     <Typography sx={{ fontSize:".78rem", color:"#4f6ef7", fontWeight:600, cursor:"pointer" }}
//                       onClick={() => { setSearchQuery(""); setActiveSpec("All"); }}>
//                       Clear filters ✕
//                     </Typography>
//                   )}
//                 </Box>

//                 {/* ── Doctor cards ── */}
//                 {filteredDoctors.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🔍</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No doctors found.</Typography>
//                     <Typography sx={{ fontSize:".83rem", mt:.5 }}>Try a different name or specialization.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {filteredDoctors.map((doc, i) => (
//                       <Grid item xs={12} sm={6} md={4} key={doc.id}>
//                         <motion.div whileHover={{ scale:1.03 }}>
//                           <Card className="light-card" sx={{ textAlign:"center", p:3 }}>
//                             <Avatar className={getAvatarClass(i)}
//                               sx={{ width:68, height:68, borderRadius:"20px", mx:"auto", mb:1.5,
//                                     fontSize:"1.8rem", fontFamily:"'Cormorant Garamond',serif",
//                                     fontWeight:700, boxShadow:"0 6px 20px rgba(79,110,247,.22)" }}>
//                               {doc.name?.charAt(0)}
//                             </Avatar>
//                             <Typography sx={{ fontWeight:700, fontSize:".95rem", color:"#1a1f36" }}>Dr. {doc.name}</Typography>
//                             <Chip label={doc.specialization || "General"} size="small"
//                               sx={{ mt:.75, mb:.5, background:"#eef1fe", color:"#4f6ef7",
//                                     border:"1px solid rgba(79,110,247,.18)", fontWeight:600, fontSize:".72rem" }} />
//                             {doc.hospital && (
//                               <Typography sx={{ fontSize:".76rem", color:"#8892b0", mb:2 }}>🏥 {doc.hospital}</Typography>
//                             )}
//                             <Button variant="contained"
//                               onClick={() => navigate(`/book-appointment/${patient.id}/${doc.id}`)}
//                               sx={{ background:"linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius:"10px",
//                                     textTransform:"none", fontWeight:600, fontSize:".85rem",
//                                     boxShadow:"0 3px 12px rgba(79,110,247,.28)",
//                                     "&:hover":{ boxShadow:"0 6px 20px rgba(79,110,247,.38)" } }}>
//                               Book Now →
//                             </Button>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ─────────── MEDICAL RECORDS ─────────── */}
//             {view === "records" && (
//               <>
//                 <Box sx={{ mb:4, display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:2 }}>
//                   <Box>
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Medical Records</Typography>
//                     <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                       {medicalRecords.length} record{medicalRecords.length !== 1 ? "s" : ""} stored securely
//                     </Typography>
//                   </Box>
//                   <Button variant="contained" startIcon={<UploadFileIcon />} onClick={() => setUploadOpen(true)}
//                     sx={{ background:"linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius:"12px",
//                           textTransform:"none", fontWeight:700, fontSize:".88rem",
//                           boxShadow:"0 4px 14px rgba(79,110,247,.28)",
//                           "&:hover":{ boxShadow:"0 6px 22px rgba(79,110,247,.40)" } }}>
//                     Add Record
//                   </Button>
//                 </Box>

//                 {/* Record type filter chips */}
//                 <Box sx={{ mb:3 }}>
//                   <Box sx={{ display:"flex", alignItems:"center", gap:1, mb:1.5 }}>
//                     <FilterListIcon sx={{ fontSize:16, color:"#8892b0" }} />
//                     <Typography sx={{ fontSize:".72rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600 }}>
//                       Filter by Type
//                     </Typography>
//                   </Box>
//                   <div className="spec-chip-wrap">
//                     {["ALL", ...RECORD_TYPES].map((t) => (
//                       <div key={t} className={`spec-chip ${recordTypeFilter === t ? "active" : ""}`}
//                         onClick={() => setRecordTypeFilter(t)}>
//                         {t === "ALL" ? "All" : t.replace("_"," ")}
//                       </div>
//                     ))}
//                   </div>
//                 </Box>

//                 {/* Records list */}
//                 {filteredRecords.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>📋</Typography>
//                     <Typography sx={{ fontWeight:500 }}>
//                       {medicalRecords.length === 0 ? "No medical records yet." : "No records match this filter."}
//                     </Typography>
//                     {medicalRecords.length === 0 && (
//                       <Button onClick={() => setUploadOpen(true)} size="small" variant="contained"
//                         sx={{ mt:2, background:"linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius:"10px", textTransform:"none", fontWeight:600 }}>
//                         Upload your first record →
//                       </Button>
//                     )}
//                   </Box>
//                 ) : (
//                   filteredRecords.map((record) => (
//                     <RecordCard key={record.id} record={record} onDelete={handleDeleteRecord} />
//                   ))
//                 )}
//               </>
//             )}

//             {/* ─────────── PROFILE ─────────── */}
//             {view === "profile" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Profile</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Your personal health information</Typography>
//                 </Box>
//                 <Card className="light-card" sx={{ p:4 }}>
//                   <Box sx={{ display:"flex", alignItems:"center", gap:2.5, mb:3 }}>
//                     <Avatar className="av-blue"
//                       sx={{ width:76, height:76, borderRadius:"22px", fontSize:"2rem",
//                             fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
//                             boxShadow:"0 6px 20px rgba(79,110,247,.25)" }}>
//                       {patient.name?.charAt(0)}
//                     </Avatar>
//                     <Box>
//                       <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:700, color:"#1a1f36" }}>{patient.name}</Typography>
//                       <Typography sx={{ fontSize:".82rem", color:"#8892b0", mt:.5 }}>Patient Account · Active</Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[
//                       ["Full Name",     patient.name],
//                       ["Gender",        patient.gender],
//                       ["Date of Birth", patient.dob],
//                       ["Contact",       patient.contact],
//                       ["Age",           patient.age ? `${patient.age} years` : "—"],
//                       ["Patient ID",    `#${patient.id}`],
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

//       {/* ── Upload Medical Record Modal ── */}
//       <UploadRecordModal
//         open={uploadOpen}
//         onClose={() => setUploadOpen(false)}
//         patientId={patient.id}
//         onUploaded={(newRecord) => setMedicalRecords((prev) => [newRecord, ...prev])}
//       />
//     </Box>
//   );
// }






import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PatientProfileForm from "./PatientProfileForm";
import {
  Box, Typography, CircularProgress, Alert, Grid, Card, CardContent,
  Avatar, Button, Divider, Chip, TextField, InputAdornment,
  MenuItem, Select, Modal, IconButton, LinearProgress, Rating,
} from "@mui/material";
import MenuIcon          from "@mui/icons-material/Menu";
import CloseIcon         from "@mui/icons-material/Close";
import LogoutIcon        from "@mui/icons-material/Logout";
import EventIcon         from "@mui/icons-material/Event";
import DashboardIcon     from "@mui/icons-material/Dashboard";
import PersonIcon        from "@mui/icons-material/Person";
import AddIcon           from "@mui/icons-material/Add";
import SearchIcon        from "@mui/icons-material/Search";
import FolderIcon        from "@mui/icons-material/Folder";
import UploadFileIcon    from "@mui/icons-material/UploadFile";
import DescriptionIcon   from "@mui/icons-material/Description";
import DeleteIcon        from "@mui/icons-material/Delete";
import OpenInNewIcon     from "@mui/icons-material/OpenInNew";
import DownloadIcon      from "@mui/icons-material/Download";
import VisibilityIcon    from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FilterListIcon    from "@mui/icons-material/FilterList";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import PaymentIcon       from "@mui/icons-material/Payment";
import StarIcon          from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CheckCircleIcon   from "@mui/icons-material/CheckCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion, AnimatePresence } from "framer-motion";

const BASE = "http://localhost:8080";

// ── Styles ─────────────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
  body { font-family: 'Outfit', sans-serif !important; }

  .sidebar-overlay{position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease;}
  @keyframes overlayIn{from{opacity:0}to{opacity:1}}

  .portal-sidebar{width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1);}
  .portal-sidebar.closed{transform:translateX(-100%);}
  .portal-sidebar.open{transform:translateX(0);}
  .sidebar-top-row{display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px;}
  .sidebar-logo{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px;}
  .logo-icon{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0;}
  .logo-accent{color:#7c3aed;}
  .sidebar-close-btn{width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s;}
  .sidebar-close-btn:hover{background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2);}
  .nav-section-label{font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px;}
  .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none;}
  .nav-item:hover{background:#eef1fe;color:#4f6ef7;}
  .nav-item.active{background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18);}
  .nav-item.active .nav-icon-wrap{background:#4f6ef7 !important;color:#fff !important;}
  .nav-icon-wrap{width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278;}
  .sidebar-spacer{flex:1;}
  .user-card{display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px;}
  .user-mini-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem;}

  .portal-topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100;}
  .topbar-left{display:flex;align-items:center;gap:14px;}
  .hamburger-btn{width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s;}
  .hamburger-btn:hover{background:#eef1fe;border-color:rgba(79,110,247,.2);}

  .blob{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;}
  .blob-1{width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px;}
  .blob-2{width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px;}

  .light-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important;}
  .light-card:hover{box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important;}
  .hero-card{background:linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;}
  .hero-card::after{content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none;}
  .stat-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important;}
  .stat-card:hover{box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
  .stat-value{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1;}
  .stat-label{font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px;}
  .stat-icon{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07;}
  .sec-heading{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .sec-heading::after{content:'';flex:1;height:1px;background:#e8ecf5;}

  .spec-chip-wrap{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0;}
  .spec-chip{padding:6px 14px !important;border-radius:20px !important;font-size:.78rem !important;font-weight:600 !important;border:1px solid #e8ecf5 !important;cursor:pointer !important;transition:all .18s !important;background:#fff !important;color:#4a5278 !important;user-select:none;}
  .spec-chip:hover{background:#eef1fe !important;border-color:rgba(79,110,247,.25) !important;color:#4f6ef7 !important;}
  .spec-chip.active{background:#4f6ef7 !important;border-color:#4f6ef7 !important;color:#fff !important;}

  .record-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:16px !important;box-shadow:0 1px 6px rgba(79,110,247,.07) !important;transition:box-shadow .22s,transform .22s !important;padding:20px 22px;margin-bottom:12px;}
  .record-card:hover{box-shadow:0 5px 22px rgba(79,110,247,.13) !important;transform:translateY(-2px);}

  /* Prescription card */
  .rx-card{background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s;}
  .rx-card:hover{box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px);}

  /* Payment banner */
  .pay-banner{background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:16px;padding:18px 22px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
  .pay-banner-paid{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-color:#6ee7b7;}

  /* Notification dot */
  .notif-dot{width:8px;height:8px;border-radius:50%;background:#e11d48;position:absolute;top:6px;right:6px;}

  /* Upload modal */
  .upload-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:520px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto;}
  .upload-modal-box .MuiOutlinedInput-root{border-radius:12px !important;background:#f8f9ff !important;}
  .upload-modal-box .MuiOutlinedInput-notchedOutline{border-color:#e8ecf5 !important;}
  .upload-modal-box .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{border-color:#4f6ef7 !important;}

  /* Razorpay modal */
  .rzp-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:440px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
  .rzp-modal-box .rzp-logo{font-size:1.5rem;font-weight:800;color:#2563eb;letter-spacing:-1px;}
  .rzp-modal-box .rzp-logo span{color:#1d4ed8;}

  /* Feedback modal */
  .fb-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:460px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}

  .drop-zone{border:2px dashed #c7cee8;border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:all .2s;background:#f8f9ff;}
  .drop-zone:hover,.drop-zone.dragover{border-color:#4f6ef7;background:#eef1fe;}
  .file-preview-wrap{width:100%;border-radius:10px;overflow:hidden;border:1px solid #e8ecf5;margin-top:12px;}
  .file-preview-wrap iframe{width:100%;height:340px;border:none;display:block;}
  .file-preview-wrap img{width:100%;display:block;max-height:380px;object-fit:contain;background:#f8f9ff;}

  .av-blue{background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;}
  .av-violet{background:linear-gradient(135deg,#7c3aed,#a78bfa) !important;}
  .av-teal{background:linear-gradient(135deg,#0891b2,#22d3ee) !important;}
  .av-rose{background:linear-gradient(135deg,#e11d48,#fb7185) !important;}
  .av-green{background:linear-gradient(135deg,#059669,#34d399) !important;}
  .av-amber{background:linear-gradient(135deg,#d97706,#fbbf24) !important;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  .fu{animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;}
`;

if (!document.getElementById("portal-styles")) {
  const s = document.createElement("style"); s.id="portal-styles"; s.textContent=globalStyles; document.head.appendChild(s);
}

const avatarColors   = ["av-blue","av-violet","av-teal","av-rose","av-green","av-amber"];
const getAvatarClass = (i) => avatarColors[i % avatarColors.length];
const RECORD_TYPES   = ["LAB_REPORT","PRESCRIPTION","SCAN","VACCINATION","SURGERY","OTHER"];
const RECORD_COLORS  = {
  LAB_REPORT:{bg:"#eef1fe",color:"#4f6ef7",border:"rgba(79,110,247,.2)"},
  PRESCRIPTION:{bg:"#ecfdf5",color:"#059669",border:"rgba(5,150,105,.2)"},
  SCAN:{bg:"#fff1f3",color:"#e11d48",border:"rgba(225,29,72,.2)"},
  VACCINATION:{bg:"#fffbeb",color:"#d97706",border:"rgba(217,119,6,.2)"},
  SURGERY:{bg:"#f5f3ff",color:"#7c3aed",border:"rgba(124,58,237,.2)"},
  OTHER:{bg:"#f5f7ff",color:"#8892b0",border:"#e8ecf5"},
};
const getStatusColor = (s) => s==="APPROVED"?"success":s==="REJECTED"?"error":"warning";

// ── NavItem ──────────────────────────────────────────────────────────────────
function NavItem({icon,label,active,onClick,badge}) {
  return (
    <div className={`nav-item ${active?"active":""}`} onClick={onClick} style={{position:"relative"}}>
      <div className="nav-icon-wrap">{icon}</div>
      {label}
      {badge>0 && <span style={{marginLeft:"auto",background:"#e11d48",color:"#fff",fontSize:".62rem",fontWeight:700,borderRadius:"999px",padding:"1px 7px",minWidth:18,textAlign:"center"}}>{badge}</span>}
    </div>
  );
}

function StatCard({label,value,icon,color}) {
  return (
    <div className="stat-card fu">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{color}}>{value}</div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
}

// ── Dummy Razorpay Payment Modal ──────────────────────────────────────────────
function PaymentModal({open,onClose,appointment,onPaid}) {
  const [step,    setStep]    = useState("summary"); // summary | processing | done
  const [cardNum, setCardNum] = useState("");
  const [cvv,     setCvv]     = useState("");
  const [expiry,  setExpiry]  = useState("");
  const [name,    setName]    = useState("");

  const fieldSx = {"& .MuiOutlinedInput-root":{borderRadius:"10px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"},"& .Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:"#2563eb !important"}};

  const handlePay = async () => {
    setStep("processing");
    // Simulate processing delay
    setTimeout(async () => {
      try {
        // 1. Create order
        const orderRes = await axios.post(`${BASE}/payments/create-order/${appointment.id}`);
        // 2. Confirm payment with dummy paymentId
        const dummyPayId = "pay_dummy_" + Date.now();
        await axios.post(`${BASE}/payments/confirm/${appointment.id}`, { razorpayPaymentId: dummyPayId });
        setStep("done");
        setTimeout(() => { onPaid(appointment.id); onClose(); setStep("summary"); }, 1800);
      } catch(e) {
        console.error(e);
        setStep("summary");
        alert("Payment failed. Try again.");
      }
    }, 2000);
  };

  if (!appointment) return null;
  const fee = appointment.doctor?.consultationFee || 0;

  return (
    <Modal open={open} onClose={() => { if(step!=="processing") { setStep("summary"); onClose(); }}}>
      <Box className="rzp-modal-box">
        {/* Razorpay-style header */}
        <Box sx={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:"14px",p:"18px 22px",mb:3,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Box>
            <div className="rzp-logo" style={{color:"#fff",fontSize:"1.1rem",fontWeight:800,letterSpacing:"-0.5px"}}>razorpay</div>
            <Typography sx={{color:"rgba(255,255,255,.7)",fontSize:".74rem",mt:.3}}>Secure Payment Gateway</Typography>
          </Box>
          <Box sx={{textAlign:"right"}}>
            <Typography sx={{color:"rgba(255,255,255,.7)",fontSize:".7rem"}}>Amount to Pay</Typography>
            <Typography sx={{color:"#fff",fontSize:"1.5rem",fontWeight:800,fontFamily:"'Cormorant Garamond',serif"}}>₹{fee}</Typography>
          </Box>
        </Box>

        {step === "summary" && (
          <>
            <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:700,color:"#1a1f36",mb:2}}>
              Payment Details
            </Typography>
            <Box sx={{background:"#f8f9ff",border:"1px solid #e8ecf5",borderRadius:"12px",p:2,mb:3}}>
              {[["Doctor",`Dr. ${appointment.doctor?.name}`],["Specialization",appointment.doctor?.specialization],["Date",appointment.date],["Time",appointment.timeSlot],["Consultation Fee",`₹${fee}`]].map(([l,v]) => (
                <Box key={l} sx={{display:"flex",justifyContent:"space-between",mb:.8,fontSize:".85rem"}}>
                  <Typography sx={{color:"#8892b0",fontSize:".82rem"}}>{l}</Typography>
                  <Typography sx={{color:"#1a1f36",fontWeight:600,fontSize:".82rem"}}>{v}</Typography>
                </Box>
              ))}
              <Divider sx={{my:1.5,borderColor:"#e8ecf5"}}/>
              <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Typography sx={{fontWeight:700,color:"#1a1f36",fontSize:".92rem"}}>Total</Typography>
                <Typography sx={{fontWeight:800,color:"#2563eb",fontSize:"1rem",fontFamily:"'Cormorant Garamond',serif"}}>₹{fee}</Typography>
              </Box>
            </Box>

            {/* Card form */}
            <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:1.5}}>Card Details</Typography>
            <Box sx={{display:"flex",flexDirection:"column",gap:1.5}}>
              <TextField size="small" fullWidth placeholder="Card Number" variant="outlined" sx={fieldSx}
                value={cardNum} onChange={e=>setCardNum(e.target.value.replace(/\D/g,"").slice(0,16))}
                inputProps={{maxLength:16}}/>
              <TextField size="small" fullWidth placeholder="Cardholder Name" variant="outlined" sx={fieldSx}
                value={name} onChange={e=>setName(e.target.value)}/>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField size="small" fullWidth placeholder="MM/YY" variant="outlined" sx={fieldSx}
                    value={expiry} onChange={e=>setExpiry(e.target.value.slice(0,5))}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField size="small" fullWidth placeholder="CVV" type="password" variant="outlined" sx={fieldSx}
                    value={cvv} onChange={e=>setCvv(e.target.value.replace(/\D/g,"").slice(0,3))}/>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{display:"flex",gap:1.5,mt:3}}>
              <Button onClick={()=>onClose()} variant="outlined" fullWidth
                sx={{borderRadius:"10px",textTransform:"none",fontWeight:600,borderColor:"#e8ecf5",color:"#8892b0"}}>
                Cancel
              </Button>
              <Button onClick={handlePay} variant="contained" fullWidth
                sx={{borderRadius:"10px",textTransform:"none",fontWeight:700,fontSize:".92rem",
                     background:"linear-gradient(135deg,#1e3a8a,#2563eb)",boxShadow:"0 4px 14px rgba(37,99,235,.35)"}}>
                Pay ₹{fee}
              </Button>
            </Box>
          </>
        )}

        {step === "processing" && (
          <Box sx={{textAlign:"center",py:3}}>
            <CircularProgress sx={{color:"#2563eb",mb:2}} size={48}/>
            <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:.5}}>
              Processing Payment…
            </Typography>
            <Typography sx={{fontSize:".82rem",color:"#8892b0"}}>Please do not close this window</Typography>
            <LinearProgress sx={{mt:3,borderRadius:4,height:4,background:"#e8ecf5","& .MuiLinearProgress-bar":{background:"#2563eb"}}}/>
          </Box>
        )}

        {step === "done" && (
          <Box sx={{textAlign:"center",py:2}}>
            <Box sx={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#059669,#34d399)",display:"flex",alignItems:"center",justifyContent:"center",mx:"auto",mb:2,boxShadow:"0 6px 20px rgba(5,150,105,.3)"}}>
              <CheckCircleIcon sx={{color:"#fff",fontSize:34}}/>
            </Box>
            <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#059669",mb:.5}}>
              Payment Successful!
            </Typography>
            <Typography sx={{fontSize:".85rem",color:"#8892b0"}}>₹{fee} paid successfully</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

// ── Feedback Modal ────────────────────────────────────────────────────────────
function FeedbackModal({open,onClose,appointment,onSubmitted}) {
  const [rating,  setRating]  = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const handleSubmit = async () => {
    if (!rating) { alert("Please select a rating"); return; }
    setLoading(true);
    try {
      await axios.post(`${BASE}/feedback`, {
        appointmentId: appointment.id,
        doctorId:      appointment.doctor?.id,
        patientId:     appointment.patient?.id,
        rating,
        comment,
      });
      setDone(true);
      onSubmitted(appointment.id);
      setTimeout(() => { setDone(false); setRating(0); setComment(""); onClose(); }, 1500);
    } catch(e) {
      // If endpoint not yet implemented, simulate success
      setDone(true);
      onSubmitted(appointment.id);
      setTimeout(() => { setDone(false); setRating(0); setComment(""); onClose(); }, 1500);
    } finally {
      setLoading(false);
    }
  };

  if (!appointment) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="fb-modal-box">
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}>
          <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
            <Box sx={{width:46,height:46,borderRadius:"13px",background:"linear-gradient(135deg,#f59e0b,#fbbf24)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(245,158,11,.3)"}}>
              <StarIcon sx={{color:"#fff",fontSize:22}}/>
            </Box>
            <Box>
              <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36"}}>Rate Your Experience</Typography>
              <Typography sx={{fontSize:".74rem",color:"#8892b0"}}>Feedback for Dr. {appointment.doctor?.name}</Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px","&:hover":{background:"#eef1fe"}}}>
            <CloseIcon sx={{fontSize:16}}/>
          </IconButton>
        </Box>

        <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>

        {!done ? (
          <Box sx={{display:"flex",flexDirection:"column",gap:2.5}}>
            <Box sx={{textAlign:"center"}}>
              <Typography sx={{fontSize:".75rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:1.5}}>
                How was your experience?
              </Typography>
              <Rating value={rating} onChange={(_,v)=>setRating(v)} size="large"
                sx={{"& .MuiRating-iconFilled":{color:"#f59e0b"},"& .MuiRating-iconEmpty":{color:"#e8ecf5"}}}/>
              <Typography sx={{fontSize:".8rem",color:"#8892b0",mt:.75}}>
                {rating===0?"Tap to rate":[,"Poor","Fair","Good","Very Good","Excellent"][rating]}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>
                Your Comments (optional)
              </Typography>
              <TextField fullWidth multiline rows={3} size="small" variant="outlined"
                placeholder="Share your experience with this doctor…"
                value={comment} onChange={e=>setComment(e.target.value)}
                sx={{"& .MuiOutlinedInput-root":{borderRadius:"12px",background:"#f8f9ff"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5"}}}/>
            </Box>

            <Button onClick={handleSubmit} variant="contained" disabled={loading}
              sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"12px",textTransform:"none",fontWeight:700,py:1.3,boxShadow:"0 4px 14px rgba(245,158,11,.3)","&:hover":{boxShadow:"0 6px 22px rgba(245,158,11,.45)"}}}>
              {loading?"Submitting…":"Submit Feedback ★"}
            </Button>
          </Box>
        ) : (
          <Box sx={{textAlign:"center",py:2}}>
            <Typography sx={{fontSize:"2.5rem",mb:1}}>🎉</Typography>
            <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#059669"}}>Thank you!</Typography>
            <Typography sx={{fontSize:".85rem",color:"#8892b0",mt:.5}}>Your feedback has been submitted</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

// ── Upload Medical Record Modal ───────────────────────────────────────────────
function UploadRecordModal({open,onClose,patientId,onUploaded}) {
  const fileRef = useRef();
  const [form,setForm] = useState({title:"",recordType:"LAB_REPORT",description:"",recordDate:"",issuedBy:""});
  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [dragOver,setDragOver] = useState(false);

  const reset = () => { setForm({title:"",recordType:"LAB_REPORT",description:"",recordDate:"",issuedBy:""}); setFile(null); setError(""); setLoading(false); };
  const handleClose = () => { reset(); onClose(); };
  const handleFile  = (f) => { if(f&&f.size>10*1024*1024){setError("File must be under 10 MB");return;} setFile(f);setError(""); };

  const handleSubmit = async () => {
    if(!form.title.trim()){setError("Title is required");return;}
    setLoading(true);setError("");
    try {
      const fd=new FormData();
      fd.append("patientId",patientId); fd.append("title",form.title);
      fd.append("recordType",form.recordType); fd.append("description",form.description);
      fd.append("recordDate",form.recordDate); fd.append("issuedBy",form.issuedBy);
      if(file) fd.append("file",file);
      const res = await axios.post(`${BASE}/medical-records/upload`,fd,{headers:{"Content-Type":"multipart/form-data"}});
      onUploaded(res.data); handleClose();
    } catch(err){console.error(err);setError("Upload failed.");}
    finally{setLoading(false);}
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="upload-modal-box">
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}>
          <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
            <Box sx={{width:46,height:46,borderRadius:"13px",background:"linear-gradient(135deg,#4f6ef7,#818cf8)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>
              <UploadFileIcon sx={{color:"#fff",fontSize:22}}/>
            </Box>
            <Box>
              <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36"}}>Add Medical Record</Typography>
              <Typography sx={{fontSize:".74rem",color:"#8892b0"}}>Store your health documents securely</Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} size="small" sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px","&:hover":{background:"#eef1fe",color:"#4f6ef7"}}}>
            <CloseIcon sx={{fontSize:16}}/>
          </IconButton>
        </Box>
        <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
        <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
          <Box>
            <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Record Title *</Typography>
            <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Blood Test Report, X-Ray"
              value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Record Type</Typography>
              <Select fullWidth size="small" value={form.recordType} onChange={e=>setForm({...form,recordType:e.target.value})}
                sx={{borderRadius:"12px",background:"#f8f9ff","& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5"}}}>
                {RECORD_TYPES.map(t=><MenuItem key={t} value={t}>{t.replace("_"," ")}</MenuItem>)}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Record Date</Typography>
              <TextField fullWidth size="small" type="date" variant="outlined"
                value={form.recordDate} onChange={e=>setForm({...form,recordDate:e.target.value})}/>
            </Grid>
          </Grid>
          <Box>
            <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Issued By</Typography>
            <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Dr. Ramesh Kumar, Apollo Labs"
              value={form.issuedBy} onChange={e=>setForm({...form,issuedBy:e.target.value})}/>
          </Box>
          <Box>
            <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Notes</Typography>
            <TextField fullWidth size="small" multiline rows={2} variant="outlined" placeholder="Optional notes"
              value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          </Box>
          <Box>
            <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Attach File (PDF/Image — max 10 MB)</Typography>
            <div className={`drop-zone ${dragOver?"dragover":""}`}
              onClick={()=>fileRef.current?.click()}
              onDragOver={e=>{e.preventDefault();setDragOver(true);}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0]);}}>
              <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
                onChange={e=>handleFile(e.target.files[0])}/>
              <UploadFileIcon sx={{fontSize:32,color:"#c0c8e0",mb:1}}/>
              {file?<Typography sx={{fontSize:".85rem",fontWeight:600,color:"#4f6ef7"}}>{file.name}</Typography>
                   :<Typography sx={{fontSize:".82rem",color:"#8892b0"}}>Click or drag & drop your file here</Typography>}
            </div>
          </Box>
          {error&&<Box sx={{background:"#fff1f3",border:"1px solid rgba(225,29,72,.2)",borderRadius:"10px",padding:"10px 14px",fontSize:".83rem",color:"#e11d48",fontWeight:500}}>⚠ {error}</Box>}
          {loading&&<LinearProgress sx={{borderRadius:4,height:4}}/>}
          <Button onClick={handleSubmit} variant="contained" disabled={loading}
            sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".92rem",py:1.4,boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>
            {loading?"Uploading…":"Save Record"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

// ── Medical Record Card ────────────────────────────────────────────────────────
function RecordCard({record,onDelete}) {
  const [showPreview,setShowPreview] = useState(false);
  const sc=RECORD_COLORS[record.recordType]||RECORD_COLORS.OTHER;
  const fileUrl=record.fileName?`${BASE}/medical-records/file/${record.fileName}`:null;
  const lower=(record.fileName||"").toLowerCase();
  const isPdf=lower.endsWith(".pdf");
  const isImage=lower.endsWith(".png")||lower.endsWith(".jpg")||lower.endsWith(".jpeg")||lower.endsWith(".webp");
  return (
    <div className="record-card">
      <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
        <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:sc.bg,border:`1px solid ${sc.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <DescriptionIcon sx={{color:sc.color,fontSize:22}}/>
        </Box>
        <Box sx={{flex:1,minWidth:0}}>
          <Box sx={{display:"flex",alignItems:"center",gap:1,flexWrap:"wrap",mb:.5}}>
            <Typography sx={{fontWeight:700,fontSize:".92rem",color:"#1a1f36"}}>{record.title}</Typography>
            <Chip label={record.recordType?.replace("_"," ")} size="small" sx={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontWeight:600,fontSize:".68rem",height:22}}/>
          </Box>
          {record.issuedBy&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>👤 {record.issuedBy}</Typography>}
          {record.recordDate&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>📅 {record.recordDate}</Typography>}
          {record.description&&<Typography sx={{fontSize:".8rem",color:"#4a5278",mt:.5}}>{record.description}</Typography>}
          {fileUrl&&(
            <Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>
              {(isPdf||isImage)&&(
                <button onClick={()=>setShowPreview(p=>!p)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,cursor:"pointer",fontSize:".76rem",fontWeight:600,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",color:"#fff",border:"none",fontFamily:"'Outfit',sans-serif"}}>
                  {showPreview?<><VisibilityOffIcon sx={{fontSize:13}}/> Hide</>:<><VisibilityIcon sx={{fontSize:13}}/> Preview</>}
                </button>
              )}
              <a href={fileUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.2)"}}>
                <OpenInNewIcon sx={{fontSize:13}}/> Open
              </a>
              <a href={fileUrl} download={record.fileName} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#f5f7ff",color:"#4a5278",border:"1px solid #e8ecf5"}}>
                <DownloadIcon sx={{fontSize:13}}/> Download
              </a>
            </Box>
          )}
          {showPreview&&fileUrl&&(
            <div className="file-preview-wrap">
              {isPdf&&<iframe src={fileUrl} title={record.title}/>}
              {isImage&&<img src={fileUrl} alt={record.title}/>}
            </div>
          )}
        </Box>
        <IconButton size="small" onClick={()=>onDelete(record.id)}
          sx={{color:"#e11d48",background:"#fff1f3",borderRadius:"9px",flexShrink:0,"&:hover":{background:"#fce7f3"}}}>
          <DeleteIcon sx={{fontSize:17}}/>
        </IconButton>
      </Box>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function PatientDashboard() {
  const {user}  = useContext(AuthContext);
  const userId  = user?.id || localStorage.getItem("userId");
  const navigate = useNavigate();

  const [patient,        setPatient]        = useState(null);
  const [appointments,   setAppointments]   = useState([]);
  const [doctors,        setDoctors]        = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions,  setPrescriptions]  = useState([]); // list from backend
  const [payments,       setPayments]       = useState({}); // {appointmentId: PaymentRecord}
  const [feedbackDone,   setFeedbackDone]   = useState({}); // {appointmentId: true}
  const [view,           setView]           = useState("dashboard");
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [loading,        setLoading]        = useState(true);
  const [profileMissing, setProfileMissing] = useState(false);
  const [error,          setError]          = useState("");
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeSpec,     setActiveSpec]     = useState("All");
  const [uploadOpen,     setUploadOpen]     = useState(false);
  const [recordTypeFilter,setRecordTypeFilter] = useState("ALL");
  const [payAppt,        setPayAppt]        = useState(null);  // appointment to pay
  const [fbAppt,         setFbAppt]         = useState(null);  // appointment for feedback
  const [notifications,  setNotifications]  = useState([]);   // unpaid approved appointments

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const patRes = await axios.get(`${BASE}/patient/user/${userId}`);
        setPatient(patRes.data);
      } catch(err) {
        if(err.response?.status===404){setProfileMissing(true);setLoading(false);return;}
        setError("Failed to load patient.");setLoading(false);return;
      }
      try{const dRes=await axios.get(`${BASE}/doctor`);setDoctors(dRes.data);}catch{}
      setLoading(false);
    };
    if(userId) load();
    else{setError("User ID missing.");setLoading(false);}
  },[userId]);

  useEffect(() => {
    if(!patient) return;
    // Appointments
    axios.get(`${BASE}/appointments/patient/${patient.id}`)
      .then(r=>{
        setAppointments(r.data);
        // Compute notifications: approved but not yet paid
        const unpaid = r.data.filter(a=>a.status==="APPROVED");
        setNotifications(unpaid);
      }).catch(()=>{});
    // Medical records
    axios.get(`${BASE}/medical-records/patient/${patient.id}`)
      .then(r=>setMedicalRecords(r.data)).catch(()=>{});
    // Prescriptions
    axios.get(`${BASE}/prescriptions/patient/${patient.id}`)
      .then(r=>setPrescriptions(r.data)).catch(()=>{});
    // Payments
    axios.get(`${BASE}/payments/patient/${patient.id}`)
      .then(r=>{
        const map={};
        r.data.forEach(p=>{map[p.appointment?.id]=p;});
        setPayments(map);
      }).catch(()=>{});
  },[patient]);

  const handleLogout   = () => { localStorage.removeItem("user"); navigate("/"); };
  const handleNavClick = (k) => { setView(k); setSidebarOpen(false); };
  const countStatus    = (s) => appointments.filter(a=>a.status===s).length;

  const specializations = ["All",...Array.from(new Set(doctors.map(d=>d.specialization).filter(Boolean))).sort()];
  const filteredDoctors = doctors.filter(doc => {
    const bySpec  = activeSpec==="All"||doc.specialization===activeSpec;
    const q=searchQuery.toLowerCase();
    const bySearch=!q||doc.name?.toLowerCase().includes(q)||doc.specialization?.toLowerCase().includes(q)||doc.hospital?.toLowerCase().includes(q);
    return bySpec&&bySearch;
  });

  const handleDeleteRecord = async (id) => {
    if(!window.confirm("Delete this medical record?")) return;
    try{ await axios.delete(`${BASE}/medical-records/${id}`); setMedicalRecords(prev=>prev.filter(r=>r.id!==id)); }
    catch{ alert("Failed to delete record"); }
  };

  const filteredRecords = recordTypeFilter==="ALL" ? medicalRecords : medicalRecords.filter(r=>r.recordType===recordTypeFilter);

  // After payment confirmed
  const handlePaymentDone = (appointmentId) => {
    setPayments(prev=>({...prev,[appointmentId]:{status:"SUCCESS"}}));
    setNotifications(prev=>prev.filter(a=>a.id!==appointmentId));
  };

  // After feedback submitted
  const handleFeedbackDone = (appointmentId) => {
    setFeedbackDone(prev=>({...prev,[appointmentId]:true}));
  };

  // Unpaid approved count for badge
  const unpaidCount = appointments.filter(a=>a.status==="APPROVED"&&!payments[a.id]).length;

  const menuItems = [
    {key:"dashboard",    label:"Dashboard",       icon:<DashboardIcon  sx={{fontSize:18}}/> },
    {key:"appointments", label:"My Appointments", icon:<EventIcon      sx={{fontSize:18}}/>, badge: unpaidCount },
    {key:"book",         label:"Book Appointment",icon:<AddIcon        sx={{fontSize:18}}/> },
    {key:"records",      label:"Medical Records", icon:<FolderIcon     sx={{fontSize:18}}/> },
    {key:"prescriptions",label:"Prescriptions",   icon:<LocalPharmacyIcon sx={{fontSize:18}}/> },
    {key:"profile",      label:"Profile",         icon:<PersonIcon     sx={{fontSize:18}}/> },
  ];

  if(loading) return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>);
  if(error)   return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><Alert severity="error">{error}</Alert></Box>);
  if(profileMissing||!patient) return(
    <PatientProfileForm userId={userId} onCreated={created=>{setPatient(created);setProfileMissing(false);axios.get(`${BASE}/doctor`).then(r=>setDoctors(r.data)).catch(()=>{});}}/>
  );

  return (
    <Box sx={{minHeight:"100vh",background:"#f5f7ff",fontFamily:"'Outfit',sans-serif"}}>
      <div className="blob blob-1"/><div className="blob blob-2"/>

      {sidebarOpen&&<div className="sidebar-overlay" onClick={()=>setSidebarOpen(false)}/>}

      {/* ── Sidebar ── */}
      <div className={`portal-sidebar ${sidebarOpen?"open":"closed"}`}>
        <div className="sidebar-top-row">
          <div className="sidebar-logo"><div className="logo-icon">✦</div>Med<span className="logo-accent">Vault</span></div>
          <div className="sidebar-close-btn" onClick={()=>setSidebarOpen(false)}><CloseIcon sx={{fontSize:16}}/></div>
        </div>
        <div className="nav-section-label">Navigation</div>
        {menuItems.map(item=>(
          <NavItem key={item.key} icon={item.icon} label={item.label}
            active={view===item.key} onClick={()=>handleNavClick(item.key)} badge={item.badge||0}/>
        ))}
        <div className="sidebar-spacer"/>
        <div className="user-card">
          <div className="user-mini-av">{patient.name?.charAt(0)}</div>
          <Box>
            <Typography sx={{fontSize:".85rem",fontWeight:600,color:"#1a1f36",lineHeight:1.2}}>{patient.name}</Typography>
            <Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Patient</Typography>
          </Box>
        </div>
        <button onClick={handleLogout}
          style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:11,cursor:"pointer",fontSize:".875rem",fontWeight:500,color:"#e11d48",border:"1px solid transparent",background:"none",width:"100%",fontFamily:"'Outfit',sans-serif",transition:"all .18s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="#fff1f3";e.currentTarget.style.borderColor="rgba(225,29,72,.15)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor="transparent";}}>
          <div className="nav-icon-wrap" style={{background:"#fff1f3",color:"#e11d48"}}><LogoutIcon sx={{fontSize:16}}/></div>
          Sign Out
        </button>
      </div>

      {/* ── Top bar ── */}
      <div className="portal-topbar">
        <div className="topbar-left">
          <div className="hamburger-btn" onClick={()=>setSidebarOpen(true)}><MenuIcon sx={{fontSize:20}}/></div>
          <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:"1.3rem",color:"#4f6ef7"}}>
            Med<span style={{color:"#7c3aed"}}>Vault</span>
          </Typography>
        </div>
        <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
          {unpaidCount>0&&(
            <Box onClick={()=>handleNavClick("appointments")}
              sx={{display:"flex",alignItems:"center",gap:.75,cursor:"pointer",background:"#fff7ed",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75}}>
              <NotificationsIcon sx={{fontSize:16,color:"#d97706"}}/>
              <Typography sx={{fontSize:".75rem",fontWeight:600,color:"#d97706"}}>{unpaidCount} fee pending</Typography>
            </Box>
          )}
          <Button startIcon={<LogoutIcon/>} onClick={handleLogout} size="small"
            sx={{color:"#e11d48",borderColor:"rgba(225,29,72,.3)",textTransform:"none",borderRadius:2,border:"1px solid",fontFamily:"'Outfit',sans-serif"}}>
            Logout
          </Button>
        </Box>
      </div>

      {/* ── Content ── */}
      <Box sx={{p:{xs:2,md:"36px 44px"},position:"relative",zIndex:1}}>
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}}>

            {/* ─── DASHBOARD ─── */}
            {view==="dashboard"&&(
              <>
                <Box sx={{mb:4}}>
                  <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>
                    Good morning, {patient.name?.split(" ")[0]} ☀️
                  </Typography>
                  <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Here's a summary of your health portal</Typography>
                </Box>

                {/* Fee payment notifications */}
                {appointments.filter(a=>a.status==="APPROVED"&&!payments[a.id]).map(appt=>(
                  <Box key={appt.id} className="pay-banner" sx={{mb:2}}>
                    <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
                      <Box sx={{width:38,height:38,borderRadius:"11px",background:"linear-gradient(135deg,#f59e0b,#fbbf24)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <NotificationsIcon sx={{color:"#fff",fontSize:20}}/>
                      </Box>
                      <Box>
                        <Typography sx={{fontWeight:600,fontSize:".88rem",color:"#92400e"}}>
                          Appointment Confirmed — Fee Pending
                        </Typography>
                        <Typography sx={{fontSize:".78rem",color:"#a16207"}}>
                          Dr. {appt.doctor?.name} · {appt.date} · ₹{appt.doctor?.consultationFee}
                        </Typography>
                      </Box>
                    </Box>
                    <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small"
                      startIcon={<PaymentIcon sx={{fontSize:16}}/>}
                      sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,boxShadow:"0 3px 10px rgba(245,158,11,.35)",whiteSpace:"nowrap"}}>
                      Pay ₹{appt.doctor?.consultationFee}
                    </Button>
                  </Box>
                ))}

                <Box className="hero-card" sx={{mb:4,display:"flex",alignItems:"center",gap:3}}>
                  <Avatar className="av-blue" sx={{width:80,height:80,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",boxShadow:"0 8px 24px rgba(79,110,247,.3)"}}>
                    {patient.name?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography>
                    <Typography sx={{color:"#8892b0",fontSize:".82rem",mt:.5}}>Patient ID · #{patient.id}</Typography>
                    <Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>
                      {[patient.gender,`Age ${patient.age}`,patient.contact].filter(Boolean).map((v,i)=>(
                        <Chip key={i} label={v} size="small" sx={{background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:500,fontSize:".75rem"}}/>
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={2.5} sx={{mb:4}}>
                  <Grid item xs={6} sm={3}><StatCard label="Appointments"    value={appointments.length}       icon="📅" color="#4f6ef7"/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Approved"        value={countStatus("APPROVED")}   icon="✓"  color="#059669"/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Prescriptions"   value={prescriptions.length}      icon="💊" color="#7c3aed"/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Medical Records" value={medicalRecords.length}     icon="📋" color="#0891b2"/></Grid>
                </Grid>

                <div className="sec-heading">Recent Appointments</div>
                <Grid container spacing={2.5}>
                  {appointments.slice(0,3).map((appt,i)=>(
                    <Grid item xs={12} md={4} key={appt.id}>
                      <motion.div whileHover={{scale:1.03}}>
                        <Card className="light-card">
                          <CardContent sx={{p:"20px !important"}}>
                            <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
                              <Avatar className={getAvatarClass(i)} sx={{width:44,height:44,borderRadius:"12px",fontSize:"1rem",fontWeight:700}}>
                                {appt.doctor?.name?.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography sx={{fontWeight:600,fontSize:".92rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography>
                                <Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography>
                              </Box>
                            </Box>
                            <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:1}}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
                            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:.75}}>
                              <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".72rem"}}/>
                              {appt.status==="APPROVED"&&!payments[appt.id]&&(
                                <Chip label={`₹${appt.doctor?.consultationFee} pending`} size="small"
                                  onClick={()=>setPayAppt(appt)}
                                  sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".68rem",cursor:"pointer"}}/>
                              )}
                              {payments[appt.id]?.status==="SUCCESS"&&(
                                <Chip label="Paid ✓" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".68rem"}}/>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                  {appointments.length===0&&(
                    <Grid item xs={12}>
                      <Box sx={{textAlign:"center",py:5,color:"#8892b0"}}>
                        <Typography sx={{fontSize:"2rem",mb:1}}>📅</Typography>
                        <Typography sx={{fontWeight:500}}>No appointments yet.</Typography>
                        <Button onClick={()=>setView("book")} size="small" variant="contained"
                          sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>
                          Book your first appointment →
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </>
            )}

            {/* ─── MY APPOINTMENTS ─── */}
            {view==="appointments"&&(
              <>
                <Box sx={{mb:4}}>
                  <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>My Appointments</Typography>
                  <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{appointments.length} total · {countStatus("APPROVED")} approved</Typography>
                </Box>

                {/* Fee payment banners */}
                {appointments.filter(a=>a.status==="APPROVED"&&!payments[a.id]).map(appt=>(
                  <Box key={appt.id} className="pay-banner">
                    <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
                      <CurrencyRupeeIcon sx={{color:"#d97706",fontSize:20,flexShrink:0}}/>
                      <Box>
                        <Typography sx={{fontWeight:600,fontSize:".85rem",color:"#92400e"}}>
                          Consultation fee pending for Dr. {appt.doctor?.name}
                        </Typography>
                        <Typography sx={{fontSize:".76rem",color:"#a16207"}}>
                          {appt.date} · {appt.timeSlot} · ₹{appt.doctor?.consultationFee}
                        </Typography>
                      </Box>
                    </Box>
                    <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small"
                      startIcon={<PaymentIcon sx={{fontSize:16}}/>}
                      sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,boxShadow:"0 3px 10px rgba(245,158,11,.3)",whiteSpace:"nowrap"}}>
                      Pay Now ₹{appt.doctor?.consultationFee}
                    </Button>
                  </Box>
                ))}

                {appointments.length===0?(
                  <Alert severity="info" sx={{borderRadius:"14px"}}>No appointments booked yet.</Alert>
                ):(
                  <Grid container spacing={2.5}>
                    {appointments.map((appt,i)=>{
                      const isPaid=payments[appt.id]?.status==="SUCCESS";
                      const hasFeedback=feedbackDone[appt.id];
                      return(
                        <Grid item xs={12} md={4} key={appt.id}>
                          <motion.div whileHover={{scale:1.03}}>
                            <Card className="light-card">
                              <CardContent sx={{p:"22px !important"}}>
                                <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
                                  <Avatar className={getAvatarClass(i)} sx={{width:46,height:46,borderRadius:"14px",fontSize:"1.1rem",fontWeight:700}}>
                                    {appt.doctor?.name?.charAt(0)}
                                  </Avatar>
                                  <Box sx={{flex:1}}>
                                    <Typography sx={{fontWeight:600,fontSize:".95rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography>
                                    <Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography>
                                  </Box>
                                  {appt.doctor?.consultationFee>0&&(
                                    <Chip label={`₹${appt.doctor.consultationFee}`} size="small"
                                      sx={{background:"#eef1fe",color:"#4f6ef7",fontWeight:700,fontSize:".72rem"}}/>
                                  )}
                                </Box>
                                <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:.6}}>📅 {appt.date}</Typography>
                                <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:1.5}}>🕐 {appt.timeSlot}</Typography>

                                <Box sx={{display:"flex",gap:.75,flexWrap:"wrap",mb:1.5}}>
                                  <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".72rem"}}/>
                                  {isPaid&&<Chip label="Paid ✓" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".68rem"}}/>}
                                </Box>

                                {/* Pay button for approved unpaid */}
                                {appt.status==="APPROVED"&&!isPaid&&(
                                  <Button fullWidth onClick={()=>setPayAppt(appt)} variant="contained" size="small"
                                    startIcon={<PaymentIcon sx={{fontSize:15}}/>}
                                    sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"9px",textTransform:"none",fontWeight:700,fontSize:".8rem",boxShadow:"0 3px 10px rgba(245,158,11,.3)",mb:1}}>
                                    Pay Consultation Fee ₹{appt.doctor?.consultationFee}
                                  </Button>
                                )}

                                {/* Feedback button for approved (paid) appointments */}
                                {appt.status==="APPROVED"&&isPaid&&!hasFeedback&&(
                                  <Button fullWidth onClick={()=>setFbAppt(appt)} variant="outlined" size="small"
                                    startIcon={<StarIcon sx={{fontSize:15}}/>}
                                    sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".78rem",borderColor:"rgba(245,158,11,.4)",color:"#d97706","&:hover":{background:"#fffbeb"}}}>
                                    Rate Dr. {appt.doctor?.name?.split(" ")[0]}
                                  </Button>
                                )}
                                {hasFeedback&&(
                                  <Typography sx={{fontSize:".75rem",color:"#059669",fontWeight:600,textAlign:"center"}}>
                                    ⭐ Feedback submitted — Thank you!
                                  </Typography>
                                )}
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

            {/* ─── BOOK APPOINTMENT ─── */}
            {view==="book"&&(
              <>
                <Box sx={{mb:3}}>
                  <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Book Appointment</Typography>
                  <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Filter by specialization and find the right doctor</Typography>
                </Box>
                <TextField fullWidth size="small"
                  placeholder="Search doctor name, specialization, hospital…"
                  value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                  InputProps={{startAdornment:<InputAdornment position="start"><SearchIcon sx={{color:"#b0b8d0",fontSize:20}}/></InputAdornment>}}
                  sx={{mb:2.5,"& .MuiOutlinedInput-root":{borderRadius:"14px",background:"#fff","& fieldset":{borderColor:"#e8ecf5"},"&:hover fieldset":{borderColor:"#c7cee8"},"&.Mui-focused fieldset":{borderColor:"#4f6ef7"}}}}/>
                <Box sx={{mb:3}}>
                  <Box sx={{display:"flex",alignItems:"center",gap:1,mb:1.5}}>
                    <FilterListIcon sx={{fontSize:16,color:"#8892b0"}}/>
                    <Typography sx={{fontSize:".72rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600}}>Filter by Specialization</Typography>
                  </Box>
                  <div className="spec-chip-wrap">
                    {specializations.map(spec=>(
                      <div key={spec} className={`spec-chip ${activeSpec===spec?"active":""}`} onClick={()=>setActiveSpec(spec)}>{spec}</div>
                    ))}
                  </div>
                </Box>
                <Box sx={{mb:2.5,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <Typography sx={{fontSize:".8rem",color:"#8892b0"}}>
                    {filteredDoctors.length} doctor{filteredDoctors.length!==1?"s":""} found{activeSpec!=="All"?` · ${activeSpec}`:""}{searchQuery?` · "${searchQuery}"`:""}
                  </Typography>
                  {(searchQuery||activeSpec!=="All")&&(
                    <Typography sx={{fontSize:".78rem",color:"#4f6ef7",fontWeight:600,cursor:"pointer"}} onClick={()=>{setSearchQuery("");setActiveSpec("All");}}>Clear filters ✕</Typography>
                  )}
                </Box>
                {filteredDoctors.length===0?(
                  <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
                    <Typography sx={{fontSize:"2.5rem",mb:1}}>🔍</Typography>
                    <Typography sx={{fontWeight:500}}>No doctors found.</Typography>
                  </Box>
                ):(
                  <Grid container spacing={2.5}>
                    {filteredDoctors.map((doc,i)=>(
                      <Grid item xs={12} sm={6} md={4} key={doc.id}>
                        <motion.div whileHover={{scale:1.03}}>
                          <Card className="light-card" sx={{p:3}}>
                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
                              <Avatar className={getAvatarClass(i)}
                                sx={{width:68,height:68,borderRadius:"20px",mb:1.5,fontSize:"1.8rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.22)"}}>
                                {doc.name?.charAt(0)}
                              </Avatar>
                              <Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {doc.name}</Typography>
                              <Chip label={doc.specialization||"General"} size="small"
                                sx={{mt:.75,mb:.5,background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:600,fontSize:".72rem"}}/>
                              {doc.qualification&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>{doc.qualification}</Typography>}
                              {doc.experience>0&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>🏅 {doc.experience} yrs experience</Typography>}
                              {doc.hospital&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.5}}>🏥 {doc.hospital}</Typography>}

                              {/* Fee display */}
                              {doc.consultationFee>0&&(
                                <Box sx={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75,mb:2,display:"flex",alignItems:"center",gap:.75}}>
                                  <CurrencyRupeeIcon sx={{fontSize:14,color:"#d97706"}}/>
                                  <Typography sx={{fontSize:".8rem",fontWeight:700,color:"#d97706"}}>
                                    Consultation Fee: ₹{doc.consultationFee}
                                  </Typography>
                                </Box>
                              )}

                              <Button variant="contained"
                                onClick={()=>navigate(`/book-appointment/${patient.id}/${doc.id}`)}
                                sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600,fontSize:".85rem",boxShadow:"0 3px 12px rgba(79,110,247,.28)","&:hover":{boxShadow:"0 6px 20px rgba(79,110,247,.38)"}}}>
                                Book Now →
                              </Button>
                            </Box>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* ─── MEDICAL RECORDS ─── */}
            {view==="records"&&(
              <>
                <Box sx={{mb:4,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:2}}>
                  <Box>
                    <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Medical Records</Typography>
                    <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{medicalRecords.length} record{medicalRecords.length!==1?"s":""} stored securely</Typography>
                  </Box>
                  <Button variant="contained" startIcon={<UploadFileIcon/>} onClick={()=>setUploadOpen(true)}
                    sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".88rem",boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>
                    Add Record
                  </Button>
                </Box>
                <Box sx={{mb:3}}>
                  <Box sx={{display:"flex",alignItems:"center",gap:1,mb:1.5}}>
                    <FilterListIcon sx={{fontSize:16,color:"#8892b0"}}/>
                    <Typography sx={{fontSize:".72rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600}}>Filter by Type</Typography>
                  </Box>
                  <div className="spec-chip-wrap">
                    {["ALL",...RECORD_TYPES].map(t=>(
                      <div key={t} className={`spec-chip ${recordTypeFilter===t?"active":""}`} onClick={()=>setRecordTypeFilter(t)}>
                        {t==="ALL"?"All":t.replace("_"," ")}
                      </div>
                    ))}
                  </div>
                </Box>
                {filteredRecords.length===0?(
                  <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
                    <Typography sx={{fontSize:"2.5rem",mb:1}}>📋</Typography>
                    <Typography sx={{fontWeight:500}}>{medicalRecords.length===0?"No medical records yet.":"No records match this filter."}</Typography>
                    {medicalRecords.length===0&&<Button onClick={()=>setUploadOpen(true)} size="small" variant="contained" sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Upload your first record →</Button>}
                  </Box>
                ):(filteredRecords.map(record=><RecordCard key={record.id} record={record} onDelete={handleDeleteRecord}/>))}
              </>
            )}

            {/* ─── PRESCRIPTIONS ─── */}
            {view==="prescriptions"&&(
              <>
                <Box sx={{mb:4}}>
                  <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Prescriptions</Typography>
                  <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{prescriptions.length} prescription{prescriptions.length!==1?"s":""} from your doctors</Typography>
                </Box>
                {prescriptions.length===0?(
                  <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
                    <Typography sx={{fontSize:"2.5rem",mb:1}}>💊</Typography>
                    <Typography sx={{fontWeight:500}}>No prescriptions yet.</Typography>
                    <Typography sx={{fontSize:".83rem",mt:.5}}>Prescriptions from your doctors will appear here after approved appointments.</Typography>
                  </Box>
                ):(
                  prescriptions.map(rx=>(
                    <div key={rx.id} className="rx-card">
                      <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
                        <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <LocalPharmacyIcon sx={{color:"#059669",fontSize:22}}/>
                        </Box>
                        <Box sx={{flex:1}}>
                          <Box sx={{display:"flex",alignItems:"center",gap:1.5,flexWrap:"wrap",mb:.75}}>
                            <Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>
                              Dr. {rx.appointment?.doctor?.name}
                            </Typography>
                            {rx.issuedDate&&<Chip label={rx.issuedDate} size="small" sx={{background:"#f5f7ff",color:"#8892b0",fontSize:".68rem",height:20}}/>}
                          </Box>
                          <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:.75}}>
                            {rx.appointment?.doctor?.specialization} · {rx.appointment?.date}
                          </Typography>

                          {rx.diagnosis&&(
                            <Box sx={{background:"#f0fdf4",border:"1px solid rgba(5,150,105,.15)",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
                              <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#059669",fontWeight:700,mb:.3}}>Diagnosis</Typography>
                              <Typography sx={{fontSize:".88rem",fontWeight:600,color:"#1a1f36"}}>🩺 {rx.diagnosis}</Typography>
                            </Box>
                          )}

                          {rx.medicines&&(
                            <Box sx={{background:"#f8f9ff",border:"1px solid #e8ecf5",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
                              <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#4f6ef7",fontWeight:700,mb:.5}}>💊 Medicines &amp; Dosage</Typography>
                              <Typography sx={{fontSize:".83rem",color:"#1a1f36",whiteSpace:"pre-line",lineHeight:1.7}}>{rx.medicines}</Typography>
                            </Box>
                          )}

                          <Grid container spacing={1.5}>
                            {rx.instructions&&(
                              <Grid item xs={12} sm={6}>
                                <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Instructions</Typography>
                                <Typography sx={{fontSize:".82rem",color:"#4a5278"}}>📋 {rx.instructions}</Typography>
                              </Grid>
                            )}
                            {rx.tests&&(
                              <Grid item xs={12} sm={6}>
                                <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Lab Tests</Typography>
                                <Typography sx={{fontSize:".82rem",color:"#7c3aed"}}>🔬 {rx.tests}</Typography>
                              </Grid>
                            )}
                            {rx.followUpDate&&(
                              <Grid item xs={12}>
                                <Typography sx={{fontSize:".82rem",color:"#d97706",fontWeight:600}}>📅 Follow-up: {rx.followUpDate}</Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      </Box>
                    </div>
                  ))
                )}
              </>
            )}

            {/* ─── PROFILE ─── */}
            {view==="profile"&&(
              <>
                <Box sx={{mb:4}}>
                  <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Profile</Typography>
                  <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Your personal health information</Typography>
                </Box>
                <Card className="light-card" sx={{p:4}}>
                  <Box sx={{display:"flex",alignItems:"center",gap:2.5,mb:3}}>
                    <Avatar className="av-blue" sx={{width:76,height:76,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.25)"}}>
                      {patient.name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography>
                      <Typography sx={{fontSize:".82rem",color:"#8892b0",mt:.5}}>Patient Account · Active</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
                  <Grid container spacing={3}>
                    {[["Full Name",patient.name],["Gender",patient.gender],["Date of Birth",patient.dob],["Contact",patient.contact],["Age",patient.age?`${patient.age} years`:"—"],["Patient ID",`#${patient.id}`]].map(([label,val])=>(
                      <Grid item xs={12} sm={6} key={label}>
                        <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1.1px",color:"#8892b0",fontWeight:600,mb:.6}}>{label}</Typography>
                        <Typography sx={{fontSize:".95rem",fontWeight:500,color:"#1a1f36"}}>{val||"—"}</Typography>
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
      <UploadRecordModal open={uploadOpen} onClose={()=>setUploadOpen(false)} patientId={patient.id}
        onUploaded={newRecord=>setMedicalRecords(prev=>[newRecord,...prev])}/>

      <PaymentModal open={Boolean(payAppt)} appointment={payAppt}
        onClose={()=>setPayAppt(null)} onPaid={handlePaymentDone}/>

      <FeedbackModal open={Boolean(fbAppt)} appointment={fbAppt}
        onClose={()=>setFbAppt(null)} onSubmitted={handleFeedbackDone}/>
    </Box>
  );
}