const trends = [
  {
    category: "Teknoloji · Gündemde",
    topic: "Spring Boot",
    posts: "2.451 gönderi",
  },
  { category: "Teknoloji · Gündemde", topic: "React", posts: "5.892 gönderi" },
  {
    category: "Teknoloji · Gündemde",
    topic: "PostgreSQL",
    posts: "1.234 gönderi",
  },
  {
    category: "Teknoloji · Gündemde",
    topic: "Twitter Clone",
    posts: "8.765 gönderi",
  },
];

function TrendingCard() {
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
        Gündemde
      </h2>
      {trends.map((trend, i, arr) => (
        <div
          key={i}
          style={{
            padding: "12px 16px",
            borderBottom: i < arr.length - 1 ? "1px solid #2f3336" : "none",
            cursor: "pointer",
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
              color: "#536471",
              fontSize: "13px",
              marginBottom: "2px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{trend.category}</span>
            <span style={{ fontSize: "16px", lineHeight: "1" }}>···</span>
          </div>
          <div
            style={{
              fontWeight: "700",
              fontSize: "15px",
              color: "#e7e9ea",
              marginBottom: "2px",
            }}
          >
            #{trend.topic}
          </div>
          <div style={{ color: "#536471", fontSize: "13px" }}>
            {trend.posts}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrendingCard;
