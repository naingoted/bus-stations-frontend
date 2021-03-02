import { useMonitorState } from "../../contexts/monitorContext";

const Status = () => {
  const { loading, error } = useMonitorState();
  return !loading && !error? (
    <div className="status card">
      <div className={`dot is-big`}></div>
      <h2>
        All Systems
        <span>Operational</span>
      </h2>
    </div>
  ) : (
    <div className="status card loading">
      <div className={`dot is-big no-pulse`}></div>
      <h2>Loading ...</h2>
    </div>
  );
};

export default Status;
