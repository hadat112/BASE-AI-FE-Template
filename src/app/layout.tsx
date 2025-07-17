import "@/styles/index.scss";
import { Funnel_Sans } from "next/font/google";
import { Providers } from "../providers";

const funnelSans = Funnel_Sans({ subsets: ["latin"] });

function ThemeScript() {
  const themeScript = `
    (function() {
      try {
         const THEME_STORAGE_KEY = "app-theme";
         let theme = 'dark'; // Default fallback
        
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
           theme = savedTheme;
        } else {
           theme = 'dark';
        }

        document.documentElement.setAttribute('data-theme', theme);
        
        try {
          localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (e) {
          console.error('Error applying theme:', e);
        }
      } catch (e) {
        console.error('Error applying theme:', e);
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title></title>
        <link rel="icon" href="/images/favicon.png" sizes="any" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="" />
        <meta
          name="image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/thumbnail.png`}
        />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/thumbnail.png`}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_BASE_URL}
        />
        <meta property="twitter:title" content="" />
        <meta property="twitter:description" content="" />
        <meta
          property="twitter:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/thumbnail.png`}
        />
        <meta name="version" content={process.env.buildId || "unknown"} />

        <ThemeScript />
      </head>
      <body className={funnelSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
