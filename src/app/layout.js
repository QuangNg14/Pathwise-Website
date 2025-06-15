import { Inter } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pathwise Mentorship",
  description:
    "This is a mentorship program for students looking for internships/jobs in the US.",
};

// CSS Loading Wrapper Component
function CSSLoadingWrapper({ children }) {
  return (
    <div
      style={{
        "--color-primary": "#C45A1D",
        "--color-secondary": "#E9B260",
        "--color-heading": "#3E130A",
        "--color-text": "#6D2A1A",
        "--color-background": "#FDF7ED",
        "--color-bg": "#FDF7ED",
        "--color-dark": "#3E130A",
        "--color-dark-alt": "#6D2A1A",
        minHeight: "100vh",
        fontFamily: "Anuphan, sans-serif",
      }}
      data-theme="pathwise"
    >
      {children}
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --color-primary: #C45A1D;
              --color-secondary: #E9B260;
              --color-heading: #3E130A;
              --color-text: #6D2A1A;
              --color-background: #FDF7ED;
              --color-bg: #FDF7ED;
              --color-dark: #3E130A;
              --color-dark-alt: #6D2A1A;
            }
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; font-family: 'Anuphan', sans-serif; }
          `,
          }}
        />
      </head>
      <body className={inter.className}>
        <CSSLoadingWrapper>{children}</CSSLoadingWrapper>
      </body>
    </html>
  );
}
