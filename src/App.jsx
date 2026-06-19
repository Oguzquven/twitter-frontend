import { useState } from "react";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import RightSidebar from "./components/RightSidebar/RightSidebar";

function App() {
  const [userId, setUserId] = useState("");
  const [searchId, setSearchId] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // localStorage'dan kullanıcıyı al - sayfa yenilenince çıkmasın
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("twitter_user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleSearch = () => {
    if (userId) setSearchId(userId);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("twitter_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("twitter_user");
  };

  if (!user) {
    return showRegister ? (
      <RegisterPage
        onRegister={handleLogin}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        color: "#e7e9ea",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          width: "1175px",
          margin: "0 auto",
          minHeight: "100vh",
        }}
      >
        <Sidebar
          userId={userId}
          setUserId={setUserId}
          onSearch={handleSearch}
          user={user}
          onLogout={handleLogout}
        />
        <div style={{ width: "275px", flexShrink: 0 }} />
        <MainContent searchId={searchId} user={user} />
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
