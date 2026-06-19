function TermsText() {
  return (
    <div style={{ width: "100%", maxWidth: "380px", marginTop: "8px" }}>
      <p
        style={{
          color: "#71767b",
          fontSize: "13px",
          lineHeight: "1.5",
          margin: 0,
        }}
      >
        Devam ederek{" "}
        <a href="#" style={{ color: "#1d9bf0", textDecoration: "none" }}>
          Hizmet Şartları
        </a>
        ,{" "}
        <a href="#" style={{ color: "#1d9bf0", textDecoration: "none" }}>
          Gizlilik Politikası
        </a>{" "}
        ve{" "}
        <a href="#" style={{ color: "#1d9bf0", textDecoration: "none" }}>
          Çerez Kullanımı
        </a>{" "}
        koşullarımızı kabul etmiş olursunuz.
      </p>
    </div>
  );
}

export default TermsText;
