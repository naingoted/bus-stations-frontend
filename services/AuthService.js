import axios from "axios";
import UrlService from "./UrlService";
import CookieService from "./CookieService";

const expiresAt = 60 * 60 * 1000; // 1 hour

class AuthService {
  async doUserLogin(dispatch, { email, password, remember }) {
    try {
      dispatch({ type: "REQUEST_LOGIN" });
      const { data } = await axios.post(UrlService.loginUrl(), {
        email,
        password,
      });

      if (data?.user && data?.access_token) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
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
    const userString = JSON.stringify(response.user)
    CookieService.set("access_token", response.access_token, options);
    CookieService.set("user", response.u , options);
    return true;
  }
}

export default new AuthService();
