import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Monitor from "../components/monitor/Monitor";
import { getUpDownApi } from "../actions/hookActions";
import { MonitorProvider } from "../contexts/monitorContext";
import Head from "next/head";
import "@testing-library/jest-dom/extend-expect";
import Status from "../components/monitor/Status";
const mockData = {
  data: {
    stat: "ok",
    pagination: {
      offset: 5,
      limit: 5,
      total: 13,
    },
    monitors: [
      {
        id: 783319806,
        friendly_name: "Asiaone Mobile API",
        url: "https://www.asiaone.com/api/feeds/json",
        type: 1,
        sub_type: "",
        keyword_type: null,
        keyword_value: "",
        http_username: "",
        http_password: "",
        port: "",
        interval: 300,
        status: 2,
        create_datetime: 1566445424,
      },
      {
        id: 782544299,
        friendly_name: "Forex Asiaone",
        url: "http://forex.asiaone.com/",
        type: 1,
        sub_type: "",
        keyword_type: null,
        keyword_value: "",
        http_username: "",
        http_password: "",
        port: "",
        interval: 300,
        status: 2,
        create_datetime: 1556526435,
      },
      {
        id: 782544309,
        friendly_name: "Horoscope Asiaone",
        url: "https://zodiac.asiaone.com/horoscope.php",
        type: 1,
        sub_type: "",
        keyword_type: null,
        keyword_value: "",
        http_username: "",
        http_password: "",
        port: "",
        interval: 300,
        status: 2,
        create_datetime: 1556526648,
      },
      {
        id: 783219331,
        friendly_name: "Mobile Backend Navigations",
        url: "https://prod-mob.asiaone.com/navigations",
        type: 1,
        sub_type: "",
        keyword_type: null,
        keyword_value: "",
        http_username: "",
        http_password: "",
        port: "",
        interval: 300,
        status: 2,
        create_datetime: 1564997076,
      },
      {
        id: 782779995,
        friendly_name: "RSS Digital",
        url: "https://www.asiaone.com/rss-feed/16288",
        type: 1,
        sub_type: "",
        keyword_type: null,
        keyword_value: "",
        http_username: "",
        http_password: "",
        port: "",
        interval: 300,
        status: 2,
        create_datetime: 1559195619,
      },
    ],
  },
  selectedItem: null,
  page: 1,
  total: 0,
  loading: false,
  error: null,
};
describe("Monitor Context", () => {
  const mockUseReducer = jest.fn().mockReturnValue([mockData, jest.fn()]);

  React.useReducer = mockUseReducer;
  render(
    <MonitorProvider>
      <Head>
        <title>AWS Services status page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Status />
      <Monitor />
    </MonitorProvider>
  );
  test("display Monitor after components are being rendered", () => {
    expect(screen.getByText("Monitors")).toBeInTheDocument();
  });

  test("shows modal after monitor name is clicked", () => {
    // click on one of the api name
    // that should pop up modal
    // check if the modal is showing by finding "Okay" button.
    // then return true.
    // console.log(screen.debug);
    // const ApiTitle = screen.getByTitle('Api')
    // fireEvent.click(ApiTitle);
    // expect(screen.getByText('Okay')).toBeInTheDocument()
  });
});
