import React, { useState } from "react";

const EmailVerificationScreen = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          otp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "OTP verification failed");
      }

      setMessage("Email verified successfully! You can now log in.");
      window.location.href = "http://localhost:9010/login";
    } catch (err) {
      console.error("OTP verification failed:", err.message);
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Email Verification</h2>
      <form onSubmit={handleVerifyOtp} style={styles.form}>
        <div>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Verify</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    marginBottom: "5px",
    textAlign: "left",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    color: "green",
  },
};

export default EmailVerificationScreen;