import axios from "axios";
import CookieService from "./CookieService";

class HttpService {
  async get(url, setServerError, setLoading) {
    const at = CookieService.get("access_token");
    const options = {
      headers: {
        Authorization: "Bearer " + at,
      },
    };
    try {
      setLoading(true);
      const response = await axios.get(url, options);
      console.log("response", response);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setServerError("Not able to fetch data");
    }
  }

  async post(url, data, options = null) {
    const at = CookieService.get("access_token");
    const postOptions = {
      headers: {
        Authorization: "Bearer " + at,
      },
    };
    const finalOptions = Object.assign(postOptions, options);
    try {
      return await axios.post(url, data, finalOptions);
    } catch (error) {
      console.error("Not able to fetch data", error);
      return error.response !== undefined ? error.response : error;
    }
  }
}

export default new HttpService();
