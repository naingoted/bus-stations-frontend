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
  const setLoading = (data) => {
    dispatch({ type: "setLoading", payload: data });
  };
  const loadData = useCallback(async () => {
    setLoading(true);
    const hardCodeLocation = {
      lat: "1.4228059",
      lon: "103.8366647",
    };
    const { data } = await httpService.post(
      urlService.getNearbyBusStopUrl(),
      hardCodeLocation
    );
    setStationsNearBy(data);
    for (const station of data.data) {
      const id = station.id;
      const response = await httpService.post(
        urlService.getBusListByStationIdUrl(),
        {
          stationId: id,
        }
      );
      if (response?.data?.data) {
        buses[id] = response.data.data;
      }
    }
    setBusesData(buses);
    setLoading(false);
  });

  useEffect(() => {
    loadData();
  }, [expandedStation]);
  if (!authService.isAuthenticated()) {
    router.push("/login");
  }

  return authService.isAuthenticated() ? (
    <>
      <Head>
        <title>Nearby Buses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="stations card">
        <Col span={24}>
          <h2>Near You</h2>
        </Col>
        {!loading ? (
          <Col span={24}>
            <Collapse expandIconPosition={"right"} ghost={true} accordion>
              {stationsNearBy?.data?.map((item) => {
                return (
                  <Panel
                    header={
                      <div className="station">
                        <span>{item.name}</span> <span>{item.stationCode}</span>{" "}
                        <span>{item?.distance.toFixed(2)} km</span>
                      </div>
                    }
                    key={item.id}
                  >
                    {buses[item.id]?.length > 0 ? (
                      buses[item.id].map((item) => {
                        return (
                          <div key={item.id} className="bus-timing">
                            <span>{item.busCode}</span>
                            <span>{item.id + 1} min</span>
                            <span>{item.id + 10} min</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="bus-unavailable">no more buses</div>
                    )}
                  </Panel>
                );
              })}
            </Collapse>
          </Col>
        ) : (
          <Skeleton active paragraph={{ rows: 10 }} />
        )}
      </Row>
    </>
  ) : null;
}
