import React from "react";
import Header from "./Components/UserPage/Userheader";
import Footer from "./Components/Footer/footer";
import BlogPostModal from "./Components/BlogInput/BlogPost";
import { Outlet } from "react-router-dom";
import MyForm from "./Components/BlogInput/BlogPost";

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
