import axios from "axios";
import urlService from "./url.service";
import cookieService from "./cookie.service";

const expiresAt = 60 * 60 * 1000; // 1 hour

class authService {
  doUserLogin = async (dispatch, { email, password, remember }) => {
    try {
      dispatch({ type: "REQUEST_LOGIN" });
      const { data } = await axios.post(urlService.loginUrl(), {
        email,
        password,
      });
      console.log(data);

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
  };

  handleLoginSuccess = (response, remember) => {
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
    cookieService.set("access_token", response.access_token, options);
    cookieService.set("user", response.user, options);
    return true;
  };

  isAuthenticated = () => {
    return !!cookieService.get("user");
  };

  doLogOut = () => {
    cookieService.remove("user");
    cookieService.remove("access_token");
  };
}

export default new authService();
