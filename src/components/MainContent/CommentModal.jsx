import { useState } from "react";

export default function CommentModal({
  tweet,
  user,
  onClose,
  onCommentPosted,
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const authHeader = user
    ? "Basic " + btoa(`${user.username}:${user.password}`)
    : "Basic " + btoa("testuser:123456");

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await fetch("http://localhost:3000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({
          content: content.trim(),
          tweetId: tweet.id,
          userId: user?.id || 1,
        }),
      });
      setContent("");
      if (onCommentPosted) onCommentPosted();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(91,112,131,0.4)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "60px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#000",
          borderRadius: "16px",
          width: "600px",
          maxWidth: "90vw",
          padding: "16px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            marginBottom: "8px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#181818")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          ✕
        </button>

        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
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
              color: "white",
              flexShrink: 0,
            }}
          >
            {tweet.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <span style={{ fontWeight: "700", color: "#e7e9ea" }}>
              {tweet.username}
            </span>
            <span style={{ color: "#536471", marginLeft: "8px" }}>
              @{tweet.username}
            </span>
            <p
              style={{ color: "#e7e9ea", margin: "4px 0 0", fontSize: "15px" }}
            >
              {tweet.content}
            </p>
            <p
              style={{ color: "#536471", margin: "8px 0 0", fontSize: "14px" }}
            >
              <span style={{ color: "#1d9bf0" }}>@{tweet.username}</span>{" "}
              hesabına yanıtlanıyor
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
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
              color: "white",
              flexShrink: 0,
            }}
          >
            {user?.username?.charAt(0).toUpperCase() || "T"}
          </div>
          <div style={{ flex: 1 }}>
            <textarea
              autoFocus
              placeholder="Yanıtını yaz"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                color: "#e7e9ea",
                fontSize: "20px",
                outline: "none",
                resize: "none",
                fontFamily: "inherit",
                padding: "8px 0",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #2f3336",
                paddingTop: "12px",
              }}
            >
              {content.length > 0 && (
                <span
                  style={{
                    color: content.length > 260 ? "#f91880" : "#536471",
                    fontSize: "13px",
                  }}
                >
                  {280 - content.length}
                </span>
              )}
              <div style={{ marginLeft: "auto" }}>
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim() || loading}
                  style={{
                    padding: "8px 20px",
                    backgroundColor:
                      content.trim() && !loading ? "#1d9bf0" : "#787878",
                    color: "white",
                    border: "none",
                    borderRadius: "30px",
                    fontWeight: "700",
                    fontSize: "15px",
                    cursor: content.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  {loading ? "Gönderiliyor..." : "Yanıtla"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
