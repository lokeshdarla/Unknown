import React from "react";
import HeroSection from "./pages/home/hero";
import BlogSection from "./Components/Post/PostCard";

function HomeLayout(){
  return(
    <>
    <HeroSection/>
    <BlogSection/>
    </>
  )
}

export default HomeLayout;
