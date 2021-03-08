let apiDomain = "";
if (process.env.NODE_ENV === "production") {
  apiDomain = process.env.NEXT_PUBLIC_ENV_BASE_URL;
} else {
  apiDomain = process.env.NEXT_PUBLIC_ENV_PROD_BASE_URL;
}

class urlService {
  static loginUrl() {
    return apiDomain + "api/v1/login";
  }
  static currentUserProfileUrl() {
    return apiDomain + "api/v1/user";
  }
  static getUsersList() {
    return apiDomain + "api/v1/users";
  }
  static getStationsUrl() {
    return apiDomain + "api/v1/stations";
  }
  static getRoutesUrl() {
    return apiDomain + "api/v1/routes";
  }
  static getNearbyBusStopUrl() {
    return apiDomain + "api/v1/busStopNearMe";
  }
  static getBusListByStationIdUrl() {
    return apiDomain + "api/v1/busListByStationId";
  }
  static createBusUrl() {
    return apiDomain + "api/v1/buses";
  }
  static searchRouteUrl() {
    return apiDomain + "api/v1/searchRoutes";
  }
  static searchStationUrl() {
    return apiDomain + "api/v1/searchStations";
  }
}

export default urlService;
