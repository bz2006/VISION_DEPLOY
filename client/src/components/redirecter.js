import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Redirecter = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      navigate(`/${path}`, {
        state: location.pathname,
      });
  }, [navigate, location, path]);
  
};

export default Redirecter;