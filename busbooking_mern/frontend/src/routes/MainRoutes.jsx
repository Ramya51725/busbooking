import React from "react";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResult from "../pages/SearchResult";

const MainRoutes = {
  path: "/",
  element: <MainLayout/>,
  children: [
    { path: "/home", element: <Home /> },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/mybooking",
      element: <MyBookings />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/searchresult",
      element: <SearchResult />,
    },
  ],
};

export default MainRoutes;
