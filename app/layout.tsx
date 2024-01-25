import "@/app/ui/global.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider, ColorSchemeScript } from "@mantine/core";
// import ProtectedRoute from "../services/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const theme = createTheme({
    breakpoints: {
      xs: '30em',
      sm: '48em',
      md: '64em',
      lg: '74em',
      xl: '90em',
    },
  });
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <AuthProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
