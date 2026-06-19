function AppleButton() {
  return (
    <button
      style={{
        width: "100%",
        height: "40px",
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "none",
        borderRadius: "9999px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        marginBottom: "12px",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6e6e6")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.2 0-1.02.5-2.1.6-3.1-.4-2.6-2.5-4.4-7.1-1.8-12.8 1.2-2.1 3.3-3.4 5.6-3.4 1.7 0 3.1.7 4.1.7 1 0 2.9-.9 4.8-.7.8.03 3.1.3 4.6 2.4-.12.07-2.7 1.6-2.7 4.8 0 3.8 3.4 5.1 3.5 5.1-.03.1-.5 1.8-1.6 3.5-1 1.4-2 2.8-3.5 2.8-1.1 0-1.8-.7-3.2-.7-1.4 0-2.3.7-3.3.7zM12.03 7.25c-.78-1.9.2-4.2 1.9-5.1 1.5-1.3 3.6-1.1 4.5-.9-.3 2.1-1.8 3.9-3.8 4.5-1.1.4-2.3.3-3.6 1.5z" />
      </svg>
      Apple ile giriş yap
    </button>
  );
}

export default AppleButton;
