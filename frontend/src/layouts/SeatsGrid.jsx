import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventSeatIcon from "@mui/icons-material/EventSeat";

const SeatGrid = ({ selected, toggle }) => {

  const seats = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    isOccupied: [3, 7, 12, 18, 22].includes(i + 1),
    type: i < 10 ? "sleeper" : "seater"
  }));

  return (
    <div style={{  marginTop: "40px" }}>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr) 40px repeat(1, 1fr)",
          gap: "12px", 
          padding: "30px",
          backgroundColor: "#f1f5f9",
          borderRadius: "30px",
          border: "6px solid #e2e8f0",
          maxWidth: "450px",
          margin: "0 auto"
        }}
      >
{/* Fragment lets us group multiple elements without adding extra HTML. */}
        {seats.map((seat) => (
          <React.Fragment key={seat.id}>

{/* && means “if the condition is true, render the next element.” */}

            {seat.id % 4 === 0 && <div style={{ width: "40px" }} />}

            <button
              disabled={seat.isOccupied}
              onClick={() => toggle(seat.id)}
              style={{
                height: seat.type === "sleeper" ? "90px" : "60px",
                width: "100%",
                borderRadius: "12px",
                border: "2px solid",
                borderColor: seat.isOccupied
                  ? "#cbd5e1"
                  : selected.includes(seat.id)
                  ? "#2563eb"
                  : "#cbd5e1",

                backgroundColor: seat.isOccupied
                  ? "#e2e8f0"
                  : selected.includes(seat.id)
                  ? "#2563eb"
                  : "white",

                color: selected.includes(seat.id) ? "white" : "#64748b",
                cursor: seat.isOccupied ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                boxShadow: selected.includes(seat.id)
                  ? "0 8px 16px rgba(37, 99, 235, 0.3)"
                  : "none",
                transform: selected.includes(seat.id) ? "scale(1.05)" : "scale(1)"
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  opacity: 0.6,
                  marginBottom: "4px"
                }}
              >
                {seat.id}
              </span>

              {seat.isOccupied
                ? <CancelIcon/>
                : selected.includes(seat.id)
                ? <CheckCircleIcon/>
                : <EventSeatIcon/>}
            </button>

          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SeatGrid;