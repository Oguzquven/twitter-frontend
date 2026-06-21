import { useState } from "react";
import TweetActions from "./TweetActions";
import CommentModal from "./CommentModal";
import TweetDetailModal from "./TweetDetailModal";

export default function TweetCard({
  tweet,
  onUserClick,
  user,
  onTweetDeleted,
}) {
  const [commentCount, setCommentCount] = useState(tweet.commentCount || 0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const authHeader = user
    ? "Basic " + btoa(`${user.username}:${user.password}`)
    : "Basic " + btoa("testuser:123456");

  const handleComment = (e) => {
    e.stopPropagation();
    setShowCommentModal(true);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:3000/tweet/${tweet.id}?userId=${user.id}`, {
        method: "DELETE",
        headers: { Authorization: authHeader },
      });
      setShowMenu(false);
      if (onTweetDeleted) onTweetDeleted(tweet.id);
    } catch (err) {
      console.error(err);
    }
  };

  // Tweet sahibi mi kontrolü - tip dönüşümü ile güvenli karşılaştırma
  const isOwner = user && Number(user.id) === Number(tweet.userId);

  return (
    <>
      <div
        onClick={() => setShowDetailModal(true)}
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
            onClick={(e) => {
              e.stopPropagation();
              onUserClick && onUserClick(tweet.userId, tweet.username);
            }}
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
            {/* Kullanıcı adı satırı */}
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
                onClick={(e) => {
                  e.stopPropagation();
                  onUserClick && onUserClick(tweet.userId, tweet.username);
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  onUserClick && onUserClick(tweet.userId, tweet.username);
                }}
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

              {/* Sadece tweet sahibi görebilir */}
              {isOwner && (
                <div style={{ marginLeft: "auto", position: "relative" }}>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu((v) => !v);
                    }}
                    style={{
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "50%",
                      color: "#536471",
                      fontSize: "18px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#1d9bf0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#536471")
                    }
                  >
                    ···
                  </div>
                  {showMenu && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "28px",
                        backgroundColor: "#000",
                        border: "1px solid #2f3336",
                        borderRadius: "12px",
                        zIndex: 50,
                        minWidth: "160px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.8)",
                      }}
                    >
                      <div
                        onClick={handleDelete}
                        style={{
                          padding: "12px 16px",
                          color: "#f91880",
                          fontWeight: "700",
                          cursor: "pointer",
                          borderRadius: "12px",
                          fontSize: "15px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#1a1a1a")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        🗑️ Gönderiyi sil
                      </div>
                    </div>
                  )}
                </div>
              )}
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

            <TweetActions
              tweet={{ ...tweet, commentCount }}
              user={user}
              onCommentClick={handleComment}
              size="small"
            />
          </div>
        </div>
      </div>

      {showDetailModal && (
        <TweetDetailModal
          tweet={tweet}
          user={user}
          onClose={() => setShowDetailModal(false)}
        />
      )}

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
