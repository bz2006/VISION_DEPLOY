import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";  
import Redirecter from "../../redirecter";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  if (!ok) {
    return null; 
  }

  return ok ? <Outlet /> : <Redirecter/>;
}
