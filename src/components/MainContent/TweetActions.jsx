import { useState } from "react";

export default function TweetActions({
  tweet,
  user,
  onCommentClick,
  size = "small",
}) {
  const [likeCount, setLikeCount] = useState(tweet.likeCount || 0);
  const [liked, setLiked] = useState(false);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount || 0);
  const [retweeted, setRetweeted] = useState(false);

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

  const iconSize = size === "large" ? 20 : 18;

  const actions = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          width={iconSize}
          height={iconSize}
          fill="currentColor"
        >
          <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z" />
        </svg>
      ),
      count: tweet.commentCount || 0,
      hoverColor: "#1d9bf0",
      hoverBg: "rgba(29,155,240,0.1)",
      onClick: onCommentClick,
      active: false,
      activeColor: null,
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          width={iconSize}
          height={iconSize}
          fill="currentColor"
        >
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
        <svg
          viewBox="0 0 24 24"
          width={iconSize}
          height={iconSize}
          fill="currentColor"
        >
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
        <svg
          viewBox="0 0 24 24"
          width={iconSize}
          height={iconSize}
          fill="currentColor"
        >
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
        <svg
          viewBox="0 0 24 24"
          width={iconSize}
          height={iconSize}
          fill="currentColor"
        >
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
    <div
      style={{
        display: "flex",
        justifyContent: size === "large" ? "space-around" : "space-between",
        maxWidth: size === "large" ? "100%" : "425px",
        color: "#536471",
      }}
    >
      {actions.map((action, i) => (
        <div
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick && action.onClick(e);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            cursor: action.onClick ? "pointer" : "default",
            padding: size === "large" ? "8px" : "8px",
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
  );
}
