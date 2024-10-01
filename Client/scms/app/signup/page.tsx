"use client";
import axios from "axios";
import "../../Styles/signup_login.css";
import { useRouter } from "next/navigation";
import { useState } from "react";


function Signup() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("password is not strong enough")
      return
    }
    // Check if passwords match
    else if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send POST request to signup endpoint
      const request = await axios.post("http://localhost:5000/signup", {
        fullname: fullname,
        email: email,
        phonenumber: phonenumber,
        password: password,
      });
      console.log("Signup successful", request.data);
      router.push("/"); // Redirect after successful signup
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="Container">
      <div className="RightSide">
        <div className="ImgBlock">
          <img src="../RailTruxLogo.png" alt="Logo" />
          <h1>Welcome back!</h1>
          <p>Already have an Account?</p>
          <button onClick={() => router.push("/login")}>Log in</button>
        </div>
      </div>
      <div className="LeftSide">
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            type="email" // Change to email type for validation
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel" // Use 'tel' type for phone number
            placeholder="Phone Number"
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
