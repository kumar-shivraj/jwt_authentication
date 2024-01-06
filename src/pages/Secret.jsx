import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Secret() {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies([]);

  

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const apiEndpoint = "http://localhost:4000";
        const { data } = await axios.post(
          apiEndpoint,
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          toast(`Hi ${data.user}`, { theme: "dark" });
        }
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <>
      <div className="private">
        <h1>Super Secret Page</h1>
        <button onClick={logOut}>Log Out</button>
      </div>
      <ToastContainer />
    </>
  );
}
