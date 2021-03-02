import axios from "axios";
import UrlService from "./UrlService";
import CookieService from "./CookieService";

const expiresAt = 60 * 60 * 1000; // 1 hour

class AuthService {
  async doUserLogin(dispatch, { username, password, remember }) {
    try {
      dispatch({ type: "REQUEST_LOGIN" });
      const { data } = await axios.post(UrlService.loginUrl(), {
        username,
        password,
      });

      if (data?.user && data?.access_token) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        localStorage.setItem("currentUser", data.user);
        this.handleLoginSuccess(data, remember);
        return data;
      }

      dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
      return;
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", error: error });
    }
  }
  handleLoginSuccess(response, remember) {
    let date = new Date();
    if (!remember) {
      date.setTime(date.getTime() + expiresAt);
    } else {
      date.setTime(date.getTime() + expiresAt * 24 * 30); // 30 days
    }
    /**
     * can set httpOnly, secure, sameSite for better security
     */
    const options = { path: "/", expires: date };
    CookieService.set("access_token", response.access_token, options);
    return true;
  }
}

export default new AuthService();
