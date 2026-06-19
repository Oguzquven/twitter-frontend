import { useState, useEffect } from "react";

function TweetList({ userId }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/tweet/findByUserId?userId=${userId}`, {
      headers: {
        Authorization: "Basic " + btoa("testuser:123456"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Tweetler getirilemedi: " + res.status);
        return res.json();
      })
      .then((data) => {
        setTweets(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading)
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

  if (error)
    return (
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          color: "#536471",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚠️</div>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#e7e9ea",
            margin: "0 0 8px",
          }}
        >
          Bir şeyler ters gitti
        </p>
        <p style={{ margin: 0 }}>{error}</p>
      </div>
    );

  if (tweets.length === 0)
    return (
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          color: "#536471",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🐦</div>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#e7e9ea",
            margin: "0 0 8px",
          }}
        >
          Henüz tweet yok
        </p>
        <p style={{ margin: 0 }}>Bu kullanıcı henüz tweet atmamış.</p>
      </div>
    );

  return (
    <div>
      {tweets.map((tweet) => (
        <div
          key={tweet.id}
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid #2f3336",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#080808")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <div style={{ display: "flex", gap: "12px" }}>
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
                flexShrink: 0,
                color: "white",
              }}
            >
              {tweet.username ? tweet.username.charAt(0).toUpperCase() : "?"}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Kullanıcı adı ve tarih */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  marginBottom: "4px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "15px",
                    color: "#e7e9ea",
                  }}
                >
                  {tweet.username}
                </span>
                <span style={{ color: "#536471", fontSize: "15px" }}>
                  @{tweet.username}
                </span>
                <span style={{ color: "#536471", fontSize: "15px" }}>·</span>
                <span style={{ color: "#536471", fontSize: "15px" }}>
                  {new Date(tweet.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>

              {/* Tweet içeriği */}
              <p
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "15px",
                  lineHeight: "1.5",
                  wordBreak: "break-word",
                  color: "#e7e9ea",
                }}
              >
                {tweet.content}
              </p>

              {/* Aksiyon Butonları - Daha Belirgin */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: "425px",
                  color: "#536471",
                }}
              >
                {/* Yorum */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#1d9bf0";
                    e.currentTarget.style.backgroundColor =
                      "rgba(29,155,240,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#536471";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z" />
                  </svg>
                  <span>{tweet.commentCount || 0}</span>
                </div>

                {/* Retweet */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00ba7c";
                    e.currentTarget.style.backgroundColor =
                      "rgba(0,186,124,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#536471";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
                  </svg>
                  <span>{tweet.retweetCount || 0}</span>
                </div>

                {/* Like */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f91880";
                    e.currentTarget.style.backgroundColor =
                      "rgba(249,24,128,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#536471";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
                  </svg>
                  <span>{tweet.likeCount || 0}</span>
                </div>

                {/* Görüntüleme */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#1d9bf0";
                    e.currentTarget.style.backgroundColor =
                      "rgba(29,155,240,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#536471";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
                  </svg>
                  <span>{tweet.viewCount || 0}</span>
                </div>

                {/* Paylaş */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#1d9bf0";
                    e.currentTarget.style.backgroundColor =
                      "rgba(29,155,240,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#536471";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TweetList;
