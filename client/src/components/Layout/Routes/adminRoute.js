import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

export default function AdminRoute() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth");
        if (res.data.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin authentication:", error);
      } finally {
        setLoading(false);
      }
    };
    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  if (loading) {
    return null; // Don't render anything while loading
  }

  return isAdmin ? <Outlet /> : null;
}
