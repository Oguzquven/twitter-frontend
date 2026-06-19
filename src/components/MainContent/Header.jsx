function Header({ searchId }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "0",
        borderBottom: "1px solid #2f3336",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <div style={{ padding: "16px 20px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "700",
            color: "#e7e9ea",
          }}
        >
          {searchId ? `Kullanıcı ${searchId}` : "Ana Sayfa"}
        </h2>
        {searchId && (
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "13px",
              color: "#536471",
            }}
          >
            1 tweet
          </p>
        )}
      </div>
    </div>
  );
}

export default Header;
