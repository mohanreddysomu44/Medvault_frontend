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


import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PatientProfileForm from "./PatientProfileForm"; // ← NEW: profile creation form
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { motion, AnimatePresence } from "framer-motion";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
  body { font-family: 'Outfit', sans-serif !important; }

  .sidebar-overlay {
    position: fixed; inset: 0;
    background: rgba(26,31,54,.18); backdrop-filter: blur(3px);
    z-index: 199; animation: overlayIn .2s ease;
  }
  @keyframes overlayIn { from{opacity:0} to{opacity:1} }

  .portal-sidebar {
    width: 260px; background: #ffffff;
    border-right: 1px solid #e8ecf5;
    display: flex; flex-direction: column;
    padding: 20px 14px 24px;
    position: fixed; top: 0; left: 0;
    height: 100vh; z-index: 200;
    box-shadow: 4px 0 28px rgba(79,110,247,.12);
    transition: transform .28s cubic-bezier(.22,1,.36,1);
  }
  .portal-sidebar.closed { transform: translateX(-100%); }
  .portal-sidebar.open   { transform: translateX(0); }

  .sidebar-top-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 6px 20px;
  }
  .sidebar-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 700; color: #4f6ef7;
    display: flex; align-items: center; gap: 9px;
  }
  .logo-icon {
    width: 32px; height: 32px; border-radius: 9px;
    background: linear-gradient(135deg, #4f6ef7, #7c3aed);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: .85rem; flex-shrink: 0;
  }
  .logo-accent { color: #7c3aed; }
  .sidebar-close-btn {
    width: 30px; height: 30px; border-radius: 8px;
    background: #f5f7ff; border: 1px solid #e8ecf5;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #8892b0; transition: all .15s;
  }
  .sidebar-close-btn:hover { background: #eef1fe; color: #4f6ef7; border-color: rgba(79,110,247,.2); }

  .nav-section-label {
    font-size: .67rem; text-transform: uppercase; letter-spacing: 1.2px;
    color: #b0b8d0; font-weight: 600; padding: 0 10px; margin: 4px 0 6px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 11px;
    padding: 10px 12px; border-radius: 11px; cursor: pointer;
    font-size: .875rem; font-weight: 500; color: #4a5278;
    transition: all .18s ease; border: 1px solid transparent;
    margin-bottom: 3px; user-select: none;
  }
  .nav-item:hover { background: #eef1fe; color: #4f6ef7; }
  .nav-item.active { background: #eef1fe; color: #4f6ef7; font-weight: 600; border-color: rgba(79,110,247,.18); }
  .nav-item.active .nav-icon-wrap { background: #4f6ef7 !important; color: #fff !important; }
  .nav-icon-wrap {
    width: 30px; height: 30px; border-radius: 8px;
    background: #f0f2f8; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all .18s; color: #4a5278;
  }
  .sidebar-spacer { flex: 1; }
  .user-card {
    display: flex; align-items: center; gap: 11px;
    padding: 12px; border-radius: 14px;
    background: #f5f7ff; border: 1px solid #e8ecf5; margin-bottom: 10px;
  }
  .user-mini-av {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #4f6ef7, #7c3aed);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-weight: 700; color: #fff; font-size: 1.1rem;
  }
  .portal-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 24px; background: #fff;
    border-bottom: 1px solid #e8ecf5;
    box-shadow: 0 1px 8px rgba(79,110,247,.07);
    position: sticky; top: 0; z-index: 100;
  }
  .topbar-left { display: flex; align-items: center; gap: 14px; }
  .hamburger-btn {
    width: 38px; height: 38px; border-radius: 10px;
    background: #f5f7ff; border: 1px solid #e8ecf5;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #4f6ef7; transition: all .18s;
  }
  .hamburger-btn:hover { background: #eef1fe; border-color: rgba(79,110,247,.2); }
  .blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
  .blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
  .blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }
  .light-card {
    background: #fff !important; border: 1px solid #e8ecf5 !important; border-radius: 18px !important;
    box-shadow: 0 1px 4px rgba(79,110,247,.06), 0 2px 12px rgba(0,0,0,.04) !important;
    transition: box-shadow .22s, border-color .22s, transform .22s !important;
  }
  .light-card:hover { box-shadow: 0 4px 24px rgba(79,110,247,.12) !important; border-color: #d4daf0 !important; }
  .hero-card {
    background: linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;
    border: 1px solid #e8ecf5 !important; border-radius: 20px !important;
    box-shadow: 0 2px 16px rgba(79,110,247,.08) !important;
    padding: 36px 40px !important; position: relative; overflow: hidden;
  }
  .hero-card::after { content:'✦'; position:absolute; right:40px; bottom:10px; font-size:5rem; color:rgba(79,110,247,.04); line-height:1; pointer-events:none; }
  .stat-card {
    background: #fff !important; border: 1px solid #e8ecf5 !important; border-radius: 18px !important;
    box-shadow: 0 1px 6px rgba(79,110,247,.06) !important;
    padding: 24px 28px; position: relative; overflow: hidden;
    transition: box-shadow .2s, transform .2s !important;
  }
  .stat-card:hover { box-shadow: 0 6px 24px rgba(79,110,247,.13) !important; transform: translateY(-2px); }
  .stat-value { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; line-height:1; }
  .stat-label { font-size:.72rem; color:#8892b0; text-transform:uppercase; letter-spacing:1px; font-weight:600; margin-bottom:8px; }
  .stat-icon  { position:absolute; right:20px; top:50%; transform:translateY(-50%); font-size:2.4rem; opacity:.07; }
  .sec-heading {
    font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700; color:#1a1f36;
    display:flex; align-items:center; gap:12px; margin-bottom:16px;
  }
  .sec-heading::after { content:''; flex:1; height:1px; background:#e8ecf5; }
  .av-blue   { background: linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
  .av-violet { background: linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
  .av-teal   { background: linear-gradient(135deg,#0891b2,#22d3ee) !important; }
  .av-rose   { background: linear-gradient(135deg,#e11d48,#fb7185) !important; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
  .fu { animation: fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
`;

if (!document.getElementById("portal-styles")) {
  const s = document.createElement("style");
  s.id = "portal-styles";
  s.textContent = globalStyles;
  document.head.appendChild(s);
}

const avatarColors = ["av-blue", "av-violet", "av-teal", "av-rose"];
const getAvatarClass = (i) => avatarColors[i % avatarColors.length];

const getStatusColor = (status) => {
  switch (status) {
    case "APPROVED": return "success";
    case "REJECTED": return "error";
    default:         return "warning";
  }
};

function NavItem({ icon, label, active, onClick }) {
  return (
    <div className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <div className="nav-icon-wrap">{icon}</div>
      {label}
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="stat-card fu">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
}

export default function PatientDashboard() {
  const { user, logout } = useContext(AuthContext);
  const userId = user?.id || localStorage.getItem("userId");
  const navigate = useNavigate();

  const [patient,        setPatient]        = useState(null);
  const [appointments,   setAppointments]   = useState([]);
  const [doctors,        setDoctors]        = useState([]);
  const [view,           setView]           = useState("dashboard");
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [loading,        setLoading]        = useState(true);
  const [profileMissing, setProfileMissing] = useState(false); // ← controls form display
  const [error,          setError]          = useState("");

  // ── SAME fetch logic as your old code ──────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await axios.get(`http://localhost:8080/patient/user/${userId}`);
        setPatient(patientRes.data);
      } catch (err) {
        // 404 = patient not created yet → show the profile form
        if (err.response?.status === 404) {
          setProfileMissing(true);
          setLoading(false);
          return;
        } else {
          setError("Failed to load patient.");
          setLoading(false);
          return;
        }
      }

      try {
        const doctorRes = await axios.get("http://localhost:8080/doctor");
        setDoctors(doctorRes.data);
      } catch {
        setError("Failed to load doctors.");
      }

      setLoading(false);
    };

    if (userId) fetchData();
    else { setError("User ID missing."); setLoading(false); }
  }, [userId]);

  // Fetch appointments separately after patient is known
  useEffect(() => {
    if (!patient) return;
    axios.get(`http://localhost:8080/appointments/patient/${patient.id}`)
      .then((res) => setAppointments(res.data))
      .catch(() => {});
  }, [patient]);

  const handleLogout   = () => { 
    // logout(); 
      localStorage.removeItem("user")
    navigate("/"); };
  const handleNavClick = (key) => { setView(key); setSidebarOpen(false); };
  const countStatus    = (s) => appointments.filter((a) => a.status === s).length;

  const menuItems = [
    { key: "dashboard",    label: "Dashboard",        icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
    { key: "appointments", label: "My Appointments",  icon: <EventIcon      sx={{ fontSize: 18 }} /> },
    { key: "book",         label: "Book Appointment", icon: <AddIcon        sx={{ fontSize: 18 }} /> },
    { key: "profile",      label: "Profile",          icon: <PersonIcon     sx={{ fontSize: 18 }} /> },
  ];

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
      <CircularProgress sx={{ color:"#4f6ef7" }} />
    </Box>
  );

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  // ── NO PROFILE YET → show PatientProfileForm ──────────────────────────────
  // This mirrors your old code's  `if (!patient) { return <form>... }`
  if (profileMissing || !patient) {
    return (
      <PatientProfileForm
        userId={userId}
        onCreated={(createdPatient) => {
          // same as old code: setPatient(res.data)  →  dashboard shows
          setPatient(createdPatient);
          setProfileMissing(false);
          // also fetch doctors now that profile exists
          axios.get("http://localhost:8080/doctor")
            .then((r) => setDoctors(r.data))
            .catch(() => {});
        }}
      />
    );
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <div className={`portal-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-top-row">
          <div className="sidebar-logo">
            <div className="logo-icon">✦</div>
            Med<span className="logo-accent">Vault</span>
          </div>
          <div className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <CloseIcon sx={{ fontSize:16 }} />
          </div>
        </div>

        <div className="nav-section-label">Navigation</div>
        {menuItems.map((item) => (
          <NavItem key={item.key} icon={item.icon} label={item.label}
            active={view === item.key} onClick={() => handleNavClick(item.key)} />
        ))}

        <div className="sidebar-spacer" />

        <div className="user-card">
          <div className="user-mini-av">{patient.name?.charAt(0)}</div>
          <Box>
            <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>{patient.name}</Typography>
            <Typography sx={{ fontSize:".72rem", color:"#8892b0" }}>Patient</Typography>
          </Box>
        </div>

        <button onClick={handleLogout}
          style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11,
                   cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48",
                   border:"1px solid transparent", background:"none", width:"100%",
                   fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
          onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.borderColor="transparent"; }}>
          <div className="nav-icon-wrap" style={{ background:"#fff1f3", color:"#e11d48" }}>
            <LogoutIcon sx={{ fontSize:16 }} />
          </div>
          Sign Out
        </button>
      </div>

      {/* ── Top bar ── */}
      <div className="portal-topbar">
        <div className="topbar-left">
          <div className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
            <MenuIcon sx={{ fontSize:20 }} />
          </div>
          <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#4f6ef7" }}>
            Med<span style={{ color:"#7c3aed" }}>Vault</span>
          </Typography>
        </div>
        <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
          sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none",
                borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>
          Logout
        </Button>
      </div>

      {/* ── Page content ── */}
      <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
        <AnimatePresence mode="wait">
          <motion.div key={view}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }} transition={{ duration:0.3 }}>

            {/* ── DASHBOARD ── */}
            {view === "dashboard" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
                    Good morning, {patient.name?.split(" ")[0]} ☀️
                  </Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Here's a summary of your health portal</Typography>
                </Box>

                <Box className="hero-card" sx={{ mb:4, display:"flex", alignItems:"center", gap:3 }}>
                  <Avatar className="av-blue" sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", boxShadow:"0 8px 24px rgba(79,110,247,.3)" }}>
                    {patient.name?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>{patient.name}</Typography>
                    <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>Patient ID · #{patient.id}</Typography>
                    <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
                      {[patient.gender, `Age ${patient.age}`, patient.contact].map((v, i) => (
                        <Chip key={i} label={v} size="small"
                          sx={{ background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.18)", fontWeight:500, fontSize:".75rem" }} />
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Grid container spacing={2.5} sx={{ mb:4 }}>
                  <Grid item xs={12} sm={4}><StatCard label="Total Appointments" value={appointments.length} icon="📅" color="#4f6ef7" /></Grid>
                  <Grid item xs={12} sm={4}><StatCard label="Approved" value={countStatus("APPROVED")} icon="✓" color="#7c3aed" /></Grid>
                  <Grid item xs={12} sm={4}><StatCard label="Pending" value={appointments.length - countStatus("APPROVED") - countStatus("REJECTED")} icon="⏳" color="#0891b2" /></Grid>
                </Grid>

                <div className="sec-heading">Recent Appointments</div>
                <Grid container spacing={2.5}>
                  {appointments.slice(0, 3).map((appt, i) => (
                    <Grid item xs={12} md={4} key={appt.id}>
                      <motion.div whileHover={{ scale:1.03 }}>
                        <Card className="light-card">
                          <CardContent sx={{ p:"20px !important" }}>
                            <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
                              <Avatar className={getAvatarClass(i)} sx={{ width:44, height:44, borderRadius:"12px", fontSize:"1rem", fontWeight:700 }}>
                                {appt.doctor?.name?.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
                                <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>{appt.doctor?.specialization}</Typography>
                              </Box>
                            </Box>
                            <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📅 {appt.date} &nbsp;·&nbsp; 🕐 {appt.timeSlot}</Typography>
                            <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight:600, fontSize:".72rem" }} />
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                  {appointments.length === 0 && (
                    <Grid item xs={12}>
                      <Box sx={{ textAlign:"center", py:5, color:"#8892b0" }}>
                        <Typography sx={{ fontSize:"2rem", mb:1 }}>📅</Typography>
                        <Typography sx={{ fontWeight:500 }}>No appointments yet.</Typography>
                        <Button onClick={() => setView("book")} size="small" variant="contained"
                          sx={{ mt:2, background:"linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius:"10px",
                                textTransform:"none", fontWeight:600, boxShadow:"0 3px 12px rgba(79,110,247,.28)" }}>
                          Book your first appointment →
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </>
            )}

            {/* ── MY APPOINTMENTS ── */}
            {view === "appointments" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>My Appointments</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{appointments.length} total · {countStatus("APPROVED")} approved</Typography>
                </Box>
                {appointments.length === 0 ? (
                  <Alert severity="info" sx={{ borderRadius:"14px" }}>No appointments booked yet.</Alert>
                ) : (
                  <Grid container spacing={2.5}>
                    {appointments.map((appt, i) => (
                      <Grid item xs={12} md={4} key={appt.id}>
                        <motion.div whileHover={{ scale:1.03 }}>
                          <Card className="light-card">
                            <CardContent sx={{ p:"22px !important" }}>
                              <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
                                <Avatar className={getAvatarClass(i)} sx={{ width:46, height:46, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
                                  {appt.doctor?.name?.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
                                  <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>{appt.doctor?.specialization}</Typography>
                                </Box>
                              </Box>
                              <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.8 }}>📅 {appt.date}</Typography>
                              <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>🕐 {appt.timeSlot}</Typography>
                              <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight:600, fontSize:".72rem" }} />
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* ── BOOK APPOINTMENT ── */}
            {view === "book" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Book Appointment</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Choose a specialist and schedule your visit</Typography>
                </Box>
                <Grid container spacing={2.5}>
                  {doctors.map((doc, i) => (
                    <Grid item xs={12} sm={6} md={4} key={doc.id}>
                      <motion.div whileHover={{ scale:1.03 }}>
                        <Card className="light-card" sx={{ textAlign:"center", p:3 }}>
                          <Avatar className={getAvatarClass(i)} sx={{ width:68, height:68, borderRadius:"20px", mx:"auto", mb:1.5, fontSize:"1.8rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 6px 20px rgba(79,110,247,.22)" }}>
                            {doc.name?.charAt(0)}
                          </Avatar>
                          <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>Dr. {doc.name}</Typography>
                          <Typography sx={{ fontSize:".8rem", color:"#8892b0", mb:2 }}>{doc.specialization}</Typography>
                          <Button variant="contained"
                            onClick={() => navigate(`/book-appointment/${patient.id}/${doc.id}`)}
                            sx={{ background:"linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius:"10px",
                                  textTransform:"none", fontWeight:600, fontSize:".85rem",
                                  boxShadow:"0 3px 12px rgba(79,110,247,.28)",
                                  "&:hover":{ boxShadow:"0 6px 20px rgba(79,110,247,.38)", transform:"scale(1.03)" } }}>
                            Book Now →
                          </Button>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {/* ── PROFILE ── */}
            {view === "profile" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Profile</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Your personal health information</Typography>
                </Box>
                <Card className="light-card" sx={{ p:4 }}>
                  <Box sx={{ display:"flex", alignItems:"center", gap:2.5, mb:3 }}>
                    <Avatar className="av-blue" sx={{ width:76, height:76, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 6px 20px rgba(79,110,247,.25)" }}>
                      {patient.name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:700, color:"#1a1f36" }}>{patient.name}</Typography>
                      <Typography sx={{ fontSize:".82rem", color:"#8892b0", mt:.5 }}>Patient Account · Active</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />
                  <Grid container spacing={3}>
                    {[
                      ["Full Name",     patient.name],
                      ["Gender",        patient.gender],
                      ["Date of Birth", patient.dob],
                      ["Contact",       patient.contact],
                      ["Age",           patient.age ? `${patient.age} years` : "—"],
                      ["Patient ID",    `#${patient.id}`],
                    ].map(([label, val]) => (
                      <Grid item xs={12} sm={6} key={label}>
                        <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1.1px", color:"#8892b0", fontWeight:600, mb:.6 }}>{label}</Typography>
                        <Typography sx={{ fontSize:".95rem", fontWeight:500, color:"#1a1f36" }}>{val || "—"}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}