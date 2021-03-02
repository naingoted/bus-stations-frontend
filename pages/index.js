import Head from "next/head";
import Monitor from "../components/monitor/Monitor";
import Status from "../components/monitor/Status";
import { MonitorProvider } from "../contexts/monitorContext";

export default function Home() {
  return (
    <MonitorProvider>
      <Head>
        <title>AWS Services status page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </MonitorProvider>
  );
}
