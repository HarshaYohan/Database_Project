"use client";
import axios from "axios";
import "../../Styles/signup_login.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (ex: React.FormEvent) => {
    ex.preventDefault();
    try {
      const request = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      console.log("Login successful", request.data);
      router.push("/"); // Redirect after successful signup
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="Container">
      <div className="RightSide">
        <div className="ImgBlock">
          <img src="../RailTruxLogo.png" alt="Logo" />
          <h1>Welcome back!</h1>
          <p>Haven't created an Account?</p>
          <button onClick={() => router.push("/signup")}>Sign up</button>
        </div>
      </div>
      <div className="LeftSide">
        <h1>Log in to your Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default login;
