import React from "react";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResult from "../pages/SearchResult";
import SeatSelection from "../pages/SeatSelection";
import PassengerDetails from "../pages/PassengerDetails";
import BookingSuccess from "../pages/BookingSuccess";

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      index: true,     
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "mybooking",
      element: <MyBookings />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "searchresult",
      element: <SearchResult />,
    },
    {
      path :"seats",
      element : <SeatSelection/>
    },
    {
      path : "passenger",
      element :<PassengerDetails/>
    },
    {
      path :"success",
      element : <BookingSuccess/>
    }
  ],
};

export default MainRoutes;
