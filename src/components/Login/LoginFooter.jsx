const footerLinks = [
  "Hakkında",
  "X uygulamasını indir",
  "Grok",
  "Yardım Merkezi",
  "Hizmet Şartları",
  "Gizlilik Politikası",
  "Çerez Politikası",
  "İmprint",
  "Erişilebilirlik",
  "Reklam bilgisi",
  "Blog",
  "Kariyer",
  "Marka Kaynakları",
  "Reklam",
  "Pazarlama",
  "İşletmeler için X",
  "Geliştiriciler",
  "Haberler",
  "Ayarlar",
];

function LoginFooter() {
  return (
    <div
      style={{
        padding: "8px 16px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "4px 12px",
        fontSize: "12px",
        color: "#71767b",
        borderTop: "1px solid #2f3336",
        flexShrink: 0,
      }}
    >
      {footerLinks.map((link, i) => (
        <span key={i} style={{ cursor: "pointer", whiteSpace: "nowrap" }}>
          {link}
        </span>
      ))}
      <span>© 2026 X Corp.</span>
    </div>
  );
}

export default LoginFooter;
