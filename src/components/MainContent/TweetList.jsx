import { useState, useEffect } from "react";
import TweetCard from "./TweetCard";
import LoadingSkeleton from "./LoadingSkeleton";

function TweetList({ tweets: propTweets, userId, onUserClick, user }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authHeader = user
    ? "Basic " + btoa(`${user.username}:${user.password}`)
    : "Basic " + btoa("testuser:123456");

  useEffect(() => {
    if (propTweets) {
      setTweets(propTweets);
      setLoading(false);
      return;
    }

    if (userId) {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:3000/tweet/findByUserId?userId=${userId}`, {
        headers: {
          Authorization: authHeader,
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
    }
  }, [propTweets, userId]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (tweets.length === 0) return <EmptyState />;

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          onUserClick={onUserClick}
          user={user}
          // Tweet silinince listeden kaldır
          onTweetDeleted={(deletedId) =>
            setTweets((prev) => prev.filter((t) => t.id !== deletedId))
          }
        />
      ))}
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div
      style={{ padding: "40px 20px", textAlign: "center", color: "#536471" }}
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
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{ padding: "40px 20px", textAlign: "center", color: "#536471" }}
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
}

export default TweetList;
