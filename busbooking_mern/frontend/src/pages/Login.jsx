import { Paper, Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

function Login() {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ padding: 7 }}>
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          width: "500px",
          alignItems: "center",
          borderRadius: "24px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <PersonIcon />
        </div>
        <Typography variant="h4" className="font-bold mb-2">
          Welcome Back
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Login to manage your bus bookings
        </Typography>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <TextField label="Email Address" variant="outlined" fullWidth />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
          />

{/* it has color from the button in containt */}

          <Button
            variant="contained"
            size="large"
            sx={{ py: 1.5, fontSize: "18px", borderRadius: "12px" }}
          >
            Sign In
          </Button>

          <Typography  color="text.secondary" align="center">
            Don't have an account?
            <span
              style={{
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </Typography>
        </div>
      </Paper>
    </Container>
  );
}

export default Login;


