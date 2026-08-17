import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VideoPlayer() {
  const navigate = useNavigate();
  const location = useLocation();

  const title = location.state?.title || "MyStream Video";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "white",
        padding: "30px 50px",
        boxSizing: "border-box",
      }}
    >

      {/* ================= HEADER ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >

        <button
          onClick={() => navigate("/customer-home")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            background: "#27272a",
            color: "white",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          ← Back
        </button>

      </div>


      {/* ================= TITLE ================= */}

      <h1
        style={{
          fontSize: "32px",
          marginBottom: "20px",
        }}
      >
        {title}
      </h1>


      {/* ================= VIDEO ================= */}

      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "auto",
          background: "#000",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >

        <video
          controls
          autoPlay
          width="100%"
          style={{
            display: "block",
            width: "100%",
            background: "#000",
          }}
        >

          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />

          Your browser does not support video playback.

        </video>

      </div>


      {/* ================= VIDEO DETAILS ================= */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "25px auto",
          padding: "25px",
          background: "#18181b",
          borderRadius: "12px",
          boxSizing: "border-box",
        }}
      >

        <h2
          style={{
            margin: 0,
            marginBottom: "10px",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "#a1a1aa",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          Watch this movie or web series on MyStream.
        </p>

      </div>

    </div>
  );
}

export default VideoPlayer;