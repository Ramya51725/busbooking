import React, { useState } from "react";
import BusCard from "../components/busCard";
import busData from "../config";
function SearchResult(){
    const [buses , setBuses] = useState (busData)
    return (
        <div>
            {buses.map((bus) => {
                return(
                    <div>
                        <BusCard
                        busName = {bus.busName}
                        type = {bus.type}
                        rating = {bus.rating}
                        departureTime = {bus.departureTime}
                        arrivalTime  = {bus.arrivalTime}
                        duration = {bus.duration}
                        price = {bus.price}
                        route = {bus.route}
                        />
                    </div>
                )
            })}
        </div>       
 
    );

}

export default SearchResult

