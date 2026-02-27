// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 🔹 Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersRes = await axios.get("http://localhost:8080/admin/users");
//         const appointmentsRes = await axios.get(
//           "http://localhost:8080/admin/appointments"
//         );

//         setUsers(usersRes.data);
//         setAppointments(appointmentsRes.data);
//       } catch (err) {
//         setError("Failed to load admin data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔹 Delete user
//   const deleteUser = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/admin/users/${id}`);
//       setUsers(users.filter((u) => u.id !== id));
//     } catch {
//       alert("Failed to delete user");
//     }
//   };

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

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top, #021024, #020617 60%)",
//         color: "white",
//         p: 4,
//       }}
//     >
//       {/* 🔹 Title */}
//       <Typography variant="h3" align="center" sx={{ mb: 5 }}>
//         Admin Dashboard
//       </Typography>

//       {/* 🔹 Users Section */}
//       <Typography variant="h5" sx={{ mb: 2, color: "#00e5ff" }}>
//         Users
//       </Typography>

//       <Paper sx={{ mb: 5, background: "rgba(255,255,255,0.05)" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#00e5ff" }}>ID</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Username</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Role</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell sx={{ color: "white" }}>{user.id}</TableCell>
//                 <TableCell sx={{ color: "white" }}>{user.username}</TableCell>
//                 <TableCell sx={{ color: "white" }}>{user.role}</TableCell>
//                 <TableCell>
//                   {user.role !== "ADMIN" && (
//                     <Button
//                       color="error"
//                       variant="contained"
//                       onClick={() => deleteUser(user.id)}
//                     >
//                       Delete
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* 🔹 Appointments Section */}
//       <Typography variant="h5" sx={{ mb: 2, color: "#00e5ff" }}>
//         Appointments
//       </Typography>

//       <Paper sx={{ background: "rgba(255,255,255,0.05)" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#00e5ff" }}>ID</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Patient</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Doctor</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Date</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {appointments.map((appt) => (
//               <TableRow key={appt.id}>
//                 <TableCell sx={{ color: "white" }}>{appt.id}</TableCell>
//                 <TableCell sx={{ color: "white" }}>
//                   {appt.patientName}
//                 </TableCell>
//                 <TableCell sx={{ color: "white" }}>
//                   {appt.doctorName}
//                 </TableCell>
//                 <TableCell sx={{ color: "white" }}>{appt.date}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }




// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
// } from "@mui/material";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 🔹 Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersRes = await axios.get("http://localhost:8080/admin/users");
//         const appointmentsRes = await axios.get(
//           "http://localhost:8080/admin/appointments"
//         );

//         setUsers(usersRes.data);
//         setAppointments(appointmentsRes.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load admin data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔹 Delete user
//   const deleteUser = async (id) => {
//     if (!window.confirm("Delete this user?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/admin/users/${id}`);
//       setUsers((prev) => prev.filter((u) => u.id !== id));
//     } catch (err) {
//       alert("Failed to delete user");
//     }
//   };

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

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#0f172a,#020617)",
//         color: "white",
//         p: 4,
//       }}
//     >
//       {/* 🔹 Title */}
//       <Typography variant="h3" align="center" sx={{ mb: 5 }}>
//         Admin Dashboard
//       </Typography>

//       {/* 🔹 USERS TABLE */}
//       <Typography variant="h5" sx={{ mb: 2, color: "#38bdf8" }}>
//         Users
//       </Typography>

//       <Paper sx={{ mb: 5, background: "#020617" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#38bdf8" }}>ID</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Username</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Role</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell sx={{ color: "white" }}>{user.id}</TableCell>
//                 <TableCell sx={{ color: "white" }}>{user.username}</TableCell>
//                 <TableCell sx={{ color: "white" }}>{user.role}</TableCell>
//                 <TableCell>
//                   {user.role !== "ADMIN" && (
//                     <Button
//                       variant="contained"
//                       color="error"
//                       size="small"
//                       onClick={() => deleteUser(user.id)}
//                     >
//                       Delete
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* 🔹 APPOINTMENTS TABLE */}
//       <Typography variant="h5" sx={{ mb: 2, color: "#38bdf8" }}>
//         Appointments
//       </Typography>

//       <Paper sx={{ background: "#020617" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#38bdf8" }}>ID</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Patient</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Doctor</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Date</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Time</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Status</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {appointments.map((appt) => (
//               <TableRow key={appt.id}>
//                 <TableCell sx={{ color: "white" }}>{appt.id}</TableCell>

//                 {/* ✅ FIXED: patient name */}
//                 <TableCell sx={{ color: "white" }}>
//                   {appt.patient?.name || "N/A"}
//                 </TableCell>

