const users = [
  { name: "Elon Musk", handle: "@elonmusk" },
  { name: "React", handle: "@reactjs" },
];

function WhoToFollow() {
  return (
    <div
      style={{
        backgroundColor: "#16181c",
        borderRadius: "16px",
        border: "1px solid #2f3336",
        overflow: "hidden",
        marginBottom: "16px",
      }}
    >
      <h2
        style={{
          margin: 0,
          padding: "12px 16px",
          fontSize: "20px",
          fontWeight: "800",
          color: "#e7e9ea",
        }}
      >
        Kimi takip etmeli
      </h2>
      {users.map((user, i, arr) => (
        <div
          key={i}
          style={{
            padding: "12px 16px",
            borderBottom: i < arr.length - 1 ? "1px solid #2f3336" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1d1f23")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#1d9bf0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "18px",
              flexShrink: 0,
              color: "white",
            }}
          >
            {user.name.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: "700",
                fontSize: "15px",
                color: "#e7e9ea",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.name}
            </div>
            <div style={{ color: "#536471", fontSize: "15px" }}>
              {user.handle}
            </div>
          </div>
          <button
            style={{
              backgroundColor: "#e7e9ea",
              color: "#000",
              border: "none",
              borderRadius: "9999px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#d7dbdc")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#e7e9ea")
            }
          >
            Takip et
          </button>
        </div>
      ))}
    </div>
  );
}

export default WhoToFollow;
