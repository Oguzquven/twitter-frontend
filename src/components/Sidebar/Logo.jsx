function Logo() {
  return (
    <div style={{ padding: "2px 0 2px 12px" }}>
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#181818")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    </div>
  );
}

export default Logo;
