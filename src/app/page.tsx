import React from "react";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import Footer from "../components/Footer/Footer";
import "./assets/custom.css";

const HomePage = () => {
  return (
    <>
      <main className="container">
        <div className="header-container">
          <Header />
        </div>
        <Home />
        <div className="footer-container">
          <Footer />
        </div>
      </main>
    </>
  );
}
export default HomePage;