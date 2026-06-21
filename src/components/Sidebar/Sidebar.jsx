import { useState } from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import TweetButton from "./TweetButton";
import AccountMenu from "./AccountMenu";

const navItems = [
  {
    name: "Ana Sayfa",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M21.591 7.146L12.52 1.854c-.718-.495-1.661-.495-2.38 0L1.07 7.146a1.5 1.5 0 001.08 2.773h1.362v8.078c0 1.074.873 1.947 1.947 1.947h4.2a1.2 1.2 0 001.2-1.2v-4.372a.6.6 0 01.6-.6h2.472a.6.6 0 01.6.6v4.372a1.2 1.2 0 001.2 1.2h4.2a1.947 1.947 0 001.947-1.947V9.919h1.362a1.5 1.5 0 001.08-2.773z" />
      </svg>
    ),
  },
  {
    name: "Keşfet",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
      </svg>
    ),
  },
  {
    name: "Bildirimler",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.36 6.272 8.941 4 11.996 4s5.636 2.272 6.02 5.302l.847 6.698H5.134z" />
      </svg>
    ),
  },
  {
    name: "Mesajlar",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z" />
      </svg>
    ),
  },
  {
    name: "Profil",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.68 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM8 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
      </svg>
    ),
  },
];

// onLogout prop'u eklendi - çıkış yap butonu için
function Sidebar({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState("Ana Sayfa");

  return (
    <div
      style={{
        width: "275px",
        position: "fixed",
        top: 0,
        left: "calc((100vw - 1175px) / 2)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 8px",
        boxSizing: "border-box",
        zIndex: 100,
        backgroundColor: "transparent",
      }}
    >
      <Logo />
      <nav style={{ marginTop: "4px" }}>
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            isActive={activeNav === item.name}
            onClick={() => setActiveNav(item.name)}
          />
        ))}
      </nav>
      <TweetButton />
      {/* onLogout AccountMenu'ye geçiriliyor */}
      <AccountMenu user={user} onLogout={onLogout} />
    </div>
  );
}

export default Sidebar;
