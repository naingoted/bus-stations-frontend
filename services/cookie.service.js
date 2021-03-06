import Cookies from "js-cookie";
class cookieService {
  get(key) {
    return Cookies.get(key);
  }

  set(key, value, options) {
    Cookies.set(key, value, options);
  }

  remove(key) {
    Cookies.remove(key, { expires: 86400, sameSite: "lax" });
  }
}

export default new cookieService();
