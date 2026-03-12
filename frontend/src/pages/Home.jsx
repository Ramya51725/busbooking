import React from "react";
import { Paper, Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-gradient-to-br from-blue-900 to-blue-600 h-65 rounded-b-3xl">
        <Container sx={{paddingTop:"45px"}}>
          <div>
            <h1
              className="text-4xl font-bold text-white "
              style={{ fontSize: "45px", marginBottom: "10px" }}
            >
              Explore the World, One Ride at a Time
            </h1>
            <p style={{fontSize:"17px"}} className="text-gray-200">
              Book premium bus tickets at the best prices with just a few
              clicks.
            </p>
          </div>
        </Container>
      </div>
      <div>
        <Container maxWidth="md" sx={{ pb: 12 }}>
          <Paper className="p-6 -mt-[35px] " sx={{ borderRadius: "20px" }}>
            <div className="flex flex-col gap-4">
              <TextField
                label="From"
                placeholder="Leaving from..."
                variant="outlined"
              />
              <TextField
                label="To"
                placeholder="Going to..."
                variant="outlined"
              />
              <TextField
                label="Travel Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/searchresult")}
                sx={{
                  height: "56px",
                  fontSize: "20px",
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                }}
              >
                Search Buses
              </Button>
            </div>
          </Paper>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Popular Routes: Mumbai to Pune, Bangalore to Chennai, Delhi to
              Jaipur
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
