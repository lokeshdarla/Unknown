import React from "react";
import Header from "./Components/UserPage/Userheader";
import Footer from "./Components/Footer/footer";
import { Outlet } from "react-router-dom";

function UserLayout(){
  return(
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default UserLayout;
