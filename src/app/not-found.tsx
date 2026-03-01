import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en" className="dark">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1f26",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "8rem",
              fontWeight: 800,
              lineHeight: 1,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.03))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 1rem",
            }}
          >
            404
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
            Page not found
          </p>
          <Link
            href="/en"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#fff",
              color: "#000",
              borderRadius: "9999px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
