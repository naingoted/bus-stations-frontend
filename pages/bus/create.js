import Head from "next/head";
import { useRouter } from "next/router";
import CreateBus from "@/components/bus/CreateBus";
import authService from "@/services/auth.service";

const Create = () => {
  const router = useRouter();
  if (!authService.isAuthenticated()) {
    router.push("/login");
  }
  return authService.isAuthenticated() ? (
    <>
      <Head>
        <title>Create Bus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateBus />
    </>
  ) : null;
};

export default Create;
