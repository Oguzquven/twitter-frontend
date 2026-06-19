import { useState } from "react";
import GoogleButton from "./GoogleButton";
import AppleButton from "./AppleButton";
import PhoneButton from "./PhoneButton";
import Divider from "./Divider";
import LoginForm from "./LoginForm";
import SignupLink from "./SignupLink";
import TermsText from "./TermsText";

function LoginLeft({ onLogin, onSwitchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        minHeight: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            margin: "0 0 24px 0",
            lineHeight: "1.1",
            letterSpacing: "-1px",
          }}
        >
          Şu anda olup bitenler.
        </h1>

        <div style={{ width: "100%" }}>
          <PhoneButton />
          <GoogleButton />
          <AppleButton />
          <Divider />
          <LoginForm
            username={username}
            setUsername={setUsername}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onLogin={onLogin}
          />
        </div>

        <button
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "transparent",
            color: "#e7e9ea",
            border: "1px solid #536471",
            borderRadius: "9999px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            marginTop: "16px",
            transition: "background 0.2s",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(239,243,244,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Şifreni mi unuttun?
        </button>

        <TermsText />

        {/* onSwitchToRegister prop'u SignupLink'e geçiriliyor */}
        <SignupLink onSwitchToRegister={onSwitchToRegister} />
      </div>
    </div>
  );
}

export default LoginLeft;
