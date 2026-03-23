import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SeatContext } from "../context/SeatContext";

function PassengerDetails() {
  const navigate = useNavigate();
  const { selectedSeats } = useContext(SeatContext);

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Paper className="p-8 search-card rounded-xl" sx={{ borderRadius: "24px" }}>
        <Typography variant="h4" className="font-bold mb-2">Passenger Details</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          Please provide the details for the primary passenger.
        </Typography>

        <div className="flex flex-col gap-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Full Name" variant="outlined" fullWidth />
            <TextField label="Email Address" variant="outlined" fullWidth />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Phone Number" variant="outlined" fullWidth />
            <TextField label="Age" variant="outlined" type="number" fullWidth />
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Selected Seats:  {selectedSeats.join(", ")}</Typography>
            <Typography variant="body2" color="text.secondary">A copy of your ticket will be sent to the email provided above.</Typography>
          </div>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/success")}
            sx={{
              py: 2,
              fontSize: "1.1rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
              boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2)"
            }}
          >
            Pay & Confirm Booking
          </Button>
        </div>
      </Paper>
    </Container>
  );
}

export default PassengerDetails;


