import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { SeatProvider } from "./context/SeatContext";

function App() {
  return (
    <SeatProvider>
      <RouterProvider router={router} />
    </SeatProvider>
  );
}

export default App;