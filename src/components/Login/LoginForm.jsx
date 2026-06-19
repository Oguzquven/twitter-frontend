import { useState } from "react";

function LoginForm({
  username,
  setUsername,
  showPassword,
  setShowPassword,
  onLogin,
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Gerçek API'ye istek atar
  const handleSubmit = async () => {
    if (!username || !password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Kullanıcı adı veya şifre hatalı");

      const data = await res.json();
      // Başarılı giriş - kullanıcı bilgisini ve şifreyi üste gönder
      onLogin({ ...data, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {!showPassword ? (
        <>
          <input
            type="text"
            placeholder="E-posta veya kullanıcı adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setShowPassword(true)}
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
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1d9bf0")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2f3336")}
          />
          <button
            onClick={() => setShowPassword(true)}
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: "#e7e9ea",
              color: "#000000",
              border: "none",
              borderRadius: "9999px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#d7dbdc")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#e7e9ea")
            }
          >
            Devam Et
          </button>
        </>
      ) : (
        <>
          {/* Kullanıcı adı göster */}
          <div
            style={{
              padding: "16px 12px",
              backgroundColor: "transparent",
              border: "1px solid #2f3336",
              borderRadius: "4px",
              color: "#e7e9ea",
              fontSize: "15px",
              marginBottom: "16px",
              boxSizing: "border-box",
            }}
          >
            {username}
          </div>

          {/* Hata mesajı */}
          {error && (
            <div
              style={{
                backgroundColor: "rgba(249,24,128,0.1)",
                border: "1px solid #f91880",
                borderRadius: "4px",
                padding: "10px 12px",
                marginBottom: "12px",
                color: "#f91880",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {/* Şifre input */}
          <input
            type="password"
            placeholder="Şifre"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1d9bf0")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#2f3336")}
          />

          {/* Giriş yap butonu */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: loading ? "#555" : "#e7e9ea",
              color: "#000000",
              border: "none",
              borderRadius: "9999px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              !loading && (e.currentTarget.style.backgroundColor = "#d7dbdc")
            }
            onMouseLeave={(e) =>
              !loading && (e.currentTarget.style.backgroundColor = "#e7e9ea")
            }
          >
            {loading ? "Giriş yapılıyor..." : "Giriş yap"}
          </button>
        </>
      )}
    </div>
  );
}

export default LoginForm;
