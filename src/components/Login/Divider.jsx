function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: "8px 0",
      }}
    >
      <div style={{ flex: 1, height: "1px", backgroundColor: "#2f3336" }} />
      <span style={{ padding: "0 12px", color: "#e7e9ea", fontSize: "15px" }}>
        veya
      </span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#2f3336" }} />
    </div>
  );
}

export default Divider;
