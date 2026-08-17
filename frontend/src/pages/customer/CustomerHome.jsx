import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const navigate = useNavigate();

  const movies = [
    {
      title: "Leo",
      type: "Action",
      image: "https://picsum.photos/500/280?random=11",
    },
    {
      title: "Jailer",
      type: "Action",
      image: "https://picsum.photos/500/280?random=12",
    },
    {
      title: "Vikram",
      type: "Thriller",
      image: "https://picsum.photos/500/280?random=13",
    },
    {
      title: "Master",
      type: "Action",
      image: "https://picsum.photos/500/280?random=14",
    },
  ];

  const series = [
    {
      title: "Stranger Things",
      type: "Sci-Fi",
      image: "https://picsum.photos/500/280?random=15",
    },
    {
      title: "Wednesday",
      type: "Mystery",
      image: "https://picsum.photos/500/280?random=16",
    },
    {
      title: "Money Heist",
      type: "Crime",
      image: "https://picsum.photos/500/280?random=17",
    },
    {
      title: "Dark",
      type: "Sci-Fi",
      image: "https://picsum.photos/500/280?random=18",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "white",
        padding: "25px 50px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            margin: 0,
          }}
        >
          MyStream
        </h1>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            onClick={() => navigate("/customer/plans")}
            style={{
              padding: "10px 22px",
              border: "none",
              borderRadius: "25px",
              background: "#22c55e",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Premium
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            style={{
              padding: "10px 22px",
              border: "1px solid #3f3f46",
              borderRadius: "25px",
              background: "#18181b",
              color: "white",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          padding: "55px",
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #14532d, #052e16, #09090b)",
          marginBottom: "45px",
        }}
      >
        <p
          style={{
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          MY STREAM ORIGINAL
        </p>

        <h2
          style={{
            fontSize: "45px",
            margin: "10px 0",
          }}
        >
          Unlimited Entertainment
        </h2>

        <p
          style={{
            color: "#d4d4d8",
            fontSize: "18px",
          }}
        >
          Watch your favourite movies and web series anytime, anywhere.
        </p>

        <button
          onClick={() => navigate("/customer/plans")}
          style={{
            marginTop: "20px",
            padding: "13px 28px",
            border: "none",
            borderRadius: "25px",
            background: "#22c55e",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Get Premium
        </button>
      </div>

      {/* MOVIES */}
      <h2 style={{ marginBottom: "20px" }}>
        🔥 Popular Movies
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "22px",
          marginBottom: "50px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.title}
            style={{
              background: "#18181b",
              borderRadius: "15px",
              overflow: "hidden",
              border: "1px solid #27272a",
            }}
          >
            <img
              src={movie.image}
              alt={movie.title}
              style={{
                width: "100%",
                height: "170px",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 8px" }}>
                {movie.title}
              </h3>

              <p
                style={{
                  color: "#a1a1aa",
                  margin: "0 0 15px",
                }}
              >
                {movie.type}
              </p>

              {/* WATCH NOW - TEST */}
              <button
                type="button"
                onClick={() => {
                  alert("Watch button clicked");
                  navigate("/video-player");
                }}
                style={{
                  width: "100%",
                  padding: "11px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#22c55e",
                  color: "#000",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ▶ Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SERIES */}
      <h2 style={{ marginBottom: "20px" }}>
        📺 Trending Web Series
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "22px",
        }}
      >
        {series.map((show) => (
          <div
            key={show.title}
            style={{
              background: "#18181b",
              borderRadius: "15px",
              overflow: "hidden",
              border: "1px solid #27272a",
            }}
          >
            <img
              src={show.image}
              alt={show.title}
              style={{
                width: "100%",
                height: "170px",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 8px" }}>
                {show.title}
              </h3>

              <p
                style={{
                  color: "#a1a1aa",
                  margin: "0 0 15px",
                }}
              >
                {show.type}
              </p>

              {/* WATCH NOW - TEST */}
              <button
                type="button"
                onClick={() => {
                  alert("Series button clicked");
                  navigate("/video-player");
                }}
                style={{
                  width: "100%",
                  padding: "11px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#22c55e",
                  color: "#000",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ▶ Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          padding: "25px",
          color: "#71717a",
          borderTop: "1px solid #27272a",
        }}
      >
        © 2026 MyStream. All Rights Reserved.
      </div>
    </div>
  );
}

export default CustomerHome;