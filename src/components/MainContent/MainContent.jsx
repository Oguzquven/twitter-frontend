import { useState, useEffect } from "react";
import Header from "./Header";
import NewTweetBox from "./NewTweetBox";
import TweetList from "./TweetList";

function MainContent({ searchId, user }) {
  const [isFocused, setIsFocused] = useState(false);
  const [allTweets, setAllTweets] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeader = user
    ? "Basic " + btoa(`${user.username}:${user.password}`)
    : "Basic " + btoa("testuser:123456");

  const fetchAllTweets = () => {
    setLoading(true);
    fetch("http://localhost:3000/tweet/all", {
      headers: { Authorization: authHeader },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllTweets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllTweets();
  }, []);

  const handleUserClick = (userId, username) => {
    setSelectedUser({ id: userId, username });
    fetch(`http://localhost:3000/tweet/findByUserId?userId=${userId}`, {
      headers: { Authorization: authHeader },
    })
      .then((res) => res.json())
      .then((data) => setUserTweets(data));
  };

  const handleBack = () => {
    setSelectedUser(null);
    setUserTweets([]);
  };

  return (
    <div
      style={{
        flex: 1,
        width: "600px",
        borderLeft: "1px solid #2f3336",
        borderRight: "1px solid #2f3336",
        minHeight: "100vh",
        backgroundColor: "#000000",
      }}
    >
      {selectedUser ? (
        <div
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 10,
            borderBottom: "1px solid #2f3336",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <button
            onClick={handleBack}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "20px",
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#181818")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            ←
          </button>
          <div>
            <div
              style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
            >
              {selectedUser.username}
            </div>
            <div style={{ color: "#536471", fontSize: "13px" }}>
              {userTweets.length} gönderi
            </div>
          </div>
        </div>
      ) : (
        <Header searchId={searchId} />
      )}

      {!selectedUser && (
        <NewTweetBox
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          user={user}
          onTweetPosted={fetchAllTweets}
        />
      )}

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#536471" }}>
          <p style={{ fontSize: "16px" }}>Yükleniyor...</p>
        </div>
      ) : selectedUser ? (
        <TweetList
          tweets={userTweets}
          onUserClick={handleUserClick}
          user={user}
        />
      ) : searchId ? (
        <TweetList
          userId={searchId}
          onUserClick={handleUserClick}
          user={user}
        />
      ) : (
        <TweetList
          tweets={allTweets}
          onUserClick={handleUserClick}
          user={user}
        />
      )}
    </div>
  );
}

export default MainContent;
