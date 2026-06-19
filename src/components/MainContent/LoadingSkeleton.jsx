function LoadingSkeleton() {
  return (
    <div style={{ padding: "0" }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #2f3336",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#2f3336",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: "16px",
                  backgroundColor: "#2f3336",
                  borderRadius: "4px",
                  marginBottom: "12px",
                  width: "30%",
                }}
              />
              <div
                style={{
                  height: "16px",
                  backgroundColor: "#2f3336",
                  borderRadius: "4px",
                  marginBottom: "8px",
                  width: "90%",
                }}
              />
              <div
                style={{
                  height: "16px",
                  backgroundColor: "#2f3336",
                  borderRadius: "4px",
                  width: "60%",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
