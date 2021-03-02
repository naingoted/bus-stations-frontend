import React, { useEffect } from "react";
import MonitorList from "./MonitorList";
import MonitorStat from "./MonitorStat";
import Modal from "../common/Modal";
import ErrorModal from "../common/ErrorModal";
import {
  useMonitorState,
  useMonitorDispatch,
} from "../../contexts/monitorContext";
import { getUpDownApi } from "../../actions/hookActions";

const Services = () => {
  const { data, error, errorMessage, selectedItem } = useMonitorState();
  const dispatch = useMonitorDispatch();
  const setServerError = (isServerError) =>
    dispatch({ type: "setServerError", payload: isServerError });
  const setData = (data) => {
    dispatch({ type: "setData", payload: data });
  };
  const setLoading = (status) => {
    dispatch({ type: "setLoading", payload: status });
  };
  const onErrorClear = () => {
    dispatch({ type: "clearError" });
  };
  const onSelectedClear = () => {
    dispatch({ type: "clearSelected" });
  };
  useEffect(() => {
    // side effect.
    getUpDownApi(setData, setServerError, setLoading);
  }, []);
  console.log(useMonitorState())
  return (
    <div data-testid="monitor-app">
      {errorMessage && <ErrorModal onClose={onErrorClear}>{errorMessage}</ErrorModal>}
      <div className="title">Monitors</div>
      <MonitorList data={data} />
      <div className="title">Overall Uptime</div>
      <MonitorStat />
      {selectedItem && (
        <Modal onClose={onSelectedClear}>
          <div>
            {" "}
            <span>Name : </span>
            {selectedItem.friendly_name}
          </div>
          <div>
            {" "}
            <span>Update Intervel : </span> {selectedItem.interval}s
          </div>
          <div>
            {" "}
            <span>Url : </span>{" "}
            <a
              href={selectedItem.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedItem.url}
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Services;
