import { useState } from "react";

// Yorum Modal bileşeni
function CommentModal({ tweet, user, onClose, onCommentPosted }) {
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
    // Arka plan overlay
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
      {/* Modal kutu */}
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
        {/* Kapat butonu */}
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

        {/* Orijinal tweet */}
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

        {/* Yorum yazma alanı */}
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

function TweetCard({ tweet, onUserClick, user }) {
  const [likeCount, setLikeCount] = useState(tweet.likeCount || 0);
  const [liked, setLiked] = useState(false);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount || 0);
  const [retweeted, setRetweeted] = useState(false);
  const [commentCount, setCommentCount] = useState(tweet.commentCount || 0);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const authHeader = user
    ? "Basic " + btoa(`${user.username}:${user.password}`)
    : "Basic " + btoa("testuser:123456");

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      if (!liked) {
        await fetch("http://localhost:3000/like", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify({ tweetId: tweet.id, userId: user?.id || 1 }),
        });
        setLikeCount((c) => c + 1);
        setLiked(true);
      } else {
        await fetch("http://localhost:3000/dislike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify({ tweetId: tweet.id, userId: user?.id || 1 }),
        });
        setLikeCount((c) => c - 1);
        setLiked(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetweet = async (e) => {
    e.stopPropagation();
    if (retweeted) return;
    try {
      await fetch("http://localhost:3000/retweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({ tweetId: tweet.id, userId: user?.id || 1 }),
      });
      setRetweetCount((c) => c + 1);
      setRetweeted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = (e) => {
    e.stopPropagation();
    setShowCommentModal(true);
  };

  const actions = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z" />
        </svg>
      ),
      count: commentCount,
      hoverColor: "#1d9bf0",
      hoverBg: "rgba(29,155,240,0.1)",
      onClick: handleComment,
      active: false,
      activeColor: null,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
        </svg>
      ),
      count: retweetCount,
      hoverColor: "#00ba7c",
      hoverBg: "rgba(0,186,124,0.1)",
      onClick: handleRetweet,
      active: retweeted,
      activeColor: "#00ba7c",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path
            d={
              liked
                ? "M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                : "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
            }
          />
        </svg>
      ),
      count: likeCount,
      hoverColor: "#f91880",
      hoverBg: "rgba(249,24,128,0.1)",
      onClick: handleLike,
      active: liked,
      activeColor: "#f91880",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
        </svg>
      ),
      count: tweet.viewCount || 0,
      hoverColor: "#1d9bf0",
      hoverBg: "rgba(29,155,240,0.1)",
      onClick: null,
      active: false,
      activeColor: null,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
        </svg>
      ),
      count: null,
      hoverColor: "#1d9bf0",
      hoverBg: "rgba(29,155,240,0.1)",
      onClick: null,
      active: false,
      activeColor: null,
    },
  ];

  return (
    <>
      <div
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
          <div
            onClick={() =>
              onUserClick && onUserClick(tweet.userId, tweet.username)
            }
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
              cursor: "pointer",
            }}
          >
            {tweet.username ? tweet.username.charAt(0).toUpperCase() : "?"}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
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
                onClick={() =>
                  onUserClick && onUserClick(tweet.userId, tweet.username)
                }
                style={{
                  fontWeight: "700",
                  fontSize: "15px",
                  color: "#e7e9ea",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                {tweet.username}
              </span>
              <span
                onClick={() =>
                  onUserClick && onUserClick(tweet.userId, tweet.username)
                }
                style={{
                  color: "#536471",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "425px",
                color: "#536471",
              }}
            >
              {actions.map((action, i) => (
                <div
                  key={i}
                  onClick={action.onClick}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "13px",
                    cursor: action.onClick ? "pointer" : "default",
                    padding: "8px",
                    borderRadius: "50%",
                    transition: "background 0.2s, color 0.2s",
                    color: action.active ? action.activeColor : "#536471",
                  }}
                  onMouseEnter={(e) => {
                    if (action.onClick) {
                      e.currentTarget.style.color = action.hoverColor;
                      e.currentTarget.style.backgroundColor = action.hoverBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (action.onClick) {
                      e.currentTarget.style.color = action.active
                        ? action.activeColor
                        : "#536471";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {action.icon}
                  {action.count !== null && <span>{action.count}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Yorum Modal */}
      {showCommentModal && (
        <CommentModal
          tweet={tweet}
          user={user}
          onClose={() => setShowCommentModal(false)}
          onCommentPosted={() => setCommentCount((c) => c + 1)}
        />
      )}
    </>
  );
}

export default TweetCard;
