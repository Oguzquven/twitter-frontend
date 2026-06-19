import { useState } from "react";
import Toolbar from "./Toolbar";

function NewTweetBox({ isFocused, setIsFocused, user, onTweetPosted }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Tweet gönder
  const handlePost = async () => {
    if (!content.trim() || !user) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Basic Auth - giriş yapan kullanıcının bilgileriyle
          Authorization: "Basic " + btoa(`${user.username}:${user.password}`),
        },
        body: JSON.stringify({
          content: content.trim(),
          userId: user.id,
        }),
      });

      if (!res.ok) throw new Error("Tweet gönderilemedi");

      setContent(""); // Input'u temizle
      setIsFocused(false);
      // Ana sayfayı yenile
      if (onTweetPosted) onTweetPosted();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "8px 16px 12px",
        borderBottom: "1px solid #2f3336",
        display: "flex",
        gap: "12px",
        cursor: "text",
      }}
    >
      {/* Avatar - giriş yapan kullanıcının baş harfi */}
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
          marginTop: "4px",
        }}
      >
        {user ? user.username.charAt(0).toUpperCase() : "T"}
      </div>

      <div style={{ flex: 1, paddingTop: "4px" }}>
        {/* Tweet input */}
        <textarea
          placeholder="Neler oluyor?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          rows={isFocused ? 3 : 1}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            color: "#e7e9ea",
            fontSize: "20px",
            outline: "none",
            padding: "12px 0",
            fontFamily: "inherit",
            resize: "none",
            overflow: "hidden",
          }}
        />

        {/* Karakter sayısı */}
        {isFocused && content.length > 0 && (
          <div
            style={{
              color: content.length > 260 ? "#f91880" : "#536471",
              fontSize: "13px",
              textAlign: "right",
              marginBottom: "4px",
            }}
          >
            {280 - content.length}
          </div>
        )}

        {/* Focus durumuna göre değişen alan */}
        {isFocused && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "12px",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#1d9bf0">
              <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 2c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 4c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
            </svg>
            <span style={{ color: "#1d9bf0", fontSize: "14px" }}>
              Herkes yanıtlayabilir
            </span>
          </div>
        )}

        <Toolbar
          isFocused={isFocused}
          onPost={handlePost}
          loading={loading}
          hasContent={content.length > 0}
        />
      </div>
    </div>
  );
}

export default NewTweetBox;
