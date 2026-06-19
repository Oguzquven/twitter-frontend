function TweetButton() {
  return (
    <button
      style={{
        width: "90%",
        marginTop: "16px",
        padding: "16px",
        backgroundColor: "#e7e9ea",
        color: "#000000",
        border: "none",
        borderRadius: "9999px",
        fontSize: "17px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d7dbdc")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e7e9ea")}
    >
      Gönderi yayınla
    </button>
  );
}

export default TweetButton;
