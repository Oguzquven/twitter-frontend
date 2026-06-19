function SignupLink({ onSwitchToRegister }) {
  return (
    <div style={{ width: "100%", maxWidth: "380px", marginTop: "40px" }}>
      <span style={{ color: "#71767b", fontSize: "15px" }}>
        Hesabın yok mu?{" "}
      </span>
      <span
        onClick={() => onSwitchToRegister && onSwitchToRegister()}
        style={{
          color: "#1d9bf0",
          fontSize: "15px",
          textDecoration: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.textDecoration = "underline")
        }
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
      >
        Kaydol
      </span>
    </div>
  );
}

export default SignupLink;
