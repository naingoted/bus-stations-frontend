import React from "react";
import Card from "../common/Card";
import LoadingIndicator from "../common/LoadingIndicator";
import {
  useMonitorDispatch,
  useMonitorState,
} from "../../contexts/monitorContext";

const MonitorList = () => {
  const dispatch = useMonitorDispatch();
  const { data, loading, error } = useMonitorState();
  return (
    <Card>
      {!loading && !error ? (
        data &&
        data.monitors.map((item, index) => {
          return (
            <div
              key={item.id}
              className="row row-content"
              onClick={(e) => {
                dispatch({ type: "setSelectedItem", payload: item });
              }}
            >
              <div title="Api" className="api">{item.name}</div>
              <div className="server-status">
                <span className="dot"></span>
                <span>Operational</span>
              </div>
            </div>
          );
        })
      ) : (
        <LoadingIndicator />
      )}
    </Card>
  );
};

export default MonitorList;
