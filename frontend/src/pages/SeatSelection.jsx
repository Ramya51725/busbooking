import React, { useState } from "react";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SeatGrid from "../layouts/SeatsGrid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SeatSelection() {

  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getSeatPrice = (seatId) => {
    return seatId <= 10 ? 1200 : 600;
  };

  const baseFare = selectedSeats.reduce(
    (sum, seat) => sum + getSeatPrice(seat),
    0
  );

  const tax = selectedSeats.length ? 150 : 0;
  const total = baseFare + tax;

  const toggleSeat = (id) =>
    setSelectedSeats((p) =>
      p.includes(id) ? p.filter((s) => s !== id) : [...p, id]
    );

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>

        <Box sx={{ display: "flex", alignItems: "center", mb: 6, gap: 3 }}>
          <Button
            onClick={() => navigate(-1)}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: "white",
              border: "1px solid #e2e8f0"
            }}
          >
            <ArrowBackIcon/>
          </Button>

          <Box>
            <Typography variant="h4" fontWeight={800}>
              Select Your Seats
            </Typography>
            <Typography color="#64748b">
              Express Travels • AC Sleeper (2+1) • Mumbai to Pune
            </Typography>
          </Box>
        </Box>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="md:col-span-2">
            <Paper className="p-8 search-card" sx={{ borderRadius: 3 }}>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 4, mb: 6 }}>
                {[
                  { label: "Available", border: "2px solid #cbd5e1" },
                  { label: "Booked", bg: "#e2e8f0" },
                  { label: "Selected", bg: "#2563eb" }
                ].map((l, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        mr: 1,
                        borderRadius: 1,
                        border: l.border,
                        bgcolor: l.bg
                      }}
                    />
                    <Typography variant="body2">{l.label}</Typography>
                  </Box>
                ))}
              </Box>

              <SeatGrid selected={selectedSeats} toggle={toggleSeat} />

            </Paper>
          </div>

          <div>
            <Paper className="p-8" sx={{ borderRadius: 3 }}>

              <Typography variant="h6">Booking Summary</Typography>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Typography>Total Seats</Typography>
                <Typography fontWeight={800}>
                  {selectedSeats.length}
                </Typography>
              </Box>

              {!!selectedSeats.length && (
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedSeats.map((s) => (
                    <Box
                      key={s}
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 5,
                        fontSize: ".8rem",
                        fontWeight: 700,
                        bgcolor: "#eff6ff",
                        color: "#2563eb"
                      }}
                    >
                      Seat {s} ({s <= 10 ? "Sleeper" : "Seater"})
                    </Box>
                  ))}
                </Box>
              )}

              <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <Typography>Base Fare</Typography>
                <Typography>₹{baseFare}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Tax & Fees</Typography>
                <Typography>₹{tax}</Typography>
              </Box>

              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#2563eb",
                  color: "white"
                }}
              >
                <Typography>Total Payable</Typography>
                <Typography variant="h4" fontWeight={800}>
                  ₹{total}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                disabled={!selectedSeats.length}
                onClick={() => navigate("/passenger")}
                sx={{
                  mt: 3,
                  py: 2,
                  borderRadius: 3,
                  fontWeight: 700,
                  background: "linear-gradient(135deg,#f59e0b,#d97706)"
                }}
              >
                Proceed to Checkout
              </Button>

            </Paper>
          </div>

        </div>
      </Container>
    </div>
  );
}

export default SeatSelection;