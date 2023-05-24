import React, { useEffect } from "react";
import Header from "./Homecomponent/Header";
import Aboutus from "./Homecomponent/Aboutus";
import Homenew from "./Homecomponent/Homenew";
import Swiper from "./Homecomponent/Swiper";
import "./home.css";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Header />
      <Aboutus />
      <Swiper />
      <Homenew />
    </div>
  );
}
