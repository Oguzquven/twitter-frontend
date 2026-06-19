function PhoneButton() {
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
        fontWeight: "500",
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
        <path d="M19.5 14.5c-1.3 0-2.5-.4-3.5-1.1l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c-.7-1-1.1-2.2-1.1-3.5 0-.3-.2-.5-.5-.5H4.5c-.3 0-.5.2-.5.5 0 8.6 7 15.5 15.5 15.5.3 0 .5-.2.5-.5v-4.5c0-.3-.2-.5-.5-.5z" />
      </svg>
      Telefon ile devam et
    </button>
  );
}

export default PhoneButton;
