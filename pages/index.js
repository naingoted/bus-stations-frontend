import Head from "next/head";
import { useRouter } from "next/router";
import { useAppState, useAppDispatch } from "@/contexts/appContext";
import authService from "@/services/auth.service";
import httpService from "@/services/http.service";
import urlService from "@/services/url.service";
import { Collapse, Row, Col } from "antd";
import { useCallback, useEffect } from "react";
const { Panel } = Collapse;

export default function Home() {
  const router = useRouter();
  const { buses, loading } = useAppState();
  const dispatch = useAppDispatch();
  const loadData = useCallback(async () => {
    const setBusesData = (data) => {
      dispatch({ type: "setBuses", payload: data });
    };
    const hardCodeLocation = {
      lat: "1.4228059",
      lon: "103.8366647",
    };
    const { data } = await httpService.post(
      urlService.getNearbyBusStopUrl(),
      hardCodeLocation
    );
    setBusesData(data);
  });
  console.log(buses);
  useEffect(() => {
    loadData();
  }, []);
  if (!authService.isAuthenticated()) {
    router.push("/login");
  }
  return authService.isAuthenticated() ? (
    <>
      <Head>
        <title>Nearby Buses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="bus-list">
        <Col span={24}>
          <Collapse expandIconPosition={"right"}>
            {buses?.data?.map((item) => {
              return (
                <Panel
                  header={`${item.name} [${item.stationCode}]`}
                  key={item.id}
                >
                  <div>lol</div>
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      </Row>
    </>
  ) : null;
}
