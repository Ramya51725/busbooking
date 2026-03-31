import React, { useState, useContext, useEffect } from "react";
import { Container, Typography, Paper, Button, Box, CircularProgress, Grid, TextField, MenuItem } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SeatContext } from "../context/SeatContext";
import api from "../api";

function SeatSelection() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { selectedSeats, setSelectedSeats, setSelectedBus, selectedBus, boardingPoint, setBoardingPoint, droppingPoint, setDroppingPoint } = useContext(SeatContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedSeats([]); setBoardingPoint(""); setDroppingPoint(""); // 1. Initial Reset
    const fetchBusDetails = async () => {
      try {
        const res = await api.get(`/buses/${params.get("busId")}`);
        setSelectedBus(res.data);
      } catch (err) { } finally { setLoading(false); }
    };
    fetchBusDetails();
  }, [params]);

  const toggleSeat = (id) => setSelectedSeats(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);

  if (loading) return <Box sx={{ textAlign: 'center', p: 10 }}><CircularProgress /></Box>;
  if (!selectedBus) return <Container sx={{ py: 6 }}><Typography color="error">Bus not found.</Typography></Container>;

  const isSleeper = selectedBus.type?.toLowerCase().includes("sleeper");
  const SeatBox = ({ id }) => {
    const isS = selectedSeats.includes(id);
    const isB = selectedBus.bookedSeats?.includes(id); // 3. Check Booked Status
    return (
      <Box onClick={() => !isB && toggleSeat(id)} sx={{
        width: isSleeper ? 80 : 45, height: isSleeper ? 120 : 45, borderRadius: 2, border: '2px solid',
        borderColor: isB ? '#e2e8f0' : isS ? '#2e7d32' : '#cbd5e1', bgcolor: isB ? '#f1f5f9' : isS ? '#2e7d32' : 'white',
        color: isS ? 'white' : isB ? '#94a3b8' : '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: isB ? 'not-allowed' : 'pointer', fontSize: 12, fontWeight: 'bold', transition: 'all 0.2s', position: 'relative',
        '&:hover': { transform: isB ? 'none' : 'scale(1.05)', borderColor: isB ? '' : '#2e7d32' }
      }}>
        {isB && <Box sx={{ position: 'absolute', width: '80%', height: '2px', bgcolor: '#cbd5e1', transform: 'rotate(45deg)' }} />}
        {isSleeper ? `B${id}` : id}
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="900" gutterBottom>Seat Selection {isSleeper ? '(Sleeper)' : '(Seater)'}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4, borderRadius: 4, bgcolor: '#f8fafc', textAlign: 'center' }}>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>Front of Bus</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3, alignItems: 'center' }}>
              {(() => {
                const total = Number(selectedBus.totalSeats || 32);
                const seatsPerRow = isSleeper ? 3 : 4;
                const rows = Math.ceil(total / seatsPerRow);
                let currentSeat = 1;
                const rowElements = [];

                for (let r = 0; r < rows; r++) {
                  const leftSeats = [];
                  const rightSeats = [];

                  // Left Side (1 seat for sleeper, 2 for seater)
                  const leftCount = isSleeper ? 1 : 2;
                  for (let i = 0; i < leftCount; i++) {
                    if (currentSeat <= total) {
                      const id = currentSeat++;
                      leftSeats.push(<SeatBox key={id} id={id} />);
                    }
                  }

                  // Right Side (always 2 seats)
                  for (let i = 0; i < 2; i++) {
                    if (currentSeat <= total) {
                      const id = currentSeat++;
                      rightSeats.push(<SeatBox key={id} id={id} />);
                    }
                  }

                  rowElements.push(
                    <Box key={r} sx={{ display: 'grid', gridTemplateColumns: isSleeper ? '1fr 40px 2fr' : '2fr 40px 2fr', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>{leftSeats}</Box>
                      <Box sx={{ width: 40 }} />
                      <Box sx={{ display: 'flex', gap: 1 }}>{rightSeats}</Box>
                    </Box>
                  );
                }
                return rowElements;
              })()}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 4, position: 'sticky', top: 100, height: 'fit-content' }}>
            <Typography variant="h6" fontWeight="bold">Booking Details</Typography>
            <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField select label="Boarding Point" fullWidth value={boardingPoint} onChange={e => setBoardingPoint(e.target.value)}>
                {selectedBus.boardingPoints?.map(pt => <MenuItem key={pt} value={pt}>{pt}</MenuItem>)}
              </TextField>
              <TextField select label="Dropping Point" fullWidth value={droppingPoint} onChange={e => setDroppingPoint(e.target.value)}>
                {selectedBus.droppingPoints?.map(pt => <MenuItem key={pt} value={pt}>{pt}</MenuItem>)}
              </TextField>
              <Box sx={{ p: 2, bgcolor: '#f1f5f9', borderRadius: 2 }}>
                <Typography variant="body2"><b>{selectedBus.busName}</b></Typography>
                <Typography variant="h5" color="success.main" fontWeight="900" sx={{ mt: 1 }}>₹{selectedSeats.length * (selectedBus.price || 0)}</Typography>
                <Typography variant="caption">{selectedSeats.length} Item(s) Selected</Typography>
              </Box>
            </Box>
            <Button fullWidth variant="contained" color="success" size="large" sx={{ py: 1.5, borderRadius: 3 }} disabled={!selectedSeats.length || !boardingPoint || !droppingPoint} onClick={() => navigate("/passenger")}>Proceed to Details</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SeatSelection;

