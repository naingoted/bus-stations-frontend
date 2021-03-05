import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "@/contexts/authContext";
import Monitor from "@/components/monitor/Monitor"
const isServer = typeof window === "undefined";

export default function Home() {
  const router = useRouter();
  const authState = useAuthState();
  console.log("asdf", authState.userDetails);
  if(!authState.token && !isServer) {
    router.push('/login')
  }
  return (
    <>
      <Head>
        <title>AWS Services status page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Monitor />
    </>
  );
}

