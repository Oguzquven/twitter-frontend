function FooterLinks() {
  return (
    <div
      style={{
        padding: "0 16px",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px 12px",
        fontSize: "13px",
        color: "#536471",
      }}
    >
      <span style={{ cursor: "pointer" }}>Hizmet Şartları</span>
      <span style={{ cursor: "pointer" }}>Gizlilik Politikası</span>
      <span style={{ cursor: "pointer" }}>Çerez Politikası</span>
      <span style={{ cursor: "pointer" }}>Erişilebilirlik</span>
      <span style={{ cursor: "pointer" }}>Reklam Bilgisi</span>
      <span>© 2026 X Corp.</span>
    </div>
  );
}

export default FooterLinks;
