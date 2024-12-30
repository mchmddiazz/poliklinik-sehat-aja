"use client";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../assets/custom.css";

const Register = () => {
  // State for the form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // State for error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  return (
    <>
      <main className="container">
        <div className="header-container">
          <Header />
        </div>
        <div className="form-register">
          <div className="container">
          </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </main>
    </>
  );
}
export default Register;