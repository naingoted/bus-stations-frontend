import "../styles/main.scss";
import Layout from "../components/containers/Layout";
import { AuthProvider } from "@/contexts/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
