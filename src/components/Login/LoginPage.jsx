import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";
import LoginFooter from "./LoginFooter";

// onSwitchToRegister prop'u ekledik - Kaydol linkine basınca register sayfasına geçer
function LoginPage({ onLogin, onSwitchToRegister }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#000000",
        color: "#e7e9ea",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <LoginLeft onLogin={onLogin} onSwitchToRegister={onSwitchToRegister} />
        <LoginRight />
      </div>
      <LoginFooter />
    </div>
  );
}

export default LoginPage;
