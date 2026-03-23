import { createContext, useState } from "react";

export const SeatContext = createContext();

export function SeatProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <SeatContext.Provider value={{ selectedSeats, setSelectedSeats }}>
      {children}
    </SeatContext.Provider>
  );
}