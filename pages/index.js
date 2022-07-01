import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setuser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    await axios
      .post(process.env.API_ADDRESS + "/login", { ...user })
      .then((res) => {
        console.log(res.data);
        if (!res.data.status) {
          toast(res.data.message, { className: "toast-error" });
        }
        localStorage.setItem("leave-mng", JSON.stringify(res.data));
        router.push("/dashboard");

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Leave Management System</title>
        <meta name="description" content="Developed by Hanibal G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <main className={styles.main}>
        <div className="container">
          <div className="form">
            <div className="input-field">
              <label for="username">Username</label>
              <input
                type="text"
                onChange={handleOnChange}
                name="username"
                placeholder="example"
                id="username"
              />
            </div>
            <div className="input-field">
              <label for="password">Password</label>
              <input
                type="password"
                placeholder="********"
                id="password"
                onChange={handleOnChange}
                name="password"
              />
            </div>

            <div className="action">
              <Box sx={{ m: 1, position: "relative" }}>
                <button
                  className="btn"
                  variant="contained"
                  disabled={loading}
                  onClick={handleLogin}
                >
                  Login
                </button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
              {/* <Button
              variant="contained"
              disabled={loading}
              onClick={handleLogin}
              id="btn"
              className="btn"
            >
              {loading && <CircularProgress size={22} disableShrink />}
            </Button> */}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span style={{ display: "flex", gap: ".5rem" }}>
          Develop by <a href="https://github.com/hanibalgirmay">Hanibal G.</a>
        </span>
      </footer>
    </div>
  );
}