//                 {/* ✅ FIXED: doctor name */}
//                 <TableCell sx={{ color: "white" }}>
//                   {appt.doctor?.name || "N/A"}
//                 </TableCell>

//                 <TableCell sx={{ color: "white" }}>
//                   {appt.date || "N/A"}
//                 </TableCell>

//                 <TableCell sx={{ color: "white" }}>
//                   {appt.timeSlot || "N/A"}
//                 </TableCell>

//                 <TableCell sx={{ color: "white" }}>
//                   {appt.status || "N/A"}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Avatar,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Modal,
  IconButton,
} from "@mui/material";
import MenuIcon         from "@mui/icons-material/Menu";
import CloseIcon        from "@mui/icons-material/Close";
import LogoutIcon       from "@mui/icons-material/Logout";
import DashboardIcon    from "@mui/icons-material/Dashboard";
import PeopleIcon       from "@mui/icons-material/People";
import EventIcon        from "@mui/icons-material/Event";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon       from "@mui/icons-material/Person";
import DeleteIcon       from "@mui/icons-material/Delete";
import ShieldIcon       from "@mui/icons-material/Shield";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BASE = "http://localhost:8080";

// ── Styles ─────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
  body { font-family: 'Outfit', sans-serif !important; }

  /* overlay */
  .adm-overlay {
    position: fixed; inset: 0;
    background: rgba(26,31,54,.18); backdrop-filter: blur(3px);
    z-index: 199; animation: admIn .2s ease;
  }
  @keyframes admIn { from{opacity:0}to{opacity:1} }

  /* sidebar */
  .adm-sidebar {
    width: 264px; background: #fff;
    border-right: 1px solid #e8ecf5;
    display: flex; flex-direction: column;
    padding: 20px 14px 24px;
    position: fixed; top: 0; left: 0;
    height: 100vh; z-index: 200;
    box-shadow: 4px 0 28px rgba(79,110,247,.10);
    transition: transform .28s cubic-bezier(.22,1,.36,1);
  }
  .adm-sidebar.closed { transform: translateX(-100%); }
  .adm-sidebar.open   { transform: translateX(0); }

  .adm-sidebar-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 6px 20px;
  }
  .adm-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 700; color: #4f6ef7;
    display: flex; align-items: center; gap: 9px;
  }
  .adm-logo-icon {
    width: 32px; height: 32px; border-radius: 9px;
    background: linear-gradient(135deg, #e11d48, #f43f5e);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: .85rem; flex-shrink: 0;
  }
  .adm-logo-accent { color: #e11d48; }

  .adm-close-btn {
    width: 30px; height: 30px; border-radius: 8px;
    background: #f5f7ff; border: 1px solid #e8ecf5;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #8892b0; transition: all .15s;
  }
  .adm-close-btn:hover { background: #fff1f3; color: #e11d48; border-color: rgba(225,29,72,.2); }

  .adm-nav-label {
    font-size: .67rem; text-transform: uppercase; letter-spacing: 1.2px;
    color: #b0b8d0; font-weight: 600; padding: 0 10px; margin: 4px 0 6px;
  }
  .adm-nav-item {
    display: flex; align-items: center; gap: 11px;
    padding: 10px 12px; border-radius: 11px; cursor: pointer;
    font-size: .875rem; font-weight: 500; color: #4a5278;
    transition: all .18s ease; border: 1px solid transparent;
    margin-bottom: 3px; user-select: none;
  }
  .adm-nav-item:hover { background: #fff1f3; color: #e11d48; }
  .adm-nav-item.active {
    background: #fff1f3; color: #e11d48; font-weight: 600;
    border-color: rgba(225,29,72,.18);
  }
  .adm-nav-item.active .adm-nav-icon { background: #e11d48 !important; color: #fff !important; }
  .adm-nav-icon {
    width: 30px; height: 30px; border-radius: 8px;
    background: #f0f2f8; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all .18s; color: #4a5278;
  }
  .adm-sidebar-spacer { flex: 1; }

  .adm-user-card {
    display: flex; align-items: center; gap: 11px;
    padding: 12px; border-radius: 14px;
    background: #fff1f3; border: 1px solid rgba(225,29,72,.12); margin-bottom: 10px;
  }
  .adm-user-av {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #e11d48, #f43f5e);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 1rem; flex-shrink: 0;
  }

  /* topbar */
  .adm-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 24px; background: #fff;
    border-bottom: 1px solid #e8ecf5;
    box-shadow: 0 1px 8px rgba(79,110,247,.07);
    position: sticky; top: 0; z-index: 100;
  }
  .adm-topbar-left { display: flex; align-items: center; gap: 14px; }
  .adm-hamburger {
    width: 38px; height: 38px; border-radius: 10px;
    background: #f5f7ff; border: 1px solid #e8ecf5;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #e11d48; transition: all .18s;
  }
  .adm-hamburger:hover { background: #fff1f3; border-color: rgba(225,29,72,.2); }

  /* blobs */
  .adm-blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
  .adm-blob-1 { width:500px;height:500px;background:rgba(225,29,72,.05);top:-150px;right:-80px; }
  .adm-blob-2 { width:380px;height:380px;background:rgba(79,110,247,.05);bottom:-80px;left:60px; }
  .adm-blob-3 { width:300px;height:300px;background:rgba(217,119,6,.04);top:40%;left:50%;transform:translateX(-50%); }

  /* hero */
  .adm-hero {
    background: linear-gradient(135deg,#fff 55%,#fff1f3 100%) !important;
    border: 1px solid #fce7f3 !important; border-radius: 20px !important;
    box-shadow: 0 2px 16px rgba(225,29,72,.08) !important;
    padding: 36px 40px !important; position: relative; overflow: hidden;
    display: flex; align-items: center; gap: 28px; margin-bottom: 28px;
  }
  .adm-hero::after { content:'⬡'; position:absolute; right:40px; bottom:0; font-size:6rem; color:rgba(225,29,72,.04); line-height:1; pointer-events:none; }

  /* stat cards */
  .adm-stat {
    background: #fff !important; border: 1px solid #e8ecf5 !important;
    border-radius: 18px !important; box-shadow: 0 1px 6px rgba(0,0,0,.05) !important;
    padding: 24px 28px; position: relative; overflow: hidden;
    transition: box-shadow .2s, transform .2s !important;
  }
  .adm-stat:hover { box-shadow: 0 6px 24px rgba(0,0,0,.10) !important; transform: translateY(-2px); }
  .adm-stat-value { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; line-height:1; }
  .adm-stat-label { font-size:.72rem; color:#8892b0; text-transform:uppercase; letter-spacing:1px; font-weight:600; margin-bottom:8px; }
  .adm-stat-icon  { position:absolute; right:20px; top:50%; transform:translateY(-50%); font-size:2.6rem; opacity:.06; }

  /* section heading */
  .adm-sec-heading {
    font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700; color:#1a1f36;
    display:flex; align-items:center; gap:12px; margin-bottom:16px;
  }
  .adm-sec-heading::after { content:''; flex:1; height:1px; background:#e8ecf5; }

  /* cards */
  .adm-card {
    background: #fff !important; border: 1px solid #e8ecf5 !important;
    border-radius: 16px !important;
    box-shadow: 0 1px 4px rgba(0,0,0,.05) !important;
    transition: box-shadow .22s, transform .22s !important;
  }
  .adm-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.09) !important; transform:translateY(-2px); }

  /* user row card */
  .adm-user-row {
    background: #fff !important; border: 1px solid #e8ecf5 !important;
    border-radius: 14px !important;
    box-shadow: 0 1px 4px rgba(0,0,0,.04) !important;
    transition: box-shadow .2s, transform .2s, border-color .2s !important;
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px; margin-bottom: 10px;
  }
  .adm-user-row:hover { box-shadow: 0 4px 18px rgba(225,29,72,.10) !important; border-color: #fce7f3 !important; transform:translateY(-1px); }

  /* appointment row */
  .adm-appt-row {
    background: #fff !important; border: 1px solid #e8ecf5 !important;
    border-left: 4px solid #e8ecf5 !important; border-radius: 14px !important;
    box-shadow: 0 1px 4px rgba(0,0,0,.04) !important;
    transition: box-shadow .2s, transform .2s !important;
    padding: 16px 20px; margin-bottom: 10px;
    display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
  }
  .adm-appt-row.approved { border-left-color: #059669 !important; }
  .adm-appt-row.pending  { border-left-color: #d97706 !important; }
  .adm-appt-row.rejected { border-left-color: #e11d48 !important; }
  .adm-appt-row:hover { box-shadow: 0 4px 18px rgba(0,0,0,.08) !important; transform:translateY(-1px); }

  /* danger zone */
  .adm-danger-box {
    background: #fff1f3; border: 1.5px solid rgba(225,29,72,.2);
    border-radius: 18px; padding: 28px 32px;
  }

  /* confirm modal */
  .adm-modal-box {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 90%; max-width: 420px;
    background: #fff; border-radius: 20px;
    border: 1px solid #e8ecf5;
    box-shadow: 0 20px 60px rgba(225,29,72,.16);
    padding: 36px; outline: none;
  }

  /* role badge */
  .role-admin   { background:#fff1f3!important; color:#e11d48!important; border-color:rgba(225,29,72,.2)!important; }
  .role-doctor  { background:#eef1fe!important; color:#4f6ef7!important; border-color:rgba(79,110,247,.2)!important; }
  .role-patient { background:#ecfdf5!important; color:#059669!important; border-color:rgba(5,150,105,.2)!important; }

  .av-red    { background: linear-gradient(135deg,#e11d48,#f43f5e) !important; }
  .av-blue   { background: linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
  .av-green  { background: linear-gradient(135deg,#059669,#34d399) !important; }
  .av-amber  { background: linear-gradient(135deg,#d97706,#fbbf24) !important; }
  .av-violet { background: linear-gradient(135deg,#7c3aed,#a78bfa) !important; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
  .fu { animation: fadeUp .38s cubic-bezier(.22,1,.36,1) both; }
`;

if (!document.getElementById("adm-styles")) {
  const s = document.createElement("style");
  s.id = "adm-styles";
  s.textContent = css;
  document.head.appendChild(s);
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const avColors = ["av-blue","av-violet","av-green","av-amber","av-red"];
const getAv    = (i) => avColors[i % avColors.length];

const roleClass = (role) => {
  if (!role) return "";
  const r = role.toUpperCase();
  if (r.includes("ADMIN"))   return "role-admin";
  if (r.includes("DOCTOR"))  return "role-doctor";
  return "role-patient";
};

const statusColor = (s) => {
  switch ((s || "").toUpperCase()) {
    case "APPROVED": return { bg:"#ecfdf5", color:"#059669", border:"rgba(5,150,105,.2)" };
    case "REJECTED": return { bg:"#fff1f3", color:"#e11d48", border:"rgba(225,29,72,.2)" };
    default:         return { bg:"#fffbeb", color:"#d97706", border:"rgba(217,119,6,.2)" };
  }
};

// ── Sub-components ─────────────────────────────────────────────────────────────
function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <div className={`adm-nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <div className="adm-nav-icon">{icon}</div>
      <span style={{ flex:1 }}>{label}</span>
      {badge > 0 && (
        <span style={{ background:"#e11d48", color:"#fff", fontSize:".65rem", fontWeight:700,
                       padding:"1px 6px", borderRadius:"20px", minWidth:18, textAlign:"center" }}>
          {badge}
        </span>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color, delay = 0 }) {
  return (
    <div className="adm-stat fu" style={{ animationDelay:`${delay}ms` }}>
      <div className="adm-stat-label">{label}</div>
      <div className="adm-stat-value" style={{ color }}>{value}</div>
      <div className="adm-stat-icon">{icon}</div>
    </div>
  );
}

// ── Confirm Modal ──────────────────────────────────────────────────────────────
function ConfirmModal({ open, title, message, onConfirm, onCancel, danger = true }) {
  return (
    <Modal open={open} onClose={onCancel}>
      <Box className="adm-modal-box">
        <Box sx={{ display:"flex", alignItems:"center", gap:2, mb:2 }}>
          <Box sx={{ width:44, height:44, borderRadius:"12px",
                     background: danger ? "#fff1f3" : "#eef1fe",
                     display:"flex", alignItems:"center", justifyContent:"center" }}>
            {danger
              ? <WarningAmberIcon sx={{ color:"#e11d48", fontSize:24 }} />
              : <ShieldIcon       sx={{ color:"#4f6ef7", fontSize:24 }} />
            }
          </Box>
          <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#1a1f36" }}>
            {title}
          </Typography>
        </Box>
        <Typography sx={{ fontSize:".9rem", color:"#4a5278", mb:3, lineHeight:1.6 }}>{message}</Typography>
        <Box sx={{ display:"flex", gap:1.5 }}>
          <Button onClick={onCancel} variant="outlined" fullWidth
            sx={{ borderColor:"#e8ecf5", color:"#4a5278", borderRadius:"10px",
                  textTransform:"none", fontWeight:600, "&:hover":{ background:"#f5f7ff" } }}>
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained" fullWidth
            sx={{ background: danger ? "linear-gradient(135deg,#e11d48,#f43f5e)" : "linear-gradient(135deg,#4f6ef7,#818cf8)",
                  borderRadius:"10px", textTransform:"none", fontWeight:600,
                  boxShadow: danger ? "0 3px 12px rgba(225,29,72,.28)" : "0 3px 12px rgba(79,110,247,.28)" }}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();

  // ── State ──
  const [users,        setUsers]        = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors,      setDoctors]      = useState([]);
  const [patients,     setPatients]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [view,         setView]         = useState("dashboard");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);

  // Confirm modal state
  const [confirm, setConfirm] = useState({ open:false, title:"", message:"", onConfirm:null, danger:true });

  // ── UNCHANGED fetch (same endpoints as your controller) ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uRes, aRes, dRes, pRes] = await Promise.all([
          axios.get(`${BASE}/admin/users`),
          axios.get(`${BASE}/admin/appointments`),
          axios.get(`${BASE}/admin/doctors`),
          axios.get(`${BASE}/admin/patients`),
        ]);
        setUsers(uRes.data);
        setAppointments(aRes.data);
        setDoctors(dRes.data);
        setPatients(pRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── UNCHANGED: delete user ──
  const deleteUser = (id) => {
    setConfirm({
      open: true,
      title: "Delete User",
      message: "This will permanently delete the user and all associated data. This cannot be undone.",
      danger: true,
      onConfirm: async () => {
        try {
          await axios.delete(`${BASE}/admin/users/${id}`);
          setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch { alert("Failed to delete user"); }
        closeConfirm();
      },
    });
  };

  // ── UNCHANGED: delete appointment ──
  const deleteAppointment = (id) => {
    setConfirm({
      open: true,
      title: "Delete Appointment",
      message: "Are you sure you want to delete this appointment?",
      danger: true,
      onConfirm: async () => {
        try {
          await axios.delete(`${BASE}/admin/appointments/${id}`);
          setAppointments((prev) => prev.filter((a) => a.id !== id));
        } catch { alert("Failed to delete appointment"); }
        closeConfirm();
      },
    });
  };

  // ── UNCHANGED: update user role ──
  const updateRole = async (id, role) => {
    try {
      const res = await axios.put(`${BASE}/admin/users/${id}/role`, null, { params: { role } });
      setUsers((prev) => prev.map((u) => (u.id === id ? res.data : u)));
    } catch { alert("Failed to update role"); }
  };

  // ── UNCHANGED: clearAll ──
  const clearAll = () => {
    setConfirm({
      open: true,
      title: "Clear All Data",
      message: "⚠️ This will permanently delete ALL users, doctors, patients, and appointments from the database. This action CANNOT be undone.",
      danger: true,
      onConfirm: async () => {
        try {
          await axios.delete(`${BASE}/admin/clearAll`);
          setUsers([]); setAppointments([]); setDoctors([]); setPatients([]);
        } catch { alert("Failed to clear data"); }
        closeConfirm();
      },
    });
  };

  const closeConfirm = () => setConfirm((c) => ({ ...c, open:false }));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleNavClick = (key) => { setView(key); setSidebarOpen(false); };

  // ── Derived stats ──
  const pendingCount  = appointments.filter((a) => a.status === "PENDING").length;
  const approvedCount = appointments.filter((a) => a.status === "APPROVED").length;
  const doctorCount   = users.filter((u) => u.role?.toUpperCase().includes("DOCTOR")).length;
  const patientCount  = users.filter((u) => u.role?.toUpperCase().includes("PATIENT")).length;

  const menuItems = [
    { key:"dashboard",    label:"Dashboard",    icon:<DashboardIcon     sx={{ fontSize:18 }} /> },
    { key:"users",        label:"Users",        icon:<PeopleIcon        sx={{ fontSize:18 }} />, badge: users.length },
    { key:"appointments", label:"Appointments", icon:<EventIcon         sx={{ fontSize:18 }} />, badge: pendingCount },
    { key:"doctors",      label:"Doctors",      icon:<LocalHospitalIcon sx={{ fontSize:18 }} /> },
    { key:"patients",     label:"Patients",     icon:<PersonIcon        sx={{ fontSize:18 }} /> },
    { key:"danger",       label:"System",       icon:<ShieldIcon        sx={{ fontSize:18 }} /> },
  ];

  // ── Loading / Error ────────────────────────────────────────────────────────
  if (loading) return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
      <CircularProgress sx={{ color:"#e11d48" }} />
    </Box>
  );
  if (error) return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
      <div className="adm-blob adm-blob-1" />
      <div className="adm-blob adm-blob-2" />
      <div className="adm-blob adm-blob-3" />

      {sidebarOpen && <div className="adm-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <div className={`adm-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="adm-sidebar-top">
          <div className="adm-logo">
            <div className="adm-logo-icon">⬡</div>
            Med<span className="adm-logo-accent">Vault</span>
          </div>
          <div className="adm-close-btn" onClick={() => setSidebarOpen(false)}>
            <CloseIcon sx={{ fontSize:16 }} />
          </div>
        </div>

        <div className="adm-nav-label">Admin Panel</div>
        {menuItems.map((item) => (
          <NavItem key={item.key} icon={item.icon} label={item.label}
            active={view === item.key} badge={item.badge}
            onClick={() => handleNavClick(item.key)} />
        ))}

        <div className="adm-sidebar-spacer" />

        <div className="adm-user-card">
          <div className="adm-user-av">⬡</div>
          <Box>
            <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>Administrator</Typography>
            <Typography sx={{ fontSize:".72rem", color:"#e11d48", fontWeight:500 }}>Full Access</Typography>
          </Box>
        </div>

        <button onClick={handleLogout}
          style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11,
                   cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48",
                   border:"1px solid transparent", background:"none", width:"100%",
                   fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
          onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.borderColor="transparent"; }}>
          <div className="adm-nav-icon" style={{ background:"#fff1f3", color:"#e11d48" }}>
            <LogoutIcon sx={{ fontSize:16 }} />
          </div>
          Sign Out
        </button>
      </div>

      {/* ── Top bar ── */}
      <div className="adm-topbar">
        <div className="adm-topbar-left">
          <div className="adm-hamburger" onClick={() => setSidebarOpen(true)}>
            <MenuIcon sx={{ fontSize:20 }} />
          </div>
          <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#1a1f36" }}>
            Med<span style={{ color:"#e11d48" }}>Vault</span>{" "}
            <span style={{ fontSize:".85rem", color:"#8892b0", fontFamily:"'Outfit',sans-serif", fontWeight:400 }}>Admin</span>
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
            exit={{ opacity:0, y:-20 }} transition={{ duration:0.28 }}>

            {/* ────────── DASHBOARD ────────── */}
            {view === "dashboard" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
                    Admin Dashboard 🛡️
                  </Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
                    Full system overview — manage users, appointments & data
                  </Typography>
                </Box>

                {/* Hero */}
                <div className="adm-hero">
                  <Avatar className="av-red"
                    sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem",
                          boxShadow:"0 8px 24px rgba(225,29,72,.3)", flexShrink:0 }}>
                    ⬡
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>
                      MedVault Control Center
                    </Typography>
                    <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>
                      You have full administrative access to all system resources
                    </Typography>
                    <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
                      {[`👥 ${users.length} Users`, `📅 ${appointments.length} Appointments`, `🏥 ${doctors.length} Doctors`].map((v, i) => (
                        <Chip key={i} label={v} size="small"
                          sx={{ background:"#fff1f3", color:"#e11d48", border:"1px solid rgba(225,29,72,.15)", fontWeight:500, fontSize:".75rem" }} />
                      ))}
                    </Box>
                  </Box>
                </div>

                {/* Stat grid */}
                <Grid container spacing={2.5} sx={{ mb:4 }}>
                  <Grid item xs={6} sm={3}><StatCard label="Total Users"    value={users.length}        icon="👥" color="#e11d48" delay={0}   /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Doctors"        value={doctorCount}         icon="🏥" color="#4f6ef7" delay={60}  /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Patients"       value={patientCount}        icon="🧑" color="#059669" delay={120} /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Appointments"   value={appointments.length} icon="📅" color="#d97706" delay={180} /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Pending"        value={pendingCount}        icon="⏳" color="#d97706" delay={240} /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Approved"       value={approvedCount}       icon="✓"  color="#059669" delay={300} /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Rejected"       value={appointments.length - pendingCount - approvedCount} icon="✕" color="#e11d48" delay={360} /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Admin Users"    value={users.filter((u) => u.role?.toUpperCase().includes("ADMIN")).length} icon="🛡️" color="#7c3aed" delay={420} /></Grid>
                </Grid>

                {/* Recent users */}
                <div className="adm-sec-heading">Recent Users</div>
                {users.slice(0, 5).map((u, i) => (
                  <motion.div key={u.id} whileHover={{ scale:1.01 }}>
                    <div className="adm-user-row">
                      <Avatar className={getAv(i)} sx={{ width:38, height:38, borderRadius:"10px", fontSize:".95rem", fontWeight:700, flexShrink:0 }}>
                        {u.username?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex:1 }}>
                        <Typography sx={{ fontWeight:600, fontSize:".9rem", color:"#1a1f36" }}>{u.username}</Typography>
                        <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>ID #{u.id}</Typography>
                      </Box>
                      <Chip label={u.role} size="small" className={roleClass(u.role)}
                        sx={{ border:"1px solid", fontWeight:600, fontSize:".72rem" }} />
                    </div>
                  </motion.div>
                ))}
                {users.length > 5 && (
                  <Typography sx={{ fontSize:".8rem", color:"#4f6ef7", cursor:"pointer", mt:1, fontWeight:500 }}
                    onClick={() => handleNavClick("users")}>
                    View all {users.length} users →
                  </Typography>
                )}
              </>
            )}

            {/* ────────── USERS ────────── */}
            {view === "users" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Users</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{users.length} registered accounts</Typography>
                </Box>

                {users.length === 0 ? (
                  <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
                    <Typography sx={{ fontSize:"2.5rem", mb:1 }}>👥</Typography>
                    <Typography sx={{ fontWeight:500 }}>No users found</Typography>
                  </Box>
                ) : (
                  users.map((u, i) => (
                    <motion.div key={u.id} whileHover={{ scale:1.005 }}>
                      <div className="adm-user-row">
                        <Avatar className={getAv(i)} sx={{ width:44, height:44, borderRadius:"13px", fontSize:"1.1rem", fontWeight:700, flexShrink:0 }}>
                          {u.username?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box sx={{ flex:1, minWidth:0 }}>
                          <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>{u.username}</Typography>
                          <Typography sx={{ fontSize:".75rem", color:"#8892b0" }}>ID #{u.id}</Typography>
                        </Box>
                        <Chip label={u.role} size="small" className={roleClass(u.role)}
                          sx={{ border:"1px solid", fontWeight:600, fontSize:".72rem", flexShrink:0 }} />

                        {/* Role change buttons */}
                        {u.role?.toUpperCase() !== "ROLE_ADMIN" && (
                          <Box sx={{ display:"flex", gap:.75, flexShrink:0 }}>
                            {["ROLE_PATIENT","ROLE_DOCTOR"].map((r) => (
                              <Button key={r} size="small" onClick={() => updateRole(u.id, r)}
                                disabled={u.role === r}
                                sx={{ borderRadius:"8px", textTransform:"none", fontSize:".72rem", fontWeight:600,
                                      minWidth:0, px:1.2, py:.5,
                                      background: u.role === r ? "#f0f2f8" : "#f5f7ff",
                                      color: u.role === r ? "#8892b0" : "#4a5278",
                                      border:"1px solid #e8ecf5",
                                      "&:hover":{ background:"#eef1fe", color:"#4f6ef7" } }}>
                                {r === "ROLE_PATIENT" ? "Patient" : "Doctor"}
                              </Button>
                            ))}
                          </Box>
                        )}

                        {/* Delete */}
                        {!u.role?.toUpperCase().includes("ADMIN") && (
                          <IconButton size="small" onClick={() => deleteUser(u.id)}
                            sx={{ color:"#e11d48", background:"#fff1f3", borderRadius:"9px",
                                  "&:hover":{ background:"#fce7f3" }, flexShrink:0 }}>
                            <DeleteIcon sx={{ fontSize:17 }} />
                          </IconButton>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </>
            )}

            {/* ────────── APPOINTMENTS ────────── */}
            {view === "appointments" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Appointments</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
                    {appointments.length} total · {pendingCount} pending · {approvedCount} approved
                  </Typography>
                </Box>

                {appointments.length === 0 ? (
                  <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
                    <Typography sx={{ fontSize:"2.5rem", mb:1 }}>📅</Typography>
                    <Typography sx={{ fontWeight:500 }}>No appointments found</Typography>
                  </Box>
                ) : (
                  appointments.map((appt) => {
                    const st = (appt.status || "pending").toLowerCase();
                    const sc = statusColor(appt.status);
                    return (
                      <motion.div key={appt.id} whileHover={{ scale:1.005 }}>
                        <div className={`adm-appt-row ${st}`}>
                          {/* ID */}
                          <Typography sx={{ fontSize:".75rem", color:"#8892b0", fontWeight:600, minWidth:36 }}>
                            #{appt.id}
                          </Typography>

                          {/* Patient */}
                          <Box sx={{ flex:1, minWidth:0 }}>
                            <Typography sx={{ fontWeight:600, fontSize:".88rem", color:"#1a1f36", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                              {appt.patient?.name || "N/A"}
                            </Typography>
                            <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>Patient</Typography>
                          </Box>

                          {/* Doctor */}
                          <Box sx={{ flex:1, minWidth:0 }}>
                            <Typography sx={{ fontWeight:600, fontSize:".88rem", color:"#1a1f36", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                              Dr. {appt.doctor?.name || "N/A"}
                            </Typography>
                            <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>Doctor</Typography>
                          </Box>

                          {/* Date & time */}
                          <Box sx={{ textAlign:"center", flexShrink:0 }}>
                            <Typography sx={{ fontSize:".82rem", fontWeight:500, color:"#1a1f36" }}>{appt.date || "—"}</Typography>
                            <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>{appt.timeSlot || "—"}</Typography>
                          </Box>

                          {/* Status */}
                          <Chip label={appt.status || "PENDING"} size="small"
                            sx={{ background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`, fontWeight:600, fontSize:".72rem", flexShrink:0 }} />

                          {/* Delete */}
                          <IconButton size="small" onClick={() => deleteAppointment(appt.id)}
                            sx={{ color:"#e11d48", background:"#fff1f3", borderRadius:"9px",
                                  "&:hover":{ background:"#fce7f3" }, flexShrink:0 }}>
                            <DeleteIcon sx={{ fontSize:17 }} />
                          </IconButton>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </>
            )}

            {/* ────────── DOCTORS ────────── */}
            {view === "doctors" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Doctors</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{doctors.length} registered doctors</Typography>
                </Box>
                {doctors.length === 0 ? (
                  <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
                    <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🏥</Typography>
                    <Typography sx={{ fontWeight:500 }}>No doctors found</Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2.5}>
                    {doctors.map((doc, i) => (
                      <Grid item xs={12} sm={6} md={4} key={doc.id}>
                        <motion.div whileHover={{ scale:1.03 }}>
                          <Card className="adm-card">
                            <CardContent sx={{ p:"24px !important" }}>
                              <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
                                <Avatar className="av-blue" sx={{ width:50, height:50, borderRadius:"14px", fontSize:"1.2rem", fontWeight:700 }}>
                                  {doc.name?.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>Dr. {doc.name}</Typography>
                                  <Typography sx={{ fontSize:".75rem", color:"#4f6ef7", fontWeight:500 }}>{doc.specialization}</Typography>
                                </Box>
                              </Box>
                              <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
                              <Typography sx={{ fontSize:".8rem", color:"#4a5278", mb:.5 }}>📞 {doc.contact || "—"}</Typography>
                              <Typography sx={{ fontSize:".8rem", color:"#4a5278" }}>🏥 {doc.hospital || "—"}</Typography>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* ────────── PATIENTS ────────── */}
            {view === "patients" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Patients</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{patients.length} registered patients</Typography>
                </Box>
                {patients.length === 0 ? (
                  <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
                    <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🧑</Typography>
                    <Typography sx={{ fontWeight:500 }}>No patients found</Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2.5}>
                    {patients.map((pt, i) => (
                      <Grid item xs={12} sm={6} md={4} key={pt.id}>
                        <motion.div whileHover={{ scale:1.03 }}>
                          <Card className="adm-card">
                            <CardContent sx={{ p:"24px !important" }}>
                              <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
                                <Avatar className={getAv(i)} sx={{ width:50, height:50, borderRadius:"14px", fontSize:"1.2rem", fontWeight:700 }}>
                                  {pt.name?.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{pt.name}</Typography>
                                  <Typography sx={{ fontSize:".75rem", color:"#059669", fontWeight:500 }}>{pt.gender} · Age {pt.age}</Typography>
                                </Box>
                              </Box>
                              <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
                              <Typography sx={{ fontSize:".8rem", color:"#4a5278", mb:.5 }}>📞 {pt.contact || "—"}</Typography>
                              <Typography sx={{ fontSize:".8rem", color:"#4a5278" }}>🎂 {pt.dob || "—"}</Typography>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* ────────── SYSTEM / DANGER ZONE ────────── */}
            {view === "danger" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
                    System Settings
                  </Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
                    Administrative controls — proceed with caution
                  </Typography>
                </Box>

                {/* Stats summary */}
                <Grid container spacing={2.5} sx={{ mb:4 }}>
                  <Grid item xs={6} sm={3}><StatCard label="Users"        value={users.length}        icon="👥" color="#4f6ef7" /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Doctors"      value={doctors.length}      icon="🏥" color="#4f6ef7" /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Patients"     value={patients.length}     icon="🧑" color="#059669" /></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Appointments" value={appointments.length} icon="📅" color="#d97706" /></Grid>
                </Grid>

                {/* Danger zone */}
                <div className="adm-danger-box">
                  <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
                    <WarningAmberIcon sx={{ color:"#e11d48", fontSize:26 }} />
                    <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#e11d48" }}>
                      Danger Zone
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize:".875rem", color:"#4a5278", mb:3, lineHeight:1.7 }}>
                    The actions below are <strong>irreversible</strong>. Clearing all data will remove every user, doctor, patient, and appointment from the database permanently.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={clearAll}
                    sx={{ background:"linear-gradient(135deg,#e11d48,#f43f5e)", borderRadius:"12px",
                          textTransform:"none", fontWeight:700, fontSize:".9rem",
                          boxShadow:"0 4px 16px rgba(225,29,72,.35)", px:3, py:1.2,
                          "&:hover":{ boxShadow:"0 6px 24px rgba(225,29,72,.45)" } }}>
                    Clear All Data
                  </Button>
                </div>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </Box>

      {/* ── Confirm Modal ── */}
      <ConfirmModal
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        danger={confirm.danger}
        onConfirm={confirm.onConfirm}
        onCancel={closeConfirm}
      />
    </Box>
  );
}