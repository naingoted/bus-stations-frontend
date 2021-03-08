import React from "react";

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();
/**
 * Using reducer instead of useState for cleaner state managment
 */
const inititalState = {
  buses: {},
  expandedStation: null,
  selectedItem: null,
  stationsNearBy: null,
  loading: false,
  errorMesage: null,
  error: false,
  stationsLoading: false,
  routesLoading: false,
  stations: null,
  routes: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "setBuses":
      return { ...state, buses: action.payload };
    case "setExpandedStation":
      return { ...state, expandedStation: action.payload };
    case "setStationsNearBy":
      return { ...state, stationsNearBy: action.payload };
    case "setStations":
      return { ...state, stations: action.payload };
    case "setRoutes":
      return { ...state, routes: action.payload };
    case "setStationsLoading":
      return { ...state, stationsLoading: action.payload };
    case "setRoutesLoading":
      return { ...state, routesLoading: action.payload };
    case "setSelectedItem":
      return { ...state, selectedItem: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
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

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, inititalState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppProvider");
  }
  return context;
}

export { AppProvider, useAppState, useAppDispatch };
