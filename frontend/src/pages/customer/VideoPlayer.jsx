import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VideoPlayer() {
  const navigate = useNavigate();
  const location = useLocation();

  const title = location.state?.title || "MyStream Video";
  const type = location.state?.type || "Entertainment";
  const image = location.state?.image;
  const video =
    location.state?.video ||
    "https://www.w3schools.com/html/mov_bbb.mp4";

  // Temporary premium status
  const isPremium = localStorage.getItem("isPremium") === "true";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
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
          marginBottom: "25px",
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

        <button
          onClick={() => navigate("/customer")}
          style={{
            padding: "10px 20px",
            border: "1px solid #333",
            borderRadius: "8px",
            background: "#18181b",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>

      {/* MOVIE TITLE */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "#22c55e",
            marginBottom: "20px",
          }}
        >
          ⭐ 8.5 &nbsp; | &nbsp; HD &nbsp; | &nbsp; {type}
        </p>

        {/* VIDEO */}
        <div
          style={{
            background: "#000",
            borderRadius: "15px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {isPremium ? (
            <video
              controls
              autoPlay
              width="100%"
              poster={image}
              style={{
                display: "block",
                width: "100%",
                maxHeight: "620px",
                background: "#000",
              }}
            >
              <source
                src={video}
                type="video/mp4"
              />

              Your browser does not support video playback.
            </video>
          ) : (
            /* PREMIUM LOCK */
            <div
              style={{
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "linear-gradient(135deg, #18181b, #09090b)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "60px",
                  marginBottom: "15px",
                }}
              >
                🔒
              </div>

              <h2>
                Premium Required
              </h2>

              <p
                style={{
                  color: "#a1a1aa",
                  maxWidth: "500px",
                }}
              >
                Subscribe to a Premium plan to watch this
                movie and enjoy unlimited entertainment.
              </p>

              <button
                onClick={() => navigate("/customer/plans")}
                style={{
                  marginTop: "20px",
                  padding: "13px 30px",
                  border: "none",
                  borderRadius: "25px",
                  background: "#22c55e",
                  color: "#000",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                💳 Get Premium
              </button>
            </div>
          )}
        </div>

        {/* MOVIE INFO */}
        <div
          style={{
            marginTop: "25px",
            padding: "25px",
            background: "#18181b",
            borderRadius: "15px",
            border: "1px solid #27272a",
          }}
        >
          <h2>{title}</h2>

          <p
            style={{
              color: "#a1a1aa",
              lineHeight: "1.7",
            }}
          >
            Watch {title} on MyStream. Enjoy movies and
            web series with a high-quality streaming
            experience.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <span>⭐ 8.5</span>
            <span>🎬 {type}</span>
            <span>HD</span>
            <span>2026</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              background: "#22c55e",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            👍 Like
          </button>

          <button
            style={{
              padding: "12px 25px",
              border: "1px solid #3f3f46",
              borderRadius: "8px",
              background: "#18181b",
              color: "white",
              cursor: "pointer",
            }}
          >
            ＋ My List
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          padding: "25px",
          borderTop: "1px solid #27272a",
          color: "#71717a",
        }}
      >
        © 2026 MyStream. All Rights Reserved.
      </div>
    </div>
  );
}

export default VideoPlayer;