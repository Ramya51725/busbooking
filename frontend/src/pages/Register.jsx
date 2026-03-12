import { Paper, Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
function Login() {
  const navigate = useNavigate();

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
            backgroundColor: "rgba(67, 67, 67, 0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <EditIcon />
        </div>
        <Typography variant="h4" className="font-bold mb-2">
          Create Account
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Join us for a better travel experience
        </Typography>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <TextField label="Full Name" variant="outlined" fullWidth />
          <TextField label="Email Address" variant="outlined" fullWidth />
          <TextField label="Phone Number" variant="outlined" fullWidth />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            sx={{ py: 1.5, fontSize: "18px", borderRadius: "12px",background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", }}
          >
            Create Account
          </Button>

          <Typography color="text.secondary" align="center">
            Don't have an account?
            <span
              style={{
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </div>
      </Paper>
    </Container>
  );
}

export default Login;

