import React from "react";
import { Paper,Button ,Container} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";


function BusCard({type,rating,departureTime,arrivalTime,duration,route,busName,price}) {

  const navigate = useNavigate()
  return (
    <div>
      
      <Container>
      <Paper  elevation={6} className="w-200  m-10 p-10 ml-50 ">
        <div className="flex justify-between">
          <div>
            <h2>{busName}</h2>
            <p>{type}</p>
          </div>
          <div>
            <p>{price}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h2><StarIcon sx={{ fontSize: 25, color: "gold" }} ></StarIcon>{rating}</h2>
            <p>{departureTime}-{arrivalTime} -{duration}</p>
          </div>
          <div>
            <p>per seat</p>
          </div>
        </div>      
        <div className="flex justify-between">
          <div>
            <h2>{route}</h2>
          </div>
          <Button variant="contained" onClick={()=>navigate("/seats")}>
            select seat 
          </Button>
        </div>         
      </Paper>
      </Container>

 

    </div>
  );
}

export default BusCard;
