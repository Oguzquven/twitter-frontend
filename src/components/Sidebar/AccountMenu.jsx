import { useState } from "react";

export default function AccountMenu({ user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  const username = user?.username || "oguzguven";
  const displayName = user?.name || user?.username || "Kullanıcı";

  return (
    <div style={{ marginTop: "auto", padding: "12px 0" }}>
      <div
        onClick={() => setShowMenu(!showMenu)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px",
          borderRadius: "9999px",
          cursor: "pointer",
          transition: "background 0.2s",
          position: "relative",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(239,243,244,0.1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        {/* Avatar */}
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
            color: "white",
            flexShrink: 0,
          }}
        >
          {username.charAt(0).toUpperCase()}
        </div>

        {/* İsim ve @username */}
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span
              style={{
                color: "#e7e9ea",
                fontWeight: "700",
                fontSize: "15px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {displayName}
            </span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#e7e9ea">
              <path d="M17.5 7H17v-.5c0-2.76-2.24-5-5-5s-5 2.24-5 5V7h-.5C5.12 7 4 8.12 4 9.5v9c0 1.38 1.12 2.5 2.5 2.5h11c1.38 0 2.5-1.12 2.5-2.5v-9C20 8.12 18.88 7 17.5 7zM9 6.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5V7H9V6.5zm6 8.5c0 1.38-1.12 2.5-2.5 2.5S10 16.38 10 15s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z" />
            </svg>
          </div>
          <span
            style={{ color: "#536471", fontSize: "15px", display: "block" }}
          >
            @{username}
          </span>
        </div>

        {/* Üç nokta */}
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#e7e9ea">
          <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm9-2c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
        </svg>
      </div>

      {/* Açılır menü */}
      {showMenu && (
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "12px",
            width: "300px",
            backgroundColor: "#000",
            borderRadius: "16px",
            boxShadow: "0 0 15px rgba(255,255,255,0.2)",
            border: "1px solid #2f3336",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {/* Kullanıcı bilgisi */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #2f3336",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
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
                color: "white",
              }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span
                  style={{
                    color: "#e7e9ea",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  {displayName}
                </span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#e7e9ea">
                  <path d="M17.5 7H17v-.5c0-2.76-2.24-5-5-5s-5 2.24-5 5V7h-.5C5.12 7 4 8.12 4 9.5v9c0 1.38 1.12 2.5 2.5 2.5h11c1.38 0 2.5-1.12 2.5-2.5v-9C20 8.12 18.88 7 17.5 7zM9 6.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5V7H9V6.5zm6 8.5c0 1.38-1.12 2.5-2.5 2.5S10 16.38 10 15s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z" />
                </svg>
              </div>
              <span style={{ color: "#536471", fontSize: "15px" }}>
                @{username}
              </span>
            </div>
          </div>

          {/* Var olan hesap ekle */}
          <button
            style={{
              width: "100%",
              padding: "16px",
              background: "none",
              border: "none",
              color: "#e7e9ea",
              fontSize: "15px",
              textAlign: "left",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(239,243,244,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Var olan bir hesap ekle
          </button>

          {/* Çıkış yap - onLogout çağırır */}
          <button
            onClick={() => {
              onLogout && onLogout();
              setShowMenu(false);
            }}
            style={{
              width: "100%",
              padding: "16px",
              background: "none",
              border: "none",
              color: "#e7e9ea",
              fontSize: "15px",
              textAlign: "left",
              cursor: "pointer",
              transition: "background 0.2s",
              borderTop: "1px solid #2f3336",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(239,243,244,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            @{username} hesabından çıkış yap
          </button>
        </div>
      )}
    </div>
  );
}