// import React, { useState, useEffect, useContext } from "react";
// import {
//   Container, Typography, Paper, Button,
//   Box, CircularProgress, Grid, TextField, MenuItem
// } from "@mui/material";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { SeatContext } from "../context/SeatContext";
// import api from "../api";

// function SeatSelection() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   const {
//     selectedSeats, setSelectedSeats,
//     selectedBus, setSelectedBus,
//     boardingPoint, setBoardingPoint,
//     droppingPoint, setDroppingPoint
//   } = useContext(SeatContext);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const busId = params.get("busId");

//     setSelectedSeats([]);
//     setBoardingPoint("");
//     setDroppingPoint("");

//     if (!busId) {
//       setLoading(false);
//       return;
//     }

//     const getBus = async () => {
//       try {
//         const res = await api.get(`/buses/${busId}`);
//         const busData = res.data.data || res.data;
//         setSelectedBus(busData);
//       } catch (err) {
//         console.log(err);
//         setSelectedBus(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBus();
//   }, [params]);

//   const toggleSeat = (id) => {
//     setSelectedSeats((prev) =>
//       prev.includes(id)
//         ? prev.filter((s) => s !== id)
//         : [...prev, id]
//     );
//   };

//   if (loading) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!selectedBus || !selectedBus._id) {
//     return (
//       <Container sx={{ py: 5,}} className="ml-500px">
//         <Typography color="error">Bus not found</Typography>
//         </Container>
//     );
//   }

//   const isSleeper = selectedBus.type?.toLowerCase().includes("sleeper");

//   // 🎯 Seat UI
//   const Seat = ({ id }) => {
//     const isSelected = selectedSeats.includes(id);
//     const isBooked = selectedBus.bookedSeats?.includes(id);

//     return (
//       <Box
//         onClick={() => !isBooked && toggleSeat(id)}
//         sx={{
//           width: isSleeper ? 70 : 45,
//           height: isSleeper ? 90 : 45,
//           borderRadius: 2,
//           border: "2px solid",
//           borderColor: isBooked
//             ? "#e5e7eb"
//             : isSelected
//             ? "#16a34a"
//             : "#cbd5e1",
//           bgcolor: isBooked
//             ? "#f1f5f9"
//             : isSelected
//             ? "#16a34a"
//             : "white",
//           color: isSelected ? "white" : "#1e293b",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: isBooked ? "not-allowed" : "pointer",
//           transition: "0.2s",
//           "&:hover": {
//             transform: isBooked ? "none" : "scale(1.05)"
//           }
//         }}
//       >
//         {isSleeper ? `B${id}` : id}
//       </Box>
//     );
//   };

//   // 🎯 Layout Logic
//   const renderSeats = () => {
// const total = isSleeper ? 20 : 30;
//     let seatNumber = 1;
//     const rows = [];

//     while (seatNumber <= total) {
//       const left = [];
//       const right = [];

