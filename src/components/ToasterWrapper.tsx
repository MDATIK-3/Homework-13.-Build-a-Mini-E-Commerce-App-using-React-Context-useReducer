import { Toaster } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const ToasterWrapper = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Toaster
      position="top-right"
      gutter={10}
      toastOptions={{
        duration: 3500,
        style: {
          background: isDark ? "#152b20" : "#ffffff",
          color: isDark ? "#e2f4eb" : "#12271e",
          border: `1.5px solid ${isDark ? "#2a5c3d" : "#d4f0e0"}`,
          borderRadius: "12px",
          boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.5)"
            : "0 8px 32px rgba(46,158,107,0.15)",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "0.9rem",
          fontWeight: 500,
          padding: "14px 18px",
          maxWidth: "380px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        },
        success: {
          iconTheme: {
            primary: isDark ? "#4ecf8a" : "#2e9e6b",
            secondary: isDark ? "#152b20" : "#ffffff",
          },
        },
        error: {
          duration: 4000,
          style: {
            background: isDark ? "#1f1515" : "#fff5f5",
            color: isDark ? "#fca5a5" : "#991b1b",
            border: `1.5px solid ${isDark ? "#3d1a1a" : "#fecaca"}`,
            boxShadow: isDark
              ? "0 8px 32px rgba(0,0,0,0.5)"
              : "0 8px 32px rgba(239,68,68,0.12)",
          },
          iconTheme: {
            primary: "#f87171",
            secondary: isDark ? "#1f1515" : "#fff5f5",
          },
        },
      }}
    />
  );
};

export default ToasterWrapper;
