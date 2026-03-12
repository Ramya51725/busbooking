import { Container, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

function MyBookings() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h4" className="font-bold">
          My Bookings
        </Typography>
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/")}
        >
          Book New Jouney
        </Button>
      </div>

      <Paper className="p-10 text-center rounded-xl py-20">
        <div style={{marginBottom: "20px" }}>
          <ConfirmationNumberIcon />
        </div>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          No Bookings Yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          You haven't booked any bus tickets. Looking for a getaway?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{ borderRadius: "12px", px: 4,  textTransform : "none"}}
        >
          Explore Buses
        </Button>
      </Paper>
    </Container>
  );
}

export default MyBookings;
