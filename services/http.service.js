import axios from "axios";
import cookieService from "./cookie.service";
class httpService {
  async get(url) {
    const at = cookieService.get("access_token");
    const options = {
      headers: {
        Authorization: "Bearer " + at,
      },
    };
    try {
      return await axios.get(url, options);
    } catch (error) {
      console.error("Not able to fetch data", error);
      return false;
    }
  }

  async post(url, data, options = null) {
    const at = cookieService.get("access_token");
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

export default new httpService();
