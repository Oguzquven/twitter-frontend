function NavItem({ name, icon, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "12px",
        borderRadius: "9999px",
        cursor: "pointer",
        fontSize: "20px",
        fontWeight: isActive ? "700" : "400",
        marginBottom: "4px",
        transition: "background 0.2s",
        width: "fit-content",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#181818")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {icon}
      <span style={{ marginRight: "16px" }}>{name}</span>
    </div>
  );
}

export default NavItem;
