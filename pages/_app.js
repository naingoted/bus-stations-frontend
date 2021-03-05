import "../styles/main.scss";
import Layout from "../components/containers/Layout";
import { AuthProvider } from "@/contexts/authContext";
import { MonitorProvider } from "@/contexts/monitorContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MonitorProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MonitorProvider>
    </AuthProvider>
  );
}

export default MyApp;
