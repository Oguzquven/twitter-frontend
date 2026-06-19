import { useState, useEffect, useRef } from "react";

function LoginRight() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const logoRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!logoRef.current) return;

      const rect = logoRef.current.getBoundingClientRect();

      // Mouse pozisyonunu logo üzerinde yüzde olarak hesapla
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      {/* Logo container */}
      <div
        ref={logoRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "600px", // Daha büyük!
          maxHeight: "600px", // Daha büyük!
        }}
      >
        {/* Ana X logosu — koyu gri/outline */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#333333"
          strokeWidth="0.2"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>

        {/* Işık efekti — mouse takip eden parlama */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="0.2"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            maskImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 50%)`,
            WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 50%)`,
            transition:
              "mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out",
          }}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    </div>
  );
}

export default LoginRight;
