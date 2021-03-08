import Layout from "@/components/containers/Layout";
import { AuthProvider } from "@/contexts/authContext";
import { AppProvider } from "@/contexts/appContext";
import "../styles/main.scss";
import "antd/dist/antd.css";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <AuthProvider>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </AuthProvider>
    </SafeHydrate>
  );
}

export default MyApp;
