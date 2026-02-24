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



import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";

export default function PatientDashboard() {
  const { user } = useContext(AuthContext);
  const userId = user?.id || localStorage.getItem("userId");
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    age: "",
    contact: "",
  });

  // 🔹 Dark TextField styling
  const darkField = {
    input: { color: "#fff" },
    label: { color: "#aaa" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#00bfff" },
      "&:hover fieldset": { borderColor: "#1e90ff" },
      "&.Mui-focused fieldset": { borderColor: "#00e5ff" },
    },
  };

  // 🔹 Fetch patient + doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await axios.get(
          `http://localhost:8080/patient/user/${userId}`
        );
        setPatient(patientRes.data);
      } catch (err) {
        // 404 means patient not created yet → show form
        if (err.response?.status !== 404) {
          setError("Failed to load patient.");
        }
      }

      try {
        const doctorRes = await axios.get("http://localhost:8080/doctor");
        setDoctors(doctorRes.data);
      } catch {
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
    else {
      setError("User ID missing.");
      setLoading(false);
    }
  }, [userId]);

  // 🔹 Auto age calculation
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
  };

  // 🔹 Form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      setForm({ ...form, dob: value, age: calculateAge(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 🔹 Create patient profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/patient", {
        ...form,
        user: { id: Number(userId) },
      });

      setPatient(res.data);
    } catch {
      setError("Failed to create patient profile.");
    }
  };

  // 🔹 Loading
  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  // 🔹 Error
  if (error)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  // 🔥 SHOW FORM IF PATIENT NOT CREATED
  if (!patient) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#020617,#020617,#0a1a2f)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <Paper
            sx={{
              p: 5,
              width: 420,
              backdropFilter: "blur(25px)",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 4,
              color: "#fff",
              boxShadow: "0 0 40px rgba(0,191,255,0.35)",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Create Patient Profile
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                margin="normal"
                onChange={handleChange}
                required
                sx={darkField}
              />

              <TextField
                select
                fullWidth
                label="Gender"
                name="gender"
                margin="normal"
                onChange={handleChange}
                required
                sx={darkField}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                name="dob"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                required
                sx={darkField}
              />

              <TextField
                fullWidth
                label="Age"
                name="age"
                margin="normal"
                value={form.age}
                InputProps={{ readOnly: true }}
                sx={darkField}
              />

              <TextField
                fullWidth
                label="Contact"
                name="contact"
                margin="normal"
                onChange={handleChange}
                required
                sx={darkField}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  background: "linear-gradient(45deg,#00bfff,#1e90ff)",
                  boxShadow: "0 0 20px rgba(0,191,255,0.7)",
                  fontWeight: "bold",
                }}
              >
                Save Profile
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Box>
    );
  }

  // 🔥 DASHBOARD VIEW
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #021024, #020617 60%)",
        color: "white",
        p: 4,
      }}
    >
      {/* Profile */}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card
            sx={{
              p: 5,
              borderRadius: 5,
              textAlign: "center",
              background:
                "linear-gradient(145deg, rgba(0,191,255,0.18), rgba(255,255,255,0.05))",
              backdropFilter: "blur(25px)",
              boxShadow: "0 0 60px rgba(0,191,255,0.35)",
              color: "white",
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                fontSize: 48,
                bgcolor: "#00bfff",
                margin: "0 auto",
              }}
            >
              {patient.name?.charAt(0)}
            </Avatar>

            <Typography variant="h4" sx={{ mt: 2 }}>
              {patient.name}
            </Typography>
            <Typography>Gender: {patient.gender}</Typography>
            <Typography>Age: {patient.age}</Typography>
            <Typography>Contact: {patient.contact}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Doctors */}
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 6, mb: 3, color: "#00e5ff" }}
      >
        Available Doctors
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {doctors.map((doc) => (
          <Grid item xs={12} md={4} key={doc.id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 4,
                  backdropFilter: "blur(20px)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                }}
              >
                <CardContent>
                  <Typography variant="h6">Dr. {doc.name}</Typography>
                  <Typography sx={{ color: "#00e5ff" }}>
                    {doc.specialization}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      navigate(`/book-appointment/${patient.id}/${doc.id}`)
                    }
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}