//       const leftCount = isSleeper ? 1 : 2;
//       const rightCount = 2;

//       for (let i = 0; i < leftCount; i++) {
//         if (seatNumber <= total) {
//           left.push(<Seat key={seatNumber} id={seatNumber} />);
//           seatNumber++;
//         }
//       }

//       for (let i = 0; i < rightCount; i++) {
//         if (seatNumber <= total) {
//           right.push(<Seat key={seatNumber} id={seatNumber} />);
//           seatNumber++;
//         }
//       }

//       rows.push(
//         <Box
//           key={seatNumber}
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             mb: 2
//           }}
//         >
//           <Box sx={{ display: "flex", gap: 1 }}>{left}</Box>
//           <Box sx={{ width: 40 }} />
//           <Box sx={{ display: "flex", gap: 1 }}>{right}</Box>
//         </Box>
//       );
//     }

//     return rows;
//   };

//   return (
//     <Container sx={{ py: 5 }}>
//       <Typography variant="h4" fontWeight="900" gutterBottom>
//         Select Your Seat
//       </Typography>

//       <Grid container spacing={4}>
//         {/* SEATS */}
//         <Grid item xs={12} md={7}>
//           <Paper sx={{ p: 4, borderRadius: 4, bgcolor: "#f8fafc" }}>
            
//             <Typography variant="caption">Front of Bus</Typography>

//             {/* Legend */}
//             <Box sx={{ display: "flex", gap: 3, my: 3 }}>
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Box sx={{ width: 20, height: 20, border: "2px solid #ccc" }} />
//                 <Typography variant="caption">Available</Typography>
//               </Box>

//               <Box display="flex" alignItems="center" gap={1}>
//                 <Box sx={{ width: 20, height: 20, bgcolor: "#16a34a" }} />
//                 <Typography variant="caption">Selected</Typography>
//               </Box>

//               <Box display="flex" alignItems="center" gap={1}>
//                 <Box sx={{ width: 20, height: 20, bgcolor: "#e5e7eb" }} />
//                 <Typography variant="caption">Booked</Typography>
//               </Box>
//             </Box>

//             {renderSeats()}
//           </Paper>
//         </Grid>

//         {/* BOOKING */}
//         <Grid item xs={12} md={5}>
//           <Paper sx={{ p: 4, borderRadius: 4, position: "sticky", top: 100 }}>
//             <Typography variant="h6" fontWeight="bold">
//               Booking Details
//             </Typography>

//             <Box mt={3} display="flex" flexDirection="column" gap={2}>
              
//               <TextField
//                 select
//                 label="Boarding"
//                 value={boardingPoint}
//                 onChange={(e) => setBoardingPoint(e.target.value)}
//               >
//                 {selectedBus.boardingPoints?.map((p) => (
//                   <MenuItem key={p} value={p}>{p}</MenuItem>
//                 ))}
//               </TextField>

//               <TextField
//                 select
//                 label="Dropping"
//                 value={droppingPoint}
//                 onChange={(e) => setDroppingPoint(e.target.value)}
//               >
//                 {selectedBus.droppingPoints?.map((p) => (
//                   <MenuItem key={p} value={p}>{p}</MenuItem>
//                 ))}
//               </TextField>

//               {/* Summary */}
//               <Box sx={{ p: 2, bgcolor: "#f1f5f9", borderRadius: 2 }}>
//                 <Typography variant="body2">Seats</Typography>
//                 <Typography fontWeight="bold">
//                   {selectedSeats.join(", ") || "None"}
//                 </Typography>

//                 <Typography variant="h5" color="green" fontWeight="bold" mt={1}>
//                   ₹{selectedSeats.length * (selectedBus.price || 0)}
//                 </Typography>
//               </Box>

//               <Button
//                 fullWidth
//                 variant="contained"
//                 size="large"
//                 sx={{ py: 1.5, borderRadius: 3, bgcolor: "#16a34a" }}
//                 disabled={
//                   !selectedSeats.length || !boardingPoint || !droppingPoint
//                 }
//                 onClick={() => navigate("/passenger")}
//               >
//                 Proceed to Booking
//               </Button>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// export default SeatSelection;