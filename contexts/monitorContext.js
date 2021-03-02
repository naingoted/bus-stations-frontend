import React from "react";

const MonitorStateContext = React.createContext();
const MonitorDispatchContext = React.createContext();
/**
 * Using reducer instead of useState for cleaner state managment
 */
const inititalState = {
  data: null,
  selectedItem: null,
  page: 1,
  total: 0,
  loading: false,
  errorMesage: null,
  error: false,
};

const monitorReducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return { ...state, data: action.payload };
    case "setSelectedItem":
      return { ...state, selectedItem: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setTotal":
      return { ...state, total: action.payload };
    case "setPage":
      return { ...state, page: action.payload };
    case "setServerError":
      return { ...state, error: true, errorMessage: action.payload };
    case "clearError":
      return { ...state, errorMessage: null };
    case "clearSelected":
      return { ...state, selectedItem: null };
    default:
      throw new Error("Should not get there!");
  }
};

function MonitorProvider({ children }) {
  const [state, dispatch] = React.useReducer(monitorReducer, inititalState);
  return (
    <MonitorStateContext.Provider value={state}>
      <MonitorDispatchContext.Provider value={dispatch}>
        {children}
      </MonitorDispatchContext.Provider>
    </MonitorStateContext.Provider>
  );
}

function useMonitorState() {
  const context = React.useContext(MonitorStateContext);
  if (context === undefined) {
    throw new Error("useMonitorState must be used within a MonitorProvider");
  }
  return context;
}

function useMonitorDispatch() {
  const context = React.useContext(MonitorDispatchContext);
  if (context === undefined) {
    throw new Error("useMonitorDispatch must be used within a MonitorProvider");
  }
  return context;
}

export { MonitorProvider, useMonitorState, useMonitorDispatch };
