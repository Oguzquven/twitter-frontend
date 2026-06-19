import { useState } from "react";

function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError("Tüm alanları doldurun");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Kayıt başarısız");
      }

      const data = await res.json();
      // Kayıt başarılıysa otomatik giriş yap
      onRegister({ ...data, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#000000",
        color: "#e7e9ea",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "440px", maxWidth: "90vw" }}>
        {/* X Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <svg viewBox="0 0 24 24" width="40" height="40" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: "31px",
            fontWeight: "700",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Hesap oluştur
        </h1>

        {/* Hata mesajı */}
        {error && (
          <div
            style={{
              backgroundColor: "rgba(249,24,128,0.1)",
              border: "1px solid #f91880",
              borderRadius: "4px",
              padding: "12px",
              marginBottom: "16px",
              color: "#f91880",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Kullanıcı adı */}
        <input
          type="text"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "16px 12px",
            backgroundColor: "transparent",
            border: "1px solid #2f3336",
            borderRadius: "4px",
            color: "#e7e9ea",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "16px",
            fontFamily: "inherit",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#1d9bf0")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2f3336")}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "16px 12px",
            backgroundColor: "transparent",
            border: "1px solid #2f3336",
            borderRadius: "4px",
            color: "#e7e9ea",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "16px",
            fontFamily: "inherit",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#1d9bf0")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2f3336")}
        />

        {/* Şifre */}
        <input
          type="password"
          placeholder="Şifre (en az 6 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          style={{
            width: "100%",
            padding: "16px 12px",
            backgroundColor: "transparent",
            border: "1px solid #2f3336",
            borderRadius: "4px",
            color: "#e7e9ea",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "24px",
            fontFamily: "inherit",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#1d9bf0")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2f3336")}
        />

        {/* Kayıt ol butonu */}
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 16px",
            backgroundColor: "#e7e9ea",
            color: "#000",
            border: "none",
            borderRadius: "9999px",
            fontSize: "15px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "16px",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) =>
            !loading && (e.currentTarget.style.backgroundColor = "#d7dbdc")
          }
          onMouseLeave={(e) =>
            !loading && (e.currentTarget.style.backgroundColor = "#e7e9ea")
          }
        >
          {loading ? "Kaydediliyor..." : "Kaydol"}
        </button>

        {/* Login linki */}
        <div
          style={{ textAlign: "center", color: "#536471", fontSize: "15px" }}
        >
          Zaten hesabın var mı?{" "}
          <span
            onClick={onSwitchToLogin}
            style={{ color: "#1d9bf0", cursor: "pointer" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecoration = "none")
            }
          >
            Oturum aç
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
