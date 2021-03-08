import Head from "next/head";
import { useRouter } from "next/router";
import { useAppState, useAppDispatch } from "@/contexts/appContext";
import authService from "@/services/auth.service";
import httpService from "@/services/http.service";
import urlService from "@/services/url.service";
import { useCallback, useEffect, useState } from "react";
import { Collapse, Row, Col, Skeleton } from "antd";
const { Panel } = Collapse;

export default function Home() {
  const router = useRouter();
  const { buses, stationsNearBy, loading, expandedStation } = useAppState();
  const dispatch = useAppDispatch();
  const setBusesData = (data) => {
    dispatch({ type: "setBuses", payload: data });
  };
  const setStationsNearBy = (data) => {
    dispatch({ type: "setStationsNearBy", payload: data });
  };
  const setExpandedStation = (data) => {
    dispatch({ type: "setExpandedStation", payload: data });
  };
  const setLoading = () => {
    dispatch({ type: "setLoading", payload: data });
  };
  const loadData = useCallback(async () => {
    const hardCodeLocation = {
      lat: "1.4228059",
      lon: "103.8366647",
    };
    const { data } = await httpService.post(
      urlService.getNearbyBusStopUrl(),
      hardCodeLocation
    );
    setStationsNearBy(data);
  });
  const loadDataByStationId = useCallback(async () => {
    const {
      data,
    } = await httpService.post(urlService.getBusListByStationIdUrl(), {
      stationId: expandedStation,
    });
    buses[expandedStation] = data.data;
    setBusesData(buses);
  });
  useEffect(() => {
    loadDataByStationId();
    loadData();
  }, [expandedStation]);
  if (!authService.isAuthenticated()) {
    router.push("/login");
  }
  // const loadData
  const handleOnChange = (e) => {
    if (e !== undefined) {
      setExpandedStation(e);
    }
  };

  return authService.isAuthenticated() ? (
    <>
      <Head>
        <title>Nearby Buses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="bus-list">
        <Col span={24}>
          <Collapse
            expandIconPosition={"right"}
            ghost={true}
            accordion
            onChange={handleOnChange}
          >
            {stationsNearBy?.data?.map((item) => {
              return (
                <Panel
                  header={`${item.name} [${item.stationCode}]`}
                  key={item.id}
                >
                  {buses[item.id]?.length > 0
                    ? buses[item.id].map((item) => {
                        return (
                          <div key={item.id}>
                            {item.busCode} <span>5 more min</span>
                          </div>
                        );
                      })
                    : "no more bus"}
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      </Row>
    </>
  ) : null;
}
